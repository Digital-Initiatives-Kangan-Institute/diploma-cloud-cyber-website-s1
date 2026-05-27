---
title: 'Backup and Retention Policy'
description: 'Backup schedules, retention windows, and recovery testing arrangements at YAT College.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
uocReferences:
  - '[ICTCLD502 AC 5] organisational procedures'
---

## 1. Purpose

This policy defines YAT College's requirements for backing up data, retaining it for the periods required by law and business need, restoring it when needed, and disposing of it securely at end-of-retention.

It works in conjunction with the operational backup and recovery process (which describes *how* backups currently run) and the Privacy / Data Handling Policy (which sets the framework within which personal information is held).

## 2. Scope

This policy applies to all YAT-held data, in all systems — LMS, Application Services (Accounting / Office Admin), Active Directory, NAS file storage, and any cloud-hosted YAT system (including the migrated LMS environment).

## 3. Backup requirements

| Requirement | Standard |
|---|---|
| Backup frequency | Daily full backup of all in-scope systems |
| Backup window | Nightly, 22:00 – 04:00 local time |
| Onsite copy | Held on the System Management server's backup storage in the staff zone |
| Offsite copy | Tape rotated to offsite storage each business day |
| Encryption | Backups containing personal information are encrypted at rest |
| Catalogue | A backup catalogue is maintained by the System Management server, recording every backup set, its contents, location, and verification status |

For the migrated LMS environment, the cloud-native equivalent (e.g. AWS Backup with cross-Region copy) replaces the tape rotation; the policy intent (daily, encrypted, copied to a geographically separated location) is preserved.

## 4. Retention periods

| Data class | Minimum retention | Notes |
|---|---|---|
| Student records — enrolment, attendance, completion, qualifications issued | 30 years from completion / discontinuation | Required under Standards for RTOs 2015 |
| Student assessment evidence (submissions, grades, observation records) | 6 months from issuing the result, longer if requested by ASQA | Per RTO Standards |
| Student personal information (contact, USI, fee status) | Period of enrolment + 7 years | Privacy Act / RTO standards combined |
| Financial records (invoices, payments, expenses) | 7 years | *Income Tax Assessment Act 1936* (Cth) record-keeping requirements |
| Staff employment records | 7 years from end of employment | Fair Work and tax record-keeping requirements |
| ICT operational logs (authentication, access, change-management) | 12 months rolling | Sufficient for incident investigation |
| Security incident records | 7 years | Supports trend analysis and audit |
| WHS incident records | 30 years | Victorian OHS / long-tail injury reporting |

## 5. Restoration testing

- A restoration test is performed at least **quarterly** to verify backups are recoverable. A subset of the catalogue is restored to a non-production environment and integrity-checked.
- Results of restoration tests are recorded by the ICT Service Desk and reported to the ICT Manager.
- Material failures (unable to restore, restored data corrupt) trigger an incident response per the Security and Incident Response policy.

## 6. Disposal at end of retention

- Data that has reached the end of its retention period is securely destroyed.
- Physical media (tapes, decommissioned drives) are wiped or destroyed before disposal; destruction is documented in the asset retirement record.
- Cloud-hosted data is deleted via the cloud vendor's data-deletion process; deletion records are retained for audit.
- Personal information disposal is performed in accordance with the Privacy / Data Handling Policy and APP 11.

## 7. Roles and responsibilities

- **ICT Manager:** owns this policy and the backup operational process; ensures retention obligations are met.
- **ICT staff:** execute the backup schedule, monitor backup success, conduct restoration tests.
- **System Management server:** provides the technical infrastructure for the on-prem backup process.
- **Records-holding business areas (Student Services, Finance, HR):** specify retention obligations for their data classes, review classifications annually.

## 8. Policy ownership and review

- **Owner:** ICT Manager (with input from Compliance Manager for retention obligations).
- **Review cadence:** annually, or sooner if triggered by a material change in legislation, technology, or organisational structure.
- **Approval:** policy changes follow the ICT Change Management Procedure.
