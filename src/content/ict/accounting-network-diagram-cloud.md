---
title: 'Accounting System Network Diagram'
description: 'Network topology of the AWS-hosted YAT Accounting System (Ledgerline) — the single-AZ Sydney deployment, its subnets, and where each component sits.'
appearsIn:
  - s1-cl1-at3
order: 16
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.1] Review architecture of traditional multi-tier web application in non-cloud environment and identify high availability requirements'
  - '[ICTCLD502 PC 2.2] Identify any single points of failure'
---

## Document control

| | |
|---|---|
| Document title | Network Diagram — YAT Accounting System (Ledgerline), AWS Sydney |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material network change |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current-state network topology of the YAT Accounting System (Ledgerline) following its migration to AWS. Ledgerline is the finance and administrative system used by YAT's business office. It was migrated from the decommissioned on-premises Application Services server and now runs in the AWS Sydney region as a single-Availability-Zone workload.

It is a separate deployment from the LMS environment — its own VPC, its own addressing, and its own operating profile. For the LMS topology see the Network Diagram; for Ledgerline's component specifications see the Accounting System Infrastructure Specifications.

## 2. Topology overview

![Ledgerline network topology — the AWS-hosted Accounting System as a single-AZ workload in ap-southeast-2, with empty second-zone subnets held for the load balancer and database subnet group](/diagrams/network-accounting-baseline-singleaz.drawio.svg)

*Downloads: [SVG](/diagrams/network-accounting-baseline-singleaz.drawio.svg) · [draw.io source](/diagrams/network-accounting-baseline-singleaz.drawio) (open and edit in [draw.io](https://app.diagrams.net/))*

Ledgerline runs in **AWS region `ap-southeast-2` (Sydney)** in its own VPC, `ledgerline-vpc` (`10.20.0.0/16`):

- **Internet Gateway** for staff traffic into the public subnet.
- **Application Load Balancer** spanning `ledgerline-public-a` and `ledgerline-public-b`, fronting the Ledgerline application instance over **HTTP:80**. A load balancer cannot be created in a single Availability Zone, so it was given subnets in both from the outset.
- **EC2 — Ledgerline application** in `ledgerline-app-a`, running on Amazon Linux, managed by an Auto Scaling group with all capacity in a single zone.
- **Amazon RDS for PostgreSQL** in `ledgerline-data-a`, single-AZ with no standby. Its subnet group spans `ledgerline-data-a` and `ledgerline-data-b`, because a database subnet group likewise requires two zones.
- **NAT Gateway** in `ledgerline-public-a`, providing outbound internet from the application subnet for package and update fetches.

There is no VPN gateway in this VPC — Ledgerline is reached over the internet, not over the campus Site-to-Site VPN.

## 3. Component summary

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| Internet Gateway | VPC edge | AWS-managed | Staff traffic entry |
| Application Load Balancer | `ledgerline-public-a` + `ledgerline-public-b` | Spans both zones | HTTP:80 → Ledgerline target group |
| NAT Gateway | `ledgerline-public-a` | Single-AZ | Outbound for the application subnet |
| EC2 — Ledgerline application | `ledgerline-app-a` | Single-AZ ASG | Amazon Linux |
| RDS for PostgreSQL | `ledgerline-data-a` | Single-AZ — not HA | No standby; recovery via point-in-time restore. Subnet group spans `ledgerline-data-a` + `ledgerline-data-b` |

The VPC's five subnets:

| Subnet | CIDR | Zone | Carries |
|---|---|---|---|
| `ledgerline-public-a` | 10.20.1.0/24 | `ap-southeast-2a` | Load balancer, NAT Gateway |
| `ledgerline-public-b` | 10.20.2.0/24 | `ap-southeast-2b` | Load balancer only — nothing else is placed here |
| `ledgerline-app-a` | 10.20.11.0/24 | `ap-southeast-2a` | Ledgerline application instances |
| `ledgerline-data-a` | 10.20.21.0/24 | `ap-southeast-2a` | PostgreSQL database |
| `ledgerline-data-b` | 10.20.22.0/24 | `ap-southeast-2b` | Nothing — required by the database subnet group |

There is no application subnet in `ap-southeast-2b`.

## 4. Single points of failure

- **RDS database — single-AZ.** A single instance in one zone with no standby. Recovery depends on point-in-time restore.
- **EC2 application — single-AZ.** Auto Scaling can replace an instance, but all capacity is in `ledgerline-app-a`, and there is no application subnet in the second zone for it to expand into.
- **NAT Gateway — single-AZ.** It is in `ledgerline-public-a` only, so an outage in that zone removes outbound internet for the application tier.

The Application Load Balancer is **not** in this list: it was created across `ledgerline-public-a` and `ledgerline-public-b` and already spans both zones.

## 5. References

- Accounting System Cloud Architecture — Baseline Design — the design under which this topology was built
- Accounting System Infrastructure Specifications — itemised component specifications
- Accounting System Operational Costing — the running cost of this deployment
- Network Diagram — the wider YAT topology, including the LMS environment
