---
title: 'Network Diagram'
description: 'Current-state network topology — campus on-premises services, the AWS-hosted LMS environment, and the public website, both deployed across two availability zones for resilience to single-AZ failure.'
appearsIn:
  - s1-cl2-at1
  - s1-cl2-at2
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

This document records the current-state network topology of the YAT environment. The LMS runs in the AWS Sydney region as a multi-tier web workload deployed across two availability zones for resilience to single-AZ failure. The LMS is reached from the YAT campus over the Internet (for end-user traffic) and over a Site-to-Site VPN (for back-office traffic such as LDAP authentication and ICT management). YAT's public website runs as a separate Multi-AZ deployment in the same region, reached by the public over the Internet and not connected to the campus network. The remainder of YAT's services continue to run on-premises at the Cremorne campus.

## 2. Topology overview

### 2.1 Campus network and LMS

![Network topology — YAT Cremorne campus plus AWS-hosted LMS (Multi-AZ across ap-southeast-2a and ap-southeast-2b); Site-to-Site VPN linking the two](/diagrams/network-at3-end-ha-hardened.drawio.svg)

*Figure 1 — the **campus network and the LMS environment**. Does not show the public website; for that see Figure 2. Downloads: [SVG](/diagrams/network-at3-end-ha-hardened.drawio.svg) · [draw.io source](/diagrams/network-at3-end-ha-hardened.drawio) (open and edit in [draw.io](https://app.diagrams.net/))*

The campus network is logically unchanged — two zones (Staff, Student) behind a redundant edge firewall, a staff-only VPN server for remote access, and the remaining on-prem servers (Domain Controllers, System Management, NAS) in their original locations. Ledgerline (Accounting) runs in AWS as an internal single-AZ workload reached over the Site-to-Site VPN — migrated from the decommissioned on-prem Application Services server; see its Infrastructure Specifications and the Accounting Cloud Architecture — Baseline Design.

The LMS runs in **AWS region `ap-southeast-2` (Sydney)** as a multi-tier web workload deployed across two availability zones (`ap-southeast-2a` and `ap-southeast-2b`):

- **Internet Gateway** for end-user traffic into the public web subnets.
- **Application Load Balancer** spanning both availability zones, fronting the LMS application instances and distributing traffic to healthy targets.
- **EC2 LMS application** in private app subnets in both availability zones, running on Windows Server 2016 with DOODLE — managed by a cross-AZ Auto Scaling Group.
- **Amazon RDS for MySQL — Multi-AZ deployment**, with a primary in `ap-southeast-2a` and a synchronously-replicated standby in `ap-southeast-2b`; automatic failover under two minutes.
- **NAT Gateways** in each availability zone for outbound internet from the corresponding private subnets.
- **VPN Gateway** terminating the Site-to-Site VPN from the YAT campus edge firewall; used for AD-LDAP traffic from the LMS application back to YAT campus Active Directory, and for ICT management traffic.
The hardening covers Availability-Zone failure within `ap-southeast-2`. There is **no** cross-Region copy of the database backups or the application data, so a sustained loss of the whole Region remains uncovered.

End-user LMS access from YAT staff and student desktops flows over the campus internet connection to the AWS Application Load Balancer. The Site-to-Site VPN is reserved for back-office traffic (LDAP, management).

### 2.2 YAT public website

The public website is an **independent deployment** in the same AWS Sydney region, in its own VPC, separate from the LMS environment above and not connected to the campus network. It is reached by the public over the Internet via HTTPS.

![YAT website architecture — HA-hardened Multi-AZ deployment in AWS Sydney: Internet Gateway, a cross-AZ Application Load Balancer, an Auto Scaling Group of EC2 (LAMP / CMS) instances across ap-southeast-2a and ap-southeast-2b, a Multi-AZ Amazon RDS for MySQL with synchronous standby, per-AZ NAT Gateways, and Amazon S3 for media and backups](/diagrams/website-ha-hardened.drawio.svg)

*Figure 2 — the **public website** architecture, HA-hardened across two availability zones. A separate deployment from the LMS shown in Figure 1. Downloads: [SVG](/diagrams/website-ha-hardened.drawio.svg) · [draw.io source](/diagrams/website-ha-hardened.drawio) (open and edit in [draw.io](https://app.diagrams.net/))*

Originally a single-AZ, single-instance pilot (2023), the website has since been **hardened to Multi-AZ high availability**:

- **Internet Gateway** into the public web subnets, and a **cross-AZ Application Load Balancer** on HTTPS:443 with an ACM certificate (TLS terminates at the load balancer).
- **An Auto Scaling Group** of EC2 instances running the LAMP stack and the CMS across `private-app-a` and `private-app-b` — minimum 2 (one per AZ), maximum 100, scaling on CPU and request count.
- **Amazon RDS for MySQL — Multi-AZ**, primary in `private-data-a` with a synchronous standby in `private-data-b`; automatic failover typically under two minutes.
- **Amazon S3** for uploaded media, served to every instance rather than from instance disk, and for nightly database and media backups — held in the one region.
- **NAT Gateways** in each availability zone for the private subnets' outbound traffic.

The single-instance points of failure of the original pilot have been removed. Global serving / edge delivery, cross-region DR, and the audit/access-log microservice are not yet in place — they are the current website expansion engagement.

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
| Application Load Balancer | `public-web-a` + `public-web-b` | Cross-AZ | HTTP:80 → LMS target group across both AZs |
| NAT Gateway (×2) | `public-web-a` and `public-web-b` | One per AZ | Per-AZ outbound for the corresponding private subnets |
| EC2 — LMS application | `private-app-a` + `private-app-b` (10.0.11.0/24, 10.0.12.0/24) | Cross-AZ ASG (min=2) | Windows Server + DOODLE; capacity in both AZs |
| RDS for MySQL — primary | `private-data-a` (10.0.21.0/24) | Multi-AZ | Synchronous replication to standby in AZ-b |
| RDS for MySQL — standby | `private-data-b` (10.0.22.0/24) | Multi-AZ | Auto-failover under two minutes |
| CloudWatch alarms | n/a | — | Availability and capacity alarms on the load balancer and the database, notifying the `yat-lms-alerts` SNS topic |

### 3.3 AWS components (Website — HA-hardened, Multi-AZ)

| Component | Subnet / Tier | Redundancy | Notes |
|---|---|---|---|
| Application Load Balancer — Website | `public-web-a` + `public-web-b` | Cross-AZ | HTTPS:443 → website target group across both AZs |
| EC2 — Website | `private-app-a` + `private-app-b` | Cross-AZ ASG (min=2, max=100) | LAMP / CMS; capacity in both AZs |
| RDS for MySQL — Website | `private-data-a` / `-b` | Multi-AZ | Primary + synchronous standby; automatic failover |
| S3 — website media + backups | n/a (regional) | Durable | Media served from S3 (offloaded from instance disk); nightly backups |

The website has been hardened to Multi-AZ alongside the LMS.

## 4. Single points of failure

The current topology has been hardened against single-AZ failure for the LMS environment. The remaining single-instance components are outside the LMS migration scope:

**Resolved by the LMS migration and HA hardening:**

- The on-prem LMS server SPOF has been resolved — the LMS is no longer single-instance on aged on-prem hardware.
- AWS RDS, EC2, ALB, and NAT — previously single-AZ at the post-cutover baseline — have been hardened across two availability zones.
- The website's single-AZ single-instance points of failure have likewise been removed by its HA hardening (cross-AZ ALB + ASG + Multi-AZ RDS + media on S3).

**Remaining single-instance components (outside LMS migration scope):**

- **Site-to-Site VPN — single tunnel endpoint** at the campus end. AD-LDAP traffic from the LMS back to the campus relies on this link. Loss of the VPN does not stop end-user LMS access (that flows over the public internet) but does prevent fresh AD authentications from the cloud LMS until restored.
- **VPN server (campus, staff remote access)** — unchanged from prior topology.
- **Ledgerline (Accounting, AWS Sydney)** — migrated from the decommissioned on-prem Application Services server; single-AZ baseline (single Availability Zone + non-Multi-AZ database). An internal, business-hours system; resilience is a candidate for future improvement, outside the LMS migration scope.
- **System Management server** — unchanged from prior topology.

## 5. References

- LMS Cloud Architecture — Baseline Design — the design under which the AWS LMS environment was built- High-Availability Database Requirements — HA requirements the LMS database deployment was hardened to
- ICT Environment Overview — narrative description of the wider YAT environment
- Hardware / Software Inventory — itemised inventory by role and zone
- ICT Strategic Plan — direction for the LMS migration and ongoing cloud transition
