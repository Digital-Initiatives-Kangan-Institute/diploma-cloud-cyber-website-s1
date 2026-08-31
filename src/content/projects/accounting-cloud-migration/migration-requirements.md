---
title: 'Migration Requirements'
description: 'YAT-defined functional and non-functional requirements that any recommended option for the Accounting system must meet — platform preservation, availability, recovery, licensing, data residency, integrations.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl2-at2
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 3
uocReferences:
  - '[ICTCLD502 AC 5] business and functionality requirements'
  - '[ICTCLD502 PC 1.1] Determine reliability, recoverability and service levels required for application'
---

## Context

The following functional and non-functional requirements for the Accounting & Office Administration system were established by YAT ICT and YAT Finance. Any option the MTS engagement recommends — renew on-premises or migrate to the cloud — must be evaluated against these requirements. The Consultation Notes filed against this engagement record the consultation these requirements were derived from.

## Requirements

The future operating model for the Accounting system must:

- **Preserve the Ledgerline application and its financial data.** This is an operating-model change, not a software replacement. Any recommended option must continue to run the existing **Ledgerline** application, with its financial data carried across intact — no application upgrade, no re-implementation, and no loss of data. The platform beneath the application (host operating system and database engine) may move to managed cloud equivalents where Ledgerline supports them and the data migration is proven, provided the application itself is unchanged.

- **Address the commercial licensing position.** Ledgerline is licensed commercially per named user, and the on-premises deployment additionally carries a per-core **Microsoft SQL Server Standard** licence — unlike the open-source LMS stack. The recommendation must account for licensing under the proposed model: whether the option carries the SQL Server licence forward, moves to a licence-included managed service, or retires the database licence altogether by moving to a managed open-source engine — and the effect of each on total cost.

- **Achieve business-hours availability of at least 99.5%.** The system is a business-hours, staff-only service with payroll outsourced; it does not require the 24/7 mission-critical 99.9% target set for the LMS. The recommended option must demonstrate how it meets or exceeds 99.5% business-hours availability.

- **Meet recovery objectives appropriate to financial data.** Recovery Point Objective ≤ 1 hour (financial transactions must not be lost) and Recovery Time Objective ≤ 2 hours. The recovery-time objective is measured in elapsed time, not business hours: an outage that begins late in the day still has to be resolved within two hours.

- **Keep all financial records and personal information within Australia.** Financial records and the personal information of staff and student debtors must remain onshore to support the *Privacy Act 1988* (APP 8) and Australian financial-records retention obligations. Any cloud option must deploy in an Australian region (e.g. AWS `ap-southeast-2`).

- **Support a 7-year financial-records retention obligation.** Storage and backup arrangements must support retention of financial records and audit logs for at least seven years.

- **Preserve existing integrations.** The recommended option must continue to support:
  - Active Directory authentication (single sign-on for staff)
  - Office 365 SMTP for invoice/statement and approval notifications
  - The LMS fee-status integration (enrolment data in, fee-status flags out)
  - Secure file transfer to the external payroll bureau
  - Secure banking / payment-gateway file exchange (ABA payment runs, direct-debit fee collection)

- **Scale for predictable peaks without over-provisioning.** The workload is light and business-hours, with predictable month-end and EOFY peaks (~45–55 concurrent users). The recommended option should size for these peaks cost-effectively rather than carrying year-round capacity for an occasional peak.

- **Cut over outside finance-critical periods.** Any transition must avoid month-end close (last 2 / first 2 business days of each month) and the EOFY period (mid-June to mid-July).

- **Maintain vendor support.** The Ledgerline vendor support and maintenance contract must remain in place; the recommended option must be compatible with the vendor's supported deployment configurations.
