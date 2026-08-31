---
title: 'Hardware / Software Inventory'
description: 'Current-state inventory of YAT campus servers, storage, endpoints, network equipment, software licensing, and AWS-hosted LMS resources.'
appearsIn:
  - s1-cl1-at3
order: 7
uocReferences:
  - '[ICTICT517 AC 5] Information on current ICT systems and practices in the organisation including operating systems, hardware, and security'
  - '[ICTCLD502 AC 5] specific requirements and industry standards (the products align to)'
---

## Document control

| | |
|---|---|
| Document title | Hardware / Software Inventory — YAT Cremorne Campus and AWS Sydney |
| Document owner | Sam Walker, ICT Manager |
| Prepared by | YAT ICT |
| Review cycle | Annual, or on material change to the environment |
| Classification | Internal — ICT, and engaged consultants on signed MSA |

## 1. Purpose

This inventory records YAT's current ICT assets — campus servers, storage, endpoints, network equipment, software licensing, and the AWS-hosted LMS and website resources. It supports ICT planning, audit, change-management impact assessment, and the engagement of external consultants where their work touches the YAT environment.

## 2. Campus server inventory

| Server role | Quantity | Operating system | Notes |
|---|---:|---|---|
| Domain Controllers (AD / DHCP / DNS) | 2 | Windows Server 2016 | Load-shared across both zones; no single-system outage causes service outage |
| System Management and Backups | 1 | Windows Server 2016 | Single instance, explicitly non-HA. Runs nightly backups for on-prem systems |
| VPN | 1 | (purpose-built appliance / server) | Staff-only remote access; single instance |

## 3. Campus storage inventory

| Device | Quantity | Zone | Configuration |
|---|---:|---|---|
| NAS — staff zone | 1 | Staff | RAID-5, hot-swap disks |
| NAS — student zone | 1 | Student | RAID-5, hot-swap disks |

## 4. AWS resources

### 4.1 LMS environment

The LMS workload is deployed in AWS region `ap-southeast-2` (Sydney). The following resources comprise the LMS environment:

| Resource | Tier / Subnet | Configuration | Notes |
|---|---|---|---|
| VPC | n/a | `10.0.0.0/16` | DNS hostnames and resolution enabled |
| Subnets | n/a | `public-web-a` (10.0.1.0/24, 2a), `public-web-b` (10.0.2.0/24, 2b), `private-app-a` (10.0.11.0/24, 2a), `private-data-a` (10.0.21.0/24, 2a), `private-data-b` (10.0.22.0/24, 2b) | The two `-b` subnets carry nothing; they exist because the load balancer and the database subnet group each require two zones |
| Internet Gateway | VPC edge | AWS-managed | End-user traffic entry |
| VPN Gateway | VPC edge | Single endpoint | Terminates the Site-to-Site VPN from the campus |
| NAT Gateway | `public-web-a` | Single-AZ | Outbound internet for the private app subnet |
| Application Load Balancer | `public-web-a` + `public-web-b` | Spans both zones | HTTP:80 → LMS target group; health check HTTP on `/` |
| EC2 instances — LMS application | `private-app-a` | `t3.micro`/`t3.small`, Windows Server + DOODLE; `gp3` 30 GB root + 8 GB data; Auto Scaling Group min=1, max=2 | All capacity in one AZ |
| Amazon RDS for MySQL | `private-data-a` | `db.t3.micro`/`db.t3.small`; `gp3` 20 GB; single-AZ, no standby; KMS-encrypted; 7-day automated backup retention | Subnet group spans `private-data-a` + `private-data-b` |
| CloudWatch alarms | n/a | Two: unhealthy target count on the load balancer, and low free storage on the database | Notify the `yat-lms-alerts` SNS topic |

### 4.2 Website (separate 2023 pilot)

YAT's public website runs in the same AWS Sydney region as a separate single-Availability-Zone deployment, migrated from on-premises hosting in 2023 and not HA-hardened:

| Resource | Tier / Subnet | Configuration | Notes |
|---|---|---|---|
| VPC (Website) | n/a | Separate website VPC | Single-AZ; independent of the LMS environment |
| Internet Gateway (Website) | VPC edge | AWS-managed | Public inbound to the website over HTTPS |
| EC2 — Website | `public-web-a` | LAMP stack + CMS; single instance with an Elastic IP | The website; single point of failure |
| Amazon RDS for MySQL — Website | `private-data-a` | Single-AZ; KMS-encrypted | Website CMS database; single point of failure |
| Amazon S3 — Website backups | n/a (regional) | Versioned; private | Nightly database and media backups |

### 4.3 Ledgerline (Accounting) environment

Ledgerline runs as an internal single-AZ workload in the same Sydney region — EC2 (Windows Server 2016 + Ledgerline) behind an internal Application Load Balancer, Amazon RDS for PostgreSQL (single-AZ), and S3 for backups; reached from the campus over the Site-to-Site VPN. See the Accounting System Infrastructure Specifications and the Accounting Cloud Architecture — Baseline Design.

## 5. Endpoint inventory

| Endpoint | Approximate quantity | OS / Edition | Notes |
|---|---:|---|---|
| Staff desktops | ~25 | Windows 10 Enterprise | AD-joined |
| Student desktops | ~80 | Windows 10 Enterprise + Office 365 Education | AD-joined; lab machines provisioned with additional memory and storage where required |
| Multifunction printers | ~5 | n/a | Designated staff locations |
| Classroom printers | ~15 | n/a | One per classroom |

## 6. Network equipment

| Item | Quantity | Notes |
|---|---:|---|
| Edge router / firewall | 2 (redundant) | No single point of failure at the network plumbing layer |
| Site-to-Site VPN endpoint (campus) | 1 | Connects the campus edge to the AWS VPN Gateway |
| LAN distribution switches — Staff zone | (per zone topology) | Connect servers, staff desktops, NAS, multifunction printers |
| LAN distribution switches — Student zone | (per zone topology) | Connect student desktops, classroom printers, Student-zone NAS |
| Wireless access points | (campus-wide coverage) | Staff and student wifi served on separated SSIDs |

## 7. Software and licensing inventory

| Product | Vendor | Licence type | Quantity / coverage |
|---|---|---|---|
| Windows Server 2016 (campus) | Microsoft | Per-server licensing | 3 campus servers (DC ×2, System Management) |
| Windows Server 2016 (AWS EC2 — Ledgerline) | Microsoft | License-included via AWS EC2 pricing | Ledgerline application instance (single-AZ) |
| PostgreSQL (via Amazon RDS — Ledgerline) | AWS managed | RDS PostgreSQL pricing (single-AZ) | Ledgerline database |
| Windows Server 2016 (AWS EC2) | Microsoft | License-included via AWS EC2 pricing | LMS application instances in AWS |
| Windows 10 Enterprise | Microsoft | Per-device licensing | ~105 desktops |
| Active Directory 2016 | Microsoft | Included with Server 2016 | n/a |
| Office 365 Education edition | Microsoft | Per-student site licence | Student population |
| Office 365 (Email, staff and students) | Microsoft | Mailbox-licensed SaaS, Azure-hosted | Staff and student mailboxes |
| DOODLE (Diverse Object-Orientated Dynamic Learning Environment) | Open source — GNU GPL | Free / no licence cost | 1 deployment (AWS-hosted) |
| MySQL (via Amazon RDS) | AWS managed | RDS pricing | LMS database |
| PHP-based CMS (website) | Open source | Open source (GPL-family) | 1 deployment (AWS-hosted) |
| MySQL (via Amazon RDS — website) | AWS managed | RDS pricing | Website CMS database |

## 8. Facilities

| Item | Notes |
|---|---|
| Campus server room | Physically secured, air-conditioned, UPS-protected against power loss and electrical surges |
| Campus network plumbing | Redundant at the edge — no single point of failure at the network layer |
| AWS region `ap-southeast-2` | AWS-managed under the Shared Responsibility Model — AWS is responsible for the security of the regions, availability zones, hardware, and hypervisor |

## 9. References

- Network Diagram — zone layout, topology, and AWS-hosted LMS environment
- ICT Environment Overview — narrative description of the current environment
- LMS Cloud Architecture — Baseline Design — design of the AWS LMS environment
- Website Cloud Architecture — Baseline Design — design of the AWS-hosted website (2023)
- LMS Server Specifications and Current Status — record of the LMS workload
- User Access Policy (intranet policies) — authoritative source for role-based access matrix
