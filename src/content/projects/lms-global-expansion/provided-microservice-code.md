---
title: 'LMS Activity-Audit — Provided Microservice Code & Contract'
description: 'The writer-function code and webhook contract YAT provides for the LMS activity-audit microservice. You author the infrastructure-as-code that deploys this function behind an API and a queue, wired to the activity data store.'
appearsIn:
  - s1-cl2-at2
order: 7
uocReferences:
  - '[ICTCLD503 PC 3.1] Review microservice design and code components'
  - '[ICTCLD503 PC 3.2] Deploy and configure cloud services to implement the application'
  - '[ICTCLD505 PC 3.2] Create and deploy a template to provision a related resource set'
---

## Context

The microservice **code** below is provided by YAT — you do not write it. You **author the infrastructure-as-code template** that deploys it: an HTTP API, an SQS queue, and a Lambda function running this handler, wired to the activity data store (see the Provided Data-Store Template). The flow is:

**HTTP API → SQS queue → this function → the activity DynamoDB table.**

The website and the LMS are the event producers; each calls the API per the contract below. The function validates each activity event and appends it to the store. It is idempotent — a re-delivered event with the same `activity_id` is written once, not duplicated.

## `activity_writer.py` (provided)

```python
"""YAT LMS activity-audit microservice - SQS-triggered writer Lambda.

Reads LMS activity messages from the SQS queue and appends each as an immutable
audit record to the DynamoDB table. Idempotent: activity_id is the partition key
and a conditional put means a re-delivered message is skipped rather than duplicated.

Data flow:  HTTP API  ->  SQS  ->  (this Lambda)  ->  DynamoDB

Runtime: python3.12 (boto3 is provided by the Lambda runtime - no dependencies to package).
Environment:
    ACTIVITY_TABLE   the DynamoDB table name (set by the CloudFormation stack).
"""
import json
import os

import boto3
from botocore.exceptions import ClientError

VALID_COHORTS = {"AU", "IN"}
VALID_ACTIONS = {"sign_in", "open_course", "submit_assessment"}
REQUIRED_FIELDS = ("activity_id", "occurred_at", "user_ref", "cohort", "action", "module_ref")


def _validate(record):
    """Return (ok, reason). Rejects anything that isn't a well-formed activity event."""
    for field in REQUIRED_FIELDS:
        if not record.get(field):
            return False, f"missing required field: {field}"
    if record["cohort"] not in VALID_COHORTS:
        return False, f"invalid cohort: {record['cohort']}"
    if record["action"] not in VALID_ACTIONS:
        return False, f"invalid action: {record['action']}"
    return True, ""


def handler(event, context=None):
    """SQS event handler. Returns a small summary (and logs it) for observability."""
    table = boto3.resource("dynamodb").Table(os.environ.get("ACTIVITY_TABLE", "yat-lms-activity"))
    processed = skipped = rejected = 0

    for message in event.get("Records", []):
        try:
            body = json.loads(message["body"])
        except (KeyError, json.JSONDecodeError):
            rejected += 1
            print("reject: message body is not valid JSON")
            continue

        ok, reason = _validate(body)
        if not ok:
            rejected += 1
            print(f"reject: {reason}")
            continue

        item = {field: body[field] for field in REQUIRED_FIELDS}
        try:
            table.put_item(Item=item, ConditionExpression="attribute_not_exists(activity_id)")
            processed += 1
        except ClientError as exc:
            if exc.response["Error"]["Code"] == "ConditionalCheckFailedException":
                skipped += 1  # already written - idempotent re-delivery
            else:
                raise  # a real failure: let SQS retry / send to the DLQ

    summary = {"processed": processed, "skipped": skipped, "rejected": rejected}
    print(json.dumps(summary))
    return summary
```

## Webhook contract

The single integration point. An event producer (the LMS, or the website) calls this; the microservice receives it. All six fields are required; a re-sent event with the same `activity_id` is not duplicated.

```text
POST  {ApiEndpoint}              # {ApiEndpoint} is an Output of your deployed stack
Content-Type: application/json

{
  "activity_id": "7b2c9d1a-...",         # unique id (UUID) - the idempotency key
  "occurred_at": "2026-06-07T01:23:45Z",  # ISO-8601 UTC timestamp
  "user_ref":    "u-48217",               # opaque user reference (not the user's name)
  "cohort":      "IN",                    # "AU" or "IN"  (IN = the India cohort)
  "action":      "open_course",           # "sign_in" | "open_course" | "submit_assessment"
  "module_ref":  "ICTCLD-DR-01"           # the LMS module/resource the action related to
}

Responses:   200 = accepted and queued for writing      400 = malformed request
```

## How to use it

- Author a CloudFormation template that provisions the API (HTTP API), an SQS queue, and a Lambda function running this handler, plus the permissions to read the queue and write the table.
- Set the function's `ACTIVITY_TABLE` environment variable to the table from the Provided Data-Store Template (import the exported value, or pass the table name as a parameter).
- Deploy your template, then POST a sample event (per the contract) and confirm the record appears in the activity table.
