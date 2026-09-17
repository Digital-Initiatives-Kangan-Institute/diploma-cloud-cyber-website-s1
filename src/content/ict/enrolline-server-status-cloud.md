---
title: 'Enrolline Infrastructure Specifications'
description: 'Specifications of the AWS-hosted YAT student records and enrolment management system (Enrolline) — compute, database, object storage, network, and operating profile of the single-AZ Sydney deployment.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 22
uocReferences:
  - '[ICTCLD504 PC 1.1] Identify and review business’s cloud architecture design'
  - '[ICTCLD504 PC 1.2] Evaluate cloud architecture and identify business impact of design decisions'
  - '[ICTCLD504 AC 3] information and data sources required to design and implement cloud infrastructure'
---

## Document control

| | |
|---|---|
| Document title | Enrolline — Infrastructure Specifications |
| Document owner | Sam Walker, ICT Manager |
| Business owner | Jess Tran, YAT Registrar |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the infrastructure or its operating profile |
| Classification | Internal — ICT, Student Administration, Compliance, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications of the AWS-hosted YAT **Enrolline** student records and enrolment management system — compute, database, object storage, network, and operating profile. It is the authoritative record for the Enrolline workload and the planning input for any work that touches it: capacity, availability, recoverability, compliance, or onward improvement.

## 2. System description

**Enrolline** is YAT's student records and enrolment management system — applications and offers, enrolment, USI verification, results, student fee invoicing and receipting, and AVETMISS compliance reporting. It serves YAT staff only; students do not hold Enrolline accounts, and student-submitted applications arrive from the public website as work items.

Migrated from its former on-premises server under an earlier engagement, Enrolline now runs as a multi-tier workload in AWS region `ap-southeast-2` (Sydney), with all of its load in a single Availability Zone. YAT retains MP Tech Solutions (MTS) for consulting work on the infrastructure layer; the Enrolline application itself is vendor-supported.

## 3. Infrastructure summary

| Attribute | Value |
|---|---|
| Workload type | Multi-tier staff application — load balancer, application tier, database tier, object document store |
| AWS region | `ap-southeast-2` (Sydney) |
| Availability zones in use | `ap-southeast-2a` (single-AZ baseline) |
| Application OS | Amazon Linux 2023 |
| Database engine | Amazon RDS for PostgreSQL |
| Document store | Amazon S3 (versioned) |
| Access path | Reached through the load balancer over HTTP. A production front door for a student-records system would sit behind TLS and restricted ingress; this deployment stops short of that so the platform can be reached and verified directly in a browser |
| Criticality | Business-important year-round; **business-critical during an intake enrolment window and census processing** |
| Target availability | 99.5% business hours; 99.9% expected during an intake window |
| Current deployment state | Single-AZ baseline. Application-tier multi-AZ capacity and a Multi-AZ database with an automatic-failover standby are both available and neither has been implemented |

## 4. Component specifications

### 4.1 Application tier — EC2

| Attribute | Value |
|---|---|
| Instance family | General-purpose burstable (`t3.micro` / `t3.small`) |
| AMI | Amazon Linux 2023 + the Enrolline Student Management Suite |
| Placement | `enrolline-app-a` (10.30.11.0/24) — no public IP address |
| Auto Scaling Group | min=1, desired=1, max=2, in `enrolline-app-a` only |
| Scaling policy | Target tracking on CPU at 70% |
| EBS root volume | `gp3`, 8 GB |
| Administrative access | AWS Systems Manager Session Manager — no key pair, no open management port, no bastion host |

> **Sizing note.** Enrolline's real workload — and particularly its intake peak — would warrant an instance
> several sizes larger than either option above. The instance families here are the ones that will actually
> launch in an AWS Academy Learner Lab, which caps what is available. Size between them on the reasoning you
> would use at full scale; the reasoning is what matters, not the vCPU count.

> **Capacity note.** The group is sized and left running for the intake peak all year round. Desired capacity
> does not change with the academic calendar, and there is no scheduled scaling.

### 4.2 Application Load Balancer

| Attribute | Value |
|---|---|
| Type | Internet-facing Application Load Balancer, `enrolline-alb` |
| Placement | `enrolline-public-a` and `enrolline-public-b` — a load balancer requires subnets in two zones |
| Listener | HTTP:80 → `enrolline-tg` |
| Health check | HTTP GET on `/`; 30-second interval, 2 failures to remove a target |
| TLS | Not terminated here |

### 4.3 Database tier — Amazon RDS for PostgreSQL

| Attribute | Value |
|---|---|
| Engine | Amazon RDS for PostgreSQL |
| Instance class | General-purpose burstable (`db.t3.micro` / `db.t3.small`) |
| Multi-AZ | Disabled — no standby instance exists |
| Storage | `gp3`, 20 GB; storage encryption enabled (AWS KMS) |
| Placement | `enrolline-data-a` (10.30.21.0/24); not publicly accessible |
| Subnet group | `enrolline-db-subnet-group`, spanning `enrolline-data-a` and `enrolline-data-b` — a subnet group requires two zones |
| Backup retention | 7 days, automated |
| Point-in-time recovery | Enabled via automated backups and transaction logs |

> **Sizing note.** As with the application tier, the ~22 GB relational footprint and the intake-window
> transaction profile would in reality call for a database class and storage allocation well beyond either
> option above. Both are sized to what will deploy in a Learner Lab.

### 4.4 Storage — Amazon S3 document store

Enrolline's object storage is a working part of the system, not an adjunct: every student record can carry scanned identity evidence, prior qualifications, USI evidence, and support documentation.

| Attribute | Value |
|---|---|
| Bucket | `yat-enrolline-documents` |
| Contents | Student document attachments — ID evidence, prior qualifications, USI evidence, support plans |
| Current size | ~26 GB, growing ~6 GB / year |
| Versioning | Enabled |
| Encryption | SSE-S3 (Amazon S3-managed keys) |
| Storage class | S3 Standard for all objects — **no lifecycle configuration exists** |
| Public access | Blocked at the bucket level |
| VPC access path | Via the NAT Gateway — **there is no S3 VPC endpoint**, so application-to-S3 traffic leaves the VPC and is charged as NAT data processing |
| Replication | None |

> **Access-pattern note.** Attachment reads fall away sharply once a student's enrolment closes, but the
> objects are retained for 30 years under the student-records retention obligation. Every object therefore
> sits in S3 Standard indefinitely regardless of whether it is ever read again.

### 4.5 Network

| Attribute | Value |
|---|---|
| VPC | `enrolline-vpc`, `10.30.0.0/16` |
| Subnets | `enrolline-public-a` (10.30.1.0/24), `enrolline-public-b` (10.30.2.0/24), `enrolline-app-a` (10.30.11.0/24), `enrolline-data-a` (10.30.21.0/24), `enrolline-data-b` (10.30.22.0/24) |
| Security groups | `enrolline-alb-sg` (HTTP:80 from 0.0.0.0/0) · `enrolline-app-sg` (HTTP:80 from `enrolline-alb-sg`) · `enrolline-db-sg` (PostgreSQL:5432 from `enrolline-app-sg` only) |
| Internet egress | Single NAT Gateway, `enrolline-nat`, in `enrolline-public-a` |
| Routing | `enrolline-public-rt` carries the public subnets to the internet gateway; `enrolline-app-rt` carries `enrolline-app-a` to the NAT gateway. The data subnets have no internet route |
| VPC endpoints | None |
| Monitoring | Two CloudWatch alarms — `enrolline-unhealthy-hosts` (any unhealthy target behind the load balancer) and `enrolline-db-storage-low` (free storage below 15% of allocation) |

> **Logging note.** No VPC flow logs, no load-balancer access logs, and no S3 access logging are configured.
> Application-level audit logging is internal to Enrolline and held in the database.

## 5. Usage patterns

- **Daily pattern:** business hours only, Monday–Friday ~08:00–18:00. Effectively idle overnight and at weekends.
- **Intake peak:** the first three weeks of February and of July. Concurrent users rise from ~25–40 to ~90–110 and stay there for the duration of the window.
- **Census processing:** ~4 weeks after each intake start, a second shorter load spike against a legally fixed date.
- **Annual peak:** the AVETMISS annual submission window in January — heavy extract, validation, and reporting workload rather than interactive user load.
- **Annual data growth:** ~8 GB / year (~2 GB relational, ~6 GB of scanned document attachments).

## 6. Capacity outlook

- **Application tier.** Capacity is adequate for the intake peak because it is provisioned for the intake peak year-round. For roughly forty-six weeks of the year the system runs well under that capacity.
- **Database tier.** Adequate for current load. Storage headroom is the nearer constraint given retention: nothing is ever deleted.
- **Object storage.** Growth is steady and one-directional. There is no tiering, so the cost of the store rises with total accumulated volume rather than with active volume.
- **Resilience.** The single Availability Zone, the single application instance, the single-AZ database, and the single NAT Gateway are accepted single points of failure of the migration baseline. The two-hour recovery-time objective is not reliably met by point-in-time restore.

## 7. References

- ICT Strategic Plan — five-year ICT direction
- Enrolline Application Specification — functional and workload profile
- Enrolline Cloud Architecture — Baseline Design — design of the AWS Enrolline environment, including backup mechanisms
- Enrolline Operational Costing — the running cost of this deployment
- Enrolline Network Diagram — the topology of this environment
- Hardware / Software Inventory — wider inventory in which this workload sits
