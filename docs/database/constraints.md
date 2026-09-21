# AIWORX — Database Constraints

## 1. Purpose

This document defines the database constraints required to preserve the integrity, consistency and traceability of AIWORX data.

The constraints cover:

* primary keys;
* foreign keys;
* unique values;
* required fields;
* nullable fields;
* allowed values;
* referential integrity;
* version integrity;
* financial integrity;
* authorization-related integrity;
* audit integrity.

The exact physical implementation will be performed later in the Prisma schema.

---

# 2. General Constraint Principles

The database shall ensure that:

1. Every persistent entity has a unique identifier.
2. Required relationships cannot reference nonexistent records.
3. Business-critical identifiers are unique where required.
4. Required information cannot be stored as null.
5. Optional information may remain null.
6. Historical versions cannot be silently overwritten.
7. Financial records remain traceable to their source business operation.
8. Audit records remain traceable.
9. Records cannot bypass organization boundaries through invalid references.
10. Database constraints shall complement backend validation rather than replace it.

---

# 3. Primary Key Constraints

Every main entity shall have a primary key.

The primary key shall uniquely identify the record.

The principal entities include:

```text
User
Organization
OrganizationMembership
Role
Permission
RolePermission

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

Each primary key shall be:

* non-null;
* unique;
* immutable after creation.

---

# 4. Identifier Constraints

Identifiers used as primary keys shall not be reused after a record is permanently removed.

Internal identifiers shall be different from external provider identifiers.

For integrations, external identifiers shall be stored separately.

Example:

```text
id
externalId
```

The external identifier shall never replace the internal primary key.

---

# 5. User Constraints

## 5.1 User Identifier

Each user must have a unique identifier.

```text
User.id
```

shall be:

* required;
* unique;
* immutable.

---

## 5.2 User Contact Information

The contact information used for account identification shall respect the uniqueness rules defined by the authentication design.

Where email is used as the account identifier:

```text
User.email
```

shall be unique.

---

## 5.3 User Role

A user's effective role shall be represented through the authorization model.

The database shall not allow a membership to reference a nonexistent role.

---

# 6. Organization Constraints

## 6.1 Organization Identifier

Every organization must have a unique identifier.

---

## 6.2 Organization Information

Mandatory organization information shall not be null.

Optional organization information may remain null until it becomes required by the relevant workflow.

---

# 7. Organization Membership Constraints

An organization membership must reference:

```text
User
Organization
Role
```

Therefore:

```text
OrganizationMembership.userId
OrganizationMembership.organizationId
OrganizationMembership.roleId
```

shall be required.

---

## 7.1 Membership Uniqueness

The same user shall not have duplicate active membership records for the same organization and role context.

A composite uniqueness rule shall therefore be considered for:

```text
userId
organizationId
roleId
```

The final implementation shall account for membership lifecycle and historical records.

---

# 8. Role and Permission Constraints

## 8.1 RolePermission

Every `RolePermission` record must reference:

```text
Role
Permission
```

Both foreign keys are required.

---

## 8.2 Duplicate Permissions

The same permission shall not be assigned more than once to the same role.

Therefore the following combination shall be unique:

```text
roleId
permissionId
```

---

# 9. Provider Constraints

## 9.1 Provider Profile

A provider profile must reference one user.

```text
ProviderProfile.userId
```

is required.

A user may have at most one active provider profile under the current model.

---

## 9.2 Provider Organization

The provider organization relationship may be optional for an individual provider.

If an organization is specified, it must exist.

---

## 9.3 Provider Verification

A verification record must reference a valid provider profile.

Verification information shall remain traceable.

---

## 9.4 Provider Documents

Every provider document must reference:

```text
ProviderProfile
File
```

Both relationships are required.

Documents required for qualification shall not be considered valid if their required information is missing.

---

## 9.5 Provider Skills

A provider skill must reference a valid provider profile.

Duplicate identical skill assignments for the same provider shall not be allowed.

---

## 9.6 Provider Certifications

A certification must reference a valid provider profile.

Where a certification identifier is used, it shall respect the required uniqueness rules.

Expiration information shall be validated when an expiration date is applicable.

---

# 10. Service Catalog Constraints

## 10.1 Service Category

A service category must have:

```text
id
name
```

The category name shall follow the uniqueness policy defined for the catalog.

---

## 10.2 Service Subcategory

A service subcategory must reference one service category.

```text
ServiceSubcategory.categoryId
```

is required.

A duplicate subcategory name within the same category shall not be allowed.

---

## 10.3 Service

A service must reference one service subcategory.

```text
Service.subcategoryId
```

is required.

A duplicate service definition within the same subcategory shall not be allowed.

---

# 11. Requirement Constraints

## 11.1 Requirement Ownership

Every requirement must identify its client organization.

```text
Requirement.clientOrganizationId
```

is required.

---

## 11.2 Requirement Creator

Every requirement must identify the user who created it.

```text
Requirement.createdByUserId
```

is required.

---

## 11.3 Requirement Service

A requirement must reference the service defined by the catalog.

```text
Requirement.serviceId
```

is required under the current logical model.

---

## 11.4 Requirement Status

The requirement status must use only values defined by the approved lifecycle.

The current functional analysis identifies states including:

```text
Draft
Submitted
In Qualification
Additional Information Required
Qualified
Published
Selected
In Contracting
Cancelled
Archived
```

The final enum values shall be confirmed before implementation.

---

## 11.5 Requirement Version

Every requirement version must reference one requirement.

The version number shall be unique within the requirement.

Therefore:

```text
(requirementId, versionNumber)
```

shall be unique.

---

## 11.6 Requirement Attachments

Every requirement attachment must reference:

```text
Requirement
File
```

An attachment cannot reference a nonexistent file.

---

# 12. Offer Constraints

## 12.1 Offer Ownership

Every offer must reference:

```text
Requirement
ProviderProfile
```

Both relationships are required.

---

## 12.2 Offer Status

The offer status must be limited to approved lifecycle values.

Possible lifecycle states include:

```text
Draft
Submitted
Under Review
Negotiation
Selected
Rejected
Withdrawn
Expired
```

The final values shall be confirmed before implementation.

---

## 12.3 Offer Version

Every offer version must reference one offer.

The version number shall be unique within the offer.

```text
(offerId, versionNumber)
```

shall be unique.

---

## 12.4 Offer Selection

Only an eligible offer may become the selected offer.

The backend shall validate this business rule before changing the selection state.

The database shall preserve the relationship between:

```text
Requirement
Offer
Contract
```

---

# 13. Contract Constraints

## 13.1 Contract References

A contract must reference:

```text
Requirement
Offer
Client Organization
Provider Organization
```

These references must remain valid.

---

## 13.2 Contract Version

Every contract version must reference one contract.

The version number shall be unique within the contract.

```text
(contractId, versionNumber)
```

shall be unique.

---

## 13.3 Contract Version Immutability

A finalized or signed contract version shall not be silently modified.

A modification requiring contractual changes shall create a new version.

This preserves the historical state of the agreement.

---

## 13.4 Signature

Every signature must reference:

```text
ContractVersion
User
```

A signature must not reference a nonexistent signer.

---

# 14. Mission Constraints

## 14.1 Mission Contract

Every mission must reference one valid contract.

```text
Mission.contractId
```

is required.

---

## 14.2 Mission Status

Mission status shall use only approved lifecycle values.

The functional analysis identifies states such as:

```text
Not Started
In Progress
Suspended
Completed
Cancelled
```

The final lifecycle shall be confirmed before implementation.

---

## 14.3 Mission Organizations

A mission must identify its client organization and provider organization.

These organizations must correspond to the organizations involved in the contract.

The backend shall prevent inconsistent organization references.

---

# 15. Milestone Constraints

Every milestone must reference one mission.

```text
Milestone.missionId
```

is required.

A milestone shall have the information required to determine:

* its objective;
* its expected result;
* its planned timing;
* its validation state.

Milestone ordering shall be deterministic.

---

# 16. Deliverable Constraints

Every deliverable must reference one milestone.

```text
Deliverable.milestoneId
```

is required.

A deliverable must have sufficient information to identify:

* the expected output;
* the acceptance criteria;
* its validation state.

---

# 17. Deliverable Version Constraints

Every deliverable version must reference one deliverable.

The version number shall be unique within the deliverable.

```text
(deliverableId, versionNumber)
```

shall be unique.

Previous submitted versions shall remain identifiable.

A new correction submission shall create a new version instead of replacing the previous submitted version.

This supports the requirement that versions remain identifiable during correction cycles.

---

# 18. Quality Constraints

## 18.1 Quality Review

A quality review must reference:

```text
Deliverable
Reviewer User
```

Both references are required.

---

## 18.2 Quality Result

A quality result shall use only approved values.

The functional workflow identifies at least:

```text
Compliant
Non-Compliant
Major Deviation
```

The final enum shall be confirmed before implementation.

---

## 18.3 Quality Report

A quality report must reference its quality review.

---

## 18.4 Correction Request

A correction request must reference:

```text
QualityReview
Deliverable
```

The correction request shall contain enough information to identify the expected correction.

---

# 19. Payment Constraints

## 19.1 Payment Ownership

Every payment must reference one mission.

---

## 19.2 Payment Amount

Payment amounts shall:

* be numeric;
* be greater than or equal to zero;
* use the approved currency;
* preserve sufficient precision.

Negative payment amounts shall not be stored as normal payment values.

Refunds and financial adjustments shall be represented through their dedicated records.

---

## 19.3 Payment Currency

The currency shall use a controlled representation.

The supported currency for the initial Moroccan market shall be defined explicitly before production.

---

## 19.4 Payment Status

Payment status shall use approved lifecycle values.

Possible values include:

```text
Pending
Authorized
Paid
Failed
Cancelled
Refunded
Blocked
```

The final values shall be confirmed before implementation.

---

## 19.5 Payment Transaction

Every payment transaction must reference one payment.

External transaction identifiers shall be stored separately from the internal transaction identifier.

---

## 19.6 Payment Event

Every payment event must reference one payment transaction.

External event identifiers should be unique when provided by the payment provider.

---

## 19.7 Refund

Every refund must reference the original payment transaction.

The refund amount must not exceed the refundable amount according to the financial business rules.

---

# 20. Financial Integrity

Financial records shall remain traceable.

The expected chain is:

```text
Mission
    |
    v
Payment
    |
    v
PaymentTransaction
    |
    +---- PaymentEvent
    |
    +---- Refund

Payment
    |
    +---- FinancialEntry
    |
    +---- Invoice
```

No financial record shall exist without the required parent relationship.

---

# 21. Dispute Constraints

## 21.1 Dispute

A dispute must reference the relevant mission and contractual context according to the approved business model.

---

## 21.2 Dispute Status

The dispute status shall use approved lifecycle values.

Possible values include:

```text
Open
Under Review
Awaiting Information
Resolved
Rejected
Closed
```

The final lifecycle shall be confirmed before implementation.

---

## 21.3 Dispute Evidence

Every evidence record must reference:

```text
Dispute
File
```

Both references are required.

---

## 21.4 Dispute Decision

A decision must reference one dispute.

Only authorized users may create or modify a dispute decision.

The authorization itself shall be enforced by the backend.

---

# 22. Messaging Constraints

## 22.1 Conversation Participants

Every participant record must reference:

```text
Conversation
User
```

---

## 22.2 Duplicate Participants

The same user shall not be added twice to the same conversation.

Therefore:

```text
(conversationId, userId)
```

shall be unique.

---

## 22.3 Message

Every message must reference:

```text
Conversation
Sender User
```

A message cannot exist outside a conversation.

---

# 23. Notification Constraints

Every notification must reference its recipient.

```text
Notification.userId
```

is required.

Notification type shall use controlled values.

Notification status shall use controlled values such as:

```text
Unread
Read
```

Additional states may be added if required by the notification architecture.

---

# 24. File Constraints

## 24.1 File Ownership

Every uploaded file shall identify its uploader when the upload is attributable to a user.

---

## 24.2 File Metadata

A file record shall preserve the metadata required to identify:

```text
Original filename
Storage reference
MIME type
File size
Creation date
Uploader
```

---

## 24.3 File Size

The application shall enforce the maximum file size defined by the technical specification.

The database shall store file size using a type capable of representing the allowed range.

---

## 24.4 File Type

The application shall validate allowed file types.

The database shall preserve the MIME type or equivalent metadata.

---

# 25. Evaluation Constraints

An evaluation must reference:

```text
Mission
Evaluator User
Evaluated User
```

The evaluator and evaluated user must be valid users.

An evaluation shall not reference a nonexistent mission.

The final rules for anonymous or public visibility shall be defined before implementation.

---

# 26. Audit Constraints

Every audit record shall preserve enough information to identify:

```text
Actor
Action
Resource
Timestamp
Context
```

Important operations shall be traceable.

Audit records shall not be casually deleted because they provide historical evidence of important actions.

---

# 27. Timestamp Constraints

Entities requiring lifecycle tracking shall contain appropriate timestamps.

Common timestamps include:

```text
createdAt
updatedAt
```

Additional timestamps may be required:

```text
submittedAt
approvedAt
rejectedAt
signedAt
startedAt
completedAt
validatedAt
cancelledAt
```

A timestamp shall only be added when it represents a real business event.

---

# 28. Status Constraints

Statuses must represent the lifecycle defined by the functional specification.

The system shall not allow arbitrary status strings where a controlled lifecycle is required.

The principal lifecycle-controlled entities include:

```text
Requirement
Offer
Contract
Mission
Milestone
Deliverable
Payment
Dispute
Evaluation
Notification
```

Status transitions shall be validated by the backend.

The database constraint may ensure valid status values, while the backend shall enforce whether a specific transition is allowed.

---

# 29. Nullability Rules

A field shall be nullable only when its absence is meaningful.

Examples of potentially optional relationships include:

```text
ProviderProfile.organizationId
RequirementAttachment
Offer
Contract
Mission
QualityReport
DisputeDecision
Payment
```

Mandatory business information shall not be nullable.

The final nullability matrix shall be defined before Prisma implementation.

---

# 30. Foreign Key Constraints

Foreign keys shall be used for all direct relational dependencies.

Examples:

```text
OrganizationMembership.userId
OrganizationMembership.organizationId
OrganizationMembership.roleId

ProviderProfile.userId

Requirement.clientOrganizationId
Requirement.createdByUserId
Requirement.serviceId

Offer.requirementId
Offer.providerProfileId

Contract.requirementId
Contract.offerId

Mission.contractId

Milestone.missionId

Deliverable.milestoneId

Payment.missionId

Dispute.missionId
```

Foreign keys must reference valid primary keys or explicitly approved unique keys.

---

# 31. Delete Rules

Deletion behavior shall be defined carefully for each relationship.

Business records with historical importance should generally not be physically deleted.

For example:

```text
Contract
Payment
PaymentTransaction
PaymentEvent
FinancialEntry
Signature
AuditLog
DisputeDecision
```

should preserve their history.

Where business deletion is required, soft deletion or archival should be considered.

---

# 32. Cascade Rules

Cascade deletion shall only be used where deleting the parent and all child records is explicitly safe.

Cascade deletion shall not be used blindly for:

```text
Financial records
Audit records
Contract history
Signature records
Payment transactions
Payment events
Dispute decisions
Quality history
```

The final cascade policy shall be validated before implementation.

---

# 33. Update Rules

Primary keys shall not be updated.

Foreign keys shall only be changed when the business workflow explicitly allows reassignment.

Historical versions shall not be modified after finalization.

Financial transaction identifiers shall not be modified after creation.

Audit records shall remain immutable.

---

# 34. Historical Integrity

AIWORX must preserve historical information for important business processes.

The following must remain traceable:

```text
Requirement versions
Offer versions
Contract versions
Deliverable versions
Quality reviews
Corrections
Payment transactions
Payment events
Refunds
Disputes
Audit events
```

Historical information shall not be lost because of a normal update operation.

---

# 35. Organization Isolation

Resources belonging to an organization must remain associated with the correct organization context.

The backend shall verify organization ownership before allowing access or modification.

The database shall maintain the necessary foreign keys to make this ownership traceable.

---

# 36. Authorization Integrity

Database relationships shall support the authorization model.

For example:

```text
User
   |
   v
OrganizationMembership
   |
   v
Organization
   |
   v
Business Resource
```

The existence of a foreign-key relationship does not itself authorize access.

Authorization rules shall be implemented in the backend.

---

# 37. Business Rule Enforcement

Database constraints shall enforce structural integrity.

Backend services shall enforce business workflows such as:

```text
Requirement qualification
Provider eligibility
Offer selection
Contract activation
Mission start
Quality validation
Correction cycles
Final validation
Payment authorization
Reversement
Dispute resolution
```

This separation prevents business logic from being incorrectly placed entirely inside the database.

---

# 38. Data Consistency

The database must prevent inconsistent states such as:

```text
Offer without Requirement
Contract without Offer
Mission without Contract
Deliverable without Milestone
Payment without Mission
PaymentTransaction without Payment
Refund without PaymentTransaction
DisputeEvidence without Dispute
Message without Conversation
Signature without ContractVersion
```

---

# 39. Transaction Integrity

Operations involving multiple dependent records shall be executed transactionally where required.

Examples include:

```text
Offer selection
Contract creation
Contract finalization
Mission creation
Payment state changes
Refund processing
Final validation
Dispute resolution
```

If a required operation fails, the database shall not be left in a partially inconsistent state.

---

# 40. External Integration Integrity

External identifiers shall be stored separately.

Examples:

```text
External payment transaction ID
External payment event ID
External signature ID
External storage object ID
```

External identifiers should be unique within their provider context when required.

---

# 41. Security Constraints

Sensitive information shall not be stored in plaintext when protection is required.

Authentication credentials, secrets and sensitive tokens shall follow the security architecture.

The database shall not be used as a substitute for encryption, access control or secret management.

---

# 42. Compliance and Auditability

Important operations shall remain traceable for audit purposes.

The database design shall support:

```text
Who performed the action
What was changed
When it happened
Which resource was affected
What organization context applied
```

This is particularly important for:

```text
Contracts
Payments
Quality validation
Disputes
Authorization-sensitive operations
```

---

# 43. Constraint Validation Before Prisma

Before creating the Prisma schema, the following must be validated:

```text
Primary keys
Foreign keys
Unique constraints
Composite unique constraints
Nullable fields
Required fields
Enums
Status values
Delete behavior
Update behavior
Versioning rules
Financial rules
Audit rules
```

No physical schema should be considered final until these elements are validated against the functional and technical specifications.

---

# 44. Relation With the Next Database Documents

The next database document is:

```text
06-indexes.md
```

It will define the indexes required for:

* authentication;
* organization access;
* marketplace searches;
* requirements;
* offers;
* missions;
* payments;
* disputes;
* notifications;
* audit queries.

After that:

```text
07-data-dictionary.md
```

will define the fields of each entity, their types, meanings, nullability and constraints.

---

# 45. Database Design Sequence

The complete database design sequence is:

```text
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
      ↓
Database migration
```

The Prisma schema must be generated from the validated database design and must not be created before the preceding design documents are validated.
