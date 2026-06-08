---
title: 'Website Infrastructure Specifications'
description: 'Specifications of the AWS-hosted YAT public website — compute, database, storage, network, and operating profile of the Multi-AZ HA-hardened deployment.'
appearsIn:
  - s1-cl2-at1
order: 11
---

## Document control

| | |
|---|---|
| Document title | Website Infrastructure Specifications |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the website infrastructure or its operating profile |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current specifications of the AWS-hosted YAT public website — compute, database, storage, network, and operating profile. It is the authoritative record for the website workload and the planning input for any work that touches it — capacity, availability, recoverability, or onward improvement.

## 2. Website description

YAT's public website — marketing site, course catalogue, and online enquiry / application intake — runs on an open-source PHP / MySQL content management system (CMS) on a LAMP stack, in AWS region `ap-southeast-2` (Sydney). Migrated from on-premises hosting in 2023, it has since been **hardened to Multi-AZ high availability**: a cross-AZ load balancer fronts an auto-scaling web tier across two Availability Zones, backed by a Multi-AZ database, with media served from object storage. Public traffic reaches the website over the Internet via HTTPS; the website is not connected to the campus network.

## 3. Infrastructure summary

| Attribute | Value |
|---|---|
| Workload type | Load-balanced, auto-scaling web / CMS tier across two AZs |
| AWS region | `ap-southeast-2` (Sydney) |
| Availability zones in use | `ap-southeast-2a` + `ap-southeast-2b` |
| Application OS | Linux (LAMP stack) |
| Database engine | Amazon RDS for MySQL (Multi-AZ) |
| Criticality | Public shopfront — now business-critical as the India-campus enrolment front-door |
| Availability posture | Tolerates instance and single-AZ failure with no manual intervention |
| Current deployment state | Multi-AZ HA (in-region). Cross-region DR and global serving are not yet in place |

## 4. Component specifications

### 4.1 Compute — ALB + Auto Scaling

| Attribute | Value |
|---|---|
| Load balancer | Internet-facing Application Load Balancer across `public-web-a` / `-b`; HTTPS:443; ACM certificate (TLS terminates at the ALB) |
| Instance family | General-purpose, small (e.g. `t3.small` / `t3.medium`) |
| OS / stack | Linux + Apache + PHP + the CMS (LAMP) |
| Auto Scaling Group | Across `private-app-a` / `-b`; min 2 (one per AZ); scales on CPU / request count |
| Placement | Private app subnets (no public IP); reached only via the ALB |

### 4.2 Database — Amazon RDS for MySQL

| Attribute | Value |
|---|---|
| Engine | Amazon RDS for MySQL |
| Instance class | General-purpose, small (e.g. `db.t3.small`) |
| Multi-AZ | Enabled — primary in `private-data-a`, synchronous standby in `private-data-b` |
| Failover | Automatic, typically under two minutes |
| Storage encryption | Enabled (AWS KMS) |
| Backup retention | 7 days, automated |

### 4.3 Storage

| Resource | Purpose | Configuration |
|---|---|---|
| Media bucket (S3) | Uploaded media (images, brochures, course PDFs) | Served from S3, not instance disk — every instance serves the same media; block public access; versioned |
| `yat-website-backups-…` (S3) | Nightly database and media backups | Versioned; private |

### 4.4 Network

| Attribute | Value |
|---|---|
| VPC CIDR | Separate website VPC, two AZs |
| Subnets | `public-web-a` / `-b` (ALB + NAT), `private-app-a` / `-b` (web tier), `private-data-a` / `-b` (RDS) |
| Internet | Internet Gateway; a NAT Gateway in each AZ for the private subnets' outbound traffic |
| Campus connectivity | None — the website is public-facing and independent of the campus network |
| Security groups | `sg-alb` (HTTPS from the internet) → `sg-app` (from `sg-alb`) → `sg-db` (MySQL from `sg-app` only) |

## 5. Usage patterns

- **Typical load:** light and steady for most of the year.
- **Seasonal peak:** the January–February enrolment-enquiry period drives the one pronounced traffic peak; the Auto Scaling Group scales the web tier to absorb it.
- **Off-peak:** minimal.
- **Annual data growth:** ~1 GB / year, dominated by uploaded media (images, brochures, course PDFs).

## 6. Capacity outlook

- **Compute / database.** The Auto Scaling Group and Multi-AZ database comfortably serve the current load, including the enrolment peak, and tolerate instance / AZ failure automatically; capacity and in-region resilience are no longer the constraint.
- **The remaining gaps.** Recovery from the loss of the whole **region** (cross-region disaster recovery) and **global serving** for an international audience are not yet addressed — they are the subject of the current website global-expansion work.

## 7. References

- Website Specification — functional and workload profile of the public website
- Website Cloud Architecture — HA-Hardened Design — design of the Multi-AZ website environment, including backup mechanisms
- Hardware / Software Inventory — wider inventory in which this workload sits
- Network Diagram — campus and AWS topology including the website's location
- ICT Strategic Plan — five-year ICT direction including the cloud transition the website pilot began
