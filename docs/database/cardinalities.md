# AIWORX — Database Cardinalities

## 1. Purpose

This document defines the cardinalities of the relationships between the main entities of the AIWORX database.

It specifies:

* one-to-one relationships;
* one-to-many relationships;
* many-to-many relationships;
* mandatory relationships;
* optional relationships.

The relationships themselves are defined in:

```text
03-relationships.md
```

The database constraints will be defined separately in:

```text
05-constraints.md
```

---

# 2. Cardinality Notation

The following notation is used:

```text
1 : 1
One-to-one

1 : N
One-to-many

N : N
Many-to-many
```

Optional relationships are represented by:

```text
0..1
Zero or one

0..N
Zero or many

1..1
Exactly one

1..N
One or many
```

---

# 3. Identity and Organization Cardinalities

## 3.1 User — OrganizationMembership

```text
User 1 ---- 0..N OrganizationMembership
```

A user may have zero or multiple organization memberships.

Each membership belongs to exactly one user.

```text
User
1
|
| 0..N
v
OrganizationMembership
```

---

## 3.2 Organization — OrganizationMembership

```text
Organization 1 ---- 0..N OrganizationMembership
```

An organization may have zero or multiple members.

Each membership belongs to exactly one organization.

---

## 3.3 Role — OrganizationMembership

```text
Role 1 ---- 0..N OrganizationMembership
```

A role may be assigned to multiple organization memberships.

Each membership has one assigned role.

---

## 3.4 Role — Permission

This relationship is many-to-many through `RolePermission`.

```text
Role 0..N ---- 0..N Permission
```

Implementation:

```text
Role
  |
  +---- RolePermission ----+
                           |
                           v
                       Permission
```

A role may contain multiple permissions.

A permission may belong to multiple roles.

---

## 3.5 Role — RolePermission

```text
Role 1 ---- 0..N RolePermission
```

---

## 3.6 Permission — RolePermission

```text
Permission 1 ---- 0..N RolePermission
```

---

# 4. Provider Cardinalities

## 4.1 User — ProviderProfile

```text
User 1 ---- 0..1 ProviderProfile
```

A user may have no provider profile or one provider profile.

A provider profile belongs to exactly one user.

---

## 4.2 Organization — ProviderProfile

```text
Organization 1 ---- 0..N ProviderProfile
```

An organization may have multiple provider profiles.

A provider profile may optionally belong to an organization.

Therefore:

```text
ProviderProfile.organizationId
```

is optional at the logical level.

---

## 4.3 ProviderProfile — ProviderVerification

```text
ProviderProfile 1 ---- 0..N ProviderVerification
```

A provider profile may have multiple verification records over time.

Each verification record belongs to exactly one provider profile.

---

## 4.4 ProviderProfile — ProviderDocument

```text
ProviderProfile 1 ---- 0..N ProviderDocument
```

A provider may submit multiple verification documents.

Each provider document belongs to one provider profile.

---

## 4.5 ProviderProfile — ProviderSkill

```text
ProviderProfile 1 ---- 0..N ProviderSkill
```

A provider may have multiple skills.

Each skill record belongs to one provider profile.

---

## 4.6 ProviderProfile — ProviderCertification

```text
ProviderProfile 1 ---- 0..N ProviderCertification
```

A provider may have multiple certifications.

Each certification belongs to one provider profile.

---

# 5. Service Catalog Cardinalities

## 5.1 ServiceCategory — ServiceSubcategory

```text
ServiceCategory 1 ---- 0..N ServiceSubcategory
```

A category may contain multiple subcategories.

Each subcategory belongs to one category.

---

## 5.2 ServiceSubcategory — Service

```text
ServiceSubcategory 1 ---- 0..N Service
```

A subcategory may contain multiple services.

Each service belongs to one subcategory.

---

# 6. Requirement Cardinalities

## 6.1 Organization — Requirement

```text
Organization 1 ---- 0..N Requirement
```

A client organization may create multiple requirements.

Each requirement has one client organization.

---

## 6.2 User — Requirement

```text
User 1 ---- 0..N Requirement
```

A user may create multiple requirements.

Each requirement has one identified creator.

---

## 6.3 Service — Requirement

```text
Service 1 ---- 0..N Requirement
```

A service may be associated with multiple requirements.

Each requirement is associated with one service in the current logical model.

---

## 6.4 Requirement — RequirementVersion

```text
Requirement 1 ---- 0..N RequirementVersion
```

A requirement may have multiple versions.

Each version belongs to exactly one requirement.

The initial requirement version may be created when the requirement is first structured.

---

## 6.5 Requirement — RequirementAttachment

```text
Requirement 1 ---- 0..N RequirementAttachment
```

A requirement may have zero or multiple attachments.

Each attachment belongs to one requirement.

---

## 6.6 File — RequirementAttachment

```text
File 1 ---- 0..N RequirementAttachment
```

A file may be referenced by multiple attachment records when permitted by the final file policy.

Each attachment references one file.

---

# 7. Offer Cardinalities

## 7.1 Requirement — Offer

```text
Requirement 1 ---- 0..N Offer
```

A requirement may receive zero or multiple offers.

Each offer belongs to exactly one requirement.

This reflects the workflow in which providers submit offers in response to an active requirement.

---

## 7.2 ProviderProfile — Offer

```text
ProviderProfile 1 ---- 0..N Offer
```

A provider may submit multiple offers.

Each offer is submitted by one provider profile.

---

## 7.3 Organization — Offer

```text
Organization 1 ---- 0..N Offer
```

A provider organization may submit multiple offers.

Each offer identifies the relevant provider organization where applicable.

---

## 7.4 Offer — OfferVersion

```text
Offer 1 ---- 0..N OfferVersion
```

An offer may have multiple versions.

Each version belongs to one offer.

This allows modifications during negotiation without destroying the historical proposal.

---

## 7.5 Offer — OfferQuestion

```text
Offer 1 ---- 0..N OfferQuestion
```

An offer may have zero or multiple clarification questions.

Each question belongs to one offer.

---

## 7.6 Offer — OfferNegotiation

```text
Offer 1 ---- 0..N OfferNegotiation
```

An offer may have zero or multiple negotiation events.

Each negotiation event belongs to one offer.

---

# 8. Contract Cardinalities

## 8.1 Requirement — Contract

```text
Requirement 1 ---- 0..1 Contract
```

A requirement may result in zero or one final contract.

A requirement should not have multiple simultaneous final contracts in the current logical model.

---

## 8.2 Offer — Contract

```text
Offer 1 ---- 0..1 Contract
```

An offer may result in zero or one contract.

A contract originates from the selected offer.

---

## 8.3 Organization — Contract

A contract identifies two organization roles:

```text
Client Organization
Provider Organization
```

Therefore:

```text
Organization 1 ---- 0..N Contract
```

through:

```text
clientOrganizationId
providerOrganizationId
```

The same organization may appear in multiple contracts.

---

## 8.4 Contract — ContractVersion

```text
Contract 1 ---- 1..N ContractVersion
```

A contract has at least one version once it exists as a formal contract.

Each contract version belongs to one contract.

---

## 8.5 ContractVersion — Signature

```text
ContractVersion 1 ---- 0..N Signature
```

A contract version may require multiple signatures.

Each signature belongs to one contract version.

---

## 8.6 User — Signature

```text
User 1 ---- 0..N Signature
```

A user may sign multiple contract versions.

Each signature identifies one signer.

---

# 9. Mission Cardinalities

## 9.1 Contract — Mission

```text
Contract 1 ---- 0..1 Mission
```

A contract may result in zero or one operational mission.

A mission belongs to one contract.

The mission is created after the contractual conditions are fulfilled.

---

## 9.2 Organization — Mission

A mission identifies:

```text
clientOrganizationId
providerOrganizationId
```

Therefore:

```text
Organization 1 ---- 0..N Mission
```

for each organization role.

---

## 9.3 Mission — Milestone

```text
Mission 1 ---- 1..N Milestone
```

A mission contains one or more milestones when milestone-based execution is used.

A milestone belongs to one mission.

---

## 9.4 Milestone — Deliverable

```text
Milestone 1 ---- 0..N Deliverable
```

A milestone may have zero or multiple deliverables.

Each deliverable belongs to one milestone.

---

## 9.5 Deliverable — DeliverableVersion

```text
Deliverable 1 ---- 1..N DeliverableVersion
```

A deliverable has one or more submitted versions once a deliverable exists in the execution workflow.

Each version belongs to one deliverable.

This preserves the history required when corrections are requested.

---

# 10. Quality Cardinalities

## 10.1 Deliverable — QualityReview

```text
Deliverable 1 ---- 0..N QualityReview
```

A deliverable may be reviewed multiple times.

This supports repeated review after corrections.

---

## 10.2 User — QualityReview

```text
User 1 ---- 0..N QualityReview
```

A quality expert may perform multiple reviews.

Each review identifies one reviewer.

---

## 10.3 QualityReview — QualityReport

```text
QualityReview 1 ---- 0..1 QualityReport
```

A quality review may have one final report.

The report belongs to one quality review.

---

## 10.4 QualityReview — CorrectionRequest

```text
QualityReview 1 ---- 0..N CorrectionRequest
```

A review may generate one or multiple correction requests.

Each correction request is linked to one quality review.

---

## 10.5 Deliverable — CorrectionRequest

```text
Deliverable 1 ---- 0..N CorrectionRequest
```

A deliverable may receive multiple correction requests over its lifecycle.

This supports repeated correction cycles described in the functional analysis.

---

# 11. Payment Cardinalities

## 11.1 Mission — Payment

```text
Mission 1 ---- 0..N Payment
```

A mission may generate multiple payments.

This supports projects divided into milestones.

---

## 11.2 Milestone — Payment

```text
Milestone 1 ---- 0..N Payment
```

A milestone may have zero or multiple payment records.

A payment may optionally be linked to a specific milestone.

---

## 11.3 Payment — PaymentTransaction

```text
Payment 1 ---- 0..N PaymentTransaction
```

A payment may have multiple transaction records when retries, provider operations or transaction history must be preserved.

---

## 11.4 PaymentTransaction — PaymentEvent

```text
PaymentTransaction 1 ---- 0..N PaymentEvent
```

An external payment transaction may generate multiple provider events.

Each event belongs to one transaction.

---

## 11.5 Payment — FinancialEntry

```text
Payment 1 ---- 0..N FinancialEntry
```

A payment may generate multiple financial ledger entries.

---

## 11.6 Payment — Invoice

```text
Payment 1 ---- 0..N Invoice
```

A payment may be associated with one or more invoice records according to the final invoicing model.

---

## 11.7 PaymentTransaction — Refund

```text
PaymentTransaction 1 ---- 0..N Refund
```

A transaction may have zero or multiple refund operations.

Refunds remain associated with the original transaction.

---

# 12. Messaging Cardinalities

## 12.1 Conversation — ConversationParticipant

```text
Conversation 1 ---- 1..N ConversationParticipant
```

A conversation has one or more participants.

Each participant record belongs to one conversation.

---

## 12.2 User — ConversationParticipant

```text
User 1 ---- 0..N ConversationParticipant
```

A user may participate in multiple conversations.

---

## 12.3 Conversation — Message

```text
Conversation 1 ---- 0..N Message
```

A conversation may contain multiple messages.

---

## 12.4 User — Message

```text
User 1 ---- 0..N Message
```

A user may send multiple messages.

Each message has one sender.

---

# 13. Dispute Cardinalities

## 13.1 Mission — Dispute

```text
Mission 1 ---- 0..N Dispute
```

A mission may have zero or multiple disputes over its lifecycle.

---

## 13.2 Contract — Dispute

```text
Contract 1 ---- 0..N Dispute
```

A contract may be associated with multiple disputes.

Each dispute references the relevant contract.

---

## 13.3 Dispute — DisputeEvidence

```text
Dispute 1 ---- 0..N DisputeEvidence
```

A dispute may contain zero or multiple pieces of evidence.

---

## 13.4 Dispute — DisputeDecision

```text
Dispute 1 ---- 0..1 DisputeDecision
```

A dispute may have zero or one final decision.

The decision belongs to one dispute.

---

# 14. Notification Cardinalities

## 14.1 User — Notification

```text
User 1 ---- 0..N Notification
```

A user may receive multiple notifications.

Each notification belongs to one user.

---

# 15. File Cardinalities

## 15.1 User — File

```text
User 1 ---- 0..N File
```

A user may upload multiple files.

Each file identifies one uploading user where the upload is attributable to a user.

---

## 15.2 File — ProviderDocument

```text
File 1 ---- 0..N ProviderDocument
```

A file may be associated with provider documents according to the final document-storage policy.

---

## 15.3 File — ContractVersion

```text
File 1 ---- 0..N ContractVersion
```

A stored file may be referenced by contract versions.

---

## 15.4 File — DeliverableVersion

```text
File 1 ---- 0..N DeliverableVersion
```

A file may be referenced by deliverable versions.

---

## 15.5 File — DisputeEvidence

```text
File 1 ---- 0..N DisputeEvidence
```

A file may be used as evidence for dispute records according to the final file policy.

---

# 16. Evaluation Cardinalities

## 16.1 Mission — Evaluation

```text
Mission 1 ---- 0..N Evaluation
```

A mission may receive evaluations.

---

## 16.2 User — Evaluation as Evaluator

```text
User 1 ---- 0..N Evaluation
```

A user may submit multiple evaluations.

---

## 16.3 User — Evaluation as Evaluated User

```text
User 1 ---- 0..N Evaluation
```

A user may be evaluated multiple times.

The evaluator and evaluated user are represented by separate foreign keys.

---

# 17. Audit Cardinalities

## 17.1 User — AuditLog

```text
User 1 ---- 0..N AuditLog
```

A user may generate multiple audit records.

Each audit record identifies its actor when the action is attributable to a user.

---

## 17.2 Organization — AuditLog

```text
Organization 1 ---- 0..N AuditLog
```

An organization may have multiple audit records.

The organization context may be optional for system-level operations.

---

# 18. Main Business Chain

The complete business lifecycle can be represented as:

```text
Organization
     |
     | 1:N
     v
Requirement
     |
     | 1:N
     v
Offer
     |
     | 0:1
     v
Contract
     |
     | 0:1
     v
Mission
     |
     | 1:N
     v
Milestone
     |
     | 0:N
     v
Deliverable
     |
     | 0:N
     v
QualityReview
```

The financial branch is:

```text
Mission
   |
   | 1:N
   v
Payment
   |
   +---- PaymentTransaction
   |
   +---- FinancialEntry
   |
   +---- Invoice
   |
   +---- Refund
```

The dispute branch is:

```text
Mission
   |
   | 0:N
   v
Dispute
   |
   +---- DisputeEvidence
   |
   +---- DisputeDecision
```

---

# 19. Versioning Cardinalities

Versioned business objects follow these relationships:

```text
Requirement 1 ---- 0..N RequirementVersion

Offer 1 ---- 0..N OfferVersion

Contract 1 ---- 1..N ContractVersion

Deliverable 1 ---- 1..N DeliverableVersion
```

The versioning model is used to preserve historical information instead of replacing previous business states.

---

# 20. Many-to-Many Relationships

The principal many-to-many relationship currently identified is:

```text
Role N ---- N Permission
```

It is implemented through:

```text
RolePermission
```

Therefore:

```text
Role
  |
  +---- RolePermission ----+
                           |
                           v
                       Permission
```

No direct many-to-many relationship should be implemented without an explicit associative entity when additional metadata or auditing is required.

---

# 21. Optional Relationships

The following relationships are intentionally optional:

```text
User -> ProviderProfile

ProviderProfile -> Organization

Requirement -> RequirementAttachment

Requirement -> Offer

Requirement -> Contract

Offer -> Contract

Contract -> Mission

QualityReview -> QualityReport

QualityReview -> CorrectionRequest

Mission -> Payment

Mission -> Dispute

Dispute -> DisputeDecision
```

Optionality reflects the lifecycle of the platform.

For example, a requirement can exist before receiving an offer, and an offer can exist before becoming the selected contractual proposal.

---

# 22. Mandatory Relationships

The following child entities require a parent entity:

```text
OrganizationMembership -> User
OrganizationMembership -> Organization
OrganizationMembership -> Role

ProviderVerification -> ProviderProfile
ProviderDocument -> ProviderProfile
ProviderSkill -> ProviderProfile
ProviderCertification -> ProviderProfile

ServiceSubcategory -> ServiceCategory
Service -> ServiceSubcategory

RequirementVersion -> Requirement
RequirementAttachment -> Requirement

Offer -> Requirement
Offer -> ProviderProfile

OfferVersion -> Offer
OfferQuestion -> Offer
OfferNegotiation -> Offer

Contract -> Requirement
Contract -> Offer

ContractVersion -> Contract
Signature -> ContractVersion
Signature -> User

Mission -> Contract
Milestone -> Mission
Deliverable -> Milestone
DeliverableVersion -> Deliverable

QualityReview -> Deliverable
QualityReport -> QualityReview

Payment -> Mission
PaymentTransaction -> Payment
PaymentEvent -> PaymentTransaction
FinancialEntry -> Payment

ConversationParticipant -> Conversation
Message -> Conversation

Dispute -> Mission
DisputeEvidence -> Dispute
DisputeDecision -> Dispute
```

---

# 23. Referential Integrity

The database implementation shall ensure that:

1. A foreign key cannot reference a nonexistent parent.
2. Required relationships cannot be removed accidentally.
3. Historical records remain traceable.
4. Deletion rules do not destroy required audit information.
5. Business objects remain connected to their organization context.
6. Financial records remain connected to their source payment.
7. Quality records remain connected to their reviewed deliverables.
8. Dispute records remain connected to their business context.

The exact database actions for deletion and update will be defined in:

```text
05-constraints.md
```

---

# 24. Cardinality Validation

Before physical implementation, the cardinalities must be validated against:

* functional requirements;
* business rules;
* workflows;
* authorization rules;
* payment processes;
* quality processes;
* dispute management;
* audit requirements.

Any cardinality that conflicts with a validated business rule must be corrected before the Prisma schema is created.

---

# 25. Next Database Document

The next document is:

```text
05-constraints.md
```

This document will define:

* primary-key constraints;
* foreign-key constraints;
* unique constraints;
* required fields;
* nullable fields;
* allowed values;
* data integrity rules;
* deletion behavior;
* update behavior;
* business-level database constraints.
