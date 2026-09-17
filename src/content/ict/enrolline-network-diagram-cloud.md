---
title: 'Enrolline Network Diagram'
description: 'Network topology of the AWS-hosted YAT student records and enrolment management system (Enrolline) — the single-AZ Sydney deployment, its subnets, the S3 document store access path, and where each component sits.'
appearsIn:
  - s1-cl3-at1
order: 23
uocReferences:
  - '[ICTCLD504 PC 1.1] Identify and review business’s cloud architecture design'
  - '[ICTCLD504 PC 1.2] Evaluate cloud architecture and identify business impact of design decisions'
---

## Document control

| | |
|---|---|
| Document title | Network Diagram — YAT Enrolline, AWS Sydney |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material network change |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current-state network topology of the YAT Enrolline student records and enrolment management system following its migration to AWS. It runs in the AWS Sydney region as a single-Availability-Zone workload.

It is a separate deployment from the LMS and Ledgerline environments — its own VPC, its own addressing, and its own operating profile. For Enrolline's component specifications see the Enrolline Infrastructure Specifications.

## 2. Topology overview

Enrolline runs in **AWS region `ap-southeast-2` (Sydney)** in its own VPC, `enrolline-vpc` (`10.30.0.0/16`):

- **Internet Gateway** for staff traffic into the public subnets.
- **Application Load Balancer** spanning `enrolline-public-a` and `enrolline-public-b`, fronting the Enrolline application instance over **HTTP:80**. A load balancer cannot be created in a single Availability Zone, so it was given subnets in both from the outset.
- **EC2 — Enrolline application** in `enrolline-app-a`, running on Amazon Linux 2023, managed by an Auto Scaling group with all capacity in a single zone.
- **Amazon RDS for PostgreSQL** in `enrolline-data-a`, single-AZ with no standby. Its subnet group spans `enrolline-data-a` and `enrolline-data-b`, because a database subnet group likewise requires two zones.
- **Amazon S3 — `yat-enrolline-documents`** holding student document attachments. S3 is a regional service and sits **outside the VPC**; the application reaches it **through the NAT Gateway**, because no S3 VPC endpoint has been created.
- **NAT Gateway** in `enrolline-public-a`, providing outbound internet from the application subnet — for package and update fetches, for the USI Registry web service, and for all S3 document traffic.

## 3. Component summary

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| Internet Gateway | VPC edge | AWS-managed | Staff traffic entry |
| Application Load Balancer | `enrolline-public-a` + `enrolline-public-b` | Spans both zones | HTTP:80 → Enrolline target group |
| NAT Gateway | `enrolline-public-a` | Single-AZ | Outbound for the application subnet, including all S3 traffic |
| EC2 — Enrolline application | `enrolline-app-a` | Single-AZ ASG | Amazon Linux 2023 |
| RDS for PostgreSQL | `enrolline-data-a` | Single-AZ — not HA | No standby; recovery via point-in-time restore. Subnet group spans `enrolline-data-a` + `enrolline-data-b` |
| S3 — `yat-enrolline-documents` | Regional, outside the VPC | AWS-managed durability | Reached via the NAT Gateway; no VPC endpoint |

The VPC's five subnets:

| Subnet | CIDR | Zone | Carries |
|---|---|---|---|
| `enrolline-public-a` | 10.30.1.0/24 | `ap-southeast-2a` | Load balancer, NAT Gateway |
| `enrolline-public-b` | 10.30.2.0/24 | `ap-southeast-2b` | Load balancer only — nothing else is placed here |
| `enrolline-app-a` | 10.30.11.0/24 | `ap-southeast-2a` | Enrolline application instances |
| `enrolline-data-a` | 10.30.21.0/24 | `ap-southeast-2a` | PostgreSQL database |
| `enrolline-data-b` | 10.30.22.0/24 | `ap-southeast-2b` | Nothing — required by the database subnet group |

There is no application subnet in `ap-southeast-2b`.

## 4. Single points of failure

- **RDS database — single-AZ.** A single instance in one zone with no standby. Recovery depends on point-in-time restore, which does not reliably complete inside the two-hour recovery-time objective.
- **EC2 application — single-AZ.** Auto Scaling can replace an instance, but all capacity is in `enrolline-app-a`, and there is no application subnet in the second zone for it to expand into.
- **NAT Gateway — single-AZ.** It is in `enrolline-public-a` only. An outage in that zone removes outbound internet for the application tier — which here means **document attachments become unreachable and USI verification stops**, not merely that package updates fail.

The Application Load Balancer is **not** in this list: it was created across `enrolline-public-a` and `enrolline-public-b` and already spans both zones.

## 5. Observations on the current topology

These are recorded as current-state facts, not as recommendations:

- All S3 document traffic is routed through the NAT Gateway and charged as NAT data processing.
- No VPC flow logs are enabled, so there is no network-level record of traffic to or from this environment.
- The data subnets have no internet route, and the database is not publicly accessible.
- The environment is entirely within `ap-southeast-2`; nothing is replicated to another region.

## 6. References

- Enrolline Cloud Architecture — Baseline Design — the design under which this topology was built
- Enrolline Infrastructure Specifications — itemised component specifications
- Enrolline Operational Costing — the running cost of this deployment
- Network Diagram — the wider YAT topology
