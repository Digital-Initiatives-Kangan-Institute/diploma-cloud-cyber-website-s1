---
title: 'Network Diagram'
description: 'Current-state network topology — two separate AWS deployments: the LMS environment, hardened across two availability zones, and the public website, still on its single-AZ 2023 baseline; plus the campus on-premises services.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 6
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 PC 2.1] Review architecture of traditional multi-tier web application in non-cloud environment and identify high availability requirements'
  - '[ICTCLD502 PC 2.2] Identify any single points of failure'
---

## Document control

| | |
|---|---|
| Document title | Network Diagram — YAT Cremorne Campus and AWS Sydney |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material network change |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This document records the current-state network topology of the YAT environment. YAT runs **two separate deployments** in the AWS Sydney region, and they are not the same shape:

- **The LMS environment** (§2.1) — a multi-tier web workload deployed across two availability zones for resilience to single-AZ failure, reached from the campus over the Internet (end-user traffic) and over a Site-to-Site VPN (back-office traffic such as LDAP authentication and ICT management).
- **The public website** (§2.2) — an independent single-Availability-Zone deployment, unchanged since its 2023 migration and not HA-hardened.

Each has its own diagram below. The remainder of YAT's services continue to run on-premises at the Cremorne campus.

## 2. Topology overview

### 2.1 Campus network and LMS

![Network topology — YAT Cremorne campus plus AWS-hosted LMS (Multi-AZ across ap-southeast-2a and ap-southeast-2b); Site-to-Site VPN linking the two](/diagrams/network-at3-end-cl3.drawio.svg)

*Figure 1 — the **campus network and the LMS environment**. Does not show the public website; for that see Figure 2. Downloads: [SVG](/diagrams/network-at3-end-cl3.drawio.svg) · [draw.io source](/diagrams/network-at3-end-cl3.drawio) (open and edit in [draw.io](https://app.diagrams.net/))*

The campus network is logically unchanged — two zones (Staff, Student) behind a redundant edge firewall, a staff-only VPN server for remote access, and the remaining on-prem servers (Domain Controllers, System Management, NAS) in their original locations. Two business applications run in AWS as single-AZ workloads, both migrated from the decommissioned on-prem Application Services server: **Enrolline** (Student Records) in its own VPC `enrolline-vpc` (`10.30.0.0/16`), and **Ledgerline** (Accounting) reached over the Site-to-Site VPN. See the Enrolline Network Diagram and Infrastructure Specifications, and the Accounting System Infrastructure Specifications.

The LMS runs in **AWS region `ap-southeast-2` (Sydney)** as a multi-tier web workload spanning two availability zones (`ap-southeast-2a` and `ap-southeast-2b`): a cross-AZ Application Load Balancer in front of an Auto Scaling Group of EC2 application instances, over an Amazon RDS for MySQL Multi-AZ deployment with automatic failover, plus per-AZ NAT Gateways and a cross-Region S3 backup copy. End-user traffic reaches the load balancer over the Internet; the Site-to-Site VPN carries only back-office traffic (AD-LDAP authentication and ICT management) back to the campus.

### 2.2 YAT public website

The public website is an **independent deployment** in the same AWS Sydney region, separate from the LMS environment above and not connected to the campus network. It is reached by the public over the Internet via HTTPS.

![YAT website architecture — single-Availability-Zone deployment in AWS Sydney: Internet Gateway, a single EC2 (LAMP / CMS) instance in public-web-a, a single-AZ Amazon RDS for MySQL in private-data-a, and Amazon S3 for nightly backups](/diagrams/website-baseline-single-az.drawio.svg)

*Figure 2 — the **public website** architecture, single-AZ. A separate deployment from the LMS shown in Figure 1. Downloads: [SVG](/diagrams/website-baseline-single-az.drawio.svg) · [draw.io source](/diagrams/website-baseline-single-az.drawio) (open and edit in [draw.io](https://app.diagrams.net/))*

Migrated from on-premises hosting in 2023 as YAT's first cloud project, it runs in a **single Availability Zone** (`ap-southeast-2a`) and has **not** been HA-hardened the way the LMS has:

- **Internet Gateway** into `public-web-a` (`10.0.1.0/24`) — no load balancer in front of the web tier.
- **A single EC2 instance** running the LAMP stack and the CMS, on an Elastic IP, with site media held on local EBS. No Auto Scaling Group.
- **A single-AZ Amazon RDS for MySQL** in `private-data-a` (`10.0.21.0/24`) — no standby, no automatic failover.
- **Amazon S3** for nightly database and media backups, held in the one region — no cross-Region copy and no disaster-recovery capability.

Its single instance, single availability zone, and single database each remain a point of failure: the loss of any one of them takes the public website offline.

## 3. Component summary

### 3.1 On-premises components

| Component | Zone | Redundancy | Notes |
|---|---|---|---|
| Edge router / firewall | Perimeter | Redundant | No single point of failure at the network plumbing layer |
| VPN server | Perimeter | Single — SPOF | Staff-only remote access |
| Site-to-Site VPN endpoint | Perimeter | Single | Connects campus to AWS VPC |
| Domain Controllers (×2) | Staff | Redundant, load-shared | AD, DHCP, DNS — serve both zones; AD also serves the cloud LMS over the Site-to-Site VPN |
| System Management server | Staff | Single — non-critical | Runs nightly backups for on-prem systems |
| NAS — Staff zone | Staff | RAID-5 (disk-level only) | |
| NAS — Student zone | Student | RAID-5 (disk-level only) | |
| Staff desktops | Staff | n/a | Windows 10 Enterprise, AD-joined |
| Student desktops | Student | n/a | Windows 10 Enterprise + Office 365 Education |
| Multifunction printers | Staff | n/a | Designated staff locations |
| Classroom printers | Student | n/a | One per classroom |

### 3.2 AWS components (LMS environment)

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| Internet Gateway | VPC edge | AWS-managed | End-user traffic entry |
| VPN Gateway | VPC edge | Single endpoint | Terminates the Site-to-Site VPN from the campus |
| Application Load Balancer | `public-web-a` + `public-web-b` | Cross-AZ | HTTPS:443 → LMS target group across both AZs |
| NAT Gateway (×2) | `public-web-a` and `public-web-b` | One per AZ | Per-AZ outbound for the corresponding private subnets |
| EC2 — LMS application | `private-app-a` + `private-app-b` (10.0.11.0/24, 10.0.12.0/24) | Cross-AZ ASG (min=2) | Windows Server 2016 + DOODLE; capacity in both AZs |
| RDS for MySQL — primary | `private-data-a` (10.0.21.0/24) | Multi-AZ | Synchronous replication to standby in AZ-b |
| RDS for MySQL — standby | `private-data-b` (10.0.22.0/24) | Multi-AZ | Auto-failover under two minutes |
| S3 — LMS attachments | n/a (regional) | Cross-Region copy | Versioned; lifecycle to Glacier Deep Archive; cross-Region backup for DR |

### 3.3 AWS components (Website — separate 2023 pilot, not HA-hardened)

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| EC2 — Website | `public-web-a` (single-AZ) | Single — SPOF | LAMP / CMS; serves the public website |
| RDS for MySQL — Website | `private-data-a` (single-AZ) | Single — SPOF | Website CMS database; no standby |
| S3 — website backups | n/a (regional) | Single region | Nightly database and media backups; no cross-Region copy |

Unlike the LMS environment above, the website has not been hardened — it remains the single-AZ 2023 pilot deployment.

## 4. Single points of failure

The current topology has been hardened against single-AZ failure for the LMS environment. The remaining single-instance components are outside the LMS migration scope:

**Resolved by the LMS migration and HA hardening:**

- The on-prem LMS server SPOF has been resolved — the LMS is no longer single-instance on aged on-prem hardware.
- AWS RDS, EC2, ALB, and NAT — previously single-AZ at the post-cutover baseline — have been hardened across two availability zones.

**Remaining single-instance components (outside LMS migration scope):**

- **Site-to-Site VPN — single tunnel endpoint** at the campus end. AD-LDAP traffic from the LMS back to the campus relies on this link. Loss of the VPN does not stop end-user LMS access (that flows over the public internet) but does prevent fresh AD authentications from the cloud LMS until restored.
- **VPN server (campus, staff remote access)** — unchanged from prior topology.
- **Enrolline (Student Records, AWS Sydney)** — migrated from the decommissioned on-prem Application Services server; single-AZ baseline in its own VPC (single Availability Zone, non-Multi-AZ database, single NAT Gateway). A staff-facing system whose load concentrates in the intake and census windows; resilience is a candidate for future improvement, outside the LMS migration scope.
- **Ledgerline (Accounting, AWS Sydney)** — migrated from the decommissioned on-prem Application Services server; single-AZ baseline (single Availability Zone + non-Multi-AZ database). An internal, business-hours system; resilience is a candidate for future improvement, outside the LMS migration scope.
- **System Management server** — unchanged from prior topology.
- **Website (AWS, Sydney)** — the separate 2023 website pilot has **not** been HA-hardened: its single EC2 instance, Availability Zone, and RDS database remain single points of failure, with no DR. Outside the LMS migration scope.

## 5. References

- LMS Cloud Architecture — Baseline Design — the design under which the AWS LMS environment was built
- Website Cloud Architecture — Baseline Design — the design under which the AWS-hosted website was built (2023)
- High-Availability Database Requirements — HA requirements the LMS database deployment was hardened to
- ICT Environment Overview — narrative description of the wider YAT environment
- Hardware / Software Inventory — itemised inventory by role and zone
- ICT Strategic Plan — direction for the LMS migration and ongoing cloud transition
