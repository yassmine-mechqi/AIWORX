# AIWORX — Entity Catalog

## 1. Purpose

This document defines the business entities identified for the AIWORX platform.

The entity catalog is used as a reference between:

* functional analysis;
* business rules;
* workflows;
* database design;
* entity relationships;
* constraints;
* indexes;
* data dictionary;
* Prisma schema;
* database migrations.

This document identifies the entities that may require persistent storage.

It does not define the final physical database schema.

Technical implementation details such as column types, indexes, foreign keys and database-specific constraints are defined in the subsequent database documents.

---

# 2. Entity Selection Principles

An entity is retained in the catalog when it represents:

* an important business object;
* information that must be persisted;
* a business object with its own lifecycle;
* a versioned object;
* a relationship requiring persistent information;
* a financial or contractual record;
* an audit or traceability record;
* a communication or platform object that must be stored.

A workflow or business process is not automatically considered an entity.

For example:

* Matching is a business process and does not automatically require a `Matching` entity.
* Qualification is a business process and does not automatically require a `Qualification` entity.
* Selection is a business process and does not automatically require a `Selection` entity.

A persistent entity shall only be created when the business requirements require information to be stored and retrieved.

---

# 3. Domain Structure

The AIWORX platform is divided into the following main business domains:

1. Identity
2. Marketplace
3. Contract
4. Delivery
5. Trust
6. Finance
7. Platform

These domains correspond to the modular architecture identified during the functional analysis.

---

# 4. Identity Entities

## 4.1 User

**Purpose:** Represents a person using the AIWORX platform.

A user may participate in the platform as:

* client;
* provider;
* AIWORX advisor;
* quality expert;
* financial administrator;
* administrator.

The exact account fields remain subject to the functional requirements.

**Status:** Confirmed

---

## 4.2 Organization

**Purpose:** Represents an organization using AIWORX.

An organization may act as a client or represent a provider organization.

The exact organization structure remains subject to the validated business rules.

**Status:** Confirmed

---

## 4.3 Role

**Purpose:** Represents an authorization role assigned to a user.

Examples identified in the functional analysis include:

* client;
* provider;
* AIWORX advisor;
* quality expert;
* financial administrator;
* administrator.

**Status:** Confirmed

---

## 4.4 Permission

**Purpose:** Represents an authorization permission used to control access to protected operations.

The platform requires role-based permissions and least-privilege access.

**Status:** Confirmed

---

## 4.5 OrganizationMembership

**Purpose:** Represents the relationship between a user and an organization when organizational membership must be persisted.

This entity allows the system to maintain:

* the organization;
* the user;
* the user's role within the organization;
* membership status;
* membership history where required.

**Status:** To validate according to the final V1 organization model.

---

# 5. Marketplace Entities

## 5.1 ProviderProfile

**Purpose:** Represents the professional profile of a service provider.

The profile may contain information used for:

* provider presentation;
* skills;
* experience;
* service categories;
* references;
* availability;
* matching;
* reputation.

**Status:** Confirmed

---

## 5.2 ProviderVerification

**Purpose:** Stores provider verification and qualification information.

The cahier des charges requires verified providers and eligibility controls before certain marketplace actions.

**Status:** Confirmed

---

## 5.3 ProviderDocument

**Purpose:** Represents documents supplied by a provider for qualification, verification or compliance.

The exact required documents remain configurable and must not be hard-coded before validation.

**Status:** Confirmed

---

## 5.4 ProviderSkill

**Purpose:** Represents a skill associated with a provider.

Skills are used as part of provider qualification and matching.

**Status:** Confirmed

---

## 5.5 ProviderCertification

**Purpose:** Represents a professional certification associated with a provider when applicable.

The exact certification model depends on the final provider qualification rules.

**Status:** To validate

---

## 5.6 ServiceCategory

**Purpose:** Represents a service category used to classify marketplace needs and providers.

**Status:** Confirmed

---

## 5.7 ServiceSubcategory

**Purpose:** Represents a subdivision of a service category.

The final category/subcategory structure remains configurable.

**Status:** Confirmed

---

## 5.8 Service

**Purpose:** Represents a service or service classification when a persistent service catalog is required.

The cahier des charges mentions a fixed/configurable catalog as a possible platform capability.

**Status:** To validate

---

## 5.9 ProjectRequest

**Purpose:** Represents the client's business need or project request.

A project request may contain:

* context;
* objective;
* scope;
* deliverables;
* constraints;
* calendar;
* budget;
* acceptance criteria;
* files;
* publication mode.

The project request has a lifecycle including states such as:

* draft;
* submitted;
* qualification;
* additional information required;
* qualified/validated;
* published;
* suspended;
* assigned;
* cancelled;
* archived.

**Status:** Confirmed

---

## 5.10 Requirement

**Purpose:** Represents a requirement belonging to a project request.

Requirements may describe expected functional, technical, quality or acceptance conditions.

The exact separation between `ProjectRequest`, `Requirement` and `Specification` must be validated before the final physical schema.

**Status:** To validate

---

## 5.11 RequirementVersion

**Purpose:** Represents a version of a requirement when historical versions must be preserved.

The platform requires version management for important business objects.

**Status:** To validate together with the final Requirement model

---

## 5.12 Specification

**Purpose:** Represents the structured specification or cahier des charges associated with a project request.

The cahier des charges requires the transformation of an initial need into a structured project specification.

The exact relationship between `ProjectRequest`, `Requirement` and `Specification` remains to be validated.

**Status:** To validate

---

# 6. Proposal Entities

## 6.1 Proposal

**Purpose:** Represents an offer submitted by a provider in response to a project request.

An offer may contain:

* summary;
* understanding;
* methodology;
* steps;
* deliverables;
* exclusions;
* dependencies;
* schedule;
* price;
* validity;
* availability;
* references;
* questions;
* milestones.

The offer lifecycle includes states such as:

* draft;
* submitted;
* clarification;
* reconfirmation required;
* preselected;
* negotiation;
* selected;
* rejected;
* withdrawn;
* expired.

**Status:** Confirmed

---

## 6.2 ProposalVersion

**Purpose:** Represents a historical version of a proposal.

After submission, a modification creates a new version without overwriting the previous version.

**Status:** Confirmed

---

# 7. Contract Entities

## 7.1 Contract

**Purpose:** Represents the contractual agreement between the parties.

The contract contains information such as:

* parties;
* contractual terms;
* dates;
* amount;
* applicable rules;
* status.

**Status:** Confirmed

---

## 7.2 ContractVersion

**Purpose:** Represents a version of a contract.

Contract versions must preserve the historical state of contractual information.

**Status:** Confirmed

---

## 7.3 Signature

**Purpose:** Represents a signature associated with a contract version.

The platform must preserve:

* signature status;
* signature evidence;
* timestamp;
* information returned by the external signature provider.

**Status:** Confirmed

---

# 8. Delivery Entities

## 8.1 Mission

**Purpose:** Represents the execution of a contracted service.

A mission is associated with:

* client;
* provider;
* contract;
* dates;
* status;
* amount;
* applicable rules.

**Status:** Confirmed

---

## 8.2 Milestone

**Purpose:** Represents a milestone within a mission.

A milestone may contain:

* title;
* objective;
* responsible party;
* target date;
* amount;
* acceptance criteria;
* status.

Milestones are also used in financial allocation and validation workflows.

**Status:** Confirmed

---

## 8.3 Deliverable

**Purpose:** Represents a deliverable produced during a mission.

Deliverables are submitted and evaluated against the acceptance criteria defined for the mission.

**Status:** Confirmed

---

## 8.4 DeliverableVersion

**Purpose:** Represents a version of a deliverable.

The platform must preserve previous deliverable versions when corrections are required.

**Status:** Confirmed

---

# 9. Trust and Quality Entities

## 9.1 QualityReview

**Purpose:** Represents a quality control performed on a deliverable or project result.

The quality workflow includes:

1. submission;
2. review;
3. comparison with requirements;
4. identification of deviations;
5. recording of the result;
6. validation or correction request.

**Status:** Confirmed

---

## 9.2 QualityReport

**Purpose:** Represents the result/report produced following a quality review.

The report may contain:

* review result;
* evidence;
* identified deviations;
* validation information;
* correction information.

**Status:** Confirmed

---

## 9.3 CorrectionRequest

**Purpose:** Represents a request for correction following a quality review.

A correction request must allow the platform to track:

* reason;
* requested correction;
* status;
* associated deliverable version;
* subsequent submission.

**Status:** Confirmed

---

## 9.4 Evaluation

**Purpose:** Represents an evaluation or review associated with a completed mission.

The cahier des charges requires:

* client evaluations after a real mission;
* reputation information;
* right of response;
* mechanisms against fraudulent evaluations;
* documented quality dimensions.

The exact visibility rules remain to be validated.

**Status:** Confirmed

---

## 9.5 Dispute

**Purpose:** Represents a dispute involving parties to a mission or transaction.

The dispute workflow includes:

* opening;
* suspension or blocking when applicable;
* evidence collection;
* decision;
* execution of the decision.

The exact dispute levels and decision rules remain configurable/to be validated.

**Status:** Confirmed

---

## 9.6 DisputeEvidence

**Purpose:** Represents evidence attached to a dispute.

Evidence may include files, messages, documents or other authorized supporting information.

**Status:** Confirmed

---

## 9.7 DisputeDecision

**Purpose:** Represents a decision taken during the resolution of a dispute.

The exact decision authority and dispute levels remain to be validated.

**Status:** To validate

---

# 10. Finance Entities

## 10.1 Payment

**Purpose:** Represents a payment associated with a mission, project or financial obligation.

The payment domain must support:

* payment status;
* amount;
* external payment reference;
* association with the relevant business object;
* payment lifecycle.

**Status:** Confirmed

---

## 10.2 PaymentTransaction

**Purpose:** Represents a financial transaction processed through the payment provider.

The external payment provider remains the source of truth for the actual movement of funds.

**Status:** Confirmed

---

## 10.3 PaymentEvent

**Purpose:** Represents an event received from or generated by the payment process.

Payment events are required for traceability and idempotent webhook processing.

**Status:** Confirmed

---

## 10.4 FinancialEntry

**Purpose:** Represents an internal financial ledger entry.

The platform must maintain an internal financial register without retroactively modifying validated financial entries.

Financial information may include:

* gross client amount;
* client fees;
* provider base amount;
* commission;
* provider net amount;
* taxes;
* refunds;
* reversements.

**Status:** Confirmed

---

## 10.5 Invoice

**Purpose:** Represents an invoice associated with a financial transaction or service.

The exact invoicing model and tax rules remain subject to final business validation.

**Status:** Confirmed

---

## 10.6 Refund

**Purpose:** Represents a refund operation.

Refunds require traceability and appropriate administrative validation.

**Status:** Confirmed

---

# 11. Platform Entities

## 11.1 Conversation

**Purpose:** Represents a communication channel between authorized participants.

The platform defines different communication contexts, including:

* pre-sales;
* mission;
* quality;
* finance;
* dispute.

**Status:** Confirmed

---

## 11.2 ConversationParticipant

**Purpose:** Represents a participant in a conversation.

This entity allows the system to control who may access a conversation.

**Status:** Confirmed

---

## 11.3 Message

**Purpose:** Represents a message exchanged through the internal messaging system.

Messages must support:

* sender;
* conversation;
* content;
* attachments when authorized;
* timestamps;
* audit information.

The platform must preserve the original content when messages are edited.

**Status:** Confirmed

---

## 11.4 Notification

**Purpose:** Represents a platform notification generated by a business event.

Notifications may be delivered through:

* platform;
* e-mail;
* WhatsApp for important events.

The notification rules must remain configurable.

**Status:** Confirmed

---

## 11.5 File

**Purpose:** Represents a stored file or document associated with an authorized business object.

Files may be associated with:

* project requests;
* provider verification;
* contracts;
* missions;
* deliverables;
* quality reviews;
* disputes;
* conversations.

The platform requires:

* controlled access;
* metadata;
* versioning;
* confidentiality level;
* antivirus scanning;
* temporary access URLs;
* retention rules.

**Status:** Confirmed

---

## 11.6 AuditLog

**Purpose:** Represents an audit record of an important action performed on the platform.

The audit system must allow important actions and modifications to be traced.

Examples include:

* authorization-sensitive actions;
* financial operations;
* contract operations;
* important status changes;
* modifications of business objects;
* security events.

**Status:** Confirmed

---

# 12. Entities Not Automatically Created

The following concepts are business processes or functions and should not automatically become database entities.

## 12.1 Matching

Matching is a business process combining:

* blocking filters;
* weighted scoring;
* provider eligibility;
* skills;
* sector experience;
* quality;
* deadlines;
* eligibility.

The exact matching weights remain configurable.

A dedicated `Matching` entity shall only be created if the final requirements demonstrate a need to persist matching results, executions or history.

**Status:** Process — no entity decision yet

---

## 12.2 Qualification

Qualification is a workflow applied to needs and providers.

A separate `Qualification` entity shall only be created if qualification decisions or qualification history require independent persistence.

**Status:** Process — no entity decision yet

---

## 12.3 Selection

Selection is the business process through which the client chooses an offer/provider.

It does not automatically require a separate `Selection` entity.

Selection information may initially belong to the relevant proposal, project request or contract depending on the final data model.

**Status:** To validate

---

## 12.4 Negotiation

Negotiation is a business workflow involving proposal changes and communications.

A separate negotiation entity is not automatically required.

Historical proposal versions and messages may provide the required traceability.

**Status:** Process — no entity decision yet

---

## 12.5 Verification

Verification is a business process.

Persistent verification information is represented through provider verification and provider documents where required.

**Status:** Process

---

# 13. Entity Status Summary

| Domain      | Entity                  | Status      |
| ----------- | ----------------------- | ----------- |
| Identity    | User                    | Confirmed   |
| Identity    | Organization            | Confirmed   |
| Identity    | Role                    | Confirmed   |
| Identity    | Permission              | Confirmed   |
| Identity    | OrganizationMembership  | To validate |
| Marketplace | ProviderProfile         | Confirmed   |
| Marketplace | ProviderVerification    | Confirmed   |
| Marketplace | ProviderDocument        | Confirmed   |
| Marketplace | ProviderSkill           | Confirmed   |
| Marketplace | ProviderCertification   | To validate |
| Marketplace | ServiceCategory         | Confirmed   |
| Marketplace | ServiceSubcategory      | Confirmed   |
| Marketplace | Service                 | To validate |
| Marketplace | ProjectRequest          | Confirmed   |
| Marketplace | Requirement             | To validate |
| Marketplace | RequirementVersion      | To validate |
| Marketplace | Specification           | To validate |
| Marketplace | Proposal                | Confirmed   |
| Marketplace | ProposalVersion         | Confirmed   |
| Contract    | Contract                | Confirmed   |
| Contract    | ContractVersion         | Confirmed   |
| Contract    | Signature               | Confirmed   |
| Delivery    | Mission                 | Confirmed   |
| Delivery    | Milestone               | Confirmed   |
| Delivery    | Deliverable             | Confirmed   |
| Delivery    | DeliverableVersion      | Confirmed   |
| Trust       | QualityReview           | Confirmed   |
| Trust       | QualityReport           | Confirmed   |
| Trust       | CorrectionRequest       | Confirmed   |
| Trust       | Evaluation              | Confirmed   |
| Trust       | Dispute                 | Confirmed   |
| Trust       | DisputeEvidence         | Confirmed   |
| Trust       | DisputeDecision         | To validate |
| Finance     | Payment                 | Confirmed   |
| Finance     | PaymentTransaction      | Confirmed   |
| Finance     | PaymentEvent            | Confirmed   |
| Finance     | FinancialEntry          | Confirmed   |
| Finance     | Invoice                 | Confirmed   |
| Finance     | Refund                  | Confirmed   |
| Platform    | Conversation            | Confirmed   |
| Platform    | ConversationParticipant | Confirmed   |
| Platform    | Message                 | Confirmed   |
| Platform    | Notification            | Confirmed   |
| Platform    | File                    | Confirmed   |
| Platform    | AuditLog                | Confirmed   |

---

# 14. Open Entity Decisions

The following points must remain open until validated.

## E-001 — Project Request, Requirement and Specification

The exact separation between:

* `ProjectRequest`;
* `Requirement`;
* `RequirementVersion`;
* `Specification`

must be validated.

No technical implementation shall assume the final separation before validation.

---

## E-002 — Organization Membership

The final V1 organization model must determine whether a dedicated `OrganizationMembership` entity is required.

---

## E-003 — Provider Certification

The final provider qualification rules must determine whether certifications require an independent persistent entity.

---

## E-004 — Service Catalog

The final V1 scope must determine whether AIWORX requires a persistent service catalog in addition to categories and subcategories.

---

## E-005 — Dispute Decision

The final dispute workflow must determine whether decisions require an independent persistent entity or can be represented directly through the dispute lifecycle and audit records.

---

## E-006 — Matching Persistence

The final matching workflow must determine whether matching executions/results must be persisted independently.

Matching must not become a database entity merely because matching exists as a business process.

---

# 15. Rules for the Next Database Steps

The entity catalog shall be used as the basis for:

1. Entity relationships;
2. Cardinalities;
3. Database constraints;
4. Indexes;
5. Data dictionary;
6. Prisma schema;
7. Database migration.

Before creating the physical Prisma schema:

* all "To validate" entity decisions must be reviewed;
* relationships must be explicitly defined;
* cardinalities must be confirmed;
* lifecycle statuses must be assigned only to entities that require them;
* versioning requirements must be identified;
* financial and audit history must remain traceable;
* configurable business parameters must not be hard-coded unnecessarily.

The final physical schema must remain consistent with the validated functional requirements and business rules.
