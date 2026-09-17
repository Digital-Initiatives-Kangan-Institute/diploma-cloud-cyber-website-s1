---
title: 'Enrolline Cloud Architecture — Approved Improvement Design'
description: 'The approved "to be" improvement design for the YAT Enrolline cloud infrastructure — multi-AZ application capacity and a Multi-AZ database, scheduled capacity against the intake calendar, an S3 lifecycle and private access path, logging sufficient for breach detection, and a light India residency slice for regulatory logs. The design the implementation team builds from.'
appearsIn:
  - s1-cl3-at2
  - s1-cl3-at3
order: 10
uocReferences:
  - '[ICTCLD504 PC 3.1] deploy approved architecture on cloud platform'
  - '[ICTCLD504 AC 3] information and data sources required to design and implement cloud infrastructure'
---

> Approved by YAT (ICT, the Registrar and Compliance) following the improvement-design review, and adopted as the agreed design for implementation (v1.0).

The approved improvement design for the YAT Enrolline cloud infrastructure. It takes the single-Availability-Zone baseline and improves it across security, reliability, scalability and cost, across the four components the implementation team divides the work by:

- **Network** — an application subnet in the second Availability Zone, a private S3 access path so document traffic no longer leaves the VPC through the NAT Gateway, and VPC flow logs enabled.
- **Compute** — application capacity spread across both Availability Zones, with capacity scheduled against the published intake and census calendar rather than held at peak size year-round.
- **Database** — converted to a Multi-AZ deployment with an automatic-failover standby, bringing recovery inside the two-hour objective.
- **Storage** — a lifecycle configuration that tiers document attachments as their access pattern falls away while preserving the 30-year retention obligation, plus S3 access logging.

It also carries a **light India residency slice**: the system and access logs for the India-related operation held in Mumbai with the retention the CERT-In Directions require, with the main system and all student records remaining in Sydney. The residency slice is specified at design level.

**[Download the Approved Improvement Design (PDF)](/documents/YAT-Enrolline-Improved-Solution-Design.pdf)**

This is the design the improvement team implements: the team plans and writes the infrastructure-as-code for it, and each engineer deploys and verifies it. The Enrolline application and its student records are preserved unchanged.
