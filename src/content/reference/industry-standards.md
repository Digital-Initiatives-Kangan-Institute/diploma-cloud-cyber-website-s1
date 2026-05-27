---
title: 'Industry Standards Reference List'
description: 'Curated reading list of cloud, security, and IT industry standards relevant to YAT operations and engagement work.'
appearsIn:
  - s1-cl1-at1
  - s1-cl1-at2
  - s1-cl1-at3
uocReferences:
  - '[ICTCLD401 KE 1] industry technology standards used in cloud computing solutions and services'
  - '[ICTCLD502 KE 1] industry technology standards used in cloud computing solutions and services'
  - '[ICTCLD502 AC 5] industry standards'
---

## How to use this list

Staff and engaged contractors should refer to this list when a design decision calls for application of "industry technology standards" or "industry standard hardware and software". Cite the relevant standard by name and version where applicable. Where a specific engagement calls out a particular framework (e.g. the User Access Policy is aligned to the ACSC Essential Eight), use that framework for the specific work and reference this page for the broader landscape.

## Cloud computing — foundational definitions

- **NIST SP 800-145 — The NIST Definition of Cloud Computing.** Authoritative definitions of the service models (IaaS / PaaS / SaaS) and deployment models (private / public / hybrid / community) used throughout YAT cloud work.
- **ISO/IEC 17788 — Cloud computing — Overview and vocabulary.** Aligned international counterpart to NIST 800-145.

## Cloud security and privacy

- **ISO/IEC 27001 — Information Security Management Systems (ISMS).** The umbrella standard for information security controls; YAT's security baseline (see the Security and Incident Response policy) is broadly aligned to its control families.
- **ISO/IEC 27017 — Code of practice for information security controls based on ISO/IEC 27002 for cloud services.** Cloud-specific extension of ISO 27001/27002; covers shared-responsibility allocation and cloud-specific controls.
- **ISO/IEC 27018 — Code of practice for protection of personally identifiable information (PII) in public clouds.** Relevant when YAT is processing student PII in cloud services.
- **ACSC Essential Eight (Australian Cyber Security Centre).** YAT's security baseline is aligned to this — see the Security and Incident Response policy.
- **Australian Government Information Security Manual (ISM) — Cloud Computing chapter.** ACSC guidance on consuming cloud services; relevant where YAT processes student personal information.

## Architecture frameworks

- **AWS Well-Architected Framework.** Six pillars — Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimisation, Sustainability. Used for review and design rationale across YAT AWS work.
- **AWS Cloud Adoption Framework (CAF).** Six perspectives (Business, People, Governance, Platform, Security, Operations) for cloud-adoption planning.
- **Microsoft Cloud Adoption Framework.** Useful for context given YAT's Windows Server / Office 365 footprint.

## Operational management

- **ITIL 4 (IT Infrastructure Library).** Service management framework — particularly the change management, incident management, and service request management practices referenced in YAT's Change Management Procedure and Security & Incident Response policy.
- **ISO/IEC 20000 — Service management.** Aligned international standard for service management; conceptually close to ITIL.

## Web application and data

- **OWASP Top 10 (Open Web Application Security Project).** The standard reference list of web-application security risks; relevant to the LMS as a web application exposed to the internet.
- **OWASP Application Security Verification Standard (ASVS).** Deeper application-security control catalogue.
- **WCAG 2.1 Level AA (Web Content Accessibility Guidelines).** Required for YAT's LMS; also feeds the *Disability Discrimination Act 1992* (Cth) compliance.

## Network and identity

- **IETF RFC standards** for the underlying protocols (TCP/IP, DNS, TLS, OAuth 2.0, OIDC, SAML 2.0). Not a single document — cited individually when the work calls for it.
- **NIST SP 800-63 — Digital Identity Guidelines.** Authentication and identity management reference.

## RTO-sector specific

- **Standards for Registered Training Organisations (RTOs) 2015.** ASQA-administered; sets the framework within which YAT operates. Cross-referenced from the Privacy Policy and the Backup and Retention Policy.
- **AVETMISS (Australian Vocational Education and Training Management Information Statistical Standard).** Data reporting standard for RTO statutory reporting to ASQA / DET.

## Notes

- Standards versions listed are the latest at the time of writing. Where a more recent version is published before delivery, the more recent version applies.
- Several standards above are paywalled (ISO/IEC items). The institution library or vendor summaries (e.g. AWS documentation summaries of the Well-Architected pillars) are acceptable secondary sources.
