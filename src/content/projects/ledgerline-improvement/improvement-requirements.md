---
title: 'Improvement Requirements'
description: 'YAT-defined outcomes the Ledgerline cloud-infrastructure improvement must achieve — a stable, reliable, fit-for-purpose system that is compliant with the Indian regulatory requirements applicable to the India-campus operation.'
appearsIn:
  - s1-cl3-at1
order: 3
uocReferences:
  - '[ICTCLD504 PC 1.6] Set business goals as they relate to security, reliability, high-performance and cost efficiencies of cloud architecture according to business requirements and needs'
  - '[ICTCLD504 AC 5] specific requirements and industry standards, organisational procedures and legislative requirements, including business and functionality requirements, as required'
---

## Purpose

This document states the **outcomes** the Ledgerline cloud-infrastructure improvement must achieve. They were established by YAT ICT, YAT Finance, and the YAT Compliance area. They are deliberately framed as **objectives, not solutions**: the Improvement Team is to analyse the current state against these outcomes, set the specific improvement goals and performance metrics, and propose the improvements it judges necessary — for YAT's approval in the Improvement Business Case. No particular architecture or improvement is mandated or excluded here.

The improvement concerns the **cloud infrastructure** of the Accounting System (Ledgerline). The Ledgerline application and its financial data are out of scope (see the Engagement Role Brief and the Master Services Agreement §5).

## Required outcomes

- **IR-1 — Stable and reliable.** The infrastructure must be stable and reliable in normal operation, appropriate to a finance system the business depends on during business hours. The team is to assess current reliability against that need, set measurable reliability goals, and address any weaknesses the analysis identifies. Improvements must at least preserve the current business-hours service level.

- **IR-2 — Fit for purpose and proportionate.** Improvements must be fit for the purpose of an **internal, business-hours** finance system and proportionate to its criticality and budget — sound engineering, not gold-plating. Each proposed improvement must be justified against the business need rather than adopted by default.

- **IR-3 — Compliant with Indian regulatory requirements.** The infrastructure must be assessed against, and brought into compliance with, the **Indian Regulatory Requirements** applicable to the India-campus operation (see the Indian Regulatory Requirements reference). The team is to identify any compliance gaps and propose the infrastructure changes needed to close them. *The legal interpretation of these obligations is owned by the YAT Compliance area; the team designs the infrastructure to satisfy the requirements as determined, and does not advise on the law.*

- **IR-4 — Preserve the application and data.** Improvements are to the cloud infrastructure only. The Ledgerline application must continue to run on its existing Microsoft SQL Server stack **without application change and without loss of financial data**.

- **IR-5 — Operable and maintainable by YAT.** The improved environment must remain operable by YAT in-house ICT, with appropriate monitoring, alerting, and documentation. Where it aids reliability, recovery, or consistency, provisioning should favour reproducible, parameterised infrastructure.

- **IR-6 — Cost-justified.** Each improvement must be justified in the Improvement Business Case on a cost-versus-benefit basis, and its ongoing operating-cost impact (including any commercial licensing effect) made explicit.

- **IR-7 — Change discipline.** Production-affecting change must follow the YAT Change Management Procedure and avoid the **Restricted Period** (the monthly accounting close and the end-of-financial-year period).

## How these requirements are used

- The team **analyses** the current Accounting System cloud infrastructure (the Baseline Design and the current ICT records) against IR-1 to IR-7.
- The team **sets** the specific security, reliability, scalability, and cost goals and performance metrics — these are the team's determination, not pre-set here.
- The team **proposes** the improvements it judges necessary to meet the outcomes, with each justified in the Improvement Business Case.
- YAT **approves** the improvements to be implemented; only Approved Improvements proceed to implementation.

## Related documents

- Indian Regulatory Requirements (this project) — the applicable Indian instruments the infrastructure is assessed against (IR-3)
- ICT Manager Consultation Notes (this project) — the consultation these outcomes were derived from
- Accounting System Cloud Architecture — Baseline Design (Accounting System Cloud Migration project) — the current as-built baseline
- Accounting System Infrastructure Specifications, Application Specification, Operational Costing (ICT) — current-state records and cost inputs
- Master Services Agreement (this project) — engagement scope and the approval gate
