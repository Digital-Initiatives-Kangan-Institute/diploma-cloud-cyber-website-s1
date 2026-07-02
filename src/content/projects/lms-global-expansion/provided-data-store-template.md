---
title: 'LMS Activity-Audit — Provided Data-Store Template'
description: 'The infrastructure-as-code template YAT provides for the LMS activity-audit data store — the append-only DynamoDB table the audit-log microservice writes to. Handed over from an earlier workstream; operate it (deploy, confirm, update, delete) and fix it if it does not deploy as supplied.'
appearsIn:
  - s1-cl2-at2
order: 6
uocReferences:
  - '[ICTCLD505 PC 2.2] Review pre-defined templates; determine resources and dependencies'
  - '[ICTCLD505 PC 2.3] Deploy, update and delete resources using predefined templates'
  - '[ICTCLD505 PC 2.6] Test and troubleshoot template errors'
---

## Context

YAT ICT has provided the infrastructure-as-code template below for the **LMS activity-audit data store** — the append-only DynamoDB table that the LMS audit-log microservice writes each activity record to. The audit store holds India-cohort activity records in the India region (`ap-south-1`) to meet the data-residency obligations set out in the Data Residency & Sovereignty Requirements for this engagement.

This template is **provided for you to operate — you do not author it**. Review it to see what it creates and its dependencies, deploy it, update a parameter and redeploy, confirm the result, and delete it for a clean teardown. It was handed over from an earlier workstream and has **not been validated in this account**, so it may not deploy as supplied. If a deployment fails, read the error, diagnose and fix the problem, then redeploy — and record the symptom, cause and fix in your troubleshooting log.

## `lms-activity-store.yaml`

```yaml
AWSTemplateFormatVersion: '2010-09-09'

Description: >-
  YAT LMS activity-audit data store. A single DynamoDB table that holds the
  append-only LMS activity records the audit-log microservice writes. The India
  cohort's activity records are resident in ap-south-1 per the data-residency
  requirements.

Parameters:
  EnvName:
    Type: String
    Default: dev
    AllowedValues: [dev, prod]
    Description: Environment suffix used in the table name.

Resources:
  ActivityTable:
    Type: AWS::DynamoDB::Table
    Properties:
      TableName: !Sub 'yat-lms-activity-${EnvName}'
      BillingMode: PAY_PER_REQUEST
      ProvisionedThroughput:
        ReadCapacityUnits: 5
        WriteCapacityUnits: 5
      AttributeDefinitions:
        - { AttributeName: activity_id, AttributeType: S }
      KeySchema:
        - { AttributeName: activity_id, KeyType: HASH }
      Tags:
        - { Key: Project, Value: YAT-LMS }
        - { Key: Environment, Value: !Ref EnvName }
        - { Key: DataClassification, Value: activity-audit }

Outputs:
  ActivityTableName:
    Description: The activity table name - the microservice stack reads this (import or parameter).
    Value: !Ref ActivityTable
    Export:
      Name: !Sub 'yat-lms-activity-table-${EnvName}'
```

## How to operate it

```bash
# Review it first: open the file and note the resource it creates and any dependencies.

# Deploy (the audit store's region is the India region, ap-south-1):
aws cloudformation deploy --region ap-south-1 \
  --stack-name yat-lms-activity-store --template-file lms-activity-store.yaml \
  --parameter-overrides EnvName=dev

# Update (change a parameter, e.g. EnvName=prod) and redeploy the same way; observe the change.

# Confirm in the console or with the CLI, then delete (clean teardown):
aws cloudformation delete-stack --region ap-south-1 --stack-name yat-lms-activity-store
```

The audit table name is published as a stack **Output** (`ActivityTableName`, exported as `yat-lms-activity-table-<env>`) — the microservice stack reads it, so the two stacks stay loosely coupled.
