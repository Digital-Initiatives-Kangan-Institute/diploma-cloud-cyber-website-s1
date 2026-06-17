---
title: 'Cloud Migration Technical Finding — Ledgerline Multi-AZ Database Limitation'
description: 'A technical finding recorded during the Accounting System cloud migration — the Ledgerline application does not support a Multi-AZ (mirrored) database, so database-tier high availability via automatic failover is not available without replacing the application. The application tier is unaffected.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 6
uocReferences:
  - '[ICTCLD504 PC 1.1] Identify and review business’s cloud architecture design'
  - '[ICTCLD504 PC 1.2] Identify and analyse strengths and weaknesses of current cloud architecture'
  - '[ICTCLD504 AC 5] specific requirements and industry standards, organisational procedures and legislative requirements, including business and functionality requirements, as required'
---

## Document control

| | |
|---|---|
| Document title | Accounting System Cloud Migration — Technical Finding TF-03 |
| Raised by | MP Tech Solutions (MTS) Migration Team |
| Recorded | During the Accounting System cloud migration (Cloud Foundation Build phase) |
| Owner | Sam Walker, YAT ICT Manager |
| Status | Open — carried forward as a standing constraint on the cloud-hosted Ledgerline environment |
| Classification | Internal — ICT, Finance, and engaged consultants on signed MSA |

## 1. Summary

During the migration of the Accounting System (Ledgerline) from on-premises to AWS, the Migration Team
identified a technical limitation of the Ledgerline application that constrains how the **database tier**
can be made highly available in the cloud. **Ledgerline does not support running on a Multi-AZ (mirrored)
SQL Server database.** The single-instance migration to AWS proceeded as planned and is unaffected; this
finding records the limitation so that any **future** high-availability work on the Ledgerline database is
planned with it in view.

## 2. Background

Ledgerline Finance & Office Suite is a long-standing, commercial, proprietary product that has been in
service at YAT since **2009**. It was designed for **on-premises deployment on a single Windows Server with
a single, locally-attached Microsoft SQL Server instance**, and it predates the cloud high-availability
patterns now common for managed databases. Its data layer was built and validated for that single-instance
operating model.

## 3. The finding

As part of the Cloud Foundation Build, MTS evaluated whether the Ledgerline database could be deployed on
**Amazon RDS for SQL Server with Multi-AZ enabled** — the managed pattern that provides a synchronously
replicated standby in a second Availability Zone and **automatic failover** to it. The evaluation found that
Ledgerline **cannot be operated in that configuration**, for two independent reasons:

- **Vendor support.** The Ledgerline vendor's support matrix certifies the application only on a **single,
  non-mirrored** SQL Server instance. The vendor will **not support** the application running against a
  mirrored / Multi-AZ database, so operating it that way would place YAT outside vendor support for a
  business-critical finance system.
- **Application compatibility.** Ledgerline's data layer is **not failover-aware** — it holds long-lived
  stateful database sessions and depends on database-level settings (including the SQL Server **recovery
  model** and session handling) that are incompatible with the mirrored configuration RDS Multi-AZ requires.
  In testing, the application did not tolerate the connection reset that a Multi-AZ failover event triggers.

Because Ledgerline is a closed, proprietary product, these are **not** configuration items YAT can change:
remediating them would require the vendor to re-engineer and re-certify the application, or YAT to **replace
Ledgerline with a different accounting product** that supports a highly-available database.

## 4. Scope of the limitation — database only

This limitation applies to the **database tier only**. It does **not** prevent making the rest of the
environment highly available:

- The **application tier** (the Ledgerline application servers behind the internal load balancer) **can** be
  deployed across multiple Availability Zones — an Auto Scaling group spanning two AZs behind a load
  balancer is fully supported and is the normal way to remove the application tier as a single point of
  failure.
- Only the **database** must remain a **single instance** (single-AZ). Database resilience must therefore be
  achieved through **backup, point-in-time restore, and a disaster-recovery process**, not through
  synchronous Multi-AZ failover.

## 5. Consequence for future improvement

Any later initiative to improve Ledgerline's reliability must treat **Multi-AZ database failover as
unavailable** for as long as YAT continues to run the Ledgerline product. The realistic options are:

- **Accept the single-instance database** and meet reliability targets through robust automated backups,
  point-in-time restore, cross-Region backup copies, and a tested recovery runbook — recovering within the
  system's recovery-time objective after a failure, rather than failing over automatically; **or**
- **Replace the Ledgerline application** with an accounting product that supports a highly-available
  database — a major undertaking (new software licensing, a full data-migration project, staff retraining
  and change management, and the associated delivery and business risk) that would need its own business
  case and is well beyond an infrastructure-improvement engagement.

The choice between these is a **cost-versus-benefit** judgement against the system's actual availability
needs (an internal, business-hours finance system with outsourced payroll), and belongs in any future
improvement proposal.

## 6. References

- Accounting System Application Specification (ICT) — Ledgerline functional and workload profile
- Accounting System Infrastructure Specifications (ICT) — current AWS operational state, including the
  single-AZ database
- Accounting System Operational Costing (ICT) — cost inputs for any reliability-improvement proposal
- Accounting System Cloud Architecture — Baseline Design — the deployed single-AZ architecture
- Backup and Retention Policy (intranet policies) — backup schedule, rotation, and retention
