# AIWORX — Entity Relationship Diagram

## 1. Purpose

This document defines the conceptual Entity Relationship Diagram (ERD) of the AIWORX platform.

The ERD identifies:

* the main entities;
* their responsibilities;
* their relationships;
* the main business boundaries;
* the data required by the platform.

The ERD is the conceptual foundation for the logical data model and the physical database schema.

---

# 2. Database Scope

The AIWORX database shall support the following major domains:

```text
AIWORX Database
│
├── Identity & Organizations
├── Provider Verification
├── Service Catalog
├── Requirements
├── Offers
├── Contracts
├── Missions
├── Milestones
├── Deliverables
├── Quality Control
├── Payments & Finance
├── Messaging
├── Disputes
├── Notifications
├── Files & Documents
├── Evaluations
├── Audit
└── Configuration
```

---

# 3. Main Entities

The main entities identified for the first database model are:

```text
User
Organization
OrganizationMembership
Role
Permission

ProviderProfile
ProviderVerification
ProviderDocument
ProviderSkill
ProviderCertification

ServiceCategory
ServiceSubcategory
Service

Requirement
RequirementVersion
RequirementAttachment

Offer
OfferVersion
OfferQuestion
OfferNegotiation

Contract
ContractVersion
Signature

Mission
Milestone
Deliverable
DeliverableVersion

QualityReview
QualityReport
CorrectionRequest

Payment
PaymentTransaction
PaymentEvent
FinancialEntry
Invoice
Refund

Conversation
ConversationParticipant
Message

Dispute
DisputeEvidence
DisputeDecision

Notification

File
Evaluation

AuditLog
```

---

# 4. Identity Domain

## 4.1 User

The `User` entity represents a person using the AIWORX platform.

A user may act as:

* client;
* provider;
* AIWORX advisor;
* quality expert;
* financial administrator;
* other authorized operational role.

The user shall not automatically receive access to all platform resources.

---

## 4.2 Organization

The `Organization` entity represents a company or organizational entity participating in AIWORX.

An organization may act as:

* client organization;
* provider organization;
* AIWORX internal organization.

---

## 4.3 OrganizationMembership

`OrganizationMembership` connects a user to an organization.

It allows the system to represent:

```text
User
  |
  v
OrganizationMembership
  |
  v
Organization
```

The membership shall contain the information necessary to determine the user's access within the organization.

---

## 4.4 Role

The `Role` entity represents an authorization role.

Examples include:

```text
CLIENT
PROVIDER
ADVISOR
QUALITY_EXPERT
FINANCE_ADMIN
ADMIN
```

The final role list shall remain consistent with the authorization architecture.

---

## 4.5 Permission

The `Permission` entity represents an individual authorization capability.

Roles may contain multiple permissions.

```text
Role
  |
  +---- Permission
  |
  +---- Permission
  |
  +---- Permission
```

---

# 5. Provider Domain

## 5.1 ProviderProfile

`ProviderProfile` contains the professional information of a provider.

It may contain:

* professional presentation;
* experience;
* service categories;
* portfolio references;
* quality information;
* verification status.

---

## 5.2 ProviderVerification

`ProviderVerification` represents the provider verification process.

The provider verification workflow includes states such as:

```text
DRAFT
UNDER_REVIEW
ADDITIONAL_INFORMATION_REQUIRED
TEST
VALIDATED
SUSPENDED
REJECTED
```

---

## 5.3 ProviderDocument

`ProviderDocument` represents documents submitted during provider verification.

Examples may include:

* identity documents;
* legal documents;
* professional documents;
* certifications.

The exact document types shall remain configurable.

---

## 5.4 ProviderSkill

`ProviderSkill` represents a provider's declared or validated skill.

---

## 5.5 ProviderCertification

`ProviderCertification` represents a certification associated with a provider.

---

# 6. Service Catalog Domain

## 6.1 ServiceCategory

`ServiceCategory` represents a high-level service category.

Examples from the project include:

```text
Websites & E-commerce
Applications & Software
Digital Marketing
Design & Content
AI & Automation
Consulting & Transformation
```

---

## 6.2 ServiceSubcategory

`ServiceSubcategory` belongs to a service category.

```text
ServiceCategory
      |
      +---- ServiceSubcategory
                  |
                  +---- Service
```

---

## 6.3 Service

`Service` represents a specific service that can be offered or used during requirement creation.

---

# 7. Requirement Domain

## 7.1 Requirement

`Requirement` represents the client's business need.

A requirement may contain:

* context;
* objectives;
* target;
* scope;
* deliverables;
* constraints;
* budget;
* schedule;
* acceptance criteria;
* dependencies;
* exclusions;
* confidentiality level.

---

## 7.2 RequirementVersion

`RequirementVersion` stores the history of changes to a requirement.

This allows the system to preserve:

* previous versions;
* current version;
* validated version;
* contract version.

A validated requirement may become frozen when the mission starts.

---

## 7.3 RequirementAttachment

`RequirementAttachment` associates files with a requirement.

The actual file shall be stored through the file/storage architecture.

---

# 8. Offer Domain

## 8.1 Offer

`Offer` represents a provider's response to a requirement.

An offer may contain:

* methodology;
* proposed deliverables;
* price;
* schedule;
* milestones;
* dependencies;
* correction conditions;
* validity;
* availability.

---

## 8.2 OfferVersion

`OfferVersion` stores successive versions of an offer.

This is required because AIWORX supports negotiation and changes before final selection.

---

## 8.3 OfferQuestion

`OfferQuestion` represents a clarification question exchanged during the offer process.

---

## 8.4 OfferNegotiation

`OfferNegotiation` represents negotiation activity related to an offer.

The negotiation history shall remain traceable.

---

# 9. Contract Domain

## 9.1 Contract

`Contract` represents the contractual agreement between the relevant parties.

The contract shall reference:

* requirement;
* selected offer;
* client;
* provider;
* mission where applicable.

---

## 9.2 ContractVersion

`ContractVersion` stores the different versions of a contract.

The system shall preserve the version that was actually signed.

---

## 9.3 Signature

`Signature` represents an electronic signature process associated with a contract version.

It may contain:

* signature status;
* external provider reference;
* signature timestamp;
* signer;
* verification information.

---

# 10. Mission Domain

## 10.1 Mission

`Mission` represents the execution of an accepted contract.

A mission connects the contractual agreement with operational execution.

---

## 10.2 Milestone

`Milestone` represents a stage of a mission.

A mission may contain multiple milestones.

```text
Mission
   |
   +---- Milestone
   |
   +---- Milestone
   |
   +---- Milestone
```

A milestone may contain:

* name;
* description;
* amount;
* due date;
* status;
* validation information.

---

## 10.3 Deliverable

`Deliverable` represents a result submitted by the provider.

A deliverable belongs to a milestone or another defined mission context.

---

## 10.4 DeliverableVersion

`DeliverableVersion` preserves the history of submitted deliverable versions.

This is required to support:

* corrections;
* quality review;
* audit;
* validation history.

---

# 11. Quality Domain

## 11.1 QualityReview

`QualityReview` represents a quality-control operation performed on a deliverable.

It may include:

* functional checks;
* visual checks;
* compliance checks;
* acceptance criteria verification.

---

## 11.2 QualityReport

`QualityReport` represents the result of a quality review.

It may contain:

* result;
* score;
* observations;
* non-conformities;
* recommendations.

---

## 11.3 CorrectionRequest

`CorrectionRequest` represents a request to correct a non-conforming deliverable.

The correction request shall remain associated with the relevant deliverable and quality review.

---

# 12. Payment and Finance Domain

## 12.1 Payment

`Payment` represents an internal payment operation associated with a mission or contract.

---

## 12.2 PaymentTransaction

`PaymentTransaction` represents an external financial transaction.

It shall contain the external provider reference where applicable.

---

## 12.3 PaymentEvent

`PaymentEvent` represents an event received from the payment provider.

Examples include:

```text
PAYMENT_CREATED
PAYMENT_AUTHORIZED
PAYMENT_SUCCEEDED
PAYMENT_FAILED
PAYMENT_REFUNDED
```

The exact event list depends on the selected payment provider.

---

## 12.4 FinancialEntry

`FinancialEntry` represents an internal financial ledger entry.

It shall preserve financial traceability.

Possible information includes:

* gross amount;
* client fees;
* provider amount;
* commission;
* taxes;
* refunds;
* external references.

---

## 12.5 Invoice

`Invoice` represents a financial invoice generated by the platform.

---

## 12.6 Refund

`Refund` represents an authorized refund operation.

A refund shall be traceable to the relevant payment transaction.

---

# 13. Messaging Domain

## 13.1 Conversation

`Conversation` represents a communication channel.

AIWORX may distinguish channels such as:

```text
PRE_SALES
MISSION
QUALITY
FINANCE
DISPUTE
```

---

## 13.2 ConversationParticipant

`ConversationParticipant` connects users to conversations.

It determines who is allowed to access a conversation.

---

## 13.3 Message

`Message` represents an individual message.

Messages shall remain associated with:

* conversation;
* sender;
* timestamp;
* relevant business context where applicable.

The system shall support anti-circumvention controls according to the business rules.

---

# 14. Dispute Domain

## 14.1 Dispute

`Dispute` represents a formal dispute opened by an authorized party or by AIWORX.

It may contain:

* category;
* disputed amount;
* description;
* status;
* current level;
* decision information.

---

## 14.2 DisputeEvidence

`DisputeEvidence` represents evidence submitted during a dispute.

Evidence may include:

* files;
* messages;
* documents;
* contract references;
* other relevant records.

---

## 14.3 DisputeDecision

`DisputeDecision` represents a decision made during the dispute process.

The decision shall preserve:

* decision maker;
* reason;
* references used;
* resolution;
* timestamp.

---

# 15. Notification Domain

## 15.1 Notification

`Notification` represents a notification generated by the platform.

Notifications may be delivered through:

```text
PLATFORM
EMAIL
WHATSAPP
```

The exact external providers shall be determined separately.

The system shall prevent duplicate transactional notifications.

---

# 16. File Domain

## 16.1 File

`File` represents metadata about a stored file.

The database shall not necessarily contain the binary content itself.

The entity may reference:

* storage provider;
* storage key;
* file name;
* MIME type;
* size;
* checksum;
* status;
* owner;
* related resource.

---

# 17. Evaluation Domain

## 17.1 Evaluation

`Evaluation` represents an evaluation submitted after a completed mission.

It may contain:

* rating;
* comment;
* mission reference;
* evaluator;
* evaluated party;
* moderation state.

Evaluations shall only be associated with eligible completed missions according to business rules.

---

# 18. Audit Domain

## 18.1 AuditLog

`AuditLog` represents an immutable audit event.

The audit log shall contain information such as:

* actor;
* role;
* organization;
* action;
* object;
* previous state;
* new state;
* reason;
* technical address;
* timestamp;
* correlation identifier.

Sensitive unnecessary data shall not be duplicated in the audit log.

---

# 19. Main Entity Relationship Overview

The high-level relationship structure is:

```text
User
 |
 +---- OrganizationMembership ---- Organization
 |
 +---- ProviderProfile
 |
 +---- Role
 |
 +---- Permission


Organization
 |
 +---- Requirement
 |       |
 |       +---- RequirementVersion
 |       |
 |       +---- RequirementAttachment
 |       |
 |       +---- Offer
 |               |
 |               +---- OfferVersion
 |               |
 |               +---- OfferNegotiation
 |
 +---- Contract
         |
         +---- ContractVersion
         |       |
         |       +---- Signature
         |
         +---- Mission
                 |
                 +---- Milestone
                 |       |
                 |       +---- Deliverable
                 |               |
                 |               +---- DeliverableVersion
                 |               |
                 |               +---- QualityReview
                 |                       |
                 |                       +---- QualityReport
                 |                       |
                 |                       +---- CorrectionRequest
                 |
                 +---- Payment
                 |       |
                 |       +---- PaymentTransaction
                 |       |
                 |       +---- PaymentEvent
                 |       |
                 |       +---- FinancialEntry
                 |       |
                 |       +---- Refund
                 |
                 +---- Evaluation
```

---

# 20. Provider Relationship Overview

```text
ProviderProfile
 |
 +---- ProviderVerification
 |
 +---- ProviderDocument
 |
 +---- ProviderSkill
 |
 +---- ProviderCertification
 |
 +---- Offer
 |
 +---- Mission
 |
 +---- Evaluation
```

---

# 21. Communication Relationship Overview

```text
Conversation
 |
 +---- ConversationParticipant
 |
 +---- Message
 |
 +---- Notification
```

Communication may be associated with a:

* requirement;
* offer;
* contract;
* mission;
* quality process;
* financial process;
* dispute.

---

# 22. Dispute Relationship Overview

```text
Dispute
 |
 +---- DisputeEvidence
 |
 +---- DisputeDecision
 |
 +---- Contract
 |
 +---- Mission
 |
 +---- Payment
```

The exact relationships shall be finalized in the logical data model.

---

# 23. File Relationship Overview

```text
File
 |
 +---- RequirementAttachment
 |
 +---- ProviderDocument
 |
 +---- DeliverableVersion
 |
 +---- DisputeEvidence
 |
 +---- ContractVersion
```

The exact implementation may use a generic resource-reference strategy if it remains secure and maintains referential integrity.

---

# 24. Audit Relationship

Sensitive entities shall be traceable through the audit system.

Potential audited entities include:

```text
User
Organization
ProviderVerification
Requirement
Offer
Contract
Signature
Mission
Milestone
Deliverable
QualityReview
Payment
Dispute
Message
File
Evaluation
```

---

# 25. Configuration Entities

The database may also contain configuration entities for values that the cahier des charges identifies as configurable.

These may include:

* service categories;
* service subcategories;
* offer limits;
* matching criteria;
* fees;
* commissions;
* taxes;
* quality thresholds;
* dispute levels;
* penalties;
* notification templates;
* file rules;
* retention rules;
* feature flags.

These configuration entities shall be designed during the logical model phase.

---

# 26. ERD Design Principles

The ERD shall follow these principles:

* avoid unnecessary duplication;
* preserve historical information where required;
* maintain referential integrity;
* separate transactional data from configuration data;
* separate file metadata from binary storage;
* preserve financial traceability;
* preserve workflow history;
* support organization isolation;
* support auditability.

---

# 27. Historical Data

The database shall preserve historical information where required by the business rules.

Important versioned entities include:

```text
RequirementVersion
OfferVersion
ContractVersion
DeliverableVersion
```

Historical versions shall not be silently overwritten.

---

# 28. State Management

Entities participating in workflows shall have controlled state transitions.

Examples include:

```text
ProviderVerification
Requirement
Offer
Contract
Mission
Milestone
Deliverable
Payment
Dispute
```

The exact states and transitions shall be defined in the logical data model and business rules.

---

# 29. Financial Integrity

Financial records shall be designed so that validated financial history cannot be silently rewritten.

Corrections shall use explicit compensating operations where required.

The database shall preserve external transaction references.

---

# 30. Organization Isolation

Entities containing organization-specific data shall be associated with the appropriate organization context directly or through a controlled relationship.

Authorization shall be enforced by the backend.

Database relationships alone shall not replace application-level authorization.

---

# 31. Soft Deletion

Soft deletion may be used for entities where historical preservation is required.

It shall not be applied blindly to every entity.

Entities subject to legal, financial, contractual, or audit requirements shall preserve the required history.

---

# 32. Timestamps

Important business entities shall maintain timestamps necessary for:

* creation;
* modification;
* state transitions;
* validation;
* completion;
* audit.

The exact timestamp fields will be defined in the logical model.

---

# 33. Identifiers

Each persistent entity shall have a unique identifier.

Identifiers shall be stable and shall not expose sensitive information.

The exact identifier strategy will be selected during the physical database design.

---

# 34. ERD Validation

Before implementing the physical database, the ERD shall be validated against:

* requirements;
* business rules;
* workflows;
* architecture;
* security;
* payment rules;
* audit requirements;
* dispute workflows;
* file management;
* notification requirements.

---

# 35. Next Database Documents

The ERD shall be followed by:

```text
02-logical-data-model.md
03-relationships.md
04-cardinalities.md
05-constraints.md
06-indexes.md
07-data-dictionary.md
```

The physical Prisma schema shall only be created after these database design documents have been validated.
