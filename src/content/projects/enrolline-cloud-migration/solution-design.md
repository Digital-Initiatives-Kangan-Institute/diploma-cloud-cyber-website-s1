---
title: 'Enrolline Cloud Architecture — Baseline Design'
description: 'Baseline AWS architecture for the YAT Enrolline student records and enrolment management system — VPC, IAM, compute, RDS for PostgreSQL, the S3 document store, security and monitoring. Workload in a single Sydney Availability Zone; high-availability hardening deferred to a follow-on phase.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 5
uocReferences:
  - '[ICTCLD504 PC 1.1] Identify and review business’s cloud architecture design'
  - '[ICTCLD504 AC 3] information and data sources required to design and implement cloud infrastructure'
---

> Produced by the MTS Senior Architecture team, in consultation with YAT ICT and the YAT Registrar, and approved for implementation (v1.0).

The baseline AWS architecture for the YAT Enrolline cloud migration — the Sydney (`ap-southeast-2`) foundation for the Enrolline student records and enrolment management application, with its workload in a single Availability Zone: IAM, VPC and networking, compute (EC2 + Auto Scaling), an internal Application Load Balancer, RDS for PostgreSQL, the S3 document store, security, and a monitoring baseline. High-availability hardening was deferred to a follow-on phase and has not been carried out.

**[Download the Solution Design (PDF)](/documents/YAT-Enrolline-Baseline-Solution-Design.pdf)**

The document specifies the architecture as implemented, the design assumptions and constraints, the configuration decisions left to the implementer, and what was explicitly out of scope. It is the **as-built record** of the current environment, and the starting point for any onward improvement of that environment.
