---
title: 'Engagement Role Brief'
description: 'Role definitions and engagement-context summary for the MTS LMS Cloud Infrastructure project — who does what, who reports to whom, who has authority.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 2
uocReferences:
  - '[ICTICT517 AC 4] Individual superior in the organisation'
  - '[ICTICT517 PC 1.4] Report on proposed changes, gaps and improvement opportunities to superior'
---

This brief sets out the roles, responsibilities, and reporting relationships for the MTS LMS Cloud Infrastructure engagement. The Master Services Agreement (§§4–5, §10) is the authoritative source for engagement scope and governance; this brief is the operational reference held by each role during day-to-day work.

## Engagement context

YAT College has engaged MTS Consulting to deliver the cloud infrastructure component of YAT's LMS migration. The engagement is structured in three sequential Phases:

1. **Phase 1 — Analysis and Business Case.** Strategic analysis, five-year CBA, prioritised action plan, board-ready Business Case + presentation.
2. **Phase 2 — Cloud Foundation Build.** Implementation of the approved cloud architecture, infrastructure smoke testing, documentation and handover.
3. **Phase 3 — High Availability Hardening.** Multi-AZ database, cross-zone autoscaling, failure-simulation testing, production-state closure pack for sign-off under YAT's Change Management Procedure.

Cloud infrastructure work is in scope for MTS; LMS application install, data migration, cutover, organisational change management, and decommissioning are retained by YAT in-house teams. The scope split is summarised in §3 below and detailed in the Master Services Agreement.

## Roles in this engagement

### MTS Consultant

The Consultant is the day-to-day delivery role on the MTS side.

| | |
|---|---|
| **Reports to** | MTS Senior Consultant |
| **Responsibilities** | Assess YAT's current ICT environment against the strategic plan; propose changes (if appropriate) and evaluate their effect; produce the action plans, build documentation, design documents, and deployment reports required for each Phase; engage with the YAT ICT Manager on acceptance review and feedback. |
| **Authorities** | Technical decisions within agreed scope. Raises Change Requests for scope, deliverable, fee, or timing variations (Change Requests are approved per the MSA §9 and the YAT Change Management Procedure). |
| **Key liaisons** | MTS Senior Consultant (supervision, deliverable approval); MTS Engagement Director (escalation); YAT ICT Manager (acceptance). |

### MTS Senior Consultant — Pat Lin

The Senior Consultant supervises the day-to-day work on the MTS side and is the primary point of engagement-level contact with YAT.

| | |
|---|---|
| **Reports to** | MTS Engagement Director (Jordan Chen) |
| **Responsibilities** | Supervise the work of the MTS Consultant assigned to the engagement; liaise with the YAT ICT Manager for acceptance and routine engagement matters; approve Consultant-produced Deliverables before submission to YAT; provide weekly written status reporting to YAT per MSA §10.2. |
| **Authorities** | Approves Deliverables for submission to YAT; authorises Change Requests for raising with the YAT ICT Manager; engagement-level escalation point for the YAT side. |
| **Key liaisons** | MTS Consultant (supervision); MTS Engagement Director (reporting); YAT ICT Manager (engagement liaison). |

### YAT ICT Manager — Sam Walker (Engagement Sponsor)

The ICT Manager is the Engagement Sponsor on the YAT side and the named acceptance authority for all Deliverables.

| | |
|---|---|
| **Reports to** | YAT Chief Financial Officer |
| **Responsibilities** | Project Sponsor for the LMS Cloud Infrastructure project; acceptance authority for each Deliverable (MSA §8); approves Change Requests within the operational thresholds in the YAT Change Management Procedure; escalates to YAT senior management for material changes; operational owner of the YAT Change Management Procedure. |
| **Authorities** | Per the YAT User Access Policy §4 (Role groups and permissions matrix); per the YAT Change Management Procedure for low and medium-risk changes. |
| **Key liaisons** | MTS Senior Consultant (engagement liaison); YAT CFO (escalation); affected YAT business unit heads (per change-management thresholds). |

### YAT Senior Management

YAT senior management is the escalation and high-risk sign-off layer for the engagement.

| | |
|---|---|
| **Holds** | YAT Chief Financial Officer (Robin Ng), Chief Operating Officer (Alex Reid), and Chief Executive Officer, as appropriate to the matter. |
| **Responsibilities** | Sign-off on changes meeting the high-risk thresholds in the YAT Change Management Procedure; sign-off on the Phase 3 Closure Pack (MSA §6.3 D3.3); escalation point for unresolved engagement matters per MSA §10.3. |
| **Key liaisons** | YAT ICT Manager (engagement sponsor); MTS Engagement Director (counterpart escalation). |

## LMS server — senior YAT ICT team recommendations

Senior members of the YAT ICT team have made the following recommendations for the LMS server, which constrain the design and build work in this engagement:

- On a new server, the CPU, memory, and storage resources need to increase by at least 100%.
- The availability of the system needs to increase from 99.2% to 99.9%.
- There is no intention to change the operating system and/or application software versions as part of the transition.

## Scope summary

The Master Services Agreement (§§4–5) is the authoritative reference for engagement scope. Summary:

**In scope for MTS**

- Strategic and environmental analysis, CBA, action plan, Business Case, and Business Case presentation (Phase 1)
- Cloud foundation environment design and build, deployment report, operational handover (Phase 2)
- HA design, HA hardening implementation, failure-simulation testing, closure pack (Phase 3)
- All MTS-produced consulting documentation

**Out of scope for MTS — retained by YAT in-house IT**

- LMS application installation onto the cloud infrastructure
- Database migration from the on-premises LMS to the cloud-hosted database
- Production cutover and decommissioning of on-premises infrastructure
- Organisational change-management (CAB process, communications, training, post-cutover support ramp)
- Post-handover application-level support of the LMS

Out-of-scope items are funded through YAT-internal cost categories in the ICT Cost Baseline for this project.

## Related documents

- Master Services Agreement (this project) — authoritative engagement terms, deliverables, fees, governance
- ICT Cost Baseline (this project) — current-state cost data underpinning the Phase 1 CBA work
- ICT Strategic Plan (this project) — five-year ICT direction the engagement is aligned to
- LMS Application Specification (this project) — functional and technical specification of the DOODLE LMS application
- LMS Cloud Migration Requirements (this project) — explicit migration requirements set by YAT
