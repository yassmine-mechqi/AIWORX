# AIWORX — Logical Data Model

## 1. Purpose

This document defines the logical data model of the AIWORX platform.

It transforms the conceptual entities identified in the Entity Relationship Diagram into a structured logical representation.

For each main entity, this document defines:

* the entity purpose;
* the main attributes;
* the primary identifier;
* the important references;
* the main business information stored.

This document does not define the final physical database implementation.

The final database types, indexes, constraints and Prisma syntax will be defined later.

---

# 2. General Modeling Principles

The logical data model follows these principles:

* each persistent business entity has a unique identifier;
* relationships are represented through explicit references;
* historical information is preserved where required;
* financial information is traceable;
* organization boundaries are represented;
* files are represented through metadata;
* workflow states are controlled;
* sensitive information is protected;
* unnecessary duplication is avoided.

---

# 3. Identity and Organization Domain

## 3.1 User

### Purpose

Represents a person using the AIWORX platform.

### Main Attributes

```text
User
- id
- email
- passwordHash
- firstName
- lastName
- phone
- status
- emailVerified
- lastLoginAt
- createdAt
- updatedAt
```

### Primary Key

```text
id
```

### Notes

The password itself shall never be stored.

Only a secure password hash shall be stored.

---

## 3.2 Organization

### Purpose

Represents an organization participating in the platform.

### Main Attributes

```text
Organization
- id
- name
- legalName
- registrationNumber
- type
- status
- country
- address
- createdAt
- updatedAt
```

### Primary Key

```text
id
```

---

## 3.3 OrganizationMembership

### Purpose

Represents the membership of a user within an organization.

### Main Attributes

```text
OrganizationMembership
- id
- userId
- organizationId
- roleId
- status
- joinedAt
- removedAt
- createdAt
- updatedAt
```

### Primary Key

```text
id
```

### Foreign Keys

```text
userId -> User.id
organizationId -> Organization.id
roleId -> Role.id
```

---

## 3.4 Role

### Purpose

Represents an authorization role.

### Main Attributes

```text
Role
- id
- code
- name
- description
- createdAt
- updatedAt
```

### Primary Key

```text
id
```

---

## 3.5 Permission

### Purpose

Represents an individual authorization permission.

### Main Attributes

```text
Permission
- id
- code
- name
- description
- createdAt
- updatedAt
```

### Primary Key

```text
id
```

---

## 3.6 RolePermission

### Purpose

Associates roles with permissions.

### Main Attributes

```text
RolePermission
- roleId
- permissionId
- createdAt
```

### Foreign Keys

```text
roleId -> Role.id
permissionId -> Permission.id
```

### Primary Key

```text
(roleId, permissionId)
```

---

# 4. Provider Domain

## 4.1 ProviderProfile

### Purpose

Represents the professional profile of a provider.

### Main Attributes

```text
ProviderProfile
- id
- userId
- organizationId
- professionalName
- description
- experienceYears
- availabilityStatus
- verificationStatus
- createdAt
- updatedAt
```

### Foreign Keys

```text
userId -> User.id
organizationId -> Organization.id
```

---

## 4.2 ProviderVerification

### Purpose

Represents the verification process of a provider.

### Main Attributes

```text
ProviderVerification
- id
- providerProfileId
- status
- submittedAt
- reviewedAt
- reviewedByUserId
- rejectionReason
- suspensionReason
- createdAt
- updatedAt
```

### Foreign Keys

```text
providerProfileId -> ProviderProfile.id
reviewedByUserId -> User.id
```

---

## 4.3 ProviderDocument

### Purpose

Represents a document submitted for provider verification.

### Main Attributes

```text
ProviderDocument
- id
- providerProfileId
- fileId
- documentType
- status
- submittedAt
- reviewedAt
- reviewedByUserId
- rejectionReason
- createdAt
- updatedAt
```

### Foreign Keys

```text
providerProfileId -> ProviderProfile.id
fileId -> File.id
reviewedByUserId -> User.id
```

---

## 4.4 ProviderSkill

### Purpose

Represents a skill associated with a provider.

### Main Attributes

```text
ProviderSkill
- id
- providerProfileId
- skillName
- level
- verified
- createdAt
- updatedAt
```

### Foreign Keys

```text
providerProfileId -> ProviderProfile.id
```

---

## 4.5 ProviderCertification

### Purpose

Represents a certification associated with a provider.

### Main Attributes

```text
ProviderCertification
- id
- providerProfileId
- name
- issuer
- issueDate
- expirationDate
- fileId
- status
- createdAt
- updatedAt
```

### Foreign Keys

```text
providerProfileId -> ProviderProfile.id
fileId -> File.id
```

---

# 5. Service Catalog Domain

## 5.1 ServiceCategory

### Purpose

Represents a high-level category of services.

### Main Attributes

```text
ServiceCategory
- id
- code
- name
- description
- status
- createdAt
- updatedAt
```

---

## 5.2 ServiceSubcategory

### Purpose

Represents a subcategory belonging to a service category.

### Main Attributes

```text
ServiceSubcategory
- id
- categoryId
- code
- name
- description
- status
- createdAt
- updatedAt
```

### Foreign Keys

```text
categoryId -> ServiceCategory.id
```

---

## 5.3 Service

### Purpose

Represents a specific service.

### Main Attributes

```text
Service
- id
- subcategoryId
- code
- name
- description
- status
- createdAt
- updatedAt
```

### Foreign Keys

```text
subcategoryId -> ServiceSubcategory.id
```

---

# 6. Requirement Domain

## 6.1 Requirement

### Purpose

Represents the client's business need.

### Main Attributes

```text
Requirement
- id
- clientOrganizationId
- serviceId
- createdByUserId
- title
- description
- objective
- targetAudience
- scope
- budgetMin
- budgetMax
- currency
- desiredStartDate
- desiredEndDate
- confidentialityLevel
- status
- publishedAt
- closedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
clientOrganizationId -> Organization.id
serviceId -> Service.id
createdByUserId -> User.id
```

---

## 6.2 RequirementVersion

### Purpose

Preserves the history of requirement modifications.

### Main Attributes

```text
RequirementVersion
- id
- requirementId
- versionNumber
- title
- description
- objective
- scope
- budgetMin
- budgetMax
- currency
- acceptanceCriteria
- dependencies
- exclusions
- createdByUserId
- createdAt
```

### Foreign Keys

```text
requirementId -> Requirement.id
createdByUserId -> User.id
```

---

## 6.3 RequirementAttachment

### Purpose

Associates a file with a requirement.

### Main Attributes

```text
RequirementAttachment
- id
- requirementId
- fileId
- createdByUserId
- createdAt
```

### Foreign Keys

```text
requirementId -> Requirement.id
fileId -> File.id
createdByUserId -> User.id
```

---

# 7. Offer Domain

## 7.1 Offer

### Purpose

Represents a provider's response to a requirement.

### Main Attributes

```text
Offer
- id
- requirementId
- providerProfileId
- organizationId
- status
- proposedAmount
- currency
- estimatedDuration
- proposedStartDate
- proposedEndDate
- submittedAt
- selectedAt
- rejectedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
requirementId -> Requirement.id
providerProfileId -> ProviderProfile.id
organizationId -> Organization.id
```

---

## 7.2 OfferVersion

### Purpose

Preserves the history of changes to an offer.

### Main Attributes

```text
OfferVersion
- id
- offerId
- versionNumber
- methodology
- deliverablesDescription
- proposedAmount
- currency
- estimatedDuration
- createdByUserId
- createdAt
```

### Foreign Keys

```text
offerId -> Offer.id
createdByUserId -> User.id
```

---

## 7.3 OfferQuestion

### Purpose

Represents a clarification question exchanged during the offer process.

### Main Attributes

```text
OfferQuestion
- id
- offerId
- askedByUserId
- question
- answer
- answeredByUserId
- askedAt
- answeredAt
- status
```

### Foreign Keys

```text
offerId -> Offer.id
askedByUserId -> User.id
answeredByUserId -> User.id
```

---

## 7.4 OfferNegotiation

### Purpose

Represents a negotiation event associated with an offer.

### Main Attributes

```text
OfferNegotiation
- id
- offerId
- initiatedByUserId
- proposedAmount
- currency
- proposedDuration
- message
- status
- createdAt
- respondedAt
```

### Foreign Keys

```text
offerId -> Offer.id
initiatedByUserId -> User.id
```

---

# 8. Contract Domain

## 8.1 Contract

### Purpose

Represents the contractual agreement resulting from an accepted offer.

### Main Attributes

```text
Contract
- id
- requirementId
- offerId
- clientOrganizationId
- providerOrganizationId
- status
- contractNumber
- effectiveDate
- terminationDate
- signedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
requirementId -> Requirement.id
offerId -> Offer.id
clientOrganizationId -> Organization.id
providerOrganizationId -> Organization.id
```

---

## 8.2 ContractVersion

### Purpose

Preserves contract versions.

### Main Attributes

```text
ContractVersion
- id
- contractId
- versionNumber
- fileId
- contentHash
- status
- createdByUserId
- createdAt
```

### Foreign Keys

```text
contractId -> Contract.id
fileId -> File.id
createdByUserId -> User.id
```

---

## 8.3 Signature

### Purpose

Represents an electronic signature process.

### Main Attributes

```text
Signature
- id
- contractVersionId
- signerUserId
- externalProvider
- externalReference
- status
- requestedAt
- signedAt
- verifiedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
contractVersionId -> ContractVersion.id
signerUserId -> User.id
```

---

# 9. Mission Domain

## 9.1 Mission

### Purpose

Represents execution of an accepted contract.

### Main Attributes

```text
Mission
- id
- contractId
- clientOrganizationId
- providerOrganizationId
- status
- startDate
- expectedEndDate
- completedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
contractId -> Contract.id
clientOrganizationId -> Organization.id
providerOrganizationId -> Organization.id
```

---

## 9.2 Milestone

### Purpose

Represents a stage of a mission.

### Main Attributes

```text
Milestone
- id
- missionId
- name
- description
- sequence
- amount
- currency
- dueDate
- status
- validatedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
missionId -> Mission.id
```

---

## 9.3 Deliverable

### Purpose

Represents a deliverable associated with a mission milestone.

### Main Attributes

```text
Deliverable
- id
- milestoneId
- title
- description
- status
- submittedAt
- acceptedAt
- rejectedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
milestoneId -> Milestone.id
```

---

## 9.4 DeliverableVersion

### Purpose

Represents a submitted version of a deliverable.

### Main Attributes

```text
DeliverableVersion
- id
- deliverableId
- versionNumber
- fileId
- description
- submittedByUserId
- status
- submittedAt
- createdAt
```

### Foreign Keys

```text
deliverableId -> Deliverable.id
fileId -> File.id
submittedByUserId -> User.id
```

---

# 10. Quality Domain

## 10.1 QualityReview

### Purpose

Represents a quality-control review.

### Main Attributes

```text
QualityReview
- id
- deliverableId
- reviewerUserId
- status
- startedAt
- completedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
deliverableId -> Deliverable.id
reviewerUserId -> User.id
```

---

## 10.2 QualityReport

### Purpose

Represents the result of a quality review.

### Main Attributes

```text
QualityReport
- id
- qualityReviewId
- result
- score
- observations
- nonConformities
- recommendations
- createdAt
```

### Foreign Keys

```text
qualityReviewId -> QualityReview.id
```

---

## 10.3 CorrectionRequest

### Purpose

Represents a requested correction to a deliverable.

### Main Attributes

```text
CorrectionRequest
- id
- deliverableId
- qualityReviewId
- requestedByUserId
- description
- status
- dueDate
- resolvedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
deliverableId -> Deliverable.id
qualityReviewId -> QualityReview.id
requestedByUserId -> User.id
```

---

# 11. Payment and Finance Domain

## 11.1 Payment

### Purpose

Represents an internal payment operation.

### Main Attributes

```text
Payment
- id
- missionId
- milestoneId
- clientOrganizationId
- amount
- currency
- status
- paymentMethod
- createdAt
- updatedAt
```

### Foreign Keys

```text
missionId -> Mission.id
milestoneId -> Milestone.id
clientOrganizationId -> Organization.id
```

---

## 11.2 PaymentTransaction

### Purpose

Represents an external payment transaction.

### Main Attributes

```text
PaymentTransaction
- id
- paymentId
- provider
- externalReference
- idempotencyKey
- amount
- currency
- status
- processedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
paymentId -> Payment.id
```

---

## 11.3 PaymentEvent

### Purpose

Represents an event received from the payment provider.

### Main Attributes

```text
PaymentEvent
- id
- paymentTransactionId
- externalEventId
- eventType
- payloadReference
- receivedAt
- processedAt
- status
- createdAt
```

### Foreign Keys

```text
paymentTransactionId -> PaymentTransaction.id
```

---

## 11.4 FinancialEntry

### Purpose

Represents an internal financial ledger entry.

### Main Attributes

```text
FinancialEntry
- id
- paymentId
- entryType
- grossAmount
- clientFee
- providerBaseAmount
- commission
- taxAmount
- providerNetAmount
- currency
- externalReference
- createdAt
```

### Foreign Keys

```text
paymentId -> Payment.id
```

---

## 11.5 Invoice

### Purpose

Represents an invoice.

### Main Attributes

```text
Invoice
- id
- organizationId
- paymentId
- invoiceNumber
- amount
- taxAmount
- totalAmount
- currency
- status
- issuedAt
- dueAt
- paidAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
organizationId -> Organization.id
paymentId -> Payment.id
```

---

## 11.6 Refund

### Purpose

Represents a refund operation.

### Main Attributes

```text
Refund
- id
- paymentTransactionId
- amount
- currency
- reason
- externalReference
- status
- requestedByUserId
- processedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
paymentTransactionId -> PaymentTransaction.id
requestedByUserId -> User.id
```

---

# 12. Messaging Domain

## 12.1 Conversation

### Purpose

Represents a communication channel.

### Main Attributes

```text
Conversation
- id
- type
- requirementId
- offerId
- missionId
- disputeId
- status
- createdAt
- updatedAt
```

### Foreign Keys

```text
requirementId -> Requirement.id
offerId -> Offer.id
missionId -> Mission.id
disputeId -> Dispute.id
```

---

## 12.2 ConversationParticipant

### Purpose

Associates users with conversations.

### Main Attributes

```text
ConversationParticipant
- conversationId
- userId
- joinedAt
- leftAt
- lastReadAt
```

### Primary Key

```text
(conversationId, userId)
```

### Foreign Keys

```text
conversationId -> Conversation.id
userId -> User.id
```

---

## 12.3 Message

### Purpose

Represents a message.

### Main Attributes

```text
Message
- id
- conversationId
- senderUserId
- content
- messageType
- status
- sentAt
- editedAt
- deletedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
conversationId -> Conversation.id
senderUserId -> User.id
```

---

# 13. Dispute Domain

## 13.1 Dispute

### Purpose

Represents a formal dispute.

### Main Attributes

```text
Dispute
- id
- missionId
- contractId
- openedByUserId
- category
- description
- disputedAmount
- currency
- status
- level
- resolvedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
missionId -> Mission.id
contractId -> Contract.id
openedByUserId -> User.id
```

---

## 13.2 DisputeEvidence

### Purpose

Represents evidence associated with a dispute.

### Main Attributes

```text
DisputeEvidence
- id
- disputeId
- fileId
- submittedByUserId
- description
- createdAt
```

### Foreign Keys

```text
disputeId -> Dispute.id
fileId -> File.id
submittedByUserId -> User.id
```

---

## 13.3 DisputeDecision

### Purpose

Represents the resolution of a dispute.

### Main Attributes

```text
DisputeDecision
- id
- disputeId
- decidedByUserId
- decision
- reason
- financialAdjustment
- currency
- decidedAt
- createdAt
```

### Foreign Keys

```text
disputeId -> Dispute.id
decidedByUserId -> User.id
```

---

# 14. Notification Domain

## 14.1 Notification

### Purpose

Represents a notification generated by the platform.

### Main Attributes

```text
Notification
- id
- userId
- type
- channel
- title
- content
- status
- sentAt
- readAt
- relatedResourceType
- relatedResourceId
- createdAt
- updatedAt
```

### Foreign Keys

```text
userId -> User.id
```

---

# 15. File Domain

## 15.1 File

### Purpose

Represents metadata for a stored file.

The binary file itself is stored through the object-storage infrastructure.

### Main Attributes

```text
File
- id
- storageProvider
- storageKey
- originalName
- mimeType
- size
- checksum
- status
- uploadedByUserId
- createdAt
- updatedAt
```

### Foreign Keys

```text
uploadedByUserId -> User.id
```

---

# 16. Evaluation Domain

## 16.1 Evaluation

### Purpose

Represents an evaluation submitted after a completed mission.

### Main Attributes

```text
Evaluation
- id
- missionId
- evaluatorUserId
- evaluatedUserId
- rating
- comment
- status
- moderatedAt
- createdAt
- updatedAt
```

### Foreign Keys

```text
missionId -> Mission.id
evaluatorUserId -> User.id
evaluatedUserId -> User.id
```

---

# 17. Audit Domain

## 17.1 AuditLog

### Purpose

Represents an auditable business or security event.

### Main Attributes

```text
AuditLog
- id
- actorUserId
- organizationId
- action
- resourceType
- resourceId
- previousState
- newState
- reason
- ipAddress
- userAgent
- correlationId
- createdAt
```

### Foreign Keys

```text
actorUserId -> User.id
organizationId -> Organization.id
```

---

# 18. Entity Reference Summary

The principal foreign-key relationships are:

```text
OrganizationMembership
    -> User
    -> Organization
    -> Role

RolePermission
    -> Role
    -> Permission

ProviderProfile
    -> User
    -> Organization

ProviderVerification
    -> ProviderProfile
    -> User

ProviderDocument
    -> ProviderProfile
    -> File
    -> User

ServiceSubcategory
    -> ServiceCategory

Service
    -> ServiceSubcategory

Requirement
    -> Organization
    -> Service
    -> User

RequirementVersion
    -> Requirement
    -> User

RequirementAttachment
    -> Requirement
    -> File
    -> User

Offer
    -> Requirement
    -> ProviderProfile
    -> Organization

OfferVersion
    -> Offer
    -> User

Contract
    -> Requirement
    -> Offer
    -> Organization

ContractVersion
    -> Contract
    -> File
    -> User

Signature
    -> ContractVersion
    -> User

Mission
    -> Contract
    -> Organization

Milestone
    -> Mission

Deliverable
    -> Milestone

DeliverableVersion
    -> Deliverable
    -> File
    -> User

QualityReview
    -> Deliverable
    -> User

QualityReport
    -> QualityReview

CorrectionRequest
    -> Deliverable
    -> QualityReview
    -> User

Payment
    -> Mission
    -> Milestone
    -> Organization

PaymentTransaction
    -> Payment

PaymentEvent
    -> PaymentTransaction

FinancialEntry
    -> Payment

Invoice
    -> Organization
    -> Payment

Refund
    -> PaymentTransaction
    -> User

ConversationParticipant
    -> Conversation
    -> User

Message
    -> Conversation
    -> User

Dispute
    -> Mission
    -> Contract
    -> User

DisputeEvidence
    -> Dispute
    -> File
    -> User

DisputeDecision
    -> Dispute
    -> User

Notification
    -> User

Evaluation
    -> Mission
    -> User

AuditLog
    -> User
    -> Organization
```

---

# 19. Historical Data Model

The following entities are explicitly versioned:

```text
Requirement
    |
    +---- RequirementVersion

Offer
    |
    +---- OfferVersion

Contract
    |
    +---- ContractVersion

Deliverable
    |
    +---- DeliverableVersion
```

Version records shall be immutable once they represent a validated historical state.

---

# 20. Financial Data Model

The financial structure is:

```text
Mission
   |
   +---- Payment
           |
           +---- PaymentTransaction
           |       |
           |       +---- PaymentEvent
           |
           +---- FinancialEntry
           |
           +---- Invoice
           |
           +---- Refund
```

The model must preserve traceability between the internal financial record and the external payment provider.

---

# 21. File Data Model

The file architecture is:

```text
File
 |
 +---- ProviderDocument
 |
 +---- RequirementAttachment
 |
 +---- ContractVersion
 |
 +---- DeliverableVersion
 |
 +---- DisputeEvidence
```

The `File` entity stores metadata and storage references.

The physical binary content remains in object storage.

---

# 22. Audit Data Model

The audit architecture is:

```text
User
 |
 v
AuditLog
 |
 +---- Organization
 |
 +---- Resource Type
 |
 +---- Resource ID
 |
 +---- Previous State
 |
 +---- New State
```

The audit model shall support traceability without unnecessarily duplicating sensitive information.

---

# 23. Organization Data Model

Organization-specific resources shall be associated with an organization directly or through a controlled relationship.

Examples include:

```text
Organization
 |
 +---- Requirement
 +---- Offer
 +---- Contract
 +---- Mission
 +---- Payment
 +---- Invoice
 +---- ProviderProfile
```

The exact organization ownership of each resource shall be enforced through the authorization architecture.

---

# 24. Logical Model Rules

The logical model shall respect the following rules:

1. Every persistent entity shall have a unique identifier.
2. Every foreign key shall reference an existing logical entity.
3. Historical information shall not be silently overwritten.
4. Financial records shall remain traceable.
5. Sensitive resources shall have an identifiable ownership or access context.
6. File metadata shall be separated from file storage.
7. Workflow states shall be represented explicitly where required.
8. Relationships shall be defined before physical implementation.
9. Database constraints shall be defined in the following database-design phase.
10. Indexes shall be defined after the relationships and access patterns are finalized.

---

# 25. Separation From Physical Database Design

This document intentionally does not define:

* PostgreSQL column types;
* Prisma syntax;
* database indexes;
* foreign-key actions;
* unique constraints;
* check constraints;
* partitioning;
* database-specific extensions.

These decisions belong to the following database design documents.

---

# 26. Next Documents

The logical data model shall be followed by:

```text
03-relationships.md
04-cardinalities.md
05-constraints.md
06-indexes.md
07-data-dictionary.md
```

After these documents are validated, the physical database schema can be implemented using Prisma and PostgreSQL.
