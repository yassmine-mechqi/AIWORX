# AIWORX — Database Relationships

## 1. Purpose

This document defines the relationships between the entities of the AIWORX database.

It describes:

* which entities are connected;
* the direction of the relationship;
* the business meaning of each relationship;
* the foreign-key dependency;
* the main ownership relationships.

The exact cardinalities are defined separately in:

```text
04-cardinalities.md
```

The physical implementation of these relationships will be defined later in the Prisma database schema.

---

# 2. Identity and Organization Relationships

## 2.1 User — OrganizationMembership

A user may belong to an organization through an organization membership.

```text
User
  |
  +---- OrganizationMembership
```

Relationship:

```text
OrganizationMembership.userId
    -> User.id
```

Business meaning:

A membership identifies the organization context in which a user operates.

---

## 2.2 Organization — OrganizationMembership

An organization may have multiple members.

```text
Organization
  |
  +---- OrganizationMembership
```

Relationship:

```text
OrganizationMembership.organizationId
    -> Organization.id
```

Business meaning:

The membership table allows the platform to manage users belonging to an organization.

---

## 2.3 Role — OrganizationMembership

A membership may have an assigned role.

```text
Role
  |
  +---- OrganizationMembership
```

Relationship:

```text
OrganizationMembership.roleId
    -> Role.id
```

Business meaning:

The role determines the permissions available to the user within the organization context.

---

## 2.4 Role — Permission

A role is associated with permissions.

```text
Role
  |
  +---- RolePermission
              |
              +---- Permission
```

Relationships:

```text
RolePermission.roleId
    -> Role.id

RolePermission.permissionId
    -> Permission.id
```

---

# 3. Provider Relationships

## 3.1 User — ProviderProfile

A provider profile is associated with a user.

```text
User
  |
  +---- ProviderProfile
```

Relationship:

```text
ProviderProfile.userId
    -> User.id
```

Business meaning:

The profile contains the professional information used by the provider on AIWORX.

---

## 3.2 Organization — ProviderProfile

A provider profile may also belong to a provider organization.

```text
Organization
  |
  +---- ProviderProfile
```

Relationship:

```text
ProviderProfile.organizationId
    -> Organization.id
```

---

## 3.3 ProviderProfile — ProviderVerification

A provider profile is associated with its verification process.

```text
ProviderProfile
  |
  +---- ProviderVerification
```

Relationship:

```text
ProviderVerification.providerProfileId
    -> ProviderProfile.id
```

---

## 3.4 ProviderProfile — ProviderDocument

Provider verification documents belong to a provider profile.

```text
ProviderProfile
  |
  +---- ProviderDocument
```

Relationship:

```text
ProviderDocument.providerProfileId
    -> ProviderProfile.id
```

---

## 3.5 ProviderProfile — ProviderSkill

A provider profile may contain multiple skills.

```text
ProviderProfile
  |
  +---- ProviderSkill
```

Relationship:

```text
ProviderSkill.providerProfileId
    -> ProviderProfile.id
```

---

## 3.6 ProviderProfile — ProviderCertification

A provider profile may contain certifications.

```text
ProviderProfile
  |
  +---- ProviderCertification
```

Relationship:

```text
ProviderCertification.providerProfileId
    -> ProviderProfile.id
```

---

# 4. Service Catalog Relationships

## 4.1 ServiceCategory — ServiceSubcategory

A service category contains service subcategories.

```text
ServiceCategory
  |
  +---- ServiceSubcategory
```

Relationship:

```text
ServiceSubcategory.categoryId
    -> ServiceCategory.id
```

---

## 4.2 ServiceSubcategory — Service

A service subcategory contains specific services.

```text
ServiceSubcategory
  |
  +---- Service
```

Relationship:

```text
Service.subcategoryId
    -> ServiceSubcategory.id
```

---

# 5. Requirement Relationships

## 5.1 Organization — Requirement

A client organization creates and owns requirements.

```text
Organization
  |
  +---- Requirement
```

Relationship:

```text
Requirement.clientOrganizationId
    -> Organization.id
```

---

## 5.2 User — Requirement

A user creates a requirement on behalf of the client organization.

```text
User
  |
  +---- Requirement
```

Relationship:

```text
Requirement.createdByUserId
    -> User.id
```

---

## 5.3 Service — Requirement

A requirement is associated with the relevant service.

```text
Service
  |
  +---- Requirement
```

Relationship:

```text
Requirement.serviceId
    -> Service.id
```

---

## 5.4 Requirement — RequirementVersion

A requirement has versions representing its historical modifications.

```text
Requirement
  |
  +---- RequirementVersion
```

Relationship:

```text
RequirementVersion.requirementId
    -> Requirement.id
```

---

## 5.5 Requirement — RequirementAttachment

A requirement may have attached files.

```text
Requirement
  |
  +---- RequirementAttachment
              |
              +---- File
```

Relationships:

```text
RequirementAttachment.requirementId
    -> Requirement.id

RequirementAttachment.fileId
    -> File.id
```

---

# 6. Offer Relationships

## 6.1 Requirement — Offer

A requirement may receive offers from providers.

```text
Requirement
  |
  +---- Offer
```

Relationship:

```text
Offer.requirementId
    -> Requirement.id
```

---

## 6.2 ProviderProfile — Offer

An offer is submitted by a provider.

```text
ProviderProfile
  |
  +---- Offer
```

Relationship:

```text
Offer.providerProfileId
    -> ProviderProfile.id
```

---

## 6.3 Organization — Offer

An offer may identify the provider organization.

```text
Organization
  |
  +---- Offer
```

Relationship:

```text
Offer.organizationId
    -> Organization.id
```

---

## 6.4 Offer — OfferVersion

An offer may have multiple versions.

```text
Offer
  |
  +---- OfferVersion
```

Relationship:

```text
OfferVersion.offerId
    -> Offer.id
```

---

## 6.5 Offer — OfferQuestion

Questions related to an offer belong to that offer.

```text
Offer
  |
  +---- OfferQuestion
```

Relationship:

```text
OfferQuestion.offerId
    -> Offer.id
```

---

## 6.6 Offer — OfferNegotiation

Negotiation events are associated with an offer.

```text
Offer
  |
  +---- OfferNegotiation
```

Relationship:

```text
OfferNegotiation.offerId
    -> Offer.id
```

---

# 7. Contract Relationships

## 7.1 Requirement — Contract

A contract originates from a requirement.

```text
Requirement
  |
  +---- Contract
```

Relationship:

```text
Contract.requirementId
    -> Requirement.id
```

---

## 7.2 Offer — Contract

The selected offer is associated with the resulting contract.

```text
Offer
  |
  +---- Contract
```

Relationship:

```text
Contract.offerId
    -> Offer.id
```

---

## 7.3 Organization — Contract

A contract identifies the client organization and provider organization.

```text
Organization
  |
  +---- Contract
```

Relationships:

```text
Contract.clientOrganizationId
    -> Organization.id

Contract.providerOrganizationId
    -> Organization.id
```

---

## 7.4 Contract — ContractVersion

A contract can have multiple versions.

```text
Contract
  |
  +---- ContractVersion
```

Relationship:

```text
ContractVersion.contractId
    -> Contract.id
```

---

## 7.5 ContractVersion — Signature

Electronic signatures are associated with a specific contract version.

```text
ContractVersion
  |
  +---- Signature
```

Relationship:

```text
Signature.contractVersionId
    -> ContractVersion.id
```

---

## 7.6 User — Signature

A user acts as the signer.

```text
User
  |
  +---- Signature
```

Relationship:

```text
Signature.signerUserId
    -> User.id
```

---

# 8. Mission Relationships

## 8.1 Contract — Mission

A mission is created from an accepted contract.

```text
Contract
  |
  +---- Mission
```

Relationship:

```text
Mission.contractId
    -> Contract.id
```

---

## 8.2 Organization — Mission

A mission identifies both participating organizations.

```text
Organization
  |
  +---- Mission
```

Relationships:

```text
Mission.clientOrganizationId
    -> Organization.id

Mission.providerOrganizationId
    -> Organization.id
```

---

## 8.3 Mission — Milestone

A mission contains milestones.

```text
Mission
  |
  +---- Milestone
```

Relationship:

```text
Milestone.missionId
    -> Mission.id
```

---

## 8.4 Milestone — Deliverable

A milestone contains or is associated with deliverables.

```text
Milestone
  |
  +---- Deliverable
```

Relationship:

```text
Deliverable.milestoneId
    -> Milestone.id
```

---

## 8.5 Deliverable — DeliverableVersion

A deliverable may have multiple submitted versions.

```text
Deliverable
  |
  +---- DeliverableVersion
```

Relationship:

```text
DeliverableVersion.deliverableId
    -> Deliverable.id
```

---

# 9. Quality Relationships

## 9.1 Deliverable — QualityReview

A deliverable may be reviewed by a quality expert.

```text
Deliverable
  |
  +---- QualityReview
```

Relationship:

```text
QualityReview.deliverableId
    -> Deliverable.id
```

---

## 9.2 User — QualityReview

A user performs the quality review.

```text
User
  |
  +---- QualityReview
```

Relationship:

```text
QualityReview.reviewerUserId
    -> User.id
```

---

## 9.3 QualityReview — QualityReport

A quality review produces a quality report.

```text
QualityReview
  |
  +---- QualityReport
```

Relationship:

```text
QualityReport.qualityReviewId
    -> QualityReview.id
```

---

## 9.4 QualityReview — CorrectionRequest

A quality review may result in a correction request.

```text
QualityReview
  |
  +---- CorrectionRequest
```

Relationship:

```text
CorrectionRequest.qualityReviewId
    -> QualityReview.id
```

---

## 9.5 Deliverable — CorrectionRequest

A correction request applies to a deliverable.

```text
Deliverable
  |
  +---- CorrectionRequest
```

Relationship:

```text
CorrectionRequest.deliverableId
    -> Deliverable.id
```

---

# 10. Payment Relationships

## 10.1 Mission — Payment

A payment is associated with a mission.

```text
Mission
  |
  +---- Payment
```

Relationship:

```text
Payment.missionId
    -> Mission.id
```

---

## 10.2 Milestone — Payment

A payment may be associated with a specific milestone.

```text
Milestone
  |
  +---- Payment
```

Relationship:

```text
Payment.milestoneId
    -> Milestone.id
```

---

## 10.3 Payment — PaymentTransaction

A payment may have an external transaction.

```text
Payment
  |
  +---- PaymentTransaction
```

Relationship:

```text
PaymentTransaction.paymentId
    -> Payment.id
```

---

## 10.4 PaymentTransaction — PaymentEvent

External payment events belong to a payment transaction.

```text
PaymentTransaction
  |
  +---- PaymentEvent
```

Relationship:

```text
PaymentEvent.paymentTransactionId
    -> PaymentTransaction.id
```

---

## 10.5 Payment — FinancialEntry

Financial ledger entries are associated with payments.

```text
Payment
  |
  +---- FinancialEntry
```

Relationship:

```text
FinancialEntry.paymentId
    -> Payment.id
```

---

## 10.6 Payment — Invoice

An invoice may be associated with a payment.

```text
Payment
  |
  +---- Invoice
```

Relationship:

```text
Invoice.paymentId
    -> Payment.id
```

---

## 10.7 PaymentTransaction — Refund

A refund is associated with the relevant external transaction.

```text
PaymentTransaction
  |
  +---- Refund
```

Relationship:

```text
Refund.paymentTransactionId
    -> PaymentTransaction.id
```

---

# 11. Messaging Relationships

## 11.1 Conversation — ConversationParticipant

A conversation contains participants.

```text
Conversation
  |
  +---- ConversationParticipant
```

Relationship:

```text
ConversationParticipant.conversationId
    -> Conversation.id
```

---

## 11.2 User — ConversationParticipant

Users participate in conversations.

```text
User
  |
  +---- ConversationParticipant
```

Relationship:

```text
ConversationParticipant.userId
    -> User.id
```

---

## 11.3 Conversation — Message

A conversation contains messages.

```text
Conversation
  |
  +---- Message
```

Relationship:

```text
Message.conversationId
    -> Conversation.id
```

---

## 11.4 User — Message

A user sends messages.

```text
User
  |
  +---- Message
```

Relationship:

```text
Message.senderUserId
    -> User.id
```

---

# 12. Dispute Relationships

## 12.1 Mission — Dispute

A dispute may be opened in relation to a mission.

```text
Mission
  |
  +---- Dispute
```

Relationship:

```text
Dispute.missionId
    -> Mission.id
```

---

## 12.2 Contract — Dispute

A dispute is also linked to the relevant contract.

```text
Contract
  |
  +---- Dispute
```

Relationship:

```text
Dispute.contractId
    -> Contract.id
```

---

## 12.3 Dispute — DisputeEvidence

A dispute may contain multiple pieces of evidence.

```text
Dispute
  |
  +---- DisputeEvidence
```

Relationship:

```text
DisputeEvidence.disputeId
    -> Dispute.id
```

---

## 12.4 Dispute — DisputeDecision

A dispute may receive a decision.

```text
Dispute
  |
  +---- DisputeDecision
```

Relationship:

```text
DisputeDecision.disputeId
    -> Dispute.id
```

---

# 13. Notification Relationships

## 13.1 User — Notification

Notifications are addressed to users.

```text
User
  |
  +---- Notification
```

Relationship:

```text
Notification.userId
    -> User.id
```

Notifications may reference another business resource through:

```text
relatedResourceType
relatedResourceId
```

This reference shall not bypass authorization controls.

---

# 14. File Relationships

## 14.1 User — File

A user uploads a file.

```text
User
  |
  +---- File
```

Relationship:

```text
File.uploadedByUserId
    -> User.id
```

---

## 14.2 File — ProviderDocument

A provider document references a stored file.

```text
File
  |
  +---- ProviderDocument
```

Relationship:

```text
ProviderDocument.fileId
    -> File.id
```

---

## 14.3 File — RequirementAttachment

A requirement attachment references a stored file.

```text
File
  |
  +---- RequirementAttachment
```

Relationship:

```text
RequirementAttachment.fileId
    -> File.id
```

---

## 14.4 File — ContractVersion

A contract version may reference its stored document.

```text
File
  |
  +---- ContractVersion
```

Relationship:

```text
ContractVersion.fileId
    -> File.id
```

---

## 14.5 File — DeliverableVersion

A deliverable version may reference one or more stored files according to the final file model.

```text
File
  |
  +---- DeliverableVersion
```

Relationship:

```text
DeliverableVersion.fileId
    -> File.id
```

---

## 14.6 File — DisputeEvidence

Dispute evidence may reference a stored file.

```text
File
  |
  +---- DisputeEvidence
```

Relationship:

```text
DisputeEvidence.fileId
    -> File.id
```

---

# 15. Evaluation Relationships

## 15.1 Mission — Evaluation

An evaluation is associated with a completed mission.

```text
Mission
  |
  +---- Evaluation
```

Relationship:

```text
Evaluation.missionId
    -> Mission.id
```

---

## 15.2 User — Evaluation

A user submits an evaluation.

```text
User
  |
  +---- Evaluation
```

Relationship:

```text
Evaluation.evaluatorUserId
    -> User.id
```

---

## 15.3 User — Evaluated User

An evaluation identifies the user being evaluated.

```text
User
  |
  +---- Evaluation
```

Relationship:

```text
Evaluation.evaluatedUserId
    -> User.id
```

---

# 16. Audit Relationships

## 16.1 User — AuditLog

An audit event identifies the user who performed the action.

```text
User
  |
  +---- AuditLog
```

Relationship:

```text
AuditLog.actorUserId
    -> User.id
```

---

## 16.2 Organization — AuditLog

An audit event may also contain the organization context.

```text
Organization
  |
  +---- AuditLog
```

Relationship:

```text
AuditLog.organizationId
    -> Organization.id
```

---

# 17. Complete Business Flow

The main business relationships can be represented as:

```text
Organization
    |
    +---- Requirement
              |
              +---- Offer
                     |
                     +---- Contract
                            |
                            +---- Mission
                                   |
                                   +---- Milestone
                                          |
                                          +---- Deliverable
                                                 |
                                                 +---- QualityReview
                                                 |
                                                 +---- CorrectionRequest

Mission
    |
    +---- Payment
           |
           +---- PaymentTransaction
           |
           +---- FinancialEntry
           |
           +---- Invoice
           |
           +---- Refund

Mission
    |
    +---- Dispute
           |
           +---- DisputeEvidence
           |
           +---- DisputeDecision
```

---

# 18. Provider Business Flow

The provider-related relationships are:

```text
User
  |
  +---- ProviderProfile
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
                  +---- Contract
                          |
                          +---- Mission
```

---

# 19. Requirement to Mission Relationship

The main transformation from a client need to execution is:

```text
Requirement
    |
    +---- RequirementVersion
    |
    +---- Offer
            |
            +---- OfferVersion
            |
            +---- OfferNegotiation
            |
            +---- Contract
                    |
                    +---- ContractVersion
                    |
                    +---- Signature
                    |
                    +---- Mission
```

This relationship chain allows the platform to preserve traceability from the original client need to the executed mission.

---

# 20. Quality and Correction Relationship

The quality workflow is represented as:

```text
Deliverable
    |
    +---- DeliverableVersion
    |
    +---- QualityReview
            |
            +---- QualityReport
            |
            +---- CorrectionRequest
                    |
                    +---- Deliverable
```

The relationship structure allows corrections to remain associated with the deliverable and its quality-control process.

---

# 21. Payment Traceability Relationship

The payment relationship is:

```text
Mission
    |
    +---- Milestone
    |       |
    |       +---- Payment
    |
    +---- Payment
            |
            +---- PaymentTransaction
                    |
                    +---- PaymentEvent
            |
            +---- FinancialEntry
            |
            +---- Invoice
            |
            +---- Refund
```

This structure provides a traceable chain between the mission and its financial operations.

---

# 22. Communication Relationship

Communication is connected to the relevant business context.

```text
Conversation
    |
    +---- ConversationParticipant
    |
    +---- Message
```

A conversation may be related to:

```text
Requirement
Offer
Mission
Dispute
```

The final implementation shall ensure that participants can only access conversations for which they are authorized.

---

# 23. Dispute Traceability

A dispute maintains a relationship with the business context that generated it.

```text
Contract
    |
    +---- Mission
            |
            +---- Dispute
                    |
                    +---- DisputeEvidence
                    |
                    +---- DisputeDecision
```

This allows the dispute process to reference the contractual and operational context.

---

# 24. Relationship Integrity Rules

The database relationships shall respect the following rules:

1. Foreign keys shall reference valid entities.
2. A child record shall not reference a nonexistent parent.
3. Organization ownership shall remain identifiable.
4. Historical versions shall remain associated with their parent entity.
5. Financial transactions shall remain traceable.
6. Audit records shall retain their actor context.
7. Files shall remain associated with their business resource.
8. Messages shall remain associated with their conversation.
9. Dispute evidence shall remain associated with its dispute.
10. Quality reports shall remain associated with their reviews.

---

# 25. Authorization and Relationships

A database relationship does not automatically grant access.

For example:

```text
User
   |
   +---- OrganizationMembership
              |
              +---- Organization
```

does not by itself authorize the user to access every resource belonging to the organization.

Authorization shall be enforced by the backend according to the authorization architecture.

---

# 26. Relationship With External Systems

Some relationships involve external systems.

The database shall preserve external references for:

```text
Signature
PaymentTransaction
PaymentEvent
Refund
File
```

External identifiers shall not replace the internal AIWORX identifiers.

---

# 27. Relationship With Audit

Important business operations shall be traceable through `AuditLog`.

Examples include:

```text
Requirement changes
Offer changes
Contract changes
Signature events
Mission state changes
Deliverable validation
Quality decisions
Payment operations
Refunds
Dispute decisions
Authorization-sensitive operations
```

The audit relationship shall not be used as a replacement for normal foreign-key relationships.

---

# 28. Relationship Validation

Before implementing the physical database, all relationships shall be validated against:

* business rules;
* workflows;
* requirements;
* architecture;
* authorization rules;
* payment rules;
* quality-control rules;
* dispute rules;
* audit requirements.

---

# 29. Next Database Document

The next document is:

```text
04-cardinalities.md
```

This document will define the exact relationship cardinalities, such as:

```text
one-to-one
one-to-many
many-to-many
```

and will specify which relationships are mandatory or optional.
