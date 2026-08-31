---
title: 'Accounting System Infrastructure Specifications'
description: 'Specifications of the AWS-hosted YAT Accounting System (Ledgerline) — compute, database, storage, network, and operating profile of the single-AZ Sydney deployment.'
appearsIn:
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl2-at2
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 15
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.3] Estimate recovery objectives for multi-tier web components and for overall architecture'
---

## Document control

| | |
|---|---|
| Document title | Accounting System (Ledgerline) — Infrastructure Specifications |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the infrastructure or its operating profile |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications of the AWS-hosted YAT **Ledgerline** accounting and office-administration system — compute, database, storage, network, and operating profile. It is the authoritative record for the Ledgerline workload and the planning input for any work that touches it — capacity, availability, recoverability, or onward improvement.

## 2. System description

**Ledgerline** is YAT's finance and office-administration system — general ledger, accounts payable/receivable, student fee billing, procurement, and asset management. Payroll is outsourced to an external bureau and does not run on this system. It serves YAT's finance and administrative staff only; it is an internal back-office system, not public-facing.

Migrated from its former on-premises Application Services server, Ledgerline now runs as a multi-tier workload in AWS region `ap-southeast-2` (Sydney). Staff reach it from the campus over the Site-to-Site VPN; the system is not exposed to the public Internet. YAT retains MP Tech Solutions (MTS) for application support of the Ledgerline layer.

## 3. Infrastructure summary

| Attribute | Value |
|---|---|
| Workload type | Multi-tier internal app — internal load balancer, application tier, database tier |
| AWS region | `ap-southeast-2` (Sydney) |
| Availability zones in use | `ap-southeast-2a` (single-AZ baseline) |
| Application OS | Amazon Linux 2023 |
| Database engine | Amazon RDS for PostgreSQL |
| Access path | Internal only — staff reach it over the Site-to-Site VPN; no public ingress |
| Criticality | Business-important (payroll outsourced; not 24/7 mission-critical) |
| Target availability | 99.5% (business-hours service) |
| Current deployment state | Single-AZ baseline. Application-tier high availability (multi-AZ) and a Multi-AZ database with an automatic-failover standby are both candidates for future improvement |

## 4. Component specifications

### 4.1 Application tier — EC2

| Attribute | Value |
|---|---|
| Instance family | General-purpose burstable (`t3.micro` / `t3.small`) |
| AMI | Amazon Linux 2023 + the Ledgerline Finance & Office Suite |
| Placement | `ledgerline-app-a` (10.20.11.0/24) — no public IP address |
| Auto Scaling Group | min=1, desired=1, max=2, in `ledgerline-app-a` only |
| Scaling policy | Target tracking on CPU at 70% (absorbs the month-end close peak) |
| EBS root volume | `gp3`, 8 GB |
| Administrative access | AWS Systems Manager Session Manager — no key pair, no open management port, no bastion host |

> **Sizing note.** Ledgerline's real finance workload would warrant an instance several sizes larger than
> either option above. The instance families here are the ones that will actually launch in an AWS Academy
> Learner Lab, which caps what is available. Size between them on the reasoning you would use at full
> scale; the reasoning is what matters, not the vCPU count.

### 4.2 Application Load Balancer

| Attribute | Value |
|---|---|
| Type | Internet-facing Application Load Balancer, `ledgerline-alb` |
| Placement | `ledgerline-public-a` and `ledgerline-public-b` — a load balancer requires subnets in two zones |
| Listener | HTTP:80 → `ledgerline-tg` |
| Health check | HTTP GET on `/`; 30-second interval, 2 failures to remove a target |
| TLS | Not terminated here. A production front door for a finance system would; this deployment stops short of it so the platform can be reached and verified directly in a browser |

### 4.3 Database tier — Amazon RDS for PostgreSQL

| Attribute | Value |
|---|---|
| Engine | Amazon RDS for PostgreSQL |
| Instance class | General-purpose burstable (`db.t3.micro` / `db.t3.small`) |
| Multi-AZ | Disabled — no standby instance exists. Enabling a standby is available and is the obvious route to database-tier resilience |
| Storage | `gp3`, 20 GB; storage encryption enabled (AWS KMS) |
| Placement | `ledgerline-data-a` (10.20.21.0/24); not publicly accessible |
| Subnet group | `ledgerline-db-subnet-group`, spanning `ledgerline-data-a` and `ledgerline-data-b` — a subnet group requires two zones |
| Backup retention | 7 days, automated |

> **Sizing note.** As with the application tier, the ~22 GB financial data footprint and the month-end
> close profile would in reality call for a database class and storage allocation well beyond either
> option above. Both are sized to what will deploy in a Learner Lab.

### 4.4 Storage

All Ledgerline storage is block storage attached to the compute and database tiers — the EBS root volume
in §4.1 and the RDS `gp3` storage in §4.3. No object storage is in use.

### 4.5 Network

| Attribute | Value |
|---|---|
| VPC | `ledgerline-vpc`, `10.20.0.0/16` |
| Subnets | `ledgerline-public-a` (10.20.1.0/24), `ledgerline-public-b` (10.20.2.0/24), `ledgerline-app-a` (10.20.11.0/24), `ledgerline-data-a` (10.20.21.0/24), `ledgerline-data-b` (10.20.22.0/24) |
| Security groups | `ledgerline-alb-sg` (HTTP:80 from 0.0.0.0/0) · `ledgerline-app-sg` (HTTP:80 from `ledgerline-alb-sg`) · `ledgerline-db-sg` (PostgreSQL:5432 from `ledgerline-app-sg` only) |
| Internet egress | Single NAT Gateway, `ledgerline-nat`, in `ledgerline-public-a` |
| Routing | `ledgerline-public-rt` carries the public subnets to the internet gateway; `ledgerline-app-rt` carries `ledgerline-app-a` to the NAT gateway. The data subnets have no internet route |
| Monitoring | Two CloudWatch alarms — `ledgerline-unhealthy-hosts` (any unhealthy target behind the load balancer) and `ledgerline-db-storage-low` (free storage below 15% of allocation) |

## 5. Usage patterns

- **Daily pattern:** business hours only, Monday–Friday ~07:30–18:00. Effectively idle overnight and at weekends.
- **Monthly peak:** month-end close (last 2 and first 2 business days) drives the highest concurrent load (~45–55 users) and the heaviest reporting/transaction workload; the ASG absorbs it.
- **Annual peak:** end of financial year (mid-June to mid-July) — statutory reporting and audit preparation.
- **Annual data growth:** ~5 GB / year on the PostgreSQL data files plus scanned-document attachments.

## 6. Capacity outlook

- **Application / database tiers.** The single small EC2 instance (with its ASG) and database comfortably serve the business-hours load, including month-end close; capacity is not the constraint.
- **Resilience.** The single Availability Zone, the single application instance and the single-AZ database are accepted single points of failure of the migration baseline. Resilience — not capacity — is the outstanding limitation and the natural subject of any future improvement work: the application tier can be spread across Availability Zones, and the database can be converted to a Multi-AZ deployment with an automatic-failover standby.

## 7. References

- ICT Strategic Plan — five-year ICT direction including reduced in-house server dependency
- Accounting System Application Specification — Ledgerline functional and workload profile
- Accounting System Cloud Architecture — Baseline Design — design of the AWS Ledgerline environment, including backup mechanisms
- Hardware / Software Inventory — wider inventory in which this workload sits
- Network Diagram — campus and AWS topology including the Ledgerline environment location
