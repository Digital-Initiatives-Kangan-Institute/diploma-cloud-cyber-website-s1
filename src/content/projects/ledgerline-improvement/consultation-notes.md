---
title: 'ICT Manager Consultation Notes'
description: 'Record of the requirements consultation between YAT and MTS for the Ledgerline Cloud Infrastructure Improvement project — the India-campus driver, the compliance question, fitness for purpose, and the open scope of improvement.'
appearsIn:
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 4
uocReferences:
  - '[ICTCLD504 PC 1.1] Identify and review business’s cloud architecture design'
  - '[ICTCLD504 AC 5] specific requirements and industry standards, organisational procedures and legislative requirements, including business and functionality requirements, as required'
---

## Meeting record

| | |
|---|---|
| Subject | Ledgerline Cloud Infrastructure Improvement — Requirements Consultation |
| Date | Thursday 11 February 2027 |
| Time | 10:00 – 11:05 (1 hour 5 minutes) |
| Location | YAT College Cremorne campus — ICT Manager's office, Building A Level 2 |
| Purpose | Brief the MTS Improvement Team on YAT's drivers and constraints for improving the Ledgerline cloud infrastructure, ahead of the current-state analysis and Solution Design. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair, Engagement Sponsor)
- **Lee Carter** — YAT Finance Manager (Accounting system business owner)
- **Asha Rao** — YAT Compliance Officer (India-operation compliance)
- **Pat Lin** — MTS Senior Consultant, supervising the Improvement Team
- **\[Improvement Team\]** — MTS Improvement Team (this engagement) — taking notes

---

## Discussion

### Context and starting point

Sam Walker set the scene. Ledgerline — YAT's accounting and office-administration system — was migrated from on-premises to AWS under an earlier engagement and now runs as a cloud-hosted workload reached by finance and administrative staff. That cloud environment is the **starting point**: this engagement improves it, it does not rebuild or re-migrate it. Sam asked the team to begin from the current-state records — the Accounting System Infrastructure Specifications, the Application Specification, the Operational Costing, and the Cloud Architecture — Baseline Design held against the migration project.

The driver, Sam explained, is YAT's offshore campus partnership in India. Now that YAT runs an India-based operation, the accounting function supports activity connected to that operation, and two questions have been put to ICT: is the system **solid enough** for what the business now depends on it for, and is it **compliant** with what India requires. Sam was clear he is not handing the team a fix — he wants them to **analyse the system and tell YAT what it needs**.

### What "improvement" means here — open scope

Pat asked Sam to be specific about scope. Sam was deliberate that the scope is **open**: he is not prescribing a particular change, and he is not asking for any specific architecture. The team is to assess the infrastructure across reliability, scalability, security, and cost, decide where it genuinely needs to be better, and **propose** improvements in a Solution Design. "Tell me what's worth doing and why," he said — "and if something isn't worth doing, tell me that too." Whatever the team recommends, YAT decides what proceeds.

### The compliance question

Asha Rao spoke to the compliance driver. With an India operation, YAT now has obligations under Indian law that touch how and where certain data and system logs are held, and how YAT handles personal data and financial records. The Compliance area has set out the applicable obligations in the **Indian Regulatory Requirements** for this project. Asha was clear on the division of labour, echoing how YAT has handled this on the website side: **Compliance owns the interpretation of the law; MTS designs the infrastructure to satisfy the requirements as written, and does not interpret the law itself.** The team's job is to assess whether the current Ledgerline infrastructure meets those requirements, identify any gaps, and propose what would close them.

### Fit for purpose — proportionate, not gold-plated

Sam and Lee Carter both pressed the point that Ledgerline is an **internal, business-hours** finance system, not a 24/7 public service. Lee said the finance team's working assumption is business-hours availability; he does not want the team paying for always-on resilience that the function does not need. Sam framed it as fitness for purpose: improvements should be **proportionate** to a finance system's criticality and to YAT's budget — sound engineering, not gold-plating — and each proposed improvement should carry its own justification.

### Protect the application and the data

Lee was firm on two non-negotiables: the **Ledgerline application must not change**, and **no financial data may be lost or altered** by any infrastructure work. This is an infrastructure improvement underneath a finance system that has to keep reconciling exactly as it does today.

### The approval gate

Sam confirmed the engagement follows YAT's Change Management Procedure, and that he wants to **approve the Solution Design before any implementation begins** — the design presentation is the gate. Only the improvements YAT approves at that gate proceed to implementation. High-risk implementation steps will need sign-off as usual.

### Change discipline

Lee asked that any production-affecting change avoid the **monthly accounting close and the end-of-financial-year period**. For the analysis and design there is no such constraint; for implementation, the team is to schedule around those windows.

### How MTS is staffing this

Sam noted MTS is delivering this with an **Improvement Team**, with each member owning an improvement dimension and the team lead rotating across working sessions. He asked that the team's internal arrangements — who leads when, how work is allocated — be the team's own to manage, with Pat Lin as the supervision and escalation point on the MTS side and himself as the YAT-side sponsor and acceptance authority.

---

## Agreed next steps

- **MTS Improvement Team to produce:** the current-state analysis (including the compliance assessment against the Indian Regulatory Requirements), the improvement options and goals, and the Solution Design (with each improvement's cost-benefit justification).
- **MTS to present:** the Solution Design to YAT for approval before any implementation.
- **Asha Rao to provide:** the finalised Indian Regulatory Requirements determination for the Accounting System.
- **Lee Carter to confirm:** the business constraints — business-hours service expectation, the no-application-change / no-data-loss conditions, and the Restricted Period windows.
- **Sam to authorise:** MTS Improvement Team accounts on AWS Academy for the engagement.

---

*Notes written up by the Improvement Team within 24 hours of the meeting; circulated to Sam, Lee, Asha, and Pat for confirmation.*
