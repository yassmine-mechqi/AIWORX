# AIWORX — Database Indexes

## 1. Purpose

This document defines the database indexes required for the AIWORX platform.

The objectives are to:

* improve query performance;
* accelerate frequent searches;
* optimize filtering and sorting;
* improve foreign-key lookups;
* support organization-based access;
* support marketplace operations;
* support financial operations;
* support audit and monitoring queries.

Indexes shall be created only where they provide a meaningful performance benefit.

---

# 2. Indexing Principles

The database indexing strategy follows these principles:

1. Primary keys are automatically indexed.
2. Unique constraints create unique indexes where supported by the database.
3. Foreign keys used frequently for joins should be indexed.
4. Frequently filtered fields should be indexed.
5. Frequently sorted fields may require indexes.
6. Composite indexes shall follow actual query patterns.
7. Duplicate or unnecessary indexes shall be avoided.
8. Indexes shall be reviewed after observing real query performance.
9. Indexes shall not replace proper query design.
10. Indexes shall not be created blindly on every column.

---

# 3. User Indexes

## 3.1 User Email

The user email is used for authentication and account lookup.

```text id="zq3p1r"
INDEX:
User.email
```

If email is the account identifier, the index shall be unique.

```text id="c9x4ka"
UNIQUE INDEX:
User.email
```

---

## 3.2 User Creation Date

A creation-date index may be used for administrative queries and user listings.

```text id="n4q8vx"
INDEX:
User.createdAt
```

This index is optional and shall be validated against actual query requirements.

---

# 4. Organization Indexes

## 4.1 Organization Name

Organizations may frequently be searched by name.

```text id="w3p6sd"
INDEX:
Organization.name
```

If the business rules require globally unique organization names, a unique constraint shall be used instead.

The exact uniqueness rule must be validated before implementation.

---

## 4.2 Organization Creation Date

Administrative queries may filter organizations by creation date.

```text id="j8k2mz"
INDEX:
Organization.createdAt
```

---

# 5. Organization Membership Indexes

Organization membership is frequently used to determine which users belong to an organization.

## 5.1 Organization

```text id="u5q7le"
INDEX:
OrganizationMembership.organizationId
```

---

## 5.2 User

```text id="b6r1wp"
INDEX:
OrganizationMembership.userId
```

---

## 5.3 Organization and User

Queries may frequently check whether a specific user belongs to a specific organization.

Therefore:

```text id="d2x8fc"
COMPOSITE INDEX:
(organizationId, userId)
```

may be used.

If the business rules make the membership unique, the composite unique constraint defined in `05-constraints.md` shall provide the required unique index.

---

## 5.4 Organization and Role

Queries may filter organization members by role.

```text id="k7v3nm"
COMPOSITE INDEX:
(organizationId, roleId)
```

This supports administrative role-based listings.

---

# 6. Role and Permission Indexes

## 6.1 RolePermission by Role

```text id="p4z8tc"
INDEX:
RolePermission.roleId
```

---

## 6.2 RolePermission by Permission

```text id="q6m1vx"
INDEX:
RolePermission.permissionId
```

---

## 6.3 RolePermission Composite Index

The composite relationship should use:

```text id="r8c2fd"
UNIQUE INDEX:
(roleId, permissionId)
```

This prevents duplicate role-permission assignments.

---

# 7. Provider Indexes

## 7.1 Provider Profile by User

Provider profiles are frequently retrieved from the authenticated user.

```text id="m5n7qa"
INDEX:
ProviderProfile.userId
```

If one user can have only one provider profile:

```text id="t2v6ke"
UNIQUE INDEX:
ProviderProfile.userId
```

---

## 7.2 Provider Profile by Organization

Provider profiles may be searched by organization.

```text id="y8c3wp"
INDEX:
ProviderProfile.organizationId
```

---

## 7.3 Provider Verification

Verification records may be queried by provider and status.

```text id="e4r9ls"
COMPOSITE INDEX:
(providerProfileId, status)
```

This supports qualification and administrative verification workflows.

---

## 7.4 Provider Skills

Provider skills are important for matching and provider searches.

```text id="v7m2nx"
INDEX:
ProviderSkill.providerProfileId
```

If skills reference a service or skill catalog:

```text id="a3q8kd"
INDEX:
ProviderSkill.skillId
```

The exact field name shall follow the final logical data model.

---

## 7.5 Provider Certifications

```text id="f6w1pz"
INDEX:
ProviderCertification.providerProfileId
```

Where certification validity is queried:

```text id="h9c4bt"
COMPOSITE INDEX:
(providerProfileId, status)
```

---

# 8. Service Catalog Indexes

## 8.1 Service Category

```text id="s2m7qa"
INDEX:
ServiceCategory.name
```

---

## 8.2 Service Subcategory

```text id="x5k8vf"
INDEX:
ServiceSubcategory.categoryId
```

---

## 8.3 Service

Services are frequently retrieved by subcategory.

```text id="n3r6wd"
INDEX:
Service.subcategoryId
```

---

# 9. Requirement Indexes

Requirements are one of the principal business objects of AIWORX.

## 9.1 Client Organization

Requirements are frequently listed by client organization.

```text id="q8f2mj"
INDEX:
Requirement.clientOrganizationId
```

---

## 9.2 Requirement Creator

```text id="w4c7px"
INDEX:
Requirement.createdByUserId
```

---

## 9.3 Requirement Service

Requirements may be filtered by service.

```text id="e9n5ka"
INDEX:
Requirement.serviceId
```

---

## 9.4 Requirement Status

Requirements are frequently filtered by lifecycle status.

```text id="m2v8rd"
INDEX:
Requirement.status
```

---

## 9.5 Organization and Status

A common query is:

```text id="b7x3pl"
Get requirements of an organization
filtered by status
```

Therefore:

```text id="c5q9fn"
COMPOSITE INDEX:
(clientOrganizationId, status)
```

---

## 9.6 Status and Creation Date

Marketplace and administrative screens may require recent requirements.

```text id="g1w6tm"
COMPOSITE INDEX:
(status, createdAt)
```

This supports queries such as:

```text id="u4p8zs"
WHERE status = ...
ORDER BY createdAt DESC
```

---

# 10. Requirement Version Indexes

Requirement versions are queried by their parent requirement.

```text id="r6k2vb"
INDEX:
RequirementVersion.requirementId
```

The version number shall participate in a unique composite index:

```text id="y3m9qc"
UNIQUE INDEX:
(requirementId, versionNumber)
```

---

# 11. Requirement Attachment Indexes

Attachments are retrieved by requirement.

```text id="d8f4ka"
INDEX:
RequirementAttachment.requirementId
```

Files may also be queried by attachment.

```text id="p2v7xm"
INDEX:
RequirementAttachment.fileId
```

---

# 12. Offer Indexes

Offers are central to marketplace performance.

## 12.1 Requirement

```text id="n8q3wl"
INDEX:
Offer.requirementId
```

---

## 12.2 Provider

```text id="z4c6rp"
INDEX:
Offer.providerProfileId
```

---

## 12.3 Offer Status

```text id="v7m2kd"
INDEX:
Offer.status
```

---

## 12.4 Requirement and Status

A frequent query is:

```text id="q5x9bt"
Get all active offers for a requirement
```

Therefore:

```text id="s8f3mn"
COMPOSITE INDEX:
(requirementId, status)
```

---

## 12.5 Provider and Status

Provider dashboards may retrieve offers by status.

```text id="c2w7ka"
COMPOSITE INDEX:
(providerProfileId, status)
```

---

## 12.6 Offer Creation Date

Offer listings may require chronological ordering.

```text id="h6r4px"
INDEX:
Offer.createdAt
```

---

# 13. Offer Version Indexes

Offer versions are retrieved by offer.

```text id="m9v2qd"
INDEX:
OfferVersion.offerId
```

The following shall be unique:

```text id="f5k8wc"
UNIQUE INDEX:
(offerId, versionNumber)
```

---

# 14. Offer Negotiation Indexes

Negotiation records are retrieved by offer.

```text id="r3x7nb"
INDEX:
OfferNegotiation.offerId
```

For chronological negotiation history:

```text id="t8m4qp"
COMPOSITE INDEX:
(offerId, createdAt)
```

---

# 15. Contract Indexes

## 15.1 Requirement

```text id="v5c2xl"
INDEX:
Contract.requirementId
```

---

## 15.2 Offer

```text id="k9q4mf"
INDEX:
Contract.offerId
```

---

## 15.3 Client Organization

```text id="w6p3za"
INDEX:
Contract.clientOrganizationId
```

---

## 15.4 Provider Organization

```text id="e2r8nc"
INDEX:
Contract.providerOrganizationId
```

---

## 15.5 Contract Status

```text id="m7x5qd"
INDEX:
Contract.status
```

---

## 15.6 Organization and Status

Administrative and client dashboards may require:

```text id="b4k9wp"
COMPOSITE INDEX:
(clientOrganizationId, status)
```

and:

```text id="c8f2mv"
COMPOSITE INDEX:
(providerOrganizationId, status)
```

---

# 16. Contract Version Indexes

Contract versions are retrieved by contract.

```text id="p7n3xz"
INDEX:
ContractVersion.contractId
```

The version number shall be unique within a contract:

```text id="q4m8vc"
UNIQUE INDEX:
(contractId, versionNumber)
```

---

# 17. Signature Indexes

Signatures are frequently queried by contract version.

```text id="s6x2kb"
INDEX:
Signature.contractVersionId
```

Signatures may also be retrieved by signer.

```text id="j9w4rf"
INDEX:
Signature.userId
```

For determining whether a specific user has signed a specific contract version:

```text id="n5c8qp"
COMPOSITE INDEX:
(contractVersionId, userId)
```

---

# 18. Mission Indexes

## 18.1 Contract

```text id="x7r3mv"
INDEX:
Mission.contractId
```

---

## 18.2 Client Organization

```text id="q2k8fd"
INDEX:
Mission.clientOrganizationId
```

---

## 18.3 Provider Organization

```text id="w9m4zc"
INDEX:
Mission.providerOrganizationId
```

---

## 18.4 Mission Status

```text id="e6p2nb"
INDEX:
Mission.status
```

---

## 18.5 Organization and Status

For client dashboards:

```text id="r8v3kx"
COMPOSITE INDEX:
(clientOrganizationId, status)
```

For provider dashboards:

```text id="t5q7md"
COMPOSITE INDEX:
(providerOrganizationId, status)
```

---

# 19. Milestone Indexes

Milestones are retrieved by mission.

```text id="f3w8qa"
INDEX:
Milestone.missionId
```

For chronological milestone queries:

```text id="m6k2vp"
COMPOSITE INDEX:
(missionId, sequenceNumber)
```

If the final model uses dates instead of a sequence number:

```text id="p9c4xr"
COMPOSITE INDEX:
(missionId, dueDate)
```

Only the field used by the final data model shall be indexed.

---

# 20. Deliverable Indexes

## 20.1 Milestone

```text id="v4n7mc"
INDEX:
Deliverable.milestoneId
```

---

## 20.2 Deliverable Status

```text id="x8q2kb"
INDEX:
Deliverable.status
```

---

## 20.3 Milestone and Status

```text id="c6r9wp"
COMPOSITE INDEX:
(milestoneId, status)
```

---

# 21. Deliverable Version Indexes

Versions are retrieved by deliverable.

```text id="d3m8fq"
INDEX:
DeliverableVersion.deliverableId
```

The version number shall be unique:

```text id="k7p2vz"
UNIQUE INDEX:
(deliverableId, versionNumber)
```

---

# 22. Quality Review Indexes

Quality reviews are retrieved by deliverable.

```text id="n4x9cw"
INDEX:
QualityReview.deliverableId
```

Reviews may also be queried by reviewer.

```text id="q6m3vp"
INDEX:
QualityReview.reviewerUserId
```

For review history:

```text id="w8f2kr"
COMPOSITE INDEX:
(deliverableId, createdAt)
```

---

# 23. Correction Request Indexes

Correction requests are retrieved by deliverable.

```text id="r5c8xn"
INDEX:
CorrectionRequest.deliverableId
```

They may also be retrieved by quality review.

```text id="j2v7md"
INDEX:
CorrectionRequest.qualityReviewId
```

For open correction queries:

```text id="p9q4wf"
COMPOSITE INDEX:
(deliverableId, status)
```

---

# 24. Payment Indexes

Payment queries are important for both operations and administration.

## 24.1 Mission

```text id="x3m8kc"
INDEX:
Payment.missionId
```

---

## 24.2 Payment Status

```text id="v7q2np"
INDEX:
Payment.status
```

---

## 24.3 Mission and Status

```text id="f5r9wd"
COMPOSITE INDEX:
(missionId, status)
```

---

## 24.4 Payment Creation Date

```text id="c8k4mx"
INDEX:
Payment.createdAt
```

This supports financial history and administrative queries.

---

# 25. Payment Transaction Indexes

## 25.1 Payment

```text id="n6p3vz"
INDEX:
PaymentTransaction.paymentId
```

---

## 25.2 External Transaction Identifier

External transaction identifiers shall be indexed.

If the provider guarantees uniqueness:

```text id="q9w2fc"
UNIQUE INDEX:
externalTransactionId
```

If identifiers are unique only within a payment provider:

```text id="m4x7kb"
UNIQUE INDEX:
(provider, externalTransactionId)
```

The final implementation shall follow the payment provider's identifier policy.

---

# 26. Payment Event Indexes

Events are retrieved by transaction.

```text id="r8c5np"
INDEX:
PaymentEvent.paymentTransactionId
```

External event identifiers should be indexed.

```text id="v2m9qd"
INDEX:
PaymentEvent.externalEventId
```

For chronological event processing:

```text id="k6f3wx"
COMPOSITE INDEX:
(paymentTransactionId, createdAt)
```

---

# 27. Refund Indexes

Refunds are retrieved by transaction.

```text id="p4x8mc"
INDEX:
Refund.paymentTransactionId
```

Refund status may also be queried:

```text id="n7q2vr"
INDEX:
Refund.status
```

---

# 28. Financial Entry Indexes

Financial entries are retrieved by payment.

```text id="w3m9kf"
INDEX:
FinancialEntry.paymentId
```

For financial reporting:

```text id="c7x4pn"
INDEX:
FinancialEntry.createdAt
```

If entries are grouped by type:

```text id="r2v8md"
COMPOSITE INDEX:
(type, createdAt)
```

---

# 29. Invoice Indexes

Invoices may be retrieved by payment.

```text id="f6q3wb"
INDEX:
Invoice.paymentId
```

Invoice identifiers shall be indexed.

If invoice numbers are globally unique:

```text id="t9m4kc"
UNIQUE INDEX:
Invoice.number
```

The final uniqueness policy shall be validated before implementation.

---

# 30. Conversation Indexes

Conversations are retrieved through their participants.

```text id="x5p8vn"
INDEX:
ConversationParticipant.userId
```

The relationship uniqueness is:

```text id="q2r7mf"
UNIQUE INDEX:
(conversationId, userId)
```

---

# 31. Message Indexes

Messages are primarily retrieved by conversation.

```text id="m8c4wp"
INDEX:
Message.conversationId
```

For chronological conversation history:

```text id="v6q2kx"
COMPOSITE INDEX:
(conversationId, createdAt)
```

Messages may also be queried by sender:

```text id="p3n9fd"
INDEX:
Message.senderUserId
```

---

# 32. Dispute Indexes

## 32.1 Mission

```text id="w7m2qc"
INDEX:
Dispute.missionId
```

---

## 32.2 Contract

```text id="x4r8kn"
INDEX:
Dispute.contractId
```

---

## 32.3 Dispute Status

```text id="f9p3vd"
INDEX:
Dispute.status
```

---

## 32.4 Mission and Status

```text id="c5q7mx"
COMPOSITE INDEX:
(missionId, status)
```

This supports queries for active disputes associated with a mission.

---

# 33. Dispute Evidence Indexes

Evidence is retrieved by dispute.

```text id="n8w4kp"
INDEX:
DisputeEvidence.disputeId
```

File references may also be indexed:

```text id="r6m2xc"
INDEX:
DisputeEvidence.fileId
```

---

# 34. Dispute Decision Indexes

Decisions are retrieved by dispute.

```text id="q3v7fn"
INDEX:
DisputeDecision.disputeId
```

---

# 35. Notification Indexes

Notifications are primarily retrieved by recipient.

```text id="m5k8wp"
INDEX:
Notification.userId
```

Unread notifications are frequently queried.

Therefore:

```text id="x7c2vr"
COMPOSITE INDEX:
(userId, status)
```

For chronological notification history:

```text id="p4n9mf"
COMPOSITE INDEX:
(userId, createdAt)
```

---

# 36. File Indexes

Files may be retrieved by uploader.

```text id="w2q6kc"
INDEX:
File.uploadedByUserId
```

Files may also be queried by creation date:

```text id="r8m3vp"
INDEX:
File.createdAt
```

External storage references shall be indexed if they are frequently used for file retrieval.

---

# 37. Evaluation Indexes

Evaluations may be retrieved by mission.

```text id="f5x9nb"
INDEX:
Evaluation.missionId
```

Evaluations may be retrieved by evaluator.

```text id="k3q7md"
INDEX:
Evaluation.evaluatorUserId
```

Evaluations may be retrieved by evaluated user.

```text id="v8p2cw"
INDEX:
Evaluation.evaluatedUserId
```

For evaluation history of a user:

```text id="m6r4xf"
COMPOSITE INDEX:
(evaluatedUserId, createdAt)
```

---

# 38. Audit Log Indexes

Audit logs can become large and therefore require appropriate indexing.

## 38.1 Actor

```text id="q9w5mk"
INDEX:
AuditLog.actorUserId
```

---

## 38.2 Organization

```text id="c4x8pn"
INDEX:
AuditLog.organizationId
```

---

## 38.3 Resource

If the model contains:

```text id="r7m2vd"
resourceType
resourceId
```

then a composite index should be considered:

```text id="n5q9kc"
COMPOSITE INDEX:
(resourceType, resourceId)
```

This supports retrieving the audit history of a specific resource.

---

## 38.4 Timestamp

Audit history is frequently retrieved chronologically.

```text id="w3f8mx"
INDEX:
AuditLog.createdAt
```

---

## 38.5 Organization and Timestamp

For administrative audit queries:

```text id="p6k2vr"
COMPOSITE INDEX:
(organizationId, createdAt)
```

---

# 39. General Status Indexing

Status columns shall be indexed when they are frequently used as filters.

Potential candidates include:

```text id="x8m4qd"
Requirement.status
Offer.status
Contract.status
Mission.status
Milestone.status
Deliverable.status
Payment.status
Dispute.status
Notification.status
```

An index shall only be retained when supported by actual query patterns.

---

# 40. Date-Based Indexing

Date indexes shall support queries such as:

```text id="k2v7pc"
Recently created records
Recently updated records
Pending records
Expired records
Upcoming deadlines
Historical records
```

Potential date fields include:

```text id="r9m3wf"
createdAt
updatedAt
submittedAt
dueDate
completedAt
expiresAt
```

Only fields used by real queries shall receive indexes.

---

# 41. Composite Index Design

Composite indexes shall follow the order of query predicates.

For example:

```text id="f5c8xn"
WHERE organizationId = ?
AND status = ?
ORDER BY createdAt DESC
```

may benefit from:

```text id="q7m2vp"
(organizationId, status, createdAt)
```

The order of columns is important.

The final composite indexes shall therefore be based on actual backend queries rather than theoretical assumptions.

---

# 42. Indexes and Marketplace Matching

The AIWORX matching system may use provider attributes such as:

```text id="w4n8kc"
Skills
Service category
Service
Qualification status
Availability
Organization
Provider status
```

The database shall support efficient retrieval of eligible providers.

However, the exact matching algorithm and weighting are not fixed by the database index design.

The indexes shall support candidate retrieval, while matching logic belongs to the backend/business layer.

---

# 43. Indexes and Organization Isolation

Organization-based queries are common throughout AIWORX.

Important organization fields include:

```text id="m9q3xf"
clientOrganizationId
providerOrganizationId
organizationId
```

These fields should be indexed where they are used for:

* authorization-related filtering;
* dashboards;
* listings;
* reporting;
* audit queries.

---

# 44. Indexes and Financial Queries

Financial queries may involve:

```text id="c6v8rp"
Payment
PaymentTransaction
PaymentEvent
Refund
Invoice
FinancialEntry
```

The indexes must support:

* payment retrieval by mission;
* transaction retrieval by payment;
* external transaction lookup;
* event processing;
* refund retrieval;
* financial reporting.

---

# 45. Indexes and Quality Queries

Quality operations may involve:

```text id="p2m7xd"
Deliverable
QualityReview
QualityReport
CorrectionRequest
```

The indexes shall support:

* retrieving reviews for a deliverable;
* retrieving correction requests;
* retrieving quality history;
* identifying pending quality work.

---

# 46. Indexes and Dispute Queries

Dispute operations may require:

```text id="r5x9kc"
Dispute by mission
Dispute by contract
Dispute by status
Evidence by dispute
Decision by dispute
```

The corresponding foreign keys and status fields should therefore be indexed.

---

# 47. Indexes and Audit Queries

Audit queries must support:

* retrieving actions performed by a user;
* retrieving actions for an organization;
* retrieving the history of a resource;
* retrieving actions within a time range.

The following indexes are therefore important:

```text id="n8q3wm"
(actorUserId)
(organizationId)
(resourceType, resourceId)
(createdAt)
```

Additional composite indexes may be added after observing real query patterns.

---

# 48. Avoiding Redundant Indexes

The implementation shall avoid creating redundant indexes.

For example, if a unique index already exists on:

```text id="v4m8qp"
(email)
```

another normal index on `email` is unnecessary.

Likewise, if:

```text id="x6c2kr"
(organizationId, status)
```

exists, an additional index on `organizationId` should only be added if the database query workload demonstrates that it is necessary.

---

# 49. Index Maintenance

Indexes have a cost.

They may:

* increase storage usage;
* increase write cost;
* increase migration complexity;
* require maintenance.

Therefore every index must have a clear reason.

Unused indexes should be identified and removed after performance analysis.

---

# 50. Performance Validation

After the backend implementation begins, index effectiveness shall be validated using real queries.

The team should monitor:

```text id="q7w3mf"
Query execution time
Slow queries
Database load
Index usage
Read/write performance
```

Indexes may be adjusted after performance testing.

---

# 51. Prisma Implementation

The indexes defined in this document will later be translated into Prisma schema definitions.

Typical implementation concepts include:

```text id="m5x8vr"
@@index([field])
@@index([fieldA, fieldB])
@@unique([fieldA, fieldB])
```

The exact Prisma schema shall only be created after the complete database design has been validated.

---

# 52. Relationship With Other Database Documents

The database design sequence is:

```text id="f8q2mc"
01-erd.md
      ↓
02-logical-data-model.md
      ↓
03-relationships.md
      ↓
04-cardinalities.md
      ↓
05-constraints.md
      ↓
06-indexes.md
      ↓
07-data-dictionary.md
      ↓
Prisma schema
```

This document therefore defines the indexing strategy before the physical Prisma schema is implemented.

---

# 53. Final Indexing Principle

The AIWORX database shall not attempt to optimize every possible query in advance.

The initial indexes shall cover:

* primary keys;
* unique identifiers;
* foreign keys used frequently;
* organization filtering;
* marketplace filtering;
* status filtering;
* payment and financial lookups;
* quality operations;
* dispute operations;
* notifications;
* audit history.

Further indexes shall be added only when justified by real query patterns and performance measurements.
