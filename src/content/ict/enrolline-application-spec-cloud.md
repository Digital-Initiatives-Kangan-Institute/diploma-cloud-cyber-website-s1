---
title: 'Enrolline Application Specification'
description: 'Functional and technical specification of the YAT student records and enrolment management system (Enrolline) — functions, user load, data, integrations, SLAs, and data residency — as deployed in AWS Sydney (single-AZ).'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 20
uocReferences:
  - '[ICTCLD504 AC 3] information and data sources required to design and implement cloud infrastructure'
  - '[ICTCLD504 PC 1.1] Identify and review business’s cloud architecture design'
  - '[ICTCLD504 PC 2.1] Evaluate and confirm performance metrics for business applications according to business needs'
---

## Document control

| | |
|---|---|
| Document title | YAT Student Records & Enrolment Management System — Application Specification |
| Document owner | Sam Walker, ICT Manager |
| Business owner | Jess Tran, YAT Registrar |
| Application | Enrolline Student Management Suite (commercial, proprietary) |
| Review cycle | Annual, or on material change to the application stack or operating model |
| Classification | Internal — ICT, Student Administration, Compliance, and engaged consultants on signed MSA |

## 1. Overview

YAT runs **Enrolline Student Management Suite** as its student records and enrolment management system. Enrolline is a **commercial product**, licensed per named user, with vendor support provided under a paid annual support and maintenance contract. It is a long-standing system, **in service at YAT since 2011**, and runs on Linux with a PostgreSQL database. The vendor supports it on a managed PostgreSQL service, including a high-availability deployment with an automatic-failover standby.

Enrolline is supplied by the same vendor as **Ledgerline**, YAT's finance and office-administration system, and the two integrate. The division between them is firm: **Ledgerline is the general ledger** — accounts payable and receivable, the books, statutory financial reporting. **Enrolline is student administration** — enrolments, student records, USI management, fee invoicing and receipting, and AVETMISS compliance reporting. Enrolline raises and receipts student fees and posts summary transactions across to Ledgerline; that posting is the only integration between them.

Enrolline is equally **not** the Learning Management System. The LMS (DOODLE) delivers teaching, course content, and student submissions. Enrolline holds the enrolment record that entitles a student to be in the LMS, and provisions them into it.

Migrated from its former on-premises server under an earlier engagement, Enrolline now runs in **AWS region `ap-southeast-2` (Sydney)**, with its workload in a single Availability Zone: the application on **EC2 (Amazon Linux 2023)** in an Auto Scaling group behind an **internal Application Load Balancer**, with the database on **Amazon RDS for PostgreSQL** and document attachments in **Amazon S3**. It is a staff-facing back-office system: students do not log into Enrolline directly. Student-submitted applications arrive through the public website and are processed by staff in Enrolline.

## 2. Functions

### 2.1 Functions used by the admissions and enrolments team

- Applications intake, assessment, and offer management
- Enrolment creation, variation, withdrawal, and deferral
- Unique Student Identifier (USI) verification and record matching
- Course, unit, and cluster enrolment against the training product
- Census-date processing and enrolment confirmation
- Fee schedule application, invoicing, and receipting

### 2.2 Functions used by student services

- Maintain student demographic and contact records
- Record and manage support plans, access arrangements, and special consideration
- Manage credit transfer and recognition-of-prior-learning records
- Issue statements of attainment, qualifications, and transcripts

### 2.3 Functions used by teaching and faculty administration

- Class and group allocation against enrolments
- Record unit outcomes and results
- View student enrolment status and progression

### 2.4 Functions used by the compliance and reporting area

- AVETMISS data preparation, validation, and NCVER submission
- Funding and contract reporting extracts
- Audit evidence extraction for regulatory review
- Retention and archival management of student records

### 2.5 Functions used by ICT staff

- Administer accounts (via Active Directory integration)
- Configure roles, approval workflows, the academic calendar, and the training-product catalogue
- Support, troubleshoot, and restore (per the Backup and Retention Policy)

## 3. User population and concurrent load

| Metric | Value |
|---|---|
| Total user accounts | ~120 staff (≈14 admissions/enrolments, ≈22 student services, ≈40 teaching/faculty administration, ≈8 compliance/reporting, ≈36 management/general with limited or read-only access) |
| Typical concurrent users (business hours, out of intake) | ~25–40 |
| Peak concurrent users (intake enrolment window, census processing) | ~90–110 |
| Out-of-hours concurrent users | negligible — system is effectively idle overnight and at weekends |
| Peak pattern | predictable and sharp: **two annual intakes (February and July)**, each with a ~3-week enrolment window, followed by census-date processing ~4 weeks later; plus the annual AVETMISS submission window in January |

*The load profile is the distinguishing feature of this system. Out of intake it is a quiet back-office workload; during an intake enrolment window the concurrent user count roughly triples and stays there for three weeks. The peaks are **scheduled and known in advance** — they sit on the academic calendar — which is what makes capacity for them a design question rather than a forecasting one.*

## 4. Data stored

| Data category | Approx volume | Storage location | Notes |
|---|---|---|---|
| Student records and enrolments | ~11 GB | Amazon RDS (PostgreSQL) | **30-year retention** — NVR Standards / ASQA student and assessment records |
| Student fee invoicing and receipting | ~4 GB | Amazon RDS (PostgreSQL) | 7-year retention (ATO / tax law); posts to Ledgerline |
| USI and identity-evidence records (PII) | ~2 GB | Amazon RDS (PostgreSQL) | Subject to Privacy Act 1988 + APPs; USI Registry matching data |
| Training product, unit, and results data | ~3 GB | Amazon RDS (PostgreSQL) | Results underpin issued qualifications — 30-year retention |
| Document attachments (ID evidence, prior qualifications, USI evidence, support plans — scanned) | ~26 GB | Amazon S3 | Growing ~6 GB / year |
| Audit logs (application internal) | ~2 GB | Amazon RDS (PostgreSQL) | Retained for regulatory audit |
| **Total data footprint (current)** | **~48 GB** | | Growing ~8 GB / year |

*Note the shape: the relational database is the **system of record**, and S3 is an attachment store hanging off it. Enrolline uses object storage; it is not an object-storage-dependent system in the way the public website is.*

## 5. Authentication and single sign-on

- Integrated with Active Directory via LDAP bind, reached over the Site-to-Site VPN from the AWS environment back to campus AD.
- Single sign-on from AD-joined campus desktops via Integrated Windows Authentication.
- Off-campus access requires interactive sign-in (AD credentials + MFA for all records-editing and approval roles, per the User Access Policy).
- **Students have no Enrolline accounts.** Student-facing application and enquiry forms are served by the public website and land in Enrolline as work items for staff.

## 6. Integration points

| External system | Integration type | Direction | Purpose |
|---|---|---|---|
| Active Directory 2016 | LDAP bind (over Site-to-Site VPN) | Enrolline → AD | Authentication |
| Learning Management System (DOODLE) | Scheduled batch | Enrolline → LMS | Provision enrolled students into their course spaces; withdraw on cancellation |
| Ledgerline Finance & Office Suite | Scheduled batch journal | Enrolline → Ledgerline | Post student fee invoicing and receipting to the general ledger |
| USI Registry (Commonwealth web service) | Web service (TLS) | Enrolline ↔ USI Registry | Verify and match student USIs |
| NCVER AVETMISS submission portal | File submission | Enrolline → NCVER | Statutory VET reporting |
| Public website | Form post (HTTPS) | Website → Enrolline | Student applications and enquiries arrive as work items |
| Office 365 (email) | SMTP outbound | Enrolline → O365 | Offer letters, invoices, census and enrolment notifications |
| Payment gateway | Secure file + portal | Enrolline → gateway | Student fee collection and direct debit |

## 7. Reporting and export requirements

- AVETMISS quarterly and annual submissions to NCVER
- Funding and contract acquittal reporting
- Census-date enrolment reporting
- Qualification and statement-of-attainment issuance registers
- Ad-hoc regulatory audit extracts on request

## 8. Browser and device support

- **Supported browsers (current):** Microsoft Edge (Chromium), Google Chrome — last two major versions.
- **Mobile / tablet:** limited; enrolment status lookup and approvals supported on tablet via the responsive web UI. Records processing is desktop-only.
- **Native apps:** none.

## 9. Service-level expectations

| Service-level metric | Current value (AWS single-AZ) | Notes |
|---|---|---|
| Availability (rolling 12 months, business hours, outside intake) | 99.5% | Staff-facing business-hours service |
| Availability (during an intake enrolment window) | 99.9% expected by the business | Enrolments are date-bound against published intake and census dates; an outage inside the window cannot be made up later |
| RPO (acceptable data loss in incident) | ≤ 1 hour | RDS automated backups + transaction-log recovery |
| RTO (time to recover from a major outage) | ≤ 2 hours | Admissions cannot enrol, invoice, or confirm census while Enrolline is down, and census dates are fixed by regulation. A restore-only recovery from the current single-AZ database does not reliably meet this |
| Support response | Maintained vendor support (Enrolline) + cloud-platform severity-based response | |

*The availability expectation is not uniform across the year, and that is the interesting part of this system's service profile: a quiet back-office system for most of the year, with two windows in which it is effectively business-critical and the deadlines are externally fixed.*

## 10. Backup and maintenance windows

- **Database backups:** Amazon RDS automated daily backups (7-day retention) plus transaction-log backups; document attachments versioned in Amazon S3.
- **Maintenance window:** weekday evenings after 18:00 or weekends, by prior change-management notification (aligned to the RDS maintenance window).
- **Restrictions:** no maintenance during an **intake enrolment window** (the first three weeks of February and of July), in the week either side of a **census date**, or during the **annual AVETMISS submission window** (January), except for severity-1 incidents.

## 11. Accessibility

As an internal staff system, Enrolline is not subject to the same public-facing accessibility obligations as the website, but YAT applies **WCAG 2.1 Level AA** as good practice for staff-facing systems to support employees with disability.

## 12. Data residency

**YAT student records and personal information remain within Australia**, supporting compliance with the *Privacy Act 1988*, the Australian Privacy Principles (APP 8 — cross-border disclosure), and Australian student-records retention obligations. This is satisfied by deploying the system entirely in the AWS `ap-southeast-2` (Sydney) region, with no cross-region replication of data outside Australia.

**This position is now under review.** Since the India-campus partnership began, Enrolline holds the records of students enrolled through the India operation, which brings Indian obligations into scope alongside the Australian ones. The YAT Compliance area's determination of what those obligations require is held as the **Indian Regulatory Requirements** for the Enrolline Improvement project.

## Related references

- ICT Strategic Plan — five-year ICT direction
- Enrolline Operational Costing (ICT) — current AWS operational cost structure
- Enrolline Infrastructure Specifications (ICT) — current AWS operational state
- Enrolline Cloud Architecture — Baseline Design — the deployed single-AZ architecture
- Indian Regulatory Requirements (Enrolline Improvement project) — the Indian obligations now in scope
- Backup and Retention Policy (intranet policies) — backup schedule, rotation, and retention
- Change Management Procedure (intranet policies) — change governance
- Privacy / Data Handling Policy (intranet policies) — data-residency obligations
- User Access Policy (intranet policies) — authentication and access-control requirements
