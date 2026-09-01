---
title: 'Website Operational Costing'
description: 'Current operational costing for the YAT public website — a small, open-source, Multi-AZ AWS workload with negligible licensing cost.'
appearsIn:
  - s1-cl2-at1
  - s1-cl2-at2
order: 17
---

## Document control

| | |
|---|---|
| Document title | Website — Operational Costing |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |
| Currency | Australian Dollars (AUD), exclusive of GST, indicative at current price levels |

## 1. Purpose

This document records the current operational costing for YAT's public website — a small, open-source AWS workload, hardened to Multi-AZ high availability. It is the cost grounding for any decision to improve or otherwise change the website's hosting.

## 2. Planning assumptions

| Assumption | Value | Source |
|---|---|---|
| Workload | Load-balanced auto-scaling web tier across two AZs (min 2 instances) + Multi-AZ RDS MySQL + S3 media and backups | Website Infrastructure Specifications |
| Software stack | Open-source LAMP + CMS — **no commercial licensing** | Website Specification |
| Criticality | Public shopfront, now business-critical as the India-campus enrolment front door; ≥ 99.9% availability | Website Specification |
| Indicative cost of downtime | Moderate — reputational, and lost enrolment enquiries during the intake window | YAT-estimated |
| Fully-loaded ICT FTE cost | $115,000 per FTE / year | Salary + superannuation + on-costs |

## 3. Recurring operating costs (per year)

| Category | Item | Annual cost |
|---|---|---:|
| Software licensing | Open-source CMS, PHP, Linux, MySQL — no licence cost | $0 |
| AWS — compute | EC2 (auto-scaling web tier, minimum two small instances) | ~$700 |
| AWS — database | Amazon RDS for MySQL (**Multi-AZ**, small) | ~$800 |
| AWS — load balancing | Application Load Balancer | ~$300 |
| AWS — networking | NAT gateway per Availability Zone | ~$800 |
| AWS — storage & transfer | EBS, S3 media and backups, data transfer | ~$250 |
| AWS — other | Route 53, ACM certificate, CloudWatch | ~$150 |
| Staff time (YAT ICT) | Patching, monitoring, content-platform support (~0.03 FTE × $115k) | ~$3,450 |
| **Recurring per year** | | **~$6,450** |

*The cost shape is the opposite of the Accounting system's: the website carries **no commercial licensing** (open-source throughout), and the direct AWS bill remains small even after hardening. Roughly half the recurring cost is now AWS resource, the rest the modest ICT staff time to maintain it.*

## 4. Cost categorisation framework for change proposals

Any change proposal for this system uses the same three cost-bearer categories applied across YAT ICT change evaluations:

1. **External consultant-priced costs** — fees payable to any engaged consultancy.
2. **Direct vendor / cloud-platform costs** — AWS charges (the website carries no software licensing).
3. **YAT-internal costs** — work YAT in-house ICT and Marketing undertake themselves.

## 5. Operational considerations

- **Cheap to run, cheap to improve.** The small footprint meant hardening the website to Multi-AZ added only a modest incremental AWS cost — roughly $2,000 a year. Further improvement (a content delivery network, a second Region) sits on the same scale.
- **No licensing lever.** Unlike the Accounting system, there is no commercial-licensing dimension to the website's cost — cost decisions are about AWS resource shape only.
- **Resilience vs cost.** In-region resilience has been bought and is now the baseline. What remains — recovery from the loss of the whole Region, and serving an international audience — is the next deliberate cost-for-resilience trade-off.

## 6. References

- Website Specification — workload and concurrency profile
- Website Infrastructure Specifications — current resource shape
- Website Cloud Architecture — Baseline Design — the AWS environment
- ICT Strategic Plan — five-year ICT direction
- Change Management Procedure (intranet policies)
