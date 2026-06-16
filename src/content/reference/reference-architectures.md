---
title: 'Reference Architectures'
description: 'Architecture patterns and reference designs available to YAT staff and consultants when planning ICT changes.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
uocReferences:
  - '[ICTCLD401 KE 3] principles and functions of cloud computing solutions and technologies, including IaaS / PaaS / SaaS'
  - '[ICTCLD401 KE 11] functions, uses and differences of cloud models, including on-premise and private cloud / hybrid cloud / public cloud'
---

## How to use this list

Consult these references when:

- Choosing between cloud service options (e.g. should a workload run on EC2, on ECS, or on Elastic Beanstalk?)
- Designing for the AWS Well-Architected pillars
- Justifying architecture decisions in action plans and design documents
- Looking for canonical patterns that map onto the YAT environment

## Cloud service model definitions

- **NIST SP 800-145** — the canonical definitions of IaaS, PaaS, SaaS, public/private/hybrid/community cloud. See the [Industry Standards Reference List](/intranet/reference/industry-standards) for the full citation.
- **AWS service-model mapping** — for each AWS service used, identify the service-model layer: e.g. EC2 (IaaS), RDS (managed PaaS for databases), S3 (storage service), AWS Lambda (FaaS / PaaS).

## AWS Well-Architected Framework

The Well-Architected Framework is the primary reference for design decisions on AWS. Six pillars:

- **Operational Excellence** — running and monitoring systems, continuously improving processes
- **Security** — protecting information, systems, and assets
- **Reliability** — recovering from failures, dynamically acquiring computing resources to meet demand
- **Performance Efficiency** — using computing resources efficiently
- **Cost Optimisation** — avoiding unnecessary cost
- **Sustainability** — minimising environmental impact

Each pillar has a whitepaper and a set of design principles. For any architecture decision, identify which pillar(s) the decision serves and which trade-offs it imposes.

## AWS reference architectures relevant to YAT

- **Highly available multi-tier web application** — the canonical pattern for an application like the YAT LMS post-migration: VPC with subnets in two or more availability zones, web tier behind an Application Load Balancer with an Auto Scaling Group, database tier on RDS Multi-AZ.
- **AWS hybrid cloud / migration patterns** — relevant during the transition phase. Patterns include "lift-and-shift" (rehost), "re-platform", "refactor" (the AWS "6 Rs" of migration: rehost, replatform, repurchase, refactor, retire, retain). The YAT LMS migration is principally **rehost / replatform**: same OS and application stack, new cloud-hosted infrastructure.
- **AWS multi-AZ RDS for MySQL** — the canonical pattern for the YAT HA database requirements.
- **AWS IAM patterns** — least-privilege groups and policies, identity federation, role-based access. Relevant to cloud IAM design and security responsibilities matrix work.

## AWS Cloud Adoption Framework (CAF)

For strategic-alignment work, the AWS CAF provides a structure for thinking about cloud adoption beyond pure technology. Six perspectives:

- **Business** (the business case for cloud)
- **People** (capability and skills)
- **Governance** (policy, controls, risk management)
- **Platform** (the technical platform itself)
- **Security** (cloud-specific security)
- **Operations** (running cloud workloads)

## Migration approaches

- **AWS Migration Strategy "6 Rs"** — Rehost, Replatform, Repurchase, Refactor, Retire, Retain. For the YAT LMS: principally rehost (same OS + application stack) with elements of replatform (managed database for the HA tier).
- **AWS Migration Hub** — service for tracking migrations across multiple workloads.

## Operational patterns

- **CloudWatch monitoring patterns** — metric, log, alarm, dashboard.
- **AWS Backup** — managed backup for RDS, EBS, and other AWS resources. Relevant to the cloud-side equivalent of YAT's current on-prem backup process.
- **AWS Trusted Advisor** — automated best-practice checks across cost, performance, security, fault tolerance, and service limits.

## 12-Factor App methodology

Not strictly an "AWS" reference, but a widely-used framework for designing cloud-native applications. Traditional server-installed applications (like the current DOODLE LMS) do not follow 12-Factor; this may be discussed as a future-state consideration rather than a current-state requirement.

## When to cite which references

- For cloud-migration strategic work — reference Well-Architected and the CAF when justifying the strategic direction of a migration.
- For foundation builds — reference the multi-tier web application pattern and IAM patterns.
- For HA / fault-tolerance work — reference the multi-AZ RDS pattern, the highly-available web application pattern, and CloudWatch monitoring patterns.
- Cite by name in design documents. Don't paraphrase an entire whitepaper into a hand-over deliverable — link or cite, and apply the pattern to the YAT environment.
