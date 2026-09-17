---
title: 'Enrolline Operational Costing'
description: 'Current AWS operational costing for the YAT student records and enrolment management system (Enrolline) — recurring cloud operating costs, commercial licensing, and planning assumptions for the single-AZ Sydney deployment.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 21
uocReferences:
  - '[ICTCLD504 PC 1.6] Set business goals as they relate to security, reliability, high-performance and cost efficiencies of cloud architecture according to business requirements and needs'
  - '[ICTCLD504 PC 2.3] Review and improve architecture required to enhance security, reliability, scalability and cost optimisation'
  - '[ICTCLD504 FS Numeracy] Interprets numerical data and applies mathematical calculations to assess the financial implications of introducing changes'
---

## Document control

| | |
|---|---|
| Document title | Enrolline — Operational Costing |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT in conjunction with YAT Finance and the Registrar |
| Review cycle | Annual |
| Classification | Internal — ICT, Student Administration, Finance, and engaged consultants on signed MSA |
| Currency | Australian Dollars (AUD), exclusive of GST, at current price levels |

## 1. Purpose

This document records the current AWS operational costing for YAT's student records and enrolment management system (Enrolline), now running as a single-Availability-Zone workload in AWS Sydney, and the common planning assumptions used by ICT and Finance. It is the cost input for any change proposal that touches this system — including onward improvement of the cloud infrastructure.

## 2. Common planning assumptions

| Assumption | Value | Source |
|---|---|---|
| User population | ~120 staff (≈14 admissions, ≈22 student services, ≈40 faculty administration, ≈8 compliance, ≈36 management/general) | YAT organisational records |
| Concurrent users (typical / intake peak) | 25–40 / 90–110 | Enrolline Application Specification |
| Availability (business hours, outside intake) | 99.5% (target met post-migration) | Cloud operational records |
| Availability expected during an intake window | 99.9% | Registrar — enrolment and census dates are externally fixed |
| Indicative cost of downtime | **$1,100 per hour during an intake enrolment window or census processing**; $350 per hour during other business hours; $0 outside business hours | YAT-estimated — the intake figure reflects enrolments that cannot be processed against a fixed census date, not merely deferred work |
| Fully-loaded ICT FTE cost | $115,000 per FTE / year | Salary + superannuation + on-costs |
| ICT planning horizon | 5 years | ICT Strategic Plan |

## 3. AWS Enrolline — operational costing (current year)

### 3.1 Recurring operating costs (per year)

| Category | Item | Annual cost |
|---|---|---:|
| Software licensing | **Enrolline per-user licences (commercial)** | $22,000 |
| | Antivirus / EDR (EC2 instances) | $400 |
| AWS platform | EC2 — Enrolline application (Amazon Linux, single-AZ, provisioned for the intake peak) | $4,200 |
| | **Amazon RDS for PostgreSQL (single-AZ)** | $5,400 |
| | Amazon S3 — document attachment store (versioned) | $900 |
| | Data transfer | $400 |
| | Application Load Balancer + NAT Gateway | $1,200 |
| | CloudWatch monitoring / logs | $700 |
| Vendor support | Enrolline annual support & maintenance contract | $11,000 |
| Staff time (YAT ICT) | Administration, patching, monitoring (~0.10 FTE × $115k) | $11,500 |
| | Incident response (~0.03 FTE × $115k) | $3,450 |
| **Recurring per year** | | **$61,150** |

*The commercial-licensing weight is the largest single line: **$22k/year of Enrolline per-user licensing**, plus $11k of vendor support and maintenance — together more than half the recurring cost, and unaffected by any infrastructure decision. The database carries no proprietary licence: it runs as managed PostgreSQL priced per hour. The operating model is wholly opex.*

### 3.2 Operating-model note

The application tier is **provisioned for the intake peak and runs at that size all year**. Outside the two intake windows and census processing, the system carries roughly a third of its peak concurrent load on the same capacity. This is the largest identifiable inefficiency in the current cost base, and the reason the peak is worth examining closely: it is scheduled, published on the academic calendar, and known months ahead.

## 4. Cost categorisation framework for change proposals

Any change proposal for this system addresses the same three cost-bearer categories used across YAT ICT change evaluations:

1. **External consultant-priced costs** — fees payable to any engaged consultancy.
2. **Direct vendor / cloud-platform costs** — fees payable directly to platform and software vendors (incl. commercial licensing and AWS usage).
3. **YAT-internal costs** — work YAT in-house IT undertakes itself.

## 5. Operational considerations and ICT priorities

- **Commercial licensing weight.** ~$33k/year of this system's cost is Enrolline licensing and vendor support. It is fixed against the user population, not the infrastructure — so infrastructure savings are measured against a cost base that is already majority-licence.
- **Database licensing model.** The database runs as managed RDS for PostgreSQL — a per-hour platform cost with no proprietary database licence.
- **Capacity vs load.** The application tier is sized for a peak that occurs in roughly six weeks of the year. Whether that capacity should be held constantly, scheduled, or made elastic is an open question for any improvement proposal, and it is measurable: the peak and off-peak concurrency figures are in the Application Specification.
- **Resilience vs cost.** The single-AZ baseline keeps cost down, but the two-hour recovery-time objective is not reliably met by restoring a failed single-AZ database. Routes to closing that — a Multi-AZ database with an automatic-failover standby, and application capacity in a second Availability Zone — are each weighed as their incremental running cost against the cost of being unable to enrol or confirm census inside a fixed window.
- **Storage growth.** The S3 document store grows ~6 GB/year and is subject to 30-year student-record retention, so it only ever accumulates. Its access pattern falls away sharply once a student's enrolment closes.

## 6. References

- ICT Strategic Plan — five-year ICT direction
- Enrolline Application Specification — workload and concurrency profile
- Enrolline Infrastructure Specifications — current AWS operational state
- Enrolline Cloud Architecture — Baseline Design — the deployed single-AZ architecture
- Change Management Procedure (intranet policies)
- Privacy / Data Handling Policy (intranet policies)
