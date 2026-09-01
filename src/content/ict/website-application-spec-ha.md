---
title: 'Website Specification'
description: 'Functional and technical specification of the YAT public website (marketing site, course catalogue, and online enquiry / application intake) as cloud-hosted on AWS and hardened to Multi-AZ high availability — functions, traffic, data, integrations, service levels, accessibility, and data residency.'
appearsIn:
  - s1-cl2-at1
  - s1-cl2-at2
order: 10
---

## Document control

| | |
|---|---|
| Document title | YAT Public Website — Specification |
| Document owner | Sam Walker, ICT Manager |
| Business owner | Dana Mercer, Marketing & Admissions Manager |
| Application | Public website + open-source PHP / MySQL content management system (LAMP stack) |
| Review cycle | Annual, or on material change to the website or its hosting |
| Classification | Internal — ICT, Marketing & Admissions, and engaged consultants on signed MSA |

## 1. Overview

YAT operates a **public website** — its marketing site, course catalogue, and online **enquiry / application intake**. It is YAT's public shopfront and the front door for prospective students.

The website runs on an **open-source PHP / MySQL content management system (CMS)** on a **LAMP stack**, hosted on AWS in the Sydney (`ap-southeast-2`) Region. It was YAT's **first cloud system**, migrated from on-premises hosting in 2023 as a deliberately low-risk pilot, and has since been **hardened to Multi-AZ high availability** — a load-balanced, auto-scaling web tier across two Availability Zones, a Multi-AZ Amazon RDS for MySQL database with an automatic-failover standby, and media served from object storage. Cross-region disaster recovery and global serving are not yet in place. The business owner is **Marketing & Admissions**; **YAT ICT** operates the infrastructure, with MTS available under a support arrangement.

## 2. Functions

### 2.1 Functions used by the public (prospective students and visitors)

- Browse marketing content (about YAT, study areas, campus and contact information)
- Browse the course catalogue and course-detail pages
- Submit an **online enquiry / application intake** form
- Find how to apply, intake dates, and fees

### 2.2 Functions used by Marketing & Admissions staff

- Author and update website pages and the course catalogue through the CMS
- Receive, triage, and action submitted enquiries / applications
- Manage media assets (images, brochures, course PDFs)

### 2.3 Functions used by ICT staff

- Operate, patch, monitor, back up, and restore the website infrastructure and CMS
- Manage DNS and TLS for the public domain
- Support and troubleshoot (per the Baseline Design backup mechanisms)

## 3. Traffic and load

| Metric | Value |
|---|---|
| CMS author accounts | ~5 (Marketing & Admissions) |
| Typical public sessions (weekday) | ~300–600 / day |
| Peak public sessions (January–February enrolment-enquiry period) | ~3–4× typical |
| Enquiry / application submissions | ~20–60 / week typical; spikes at each intake |
| Out-of-intake pattern | light and steady; the one pronounced peak is the Jan–Feb enrolment-enquiry window |

*The public website is the one YAT system with a genuinely public, anonymous, internet-facing user base — distinct from the internal LMS and Accounting systems.*

## 4. Data stored

| Data category | Approx volume | Storage location | Notes |
|---|---|---|---|
| Page content and course catalogue | ~0.3 GB | Amazon RDS (MySQL) | Authored in the CMS by Marketing |
| Uploaded media (images, brochures, course PDFs) | ~5 GB | Amazon S3 | Served from object storage, not instance disk, so every instance serves the same media; growing ~1 GB / year |
| Enquiry / application submissions (PII) | ~0.5 GB | Amazon RDS (MySQL) | Subject to Privacy Act 1988 + APPs |
| Web / access logs | ~1 GB rolling | CloudWatch | Operational logging |
| **Total data footprint (current)** | **~7 GB** | (across Amazon RDS, EC2 EBS, and Amazon S3 backups) | |

## 5. Authentication

- **Public pages require no authentication** — they are open to the internet over HTTPS.
- **CMS authoring** requires sign-in to the CMS by Marketing & Admissions authors, using the CMS's own account management (not integrated with campus Active Directory — the website is a separate, public-facing system).
- Administrative access to the underlying server is restricted to YAT ICT (and MTS during support), per the User Access Policy.

## 6. Integration points

| External system | Integration type | Direction | Purpose |
|---|---|---|---|
| Office 365 (email) | SMTP outbound | Website → O365 | Notify the Admissions team of new enquiry / application submissions |
| Student-administration intake process | Manual / batch forward | Website → student admin | Pass submitted enquiry / application records into the intake workflow |
| Public DNS + TLS | DNS records + certificate | n/a | Serve the public domain over HTTPS |

## 7. Reporting and export requirements

- Periodic enquiry / application volume summaries for Marketing & Admissions
- Ad-hoc content and catalogue updates per intake cycle
- (Web analytics beyond basic server logs are not configured on the pilot deployment.)

## 8. Browser and device support

- **Supported browsers (current):** Microsoft Edge (Chromium), Google Chrome, Mozilla Firefox, Apple Safari — last two major versions of each.
- **Mobile / tablet:** the public site is fully responsive; a large share of prospective-student traffic is mobile, so mobile rendering and the enquiry form are first-class.
- **Native apps:** none.

## 9. Service-level expectations

| Service-level metric | Current value | Note |
|---|---|---|
| Availability | ≥ 99.9% | Multi-AZ; tolerates instance and single-AZ failure with no manual intervention |
| RPO (acceptable data loss in incident) | ≤ 1 hour | Automated RDS backups with point-in-time restore |
| RTO (time to recover from a major outage) | ≤ 4 hours | Within the region. A loss of the whole Region is **not** yet covered — there is no second-Region fallback |
| Support response | Best-effort by YAT ICT (MTS available under support) | — |

*The website is YAT's public shopfront and is now **business-critical**: it is the enrolment front door for the India campus. In-region resilience is no longer the gap — the remaining exposures are the loss of the whole Region, and serving an international audience from a single Australian region.*

## 10. Backup and maintenance windows

- **Backup:** Amazon RDS automated daily backups with point-in-time-restore retention; nightly database and media snapshots to a private, versioned Amazon S3 bucket.
- **Maintenance window:** low-traffic overnight windows, by prior change-management notification.
- **Restrictions:** avoid maintenance during the January–February enrolment-enquiry peak except for severity-1 incidents.

## 11. Accessibility

As a **public-facing** website for an Australian RTO, the site is held to **WCAG 2.1 Level AA** conformance, consistent with YAT's obligations under the *Disability Discrimination Act 1992* (Cth) — a stronger public obligation than for YAT's internal staff systems.

## 12. Data residency

**The personal information captured in enquiry and application submissions must remain within Australia** to support compliance with the *Privacy Act 1988* and the Australian Privacy Principles (APP 8 — cross-border disclosure). The website is hosted in the AWS Australian region (`ap-southeast-2` Sydney).

## Related references

- Website Cloud Architecture — Baseline Design — the AWS environment, including backup mechanisms (§10)
- ICT Environment Overview — narrative description of the wider YAT environment
- Hardware / Software Inventory — itemised inventory, including the website's AWS resources
- ICT Strategic Plan — direction for the cloud transition the website pilot began
- Change Management Procedure (intranet policies) — change governance
- Privacy / Data Handling Policy (intranet policies) — data-residency obligations
- User Access Policy (intranet policies) — authentication and access-control requirements
