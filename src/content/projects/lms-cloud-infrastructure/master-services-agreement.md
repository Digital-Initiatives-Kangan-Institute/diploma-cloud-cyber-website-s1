---
title: 'Master Services Agreement'
description: 'Master Services Agreement between YAT College and MTS Consulting governing the LMS Cloud Infrastructure project.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
order: 1
---

**MASTER SERVICES AGREEMENT**

| | |
|---|---|
| **Agreement reference** | YAT-MTS-2026-001 |
| **Effective date** | 15 January 2026 |
| **Project** | LMS Cloud Infrastructure |

---

## 1. Parties

**Client:** **YAT College Pty Ltd** (ABN 12 345 678 901), a Registered Training Organisation, of 175 Cremorne Street, Cremorne VIC 3121, Australia (**YAT**).

**Consultant:** **MP Tech Solutions Pty Ltd** (ABN 21 098 765 432) trading as **MTS Consulting**, of Level 4, 200 Smith Street, Collingwood VIC 3066, Australia (**MTS** or **the Consultant**).

YAT and MTS are referred to collectively as the **Parties** and individually as a **Party**.

## 2. Background

A. YAT operates a self-hosted on-premises Learning Management System (the **LMS**, currently the DOODLE platform) deployed at the YAT Cremorne campus.

B. YAT has determined, on the basis of its current ICT strategic plan, that the LMS should be migrated from its on-premises deployment to a cloud-hosted environment to address end-of-life infrastructure, improve availability, and provide capacity for student-cohort growth.

C. YAT has determined that the cloud infrastructure work component of the migration is to be delivered by an external consultancy under a Master Services Agreement, while the LMS application installation, data migration, cutover, and organisational change-management components are to be retained and delivered by YAT in-house ICT and Administration teams.

D. YAT has selected MTS to provide the cloud infrastructure services described in this Agreement. MTS warrants that it has the capability, qualifications, and resources to provide the Services.

E. The Parties wish to record the terms on which MTS will provide the Services to YAT.

## 3. Definitions and interpretation

### 3.1 Definitions

In this Agreement, unless the context requires otherwise:

| Term | Meaning |
|---|---|
| **Acceptance** | YAT's written confirmation that a Deliverable meets the acceptance criteria in clause 8. |
| **Business Day** | A day other than a Saturday, Sunday, or public holiday in Victoria, Australia. |
| **Business Hours** | 8:30 am to 5:30 pm on a Business Day. |
| **Change Request** | A written request to vary the scope, deliverables, fees, or timing of the Services, raised and approved under clause 9. |
| **Change Management Procedure** | YAT's documented ICT Change Management Procedure (intranet), incorporated into this Agreement by reference. |
| **Confidential Information** | Information disclosed by one Party to the other that is identified as confidential or that a reasonable person would treat as confidential, including YAT-held personal information and any non-public technical, operational, or commercial information of either Party. |
| **Deliverable** | An output, document, or running infrastructure component listed in clause 6. |
| **Effective Date** | The date set out at the top of this Agreement. |
| **Engagement** | The total of all work performed under this Agreement across all three Phases. |
| **MSA** | This Master Services Agreement. |
| **Phase** | A phase of the Engagement as described in clause 4. |
| **Services** | The services to be performed by MTS as described in clause 4. |
| **Site** | The YAT Cremorne campus and, where the context requires, the YAT-controlled cloud environment provisioned during the Engagement. |
| **Teaching Hours** | The hours during which YAT delivers scheduled classes, generally 8:30 am to 9:00 pm on weekdays and 9:00 am to 4:00 pm on Saturdays, excluding scheduled YAT closure periods. |

### 3.2 Interpretation

References to a Phase include all Deliverables and milestones within that Phase. Headings are for convenience only and do not affect interpretation. The singular includes the plural and vice versa.

## 4. Services and scope of work

### 4.1 Engagement structure

MTS will provide the Services in three sequential Phases:

| Phase | Title | Scope summary |
|---|---|---|
| Phase 1 | Analysis and Business Case | Strategic analysis of YAT's current ICT environment against its strategic plan; cost-benefit analysis comparing continued on-premises operation against migration to cloud; recommendation and action plan; preparation of a board-ready Business Case and supporting presentation. |
| Phase 2 | Cloud Foundation Build | Implementation of the cloud architecture recommended in Phase 1 and approved by YAT: identity and access management, virtual network, compute, managed database, multi-tier load-balanced application platform, monitoring; infrastructure smoke testing; documentation and handover. |
| Phase 3 | High Availability Hardening | Review of the deployed cloud environment for single points of failure and recovery gaps; design and implementation of multi-availability-zone fault tolerance for the database tier, cross-zone autoscaling for the application tier, and corresponding monitoring; failure-simulation testing; production-state closure pack for sign-off under YAT's Change Management Procedure. |

### 4.2 Detailed scope

Detailed scope for each Phase is set out in the supporting project documents:

- **Phase 1 scope** is anchored by the LMS Migration Role Brief, the LMS Cloud Migration Requirements, the ICT Cost Baseline, and the ICT Strategic Plan (all on the YAT intranet for this project).
- **Phase 2 scope** is anchored by the action plan and architecture approved at the conclusion of Phase 1, the LMS Application Specification, and the LMS Cloud Migration Requirements.
- **Phase 3 scope** is anchored by the HA Database Requirements and the deployed Phase 2 environment.

MTS will perform the Services with reasonable skill and care, by appropriately qualified personnel, and in compliance with YAT's documented policies and procedures (referenced in clauses 9 and 12 of this Agreement).

## 5. Out of scope

The following work is **not** included in this Engagement and remains the responsibility of YAT in-house ICT and Administration teams:

- Installation of the DOODLE LMS application onto the cloud infrastructure provided by MTS;
- Extract, transform, and load of the existing MySQL database from the on-premises LMS to the cloud-hosted managed database, including post-migration data verification;
- Production cutover from the on-premises LMS to the cloud-hosted LMS, including DNS changes, dual-running window operations, user redirection, and post-cutover incident response ramp;
- All organisational change-management activities, including Change Advisory Board process, communications to staff and students, training collateral preparation and delivery, and post-cutover end-user support;
- Decommissioning of the on-premises LMS server hardware and ancillary equipment, including secure data destruction; and
- All routine end-user support, helpdesk, and YAT-side operational ICT activities.

This out-of-scope allocation is reflected in the YAT-internal cost categories of the ICT Cost Baseline for this project. Any change to this allocation requires a Change Request under clause 9.

## 6. Deliverables and milestones

### 6.1 Phase 1 Deliverables

| Ref | Deliverable | Format | Acceptance evidence |
|---|---|---|---|
| D1.1 | Strategic and environmental analysis | Written analysis document | Submitted document; ICT Manager review |
| D1.2 | Five-year Cost-Benefit Analysis | Completed CBA workbook + narrative | Submitted CBA; ICT Manager + Finance review |
| D1.3 | Prioritised action plan and architecture recommendation | Written plan + architecture overview | Submitted plan; ICT Manager review |
| D1.4 | Board-ready Business Case document | Written Business Case | Submitted Business Case; ICT Manager review prior to board submission |
| D1.5 | Business Case presentation | Live presentation to YAT leadership / board | Observed presentation; written feedback record |

### 6.2 Phase 2 Deliverables

| Ref | Deliverable | Format | Acceptance evidence |
|---|---|---|---|
| D2.1 | Cloud foundation environment built per approved action plan | Running cloud infrastructure | Smoke-test evidence; ICT Manager review of deployed environment |
| D2.2 | Deployment Report | Written report with as-built configuration, decisions, evidence, and handover content | Submitted report; ICT Manager acceptance |
| D2.3 | Operational handover to YAT in-house ICT | Handover walk-through + documentation | YAT ICT staff sign-off on operational capability |

### 6.3 Phase 3 Deliverables

| Ref | Deliverable | Format | Acceptance evidence |
|---|---|---|---|
| D3.1 | HA Design document | Written HA architecture design including SPOF analysis, design decisions, and simulation plan | Submitted document; ICT Manager review |
| D3.2 | HA hardening implemented in the cloud environment | Running infrastructure with HA properties | Running configuration evidenced; failure-simulation results |
| D3.3 | HA Deployment Report and project closure pack | Written report including simulation evidence, residual risks, operational handover, and closure sign-off section | Submitted report; ICT Manager + senior management sign-off under the Change Management Procedure |

The detailed delivery schedule for each Phase, including milestone dates, is maintained by the Engagement Director (clause 10.2) and reviewed at the fortnightly principals meeting.

## 7. Term, suspension, and termination

### 7.1 Term

This Agreement commences on the Effective Date and continues until Acceptance of Deliverable D3.3 (Phase 3 closure pack) or earlier termination under this clause.

### 7.2 Suspension

YAT may suspend the Engagement at any time by written notice to MTS. Where suspension exceeds 20 Business Days, the Parties will meet to agree revised milestones and any reasonable additional costs payable by YAT.

### 7.3 Termination for convenience

YAT may terminate this Agreement at any time by giving MTS not less than 20 Business Days' written notice. On termination for convenience, YAT will pay MTS for Services satisfactorily performed up to the date of termination, plus reasonable demobilisation costs.

### 7.4 Termination for cause

Either Party may terminate this Agreement immediately by written notice if the other Party:

(a) commits a material breach of this Agreement that is not capable of remedy, or is capable of remedy and is not remedied within 10 Business Days of written notice; or

(b) becomes insolvent, enters administration, or is wound up.

### 7.5 Effect of termination

On any termination:

(a) MTS will deliver to YAT all work in progress, working papers, and Deliverables (in whatever state) for which YAT has paid or is liable to pay;

(b) the Parties' rights and obligations existing prior to termination survive;

(c) clauses 12 (Confidentiality), 13 (Intellectual Property), and 14 (Warranties, Liability, Insurance) survive termination.

## 8. Acceptance

### 8.1 Submission

MTS will submit each Deliverable to the YAT ICT Manager for review with all evidence specified in clause 6 for that Deliverable.

### 8.2 Review period

YAT will review each submitted Deliverable within **5 Business Days** of submission and will either:

(a) accept the Deliverable in writing; or

(b) reject the Deliverable in writing, specifying the reasons by reference to the acceptance evidence requirements in clause 6.

### 8.3 Re-submission

If a Deliverable is rejected, MTS will remediate and re-submit within a reasonable period agreed with YAT. The review cycle in clause 8.2 applies to each re-submission.

### 8.4 Deemed acceptance

If YAT does not provide a written response within the review period in clause 8.2, the Deliverable is deemed accepted.

### 8.5 Phase progression

MTS will not commence Deliverables in a subsequent Phase until all Deliverables in the prior Phase have been Accepted (whether expressly or by deemed acceptance), except with YAT's prior written agreement.

## 9. Change control

### 9.1 Change Management Procedure

Substantive changes to the scope, Deliverables, fees, or timing of the Services are governed by:

(a) the YAT Change Management Procedure on the YAT intranet (incorporated by reference); and

(b) the Change Request process in this clause 9.

### 9.2 Change Request process

Either Party may initiate a Change Request in writing. A Change Request will set out:

- A description of the proposed change;
- The reason for the change;
- The impact on scope, Deliverables, fees, timing, and risk;
- Any associated rollout, rollback, or transition arrangements; and
- The proposed approval authority.

### 9.3 Approval

A Change Request takes effect only on written approval by the YAT ICT Manager. Where the change crosses the operational impact thresholds in the YAT Change Management Procedure, additional approvals (senior management, affected business unit heads) are required as set out in that Procedure.

### 9.4 Variation

Once approved, a Change Request is appended to this Agreement as a numbered variation and forms part of the Agreement.

## 10. Governance and key contacts

### 10.1 Principals

| Role | YAT | MTS |
|---|---|---|
| **Project Sponsor** | Sam Walker, ICT Manager | — |
| **Engagement Director** | — | Jordan Chen, Engagement Director |
| **Senior Consultant** | — | Pat Lin, Senior Consultant |
| **Acceptance authority** | Sam Walker, ICT Manager | — |
| **Escalation contact** | Robin Ng, Chief Financial Officer | Jordan Chen, Engagement Director |

### 10.2 Reporting and meetings

- The MTS Senior Consultant will provide a weekly written status report to the YAT ICT Manager covering progress, upcoming Deliverables, issues, and risks.
- The Parties' principals will meet fortnightly during the active engagement to review progress and address any matters arising. Either Party may request additional meetings on reasonable notice.

### 10.3 Escalation

Matters that cannot be resolved between the YAT ICT Manager and the MTS Senior Consultant are escalated, in sequence, to:

1. The MTS Engagement Director (consultant side); then
2. The YAT Chief Financial Officer (client side); then
3. The YAT Chief Executive Officer in consultation with MTS senior leadership.

## 11. Fees and payment

### 11.1 Phase fees

MTS will be paid the following fixed fees for satisfactory completion of each Phase (excluding GST):

| Phase | Fee (AUD ex GST) |
|---|---:|
| Phase 1 — Analysis and Business Case | $45,000 |
| Phase 2 — Cloud Foundation Build | $95,000 |
| Phase 3 — High Availability Hardening | $45,000 |
| **Total Engagement** | **$185,000** |

### 11.2 Payment terms

(a) Phase fees are invoiced on Acceptance of the final Deliverable for that Phase.

(b) Invoices are payable within **14 Business Days** of the invoice date.

(c) Late payments accrue simple interest at the Reserve Bank of Australia cash-rate target plus 2 per cent per annum.

### 11.3 Expenses

Travel and reasonable disbursements are billed at cost. Disbursements over $500 (per item or per week) require YAT pre-approval.

### 11.4 GST

All amounts in this Agreement are exclusive of GST. Where GST applies, MTS will issue a tax invoice for the GST-inclusive amount.

### 11.5 Variation

Change Requests approved under clause 9 may vary fees. Variations are billed and paid in accordance with this clause 11 as varied.

## 12. Confidentiality and data protection

### 12.1 Confidentiality

Each Party agrees to:

(a) hold the other Party's Confidential Information in confidence;

(b) use Confidential Information only for the purposes of this Engagement; and

(c) not disclose Confidential Information except to its own personnel, advisers, or sub-contractors who have a legitimate need to know and who are bound by equivalent obligations of confidentiality.

The obligations in this clause 12.1 do not apply to information that is publicly available (other than through breach of this Agreement), independently developed by the receiving Party, or required to be disclosed by law.

### 12.2 Personal information

MTS will handle any YAT-held personal information in accordance with:

(a) the *Privacy Act 1988* (Cth) and the Australian Privacy Principles; and

(b) the YAT Privacy / Data Handling Policy (incorporated by reference).

### 12.3 Data residency

YAT data, including any personal information of YAT students or staff, must be processed and stored in Australia. Cloud services used to host YAT data under this Engagement must be configured to use Australian regions (e.g. AWS `ap-southeast-2`). Engagement of any overseas-hosted service requires the privacy impact assessment process in the YAT Privacy / Data Handling Policy.

### 12.4 Data return or destruction

On termination of this Agreement, MTS will return to YAT or, on YAT's written direction, securely destroy all YAT Confidential Information in MTS's possession or control, except where retention is required by law.

## 13. Intellectual property

### 13.1 Pre-existing IP

Each Party retains ownership of intellectual property it owned before the Effective Date or developed independently of this Engagement (**Pre-existing IP**).

### 13.2 New IP

Intellectual property created specifically for YAT under this Agreement (**New IP**) is assigned to YAT on payment of the relevant Phase fee. New IP includes the deployed cloud infrastructure configuration, environment-specific scripts and templates, and Deliverable documents.

### 13.3 Background tooling

Generic tooling, scripts, libraries, accelerators, methodologies, and architectural patterns that MTS uses across multiple engagements (**Background Tooling**) remain the Pre-existing IP of MTS. MTS grants YAT a perpetual, royalty-free, non-exclusive licence to use Background Tooling incorporated into any Deliverable to the extent necessary for YAT's use of that Deliverable.

### 13.4 No third-party IP infringement

MTS warrants that the Deliverables will not infringe the intellectual property rights of any third party.

## 14. Warranties, liability, and insurance

### 14.1 Warranties

MTS warrants that:

(a) the Services will be performed with reasonable skill and care, by appropriately qualified personnel;

(b) MTS holds (and will maintain throughout the Engagement) all licences, registrations, and authorisations required for the performance of the Services; and

(c) MTS will comply with all laws and regulations applicable to the performance of the Services.

### 14.2 Insurance

MTS will maintain throughout the Engagement, with reputable insurers:

(a) professional indemnity insurance with a limit of indemnity of not less than **$5,000,000** per claim;

(b) public liability insurance with a limit of indemnity of not less than **$10,000,000** per occurrence; and

(c) workers' compensation insurance as required by law.

MTS will provide YAT with certificates of currency on reasonable request.

### 14.3 Liability cap

Subject to clause 14.4, the total aggregate liability of each Party under or in connection with this Agreement is limited to **twice the aggregate fees** paid or payable by YAT under this Agreement.

### 14.4 Excluded liability

The liability cap in clause 14.3 does not apply to liability arising from:

(a) breach of clause 12 (Confidentiality and data protection);

(b) infringement of intellectual property rights;

(c) wilful default or fraud; or

(d) personal injury or death caused by negligence.

### 14.5 Exclusion of indirect loss

Neither Party is liable to the other for any indirect, consequential, special, or punitive loss, including loss of profits, loss of revenue, loss of business opportunity, or loss of goodwill, however arising.

## 15. General provisions

### 15.1 Governing law and jurisdiction

This Agreement is governed by the laws of Victoria, Australia. Each Party submits to the exclusive jurisdiction of the courts of Victoria and the federal courts sitting in Victoria.

### 15.2 Dispute resolution

The Parties will attempt to resolve any dispute arising under this Agreement in the following order:

1. Good-faith discussions between the YAT ICT Manager and the MTS Senior Consultant;
2. Escalation per clause 10.3;
3. Mediation conducted by a mediator agreed between the Parties (or, if not agreed within 10 Business Days, nominated by the Resolution Institute);
4. Litigation per clause 15.1.

Neither Party may commence litigation until the steps above have been exhausted, except for urgent injunctive relief.

### 15.3 Notices

Notices under this Agreement must be in writing and may be delivered by hand, email, or postal service to the addresses set out in clause 1 (or as varied by written notice). Notices are taken to be received on delivery (hand or email during Business Hours) or on the second Business Day after posting.

### 15.4 Entire agreement

This Agreement (including any approved Change Requests and any documents incorporated by reference) constitutes the entire agreement between the Parties about its subject matter and supersedes all prior agreements, representations, and understandings.

### 15.5 No waiver

A failure or delay by either Party to exercise a right under this Agreement does not operate as a waiver of that right.

### 15.6 Severability

If any provision of this Agreement is held invalid or unenforceable, the remaining provisions continue in full force and effect.

### 15.7 Assignment

Neither Party may assign its rights or obligations under this Agreement without the written consent of the other Party (which must not be unreasonably withheld), except that either Party may assign to a related body corporate on prior written notice.

### 15.8 Counterparts

This Agreement may be executed in any number of counterparts, each of which is an original and all of which together constitute one document. Execution by electronic signature is permitted.

## 16. Signatures

**Executed as an Agreement on 15 January 2026.**

---

**Signed for and on behalf of YAT College Pty Ltd:**

|  |  |
|---|---|
| Signature | _____________________________________ |
| Name | **Robin Ng** |
| Title | Chief Financial Officer |
| Date | 15 January 2026 |
| Witness signature | _____________________________________ |
| Witness name | **Alex Reid** |
| Witness title | Chief Operating Officer |

---

**Signed for and on behalf of MP Tech Solutions Pty Ltd (trading as MTS Consulting):**

|  |  |
|---|---|
| Signature | _____________________________________ |
| Name | **Jordan Chen** |
| Title | Engagement Director |
| Date | 15 January 2026 |
| Witness signature | _____________________________________ |
| Witness name | **Morgan Tate** |
| Witness title | Managing Director, MTS Consulting |
