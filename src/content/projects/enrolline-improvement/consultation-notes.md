---
title: 'Consultation Notes'
description: 'Record of the requirements consultation between YAT and MTS for the Enrolline Cloud Infrastructure Improvement project — the India-campus driver, the compliance question, the intake load profile, and the open scope of improvement.'
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
| Subject | Enrolline Cloud Infrastructure Improvement — Requirements Consultation |
| Date | Thursday 11 February 2027 |
| Time | 10:00 – 11:10 (1 hour 10 minutes) |
| Location | YAT College Cremorne campus — ICT Manager's office, Building A Level 2 |
| Purpose | Brief the MTS Improvement Team on YAT's drivers and constraints for improving the Enrolline cloud infrastructure, ahead of the current-state analysis and Solution Design. |

**Attendees:**

- **Sam Walker** — YAT ICT Manager (chair, Engagement Sponsor)
- **Jess Tran** — YAT Registrar (Enrolline business owner)
- **Asha Rao** — YAT Compliance Officer (India-operation compliance)
- **Pat Lin** — MTS Senior Consultant, supervising the Improvement Team
- **\[Improvement Team\]** — MTS Improvement Team (this engagement) — taking notes

---

## Discussion

### Context and starting point

Sam Walker set the scene. Enrolline — YAT's student records and enrolment management system — was migrated from on-premises to AWS under an earlier engagement and now runs as a cloud-hosted workload reached by admissions, student services, faculty administration and compliance staff. That cloud environment is the **starting point**: this engagement improves it, it does not rebuild or re-migrate it. Sam asked the team to begin from the current-state records — the Enrolline Infrastructure Specifications, the Application Specification, the Network Diagram, the Operational Costing, and the Cloud Architecture — Baseline Design held against the migration project.

Sam was explicit about one thing early, because he said it causes confusion every time: **Enrolline is not the LMS and it is not Ledgerline.** The LMS is teaching and delivery. Ledgerline is the general ledger. Enrolline is the student administration system — it holds the enrolment record, the student's identity and USI, their results, the fees YAT raises against them, and the data YAT reports to NCVER. It provisions students into the LMS and posts fee summaries across to Ledgerline, and that is the extent of its overlap with either.

The driver, Sam explained, is YAT's offshore campus partnership in India. Now that YAT enrols students through an India-based operation, Enrolline holds those students' records, and two questions have been put to ICT: is the system **solid enough** for what the business now depends on it for, and is it **compliant** with what India requires. Sam was clear he is not handing the team a fix — he wants them to **analyse the system and tell YAT what it needs**.

### What "improvement" means here — open scope

Pat asked Sam to be specific about scope. Sam was deliberate that the scope is **open**: he is not prescribing a particular change, and he is not asking for any specific architecture. The team is to assess the infrastructure across reliability, scalability, security, and cost, decide where it genuinely needs to be better, and **propose** improvements in a Solution Design. "Tell me what's worth doing and why," he said — "and if something isn't worth doing, tell me that too." Whatever the team recommends, YAT decides what proceeds.

### The load profile — the part people get wrong

Jess Tran spent most of her time on this, and asked that it be minuted carefully.

Enrolline is quiet for most of the year — twenty-five to forty concurrent staff users, a back-office system nobody thinks about. Then, twice a year, an intake enrolment window opens and for three weeks the concurrent user count roughly triples and stays there. Four weeks after that comes the census date, which is a shorter and sharper spike again.

Her point was that the intake and census deadlines are **not YAT's to move**. Census dates are fixed by regulation and published to students. "If the system is down for an afternoon in week two of an intake, that work does not move to next week," she said. "The students are still there, the date is still the date, and my team works the weekend." She asked the team to treat the intake window as a genuinely different service expectation from the rest of the year, rather than averaging the two into a single number.

Jess also noted the flip side, unprompted: the environment is currently sized for that peak and runs at that size in September when there is almost nobody on it. She said she had never been asked whether that was sensible and did not know the answer — "that's your job, not mine."

### The compliance question

Asha Rao spoke to the compliance driver. With an India operation, YAT now has obligations under Indian law that touch how and where certain data and system logs are held, and how YAT handles personal data and financial records. The Compliance area has set out the applicable obligations in the **Indian Regulatory Requirements** for this project.

Asha made the point that Enrolline is a more exposed system than the others for this purpose: personal data is not incidental to it, it is the substance of it. She also flagged that the Indian requirements around detecting and reporting a breach assume a level of logging that she did not believe the current environment has, and asked the team to check that specifically rather than take it on trust.

She was clear on the division of labour, echoing how YAT has handled this on the website side: **Compliance owns the interpretation of the law; MTS designs the infrastructure to satisfy the requirements as written, and does not interpret the law itself.**

### Fit for purpose — proportionate, not gold-plated

Sam pressed the point that Enrolline is an **internal, staff-facing** system, not a 24/7 public service, and that improvements should be **proportionate** to its criticality and to YAT's budget — sound engineering, not gold-plating. He added the qualification himself after Jess's point about intake: proportionate to *which* part of the year is a fair question, and he expects a proposal to say which it is sizing for and why.

### Protect the application and the data

Jess was firm on two non-negotiables: the **Enrolline application must not change**, and **no student record may be lost or altered** by any infrastructure work. She noted that student and assessment records carry a thirty-year retention obligation and are audit evidence for ASQA — "these are the records that prove a qualification was legitimately issued. They cannot be at risk."

### The approval gate

Sam confirmed the engagement follows YAT's Change Management Procedure, and that he wants to **approve the Solution Design before any implementation begins** — the design presentation is the gate. Only the improvements YAT approves at that gate proceed to implementation. High-risk implementation steps will need sign-off as usual.

### Change discipline

Jess asked that any production-affecting change avoid the **intake enrolment windows** (the first three weeks of February and of July), the week either side of a **census date**, and the **annual AVETMISS submission window** in January. For the analysis and design there is no such constraint; for implementation, the team is to schedule around those windows.

### How MTS is staffing this

Sam noted MTS is delivering this with an **Improvement Team**, with each member owning one infrastructure component — network, compute, database, or storage — and the team lead rotating across working sessions. He asked that the team's internal arrangements — who leads when, how work is allocated — be the team's own to manage, with Pat Lin as the supervision and escalation point on the MTS side and himself as the YAT-side sponsor and acceptance authority.

---

## Agreed next steps

- **MTS Improvement Team to produce:** the current-state analysis (including the compliance assessment against the Indian Regulatory Requirements), the improvement options and goals, and the Solution Design (with each improvement's cost-benefit justification).
- **MTS to present:** the Solution Design to YAT for approval before any implementation.
- **Asha Rao to provide:** the finalised Indian Regulatory Requirements determination for Enrolline.
- **Jess Tran to confirm:** the business constraints — the intake and census service expectations, the no-application-change / no-records-loss conditions, and the Restricted Period windows from the academic calendar.
- **Sam to authorise:** MTS Improvement Team accounts on AWS Academy for the engagement.

---

*Notes written up by the Improvement Team within 24 hours of the meeting; circulated to Sam, Jess, Asha, and Pat for confirmation.*
