---
title: 'Website Cloud Architecture — HA-Hardened Design'
description: 'The YAT website hardened to Multi-AZ high availability — ALB, cross-AZ Auto Scaling Group, Multi-AZ RDS, and media offloaded to S3. The single-AZ pilot SPOFs removed; cross-region DR and global serving deferred.'
appearsIn:
  - s1-cl3-at1
order: 5
---

> Produced by MTS Consulting, in consultation with YAT ICT, and approved for implementation (v1.0). The as-built record of the website after high-availability hardening — the predecessor state is the single-AZ Website Cloud Architecture — Baseline Design.

The HA-hardened AWS architecture for the YAT website: the single-Availability-Zone 2023 pilot taken to a **Multi-AZ, fault-tolerant deployment** in Sydney (`ap-southeast-2`) — an **Application Load Balancer** across two Availability Zones, a **cross-AZ Auto Scaling Group** of website instances, a **Multi-AZ RDS for MySQL** database with automatic failover, and **uploaded media offloaded from instance disk to S3**. The baseline's single points of failure (single instance, single AZ, single database, media on one disk) are removed.

This design deliberately stops at **in-region high availability**. Global serving / edge content delivery (CDN), cross-region disaster recovery, the audit/access-log microservice, and infrastructure-as-code are the subject of the subsequent **Website Global Expansion** engagement, which works from this state.

**[Download the Solution Design (PDF)](/documents/YAT-Website-HA-Solution-Design.pdf)**

The document specifies the as-built HA architecture, the points of failure removed, the failure-simulation verification, and what was left out of scope for the follow-on expansion work.
