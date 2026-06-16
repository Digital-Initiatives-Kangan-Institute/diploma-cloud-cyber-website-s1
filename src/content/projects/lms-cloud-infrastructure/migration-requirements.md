---
title: 'LMS Cloud Migration Requirements'
description: 'YAT-defined functional and non-functional requirements for the LMS Cloud Infrastructure project — cloud platform, availability, OS / application stack, recovery objectives, scaling, vendor support.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 3
uocReferences:
  - '[ICTCLD502 AC 5] business and functionality requirements'
  - '[ICTCLD502 PC 1.1] Determine reliability, recoverability and service levels required for application'
  - '[ICTCLD502 PC 1.2] Determine cloud infrastructure according to business needs'
---

## Context

The following functional and non-functional requirements for the YAT LMS cloud migration were established by YAT ICT during the engagement setup, following consultation with the YAT ICT Manager (see the Consultation Notes filed against this project for the consultation record this list was derived from). These requirements set the targets the engagement is being delivered against and are referenced by the cloud foundation build and the subsequent high-availability hardening work. Cost-related grounding for the requirements is provided by the current ICT Operational Costing — LMS document (filed under ICT).

## Requirements

The migrated YAT LMS must:

- **Run on a cloud vendor supported by the engaged consultancy.** YAT's in-house ICT staff have limited cloud experience. The cloud platform selection must align with the qualifications of the engaged consultancy supporting the migration. The engaged consultancy (MTS) holds AWS Certified Cloud Practitioner and AWS Certified Solutions Architect certifications. **AWS is the cloud platform of choice.**

- **Achieve 99.9% availability.** The migrated LMS must be available and operating normally at least 99.9% of the time. This is a step change from the current on-prem baseline of 99.2% and is the success criterion stated in YAT's ICT Strategic Plan.

- **Preserve the existing OS and application stack.** The LMS will continue to run on Windows Server 2016 with the existing DOODLE application and MySQL database. Full administrative control of the operating system is required to install and maintain the LMS application stack. The OS and application software versions will not change as part of the transition.

- **Meet RTO ≤ 4 hours and RPO ≤ 1 hour.** In the event of a system failure, the LMS must be recoverable with no more than 1 hour of data loss (RPO ≤ 1 hour) and back to operational service within 4 hours (RTO ≤ 4 hours).

- **Scale flexibly with demand.** All scalable components of the migrated infrastructure must scale up and down automatically in response to changes in demand. YAT's LMS load varies substantially across the academic calendar — typical weekday teaching hours, approximately 3× concurrent users during assessment submission windows (last two weeks of each term), and very low load overnight and during term breaks.

- **Receive prompt vendor support for severity-1 incidents.** When the LMS is down, the cloud vendor must respond to severity-1 support requests within 1 hour.

- **Add capacity automatically to maintain performance.** When user demand increases significantly or response time degrades, the system must add resources automatically to maintain performance against the LMS Application Specification's SLA targets.

- **Reduce running cost during quiet periods.** When demand reduces (overnight, weekends, term breaks), the system must scale down to reduce running cost.
