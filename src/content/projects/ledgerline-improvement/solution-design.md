---
title: 'Accounting System Cloud Architecture — Approved Improvement Design'
description: 'The approved "to be" improvement design for the YAT Accounting System (Ledgerline) cloud infrastructure — Multi-AZ across compute and database, hardened security, cost optimisation, and a light India residency slice for regulatory logs and books-of-account. The design the implementation team builds from.'
appearsIn:
  - s1-cl3-at2
  - s1-cl3-at3
order: 10
uocReferences:
  - '[ICTCLD504 PC 3.1] deploy approved architecture on cloud platform'
  - '[ICTCLD504 AC 3] information and data sources required to design and implement cloud infrastructure'
---

> Approved by YAT (ICT, Finance and Compliance) following the improvement-design review, and adopted as the agreed design for implementation (v1.0).

The approved improvement design for the YAT Accounting System (Ledgerline) cloud infrastructure. It takes the single-Availability-Zone baseline and improves it across security, reliability, scalability and cost — Multi-AZ across the application and database tiers, a hardened and encrypted security posture, business-hours and storage-lifecycle cost optimisation, and a light India residency slice (CERT-In system logs and Companies-Act books-of-account held in Mumbai, with the main system remaining in Sydney). It is provisioned as parameterised infrastructure-as-code across four components — network, compute, database, and storage.

**[Download the Approved Improvement Design (PDF)](/documents/YAT-Accounting-Improved-Solution-Design.pdf)**

This is the design the improvement team implements: the team plans and writes the infrastructure-as-code for it, and each engineer deploys and verifies it. The Ledgerline application and its financial data are preserved unchanged.
