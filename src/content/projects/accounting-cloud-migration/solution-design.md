---
title: 'Accounting System Cloud Architecture — Baseline Design'
description: 'Baseline AWS architecture for the YAT Accounting System (Ledgerline) migration — VPC, IAM, compute, RDS for PostgreSQL, storage, security, monitoring. Workload in a single Sydney Availability Zone; high-availability hardening deferred to a follow-on phase.'
appearsIn:
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl2-at2
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 5
uocReferences:
  - '[ICTCLD502 AC 3] information and data sources required to design and implement cloud infrastructure'
  - '[ICTCLD502 AC 5] business and functionality requirements'
  - '[ICTCLD401 PC 1.8] Define workload according to business requirements and needs'
---

> Produced by the MTS Senior Architecture team, in consultation with YAT ICT, and approved for implementation (v1.0).

The baseline AWS architecture for the YAT Accounting System cloud migration — the Sydney (`ap-southeast-2`) foundation for the Ledgerline finance and office-administration application, with its workload in a single Availability Zone: IAM, VPC and networking, compute (EC2 + Auto Scaling), an Application Load Balancer, RDS for PostgreSQL, storage, security, and a monitoring baseline. High-availability hardening is deferred to the follow-on HA design phase.

**[Download the Solution Design (PDF)](/documents/YAT-Accounting-Baseline-Solution-Design.pdf)**

The document specifies the architecture to be implemented, the design assumptions and constraints, the configuration decisions left to the implementer, and what is explicitly out of scope.
