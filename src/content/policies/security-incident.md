---
title: 'Security Baseline and Incident Response'
description: 'YAT security baseline (ACSC Essential Eight aligned) and the response process for security incidents and data breaches.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
  - s1-cl2-at1
  - s1-cl2-at2
  - s1-cl3-at1
  - s1-cl3-at2
  - s1-cl3-at3
uocReferences:
  - '[ICTCLD502 AC 5] organisational procedures'
---

## 1. Purpose

This document captures YAT College's information security baseline (the controls expected to be in place across YAT's environment) and its incident response process (what happens when something goes wrong).

It works in conjunction with the User Access Policy, the Privacy / Data Handling Policy, the Backup and Retention Policy, and the ICT Change Management Procedure.

## 2. Security baseline

YAT's security baseline is aligned to the Australian Cyber Security Centre's (ACSC) **Essential Eight** mitigation strategies. The baseline applies to all YAT-managed systems, including the migrated cloud LMS environment.

| Essential Eight strategy | YAT implementation |
|---|---|
| Application control | Windows AppLocker (or equivalent) restricting installable software on staff devices; cloud-side: only approved AMIs and container images permitted |
| Patch applications | Monthly patching cycle for LMS and other applications, faster for security-rated updates |
| Configure Microsoft Office macro settings | Macros disabled by default; signed macros only where required |
| User application hardening | Web browsers configured to ACSC-recommended baselines; legacy plugins disabled |
| Restrict administrative privileges | Privileged Access Management per the User Access Policy §8 |
| Patch operating systems | Monthly OS patch cycle; critical / "exploited" patches applied within 48 hours |
| Multi-factor authentication | Per the User Access Policy §7 |
| Regular backups | Per the Backup and Retention Policy |

Additional controls in place at YAT:

- **Network segmentation** — student zone vs staff zone
- **Identity directory hardening** — AD baseline configuration; service accounts named and audited
- **Logging** — central authentication and access logs (12-month rolling retention per the Backup and Retention Policy)
- **Endpoint protection** — anti-malware on all centrally-managed Windows devices
- **Email filtering** — Office 365 anti-spam, anti-phishing, attachment scanning
- **Physical security** — server room is physically secured and air-conditioned

## 3. Incident definitions and severity

A **security incident** is any event that has compromised, or is reasonably suspected of having compromised, the confidentiality, integrity, or availability of YAT systems or YAT-held information.

| Severity | Definition | Examples |
|---|---|---|
| **Severity 1 — Critical** | Active compromise affecting mission-critical systems, or confirmed unauthorised access to personal information, or systems unavailable | LMS down due to suspected intrusion; ransomware encrypting LMS data; confirmed unauthorised export of student personal information |
| **Severity 2 — High** | Significant security event with operational impact but no confirmed data compromise | Successful phishing of a privileged account credential (no confirmed misuse yet); malware detected on a staff device |
| **Severity 3 — Medium** | Suspicious activity warranting investigation; no confirmed compromise; limited impact | Repeated failed sign-ins from an unusual location; antivirus alert without confirmed infection |
| **Severity 4 — Low** | Policy breach or minor security hygiene issue | Single user sharing a password; unauthorised software installation attempt blocked |

## 4. Incident response process

YAT follows a six-stage incident response process aligned with industry standard (NIST 800-61 / similar).

1. **Detect.** Incidents are detected via: alerts from monitoring (authentication logs, endpoint protection, network filtering), user reports (via Acceptable Use Policy §6), and external notifications (e.g. cloud vendor alerts, ASQA, partner organisations).
2. **Triage.** ICT Service Desk performs initial triage and assigns severity. Severity 1 and 2 incidents are escalated to the ICT Manager immediately. Engaged consultants participate in triage for cloud-environment incidents in scope of their engagement.
3. **Contain.** Immediate actions to limit the spread or impact — isolate affected systems, disable compromised accounts, revoke session tokens, block the source IP at the edge.
4. **Eradicate.** Remove the root cause — remove malware, close the exploited vulnerability, terminate the attacker's persistence mechanism.
5. **Recover.** Restore service — restore from backups if needed (per the Backup and Retention Policy), re-enable affected systems, verify integrity.
6. **Review.** Post-incident review: document root cause, contributing factors, what worked, what didn't. Update policies, controls, or training as required. Findings reported to ICT Manager and senior management as appropriate.

## 5. External notification obligations

- **Notifiable Data Breaches scheme** — if an incident is reasonably believed to have resulted in unauthorised access to or disclosure of personal information likely to cause serious harm, YAT will notify affected individuals and the OAIC as required by the *Privacy Act 1988*. The ICT Manager makes the assessment in consultation with the CEO and (where appropriate) external legal counsel.
- **ASQA / DET** — incidents materially affecting RTO operations or student records are reported to the relevant regulator as required by the Standards for RTOs 2015.
- **Cyber Security Centre (ACSC) reporting** — significant cyber incidents are reported to the ACSC via ReportCyber to support intelligence sharing.

## 6. Roles and responsibilities

- **ICT Manager:** incident owner; severity triage; external notification decisions; post-incident review chair.
- **ICT staff (operators):** detection, triage, containment, eradication, recovery technical work.
- **Communications lead:** coordinates internal and external communications during a Severity 1 or 2 incident.
- **All staff and students:** report suspected security events promptly per the Acceptable Use Policy.

## 7. Policy ownership and review

- **Owner:** ICT Manager.
- **Review cadence:** annually, or sooner if triggered by a material incident, change in threat landscape, or change in legislation.
- **Approval:** policy changes follow the ICT Change Management Procedure.
