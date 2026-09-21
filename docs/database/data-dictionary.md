# AIWORX — Data Dictionary

## 1. Purpose

This document defines the data dictionary for the AIWORX database.

It describes the principal entities, their attributes, their meaning, their data types, their nullability and their main constraints.

This document is the reference used to transform the logical database model into the physical Prisma schema.

The data dictionary must remain consistent with:

* the functional requirements;
* the business rules;
* the database relationships;
* the cardinalities;
* the database constraints;
* the database indexes;
* the security model;
* the audit requirements.

---

# 2. General Conventions

## 2.1 Identifier

Each persistent entity shall have a unique `id`.

Recommended implementation:

```text
id: UUID
```

The exact Prisma/database type shall be confirmed during physical implementation.

---

## 2.2 Timestamps

Entities requiring lifecycle tracking shall use:

```text
createdAt
updatedAt
```

Additional timestamps shall only be added when they represent meaningful business events.

---

## 2.3 Status

Status fields shall use controlled values.

Arbitrary free-text statuses shall not be used for lifecycle-controlled entities.

---

## 2.4 Monetary Values

Financial amounts shall use a precise numeric representation.

Recommended logical representation:

```text
Decimal
```

Amounts shall not use floating-point values for financial calculations.

---

# 3. User

## Purpose

Represents an authenticated person using AIWORX.

### Fields

| Field     | Type     | Required | Description               |
| --------- | -------- | -------: | ------------------------- |
| id        | UUID     |      Yes | Unique user identifier    |
| email     | String   |      Yes | User authentication email |
| firstName | String   |      Yes | User first name           |
| lastName  | String   |      Yes | User last name            |
| phone     | String   |       No | User phone number         |
| status    | Enum     |      Yes | Account lifecycle status  |
| createdAt | DateTime |      Yes | Account creation date     |
| updatedAt | DateTime |      Yes | Last modification date    |

### Constraints

* `id` is the primary key.
* `email` shall be unique when used as the account identifier.
* `status` shall use controlled values.

---

# 4. Organization

## Purpose

Represents a company or organization using AIWORX.

### Fields

| Field              | Type     | Required | Description                                 |
| ------------------ | -------- | -------: | ------------------------------------------- |
| id                 | UUID     |      Yes | Unique organization identifier              |
| name               | String   |      Yes | Organization legal/business name            |
| legalName          | String   |       No | Legal name when different from display name |
| registrationNumber | String   |       No | Legal registration identifier               |
| email              | String   |       No | Organization contact email                  |
| phone              | String   |       No | Organization contact phone                  |
| address            | String   |       No | Organization address                        |
| status             | Enum     |      Yes | Organization lifecycle status               |
| createdAt          | DateTime |      Yes | Creation date                               |
| updatedAt          | DateTime |      Yes | Last modification date                      |

### Constraints

* `id` is the primary key.
* Required organization information shall not be null.
* Status shall use controlled values.

---

# 5. Role

## Purpose

Represents an authorization role.

### Fields

| Field       | Type     | Required | Description            |
| ----------- | -------- | -------: | ---------------------- |
| id          | UUID     |      Yes | Unique role identifier |
| name        | String   |      Yes | Role name              |
| description | String   |       No | Role description       |
| createdAt   | DateTime |      Yes | Creation date          |
| updatedAt   | DateTime |      Yes | Last modification date |

---

# 6. Permission

## Purpose

Represents an authorization permission.

### Fields

| Field       | Type     | Required | Description                  |
| ----------- | -------- | -------: | ---------------------------- |
| id          | UUID     |      Yes | Unique permission identifier |
| name        | String   |      Yes | Permission name              |
| description | String   |       No | Permission description       |
| createdAt   | DateTime |      Yes | Creation date                |

---

# 7. OrganizationMembership

## Purpose

Associates a user with an organization and a role.

### Fields

| Field          | Type     | Required | Description              |
| -------------- | -------- | -------: | ------------------------ |
| id             | UUID     |      Yes | Membership identifier    |
| userId         | UUID     |      Yes | Referenced user          |
| organizationId | UUID     |      Yes | Referenced organization  |
| roleId         | UUID     |      Yes | Assigned role            |
| status         | Enum     |      Yes | Membership status        |
| createdAt      | DateTime |      Yes | Membership creation date |
| updatedAt      | DateTime |      Yes | Last modification date   |

### Constraints

* `userId` must reference `User`.
* `organizationId` must reference `Organization`.
* `roleId` must reference `Role`.

---

# 8. RolePermission

## Purpose

Associates permissions with roles.

### Fields

| Field        | Type     | Required | Description             |
| ------------ | -------- | -------: | ----------------------- |
| id           | UUID     |      Yes | Relationship identifier |
| roleId       | UUID     |      Yes | Referenced role         |
| permissionId | UUID     |      Yes | Referenced permission   |
| createdAt    | DateTime |      Yes | Assignment date         |

### Constraints

The following combination shall be unique:

```text
(roleId, permissionId)
```

---

# 9. ProviderProfile

## Purpose

Represents the professional profile of a service provider.

The profile supports provider qualification, matching and marketplace activities.

### Fields

| Field               | Type     | Required | Description                           |
| ------------------- | -------- | -------: | ------------------------------------- |
| id                  | UUID     |      Yes | Provider profile identifier           |
| userId              | UUID     |      Yes | Provider's user                       |
| organizationId      | UUID     |       No | Provider organization when applicable |
| professionalTitle   | String   |       No | Professional title                    |
| biography           | Text     |       No | Professional description              |
| experience          | Text     |       No | Professional experience               |
| availability        | Enum     |       No | Availability state                    |
| qualificationStatus | Enum     |      Yes | Qualification state                   |
| profileStatus       | Enum     |      Yes | Profile lifecycle state               |
| createdAt           | DateTime |      Yes | Creation date                         |
| updatedAt           | DateTime |      Yes | Last modification date                |

The provider profile shall support the information required by the cahier des charges, including skills, categories, sectors, portfolio, documents, tests, badges and score.

---

# 10. ProviderVerification

## Purpose

Stores provider verification and qualification information.

### Fields

| Field             | Type     | Required | Description                       |
| ----------------- | -------- | -------: | --------------------------------- |
| id                | UUID     |      Yes | Verification identifier           |
| providerProfileId | UUID     |      Yes | Provider being verified           |
| status            | Enum     |      Yes | Verification status               |
| verifiedByUserId  | UUID     |       No | User responsible for verification |
| reviewedAt        | DateTime |       No | Verification date                 |
| notes             | Text     |       No | Verification notes                |
| createdAt         | DateTime |      Yes | Creation date                     |
| updatedAt         | DateTime |      Yes | Last modification date            |

---

# 11. ProviderDocument

## Purpose

Stores documents associated with provider qualification.

### Fields

| Field             | Type     | Required | Description                      |
| ----------------- | -------- | -------: | -------------------------------- |
| id                | UUID     |      Yes | Document relationship identifier |
| providerProfileId | UUID     |      Yes | Provider                         |
| fileId            | UUID     |      Yes | Stored file                      |
| documentType      | Enum     |      Yes | Document category                |
| status            | Enum     |      Yes | Document verification status     |
| expiresAt         | DateTime |       No | Expiration date when applicable  |
| createdAt         | DateTime |      Yes | Creation date                    |
| updatedAt         | DateTime |      Yes | Last modification date           |

---

# 12. ProviderSkill

## Purpose

Associates a provider with a professional skill.

### Fields

| Field             | Type     | Required | Description                   |
| ----------------- | -------- | -------: | ----------------------------- |
| id                | UUID     |      Yes | Skill relationship identifier |
| providerProfileId | UUID     |      Yes | Provider                      |
| skillId           | UUID     |      Yes | Referenced skill              |
| level             | Enum     |       No | Skill level                   |
| createdAt         | DateTime |      Yes | Assignment date               |

---

# 13. ProviderCertification

## Purpose

Stores professional certifications.

### Fields

| Field             | Type     | Required | Description              |
| ----------------- | -------- | -------: | ------------------------ |
| id                | UUID     |      Yes | Certification identifier |
| providerProfileId | UUID     |      Yes | Provider                 |
| name              | String   |      Yes | Certification name       |
| issuer            | String   |       No | Certification issuer     |
| reference         | String   |       No | Certification reference  |
| issuedAt          | DateTime |       No | Issue date               |
| expiresAt         | DateTime |       No | Expiration date          |
| status            | Enum     |      Yes | Certification status     |
| createdAt         | DateTime |      Yes | Creation date            |
| updatedAt         | DateTime |      Yes | Last modification date   |

---

# 14. ServiceCategory

## Purpose

Represents a high-level service category.

### Fields

| Field       | Type     | Required | Description            |
| ----------- | -------- | -------: | ---------------------- |
| id          | UUID     |      Yes | Category identifier    |
| name        | String   |      Yes | Category name          |
| description | Text     |       No | Category description   |
| status      | Enum     |      Yes | Category status        |
| createdAt   | DateTime |      Yes | Creation date          |
| updatedAt   | DateTime |      Yes | Last modification date |

---

# 15. ServiceSubcategory

## Purpose

Represents a service subcategory belonging to a category.

### Fields

| Field       | Type     | Required | Description             |
| ----------- | -------- | -------: | ----------------------- |
| id          | UUID     |      Yes | Subcategory identifier  |
| categoryId  | UUID     |      Yes | Parent category         |
| name        | String   |      Yes | Subcategory name        |
| description | Text     |       No | Subcategory description |
| status      | Enum     |      Yes | Subcategory status      |
| createdAt   | DateTime |      Yes | Creation date           |
| updatedAt   | DateTime |      Yes | Last modification date  |

---

# 16. Service

## Purpose

Represents a service available on the AIWORX marketplace.

### Fields

| Field         | Type     | Required | Description            |
| ------------- | -------- | -------: | ---------------------- |
| id            | UUID     |      Yes | Service identifier     |
| subcategoryId | UUID     |      Yes | Parent subcategory     |
| name          | String   |      Yes | Service name           |
| description   | Text     |       No | Service description    |
| status        | Enum     |      Yes | Service status         |
| createdAt     | DateTime |      Yes | Creation date          |
| updatedAt     | DateTime |      Yes | Last modification date |

---

# 17. ProjectRequest

## Purpose

Represents a client's business need or project request.

The cahier des charges identifies the project request as containing the need, budget, calendar, confidentiality, documents, status and owner.

### Fields

| Field                | Type     | Required | Description                  |
| -------------------- | -------- | -------: | ---------------------------- |
| id                   | UUID     |      Yes | Project request identifier   |
| clientOrganizationId | UUID     |      Yes | Client organization          |
| createdByUserId      | UUID     |      Yes | User who created the request |
| serviceId            | UUID     |      Yes | Requested service            |
| title                | String   |      Yes | Request title                |
| description          | Text     |      Yes | Description of the need      |
| budgetMin            | Decimal  |       No | Minimum budget               |
| budgetMax            | Decimal  |       No | Maximum budget               |
| currency             | String   |      Yes | Budget currency              |
| startDate            | DateTime |       No | Expected start date          |
| deadline             | DateTime |       No | Expected completion date     |
| confidentialityLevel | Enum     |      Yes | Confidentiality level        |
| status               | Enum     |      Yes | Request lifecycle status     |
| createdAt            | DateTime |      Yes | Creation date                |
| updatedAt            | DateTime |      Yes | Last modification date       |

---

# 18. Requirement

## Purpose

Represents the structured requirement derived from a project request.

If the final implementation uses `ProjectRequest` as the canonical business entity, this entity shall not be duplicated unnecessarily.

The naming shall be finalized before Prisma implementation.

### Logical fields

| Field                | Type     | Required | Description            |
| -------------------- | -------- | -------: | ---------------------- |
| id                   | UUID     |      Yes | Requirement identifier |
| projectRequestId     | UUID     |      Yes | Source project request |
| clientOrganizationId | UUID     |      Yes | Owning organization    |
| createdByUserId      | UUID     |      Yes | Creator                |
| serviceId            | UUID     |      Yes | Related service        |
| status               | Enum     |      Yes | Requirement lifecycle  |
| createdAt            | DateTime |      Yes | Creation date          |
| updatedAt            | DateTime |      Yes | Last modification date |

---

# 19. RequirementVersion

## Purpose

Stores a version of a requirement.

### Fields

| Field           | Type     | Required | Description                    |
| --------------- | -------- | -------: | ------------------------------ |
| id              | UUID     |      Yes | Version identifier             |
| requirementId   | UUID     |      Yes | Parent requirement             |
| versionNumber   | Integer  |      Yes | Version number                 |
| content         | JSON     |      Yes | Structured requirement content |
| createdByUserId | UUID     |      Yes | Version author                 |
| createdAt       | DateTime |      Yes | Version creation date          |
| hash            | String   |       No | Integrity fingerprint          |

### Constraints

```text
(requirementId, versionNumber)
```

shall be unique.

---

# 20. Specification

## Purpose

Represents the structured specification/cahier des charges associated with a project.

The cahier des charges identifies `Specification` as containing structured sections, version, author, validation and a fingerprint of the contractual version.

### Fields

| Field            | Type     | Required | Description                   |
| ---------------- | -------- | -------: | ----------------------------- |
| id               | UUID     |      Yes | Specification identifier      |
| projectRequestId | UUID     |      Yes | Associated request            |
| versionNumber    | Integer  |      Yes | Specification version         |
| content          | JSON     |      Yes | Structured specification      |
| createdByUserId  | UUID     |      Yes | Author                        |
| status           | Enum     |      Yes | Specification status          |
| validatedAt      | DateTime |       No | Validation date               |
| hash             | String   |       No | Version integrity fingerprint |
| createdAt        | DateTime |      Yes | Creation date                 |
| updatedAt        | DateTime |      Yes | Last modification date        |

---

# 21. Proposal

## Purpose

Represents a provider's offer for a project.

The proposal includes method, deliverables, price, deadline, questions, versions and decision.

### Fields

| Field             | Type     | Required | Description            |
| ----------------- | -------- | -------: | ---------------------- |
| id                | UUID     |      Yes | Proposal identifier    |
| projectRequestId  | UUID     |      Yes | Related request        |
| providerProfileId | UUID     |      Yes | Submitting provider    |
| price             | Decimal  |      Yes | Proposed price         |
| currency          | String   |      Yes | Proposal currency      |
| estimatedDuration | Integer  |       No | Estimated duration     |
| methodology       | Text     |       No | Proposed methodology   |
| status            | Enum     |      Yes | Proposal status        |
| decision          | Enum     |       No | Selection decision     |
| createdAt         | DateTime |      Yes | Creation date          |
| updatedAt         | DateTime |      Yes | Last modification date |

---

# 22. ProposalVersion

## Purpose

Stores a version of a proposal.

### Fields

| Field           | Type     | Required | Description                 |
| --------------- | -------- | -------: | --------------------------- |
| id              | UUID     |      Yes | Proposal version identifier |
| proposalId      | UUID     |      Yes | Parent proposal             |
| versionNumber   | Integer  |      Yes | Version number              |
| content         | JSON     |      Yes | Version content             |
| createdByUserId | UUID     |      Yes | Author                      |
| createdAt       | DateTime |      Yes | Creation date               |

### Constraints

```text
(proposalId, versionNumber)
```

shall be unique.

---

# 23. Contract

## Purpose

Represents the contractual agreement between the parties.

### Fields

| Field                  | Type     | Required | Description               |
| ---------------------- | -------- | -------: | ------------------------- |
| id                     | UUID     |      Yes | Contract identifier       |
| projectRequestId       | UUID     |      Yes | Related project           |
| proposalId             | UUID     |      Yes | Selected proposal         |
| clientOrganizationId   | UUID     |      Yes | Client organization       |
| providerOrganizationId | UUID     |       No | Provider organization     |
| amount                 | Decimal  |      Yes | Contract amount           |
| currency               | String   |      Yes | Contract currency         |
| status                 | Enum     |      Yes | Contract status           |
| effectiveAt            | DateTime |       No | Effective date            |
| signedAt               | DateTime |       No | Signature completion date |
| createdAt              | DateTime |      Yes | Creation date             |
| updatedAt              | DateTime |      Yes | Last modification date    |

---

# 24. ContractVersion

## Purpose

Stores historical versions of a contract.

### Fields

| Field           | Type     | Required | Description                 |
| --------------- | -------- | -------: | --------------------------- |
| id              | UUID     |      Yes | Contract version identifier |
| contractId      | UUID     |      Yes | Parent contract             |
| versionNumber   | Integer  |      Yes | Version number              |
| content         | JSON     |      Yes | Contract content            |
| hash            | String   |       No | Integrity fingerprint       |
| status          | Enum     |      Yes | Version status              |
| createdByUserId | UUID     |      Yes | Author                      |
| createdAt       | DateTime |      Yes | Creation date               |

### Constraints

```text
(contractId, versionNumber)
```

shall be unique.

Finalized versions shall remain historically identifiable.

---

# 25. Signature

## Purpose

Stores a signature associated with a contract version.

### Fields

| Field               | Type     | Required | Description                           |
| ------------------- | -------- | -------: | ------------------------------------- |
| id                  | UUID     |      Yes | Signature identifier                  |
| contractVersionId   | UUID     |      Yes | Signed contract version               |
| userId              | UUID     |      Yes | Signer                                |
| status              | Enum     |      Yes | Signature status                      |
| signedAt            | DateTime |       No | Signature date                        |
| externalSignatureId | String   |       No | External signature provider reference |
| createdAt           | DateTime |      Yes | Creation date                         |

---

# 26. Mission

## Purpose

Represents the execution phase of a contracted project.

The mission contains the parties, dates, status, amount and applicable rules.

### Fields

| Field                  | Type     | Required | Description             |
| ---------------------- | -------- | -------: | ----------------------- |
| id                     | UUID     |      Yes | Mission identifier      |
| contractId             | UUID     |      Yes | Related contract        |
| clientOrganizationId   | UUID     |      Yes | Client organization     |
| providerOrganizationId | UUID     |       No | Provider organization   |
| title                  | String   |      Yes | Mission title           |
| startDate              | DateTime |       No | Start date              |
| endDate                | DateTime |       No | Planned completion date |
| amount                 | Decimal  |      Yes | Mission amount          |
| currency               | String   |      Yes | Mission currency        |
| status                 | Enum     |      Yes | Mission status          |
| completedAt            | DateTime |       No | Completion date         |
| createdAt              | DateTime |      Yes | Creation date           |
| updatedAt              | DateTime |      Yes | Last modification date  |

---

# 27. Milestone

## Purpose

Represents a project milestone.

### Fields

| Field          | Type     | Required | Description              |
| -------------- | -------- | -------: | ------------------------ |
| id             | UUID     |      Yes | Milestone identifier     |
| missionId      | UUID     |      Yes | Parent mission           |
| title          | String   |      Yes | Milestone title          |
| description    | Text     |       No | Milestone description    |
| amount         | Decimal  |       No | Associated amount        |
| dueDate        | DateTime |       No | Expected completion date |
| sequenceNumber | Integer  |      Yes | Milestone order          |
| status         | Enum     |      Yes | Milestone status         |
| completedAt    | DateTime |       No | Completion date          |
| createdAt      | DateTime |      Yes | Creation date            |
| updatedAt      | DateTime |      Yes | Last modification date   |

---

# 28. Deliverable

## Purpose

Represents an expected or submitted project deliverable.

The deliverable includes criteria, deadline, amount, versioned submissions, controls and decisions.

### Fields

| Field              | Type     | Required | Description              |
| ------------------ | -------- | -------: | ------------------------ |
| id                 | UUID     |      Yes | Deliverable identifier   |
| milestoneId        | UUID     |      Yes | Parent milestone         |
| title              | String   |      Yes | Deliverable title        |
| description        | Text     |       No | Description              |
| acceptanceCriteria | JSON     |      Yes | Acceptance criteria      |
| dueDate            | DateTime |       No | Expected submission date |
| amount             | Decimal  |       No | Associated amount        |
| status             | Enum     |      Yes | Deliverable status       |
| createdAt          | DateTime |      Yes | Creation date            |
| updatedAt          | DateTime |      Yes | Last modification date   |

---

# 29. DeliverableVersion

## Purpose

Stores a submitted version of a deliverable.

### Fields

| Field             | Type     | Required | Description        |
| ----------------- | -------- | -------: | ------------------ |
| id                | UUID     |      Yes | Version identifier |
| deliverableId     | UUID     |      Yes | Parent deliverable |
| versionNumber     | Integer  |      Yes | Version number     |
| fileId            | UUID     |      Yes | Submitted file     |
| submittedByUserId | UUID     |      Yes | Submitter          |
| notes             | Text     |       No | Submission notes   |
| submittedAt       | DateTime |      Yes | Submission date    |
| status            | Enum     |      Yes | Version status     |
| createdAt         | DateTime |      Yes | Creation date      |

### Constraints

```text
(deliverableId, versionNumber)
```

shall be unique.

---

# 30. QualityReview

## Purpose

Represents a quality control performed on a deliverable.

The quality workflow requires examination, comparison with requirements, identification of deviations, recording of the result and validation or correction.

### Fields

| Field                | Type     | Required | Description          |
| -------------------- | -------- | -------: | -------------------- |
| id                   | UUID     |      Yes | Review identifier    |
| deliverableId        | UUID     |      Yes | Reviewed deliverable |
| deliverableVersionId | UUID     |      Yes | Reviewed version     |
| reviewerUserId       | UUID     |      Yes | Quality reviewer     |
| result               | Enum     |      Yes | Review result        |
| report               | Text     |       No | Review report        |
| reviewedAt           | DateTime |      Yes | Review date          |
| createdAt            | DateTime |      Yes | Creation date        |

---

# 31. QualityReport

## Purpose

Stores detailed quality findings.

### Fields

| Field           | Type     | Required | Description            |
| --------------- | -------- | -------: | ---------------------- |
| id              | UUID     |      Yes | Report identifier      |
| qualityReviewId | UUID     |      Yes | Parent review          |
| content         | JSON     |      Yes | Detailed findings      |
| createdAt       | DateTime |      Yes | Creation date          |
| updatedAt       | DateTime |      Yes | Last modification date |

---

# 32. CorrectionRequest

## Purpose

Represents a correction requested after a quality review.

The correction workflow requires the provider to consult remarks, correct the deliverable, submit a new version and undergo another review.

### Fields

| Field           | Type     | Required | Description            |
| --------------- | -------- | -------: | ---------------------- |
| id              | UUID     |      Yes | Correction identifier  |
| qualityReviewId | UUID     |      Yes | Related quality review |
| deliverableId   | UUID     |      Yes | Related deliverable    |
| description     | Text     |      Yes | Required correction    |
| status          | Enum     |      Yes | Correction status      |
| dueDate         | DateTime |       No | Correction deadline    |
| resolvedAt      | DateTime |       No | Resolution date        |
| createdAt       | DateTime |      Yes | Creation date          |
| updatedAt       | DateTime |      Yes | Last modification date |

---

# 33. Payment

## Purpose

Represents a financial obligation/payment associated with a mission.

The cahier des charges requires payment, fees, commissions, allocation, reversement and refunds to remain traceable.

### Fields

| Field      | Type     | Required | Description             |
| ---------- | -------- | -------: | ----------------------- |
| id         | UUID     |      Yes | Payment identifier      |
| missionId  | UUID     |      Yes | Related mission         |
| amount     | Decimal  |      Yes | Payment amount          |
| currency   | String   |      Yes | Payment currency        |
| fees       | Decimal  |       No | Applicable fees         |
| commission | Decimal  |       No | AIWORX commission       |
| netAmount  | Decimal  |       No | Net amount              |
| status     | Enum     |      Yes | Payment status          |
| dueAt      | DateTime |       No | Payment due date        |
| paidAt     | DateTime |       No | Payment completion date |
| createdAt  | DateTime |      Yes | Creation date           |
| updatedAt  | DateTime |      Yes | Last modification date  |

---

# 34. PaymentTransaction

## Purpose

Represents a transaction executed through an external payment provider.

### Fields

| Field                 | Type     | Required | Description                     |
| --------------------- | -------- | -------: | ------------------------------- |
| id                    | UUID     |      Yes | Internal transaction identifier |
| paymentId             | UUID     |      Yes | Parent payment                  |
| provider              | String   |      Yes | Payment provider                |
| externalTransactionId | String   |       No | External provider identifier    |
| amount                | Decimal  |      Yes | Transaction amount              |
| currency              | String   |      Yes | Currency                        |
| status                | Enum     |      Yes | Transaction status              |
| createdAt             | DateTime |      Yes | Creation date                   |
| updatedAt             | DateTime |      Yes | Last modification date          |

---

# 35. PaymentEvent

## Purpose

Stores events received from the external payment provider.

### Fields

| Field                | Type     | Required | Description               |
| -------------------- | -------- | -------: | ------------------------- |
| id                   | UUID     |      Yes | Event identifier          |
| paymentTransactionId | UUID     |      Yes | Related transaction       |
| externalEventId      | String   |       No | External event identifier |
| eventType            | String   |      Yes | Provider event type       |
| payload              | JSON     |      Yes | Event data                |
| processedAt          | DateTime |       No | Processing date           |
| createdAt            | DateTime |      Yes | Reception date            |

---

# 36. FinancialEntry

## Purpose

Represents an accounting/financial ledger entry.

### Fields

| Field       | Type     | Required | Description                |
| ----------- | -------- | -------: | -------------------------- |
| id          | UUID     |      Yes | Financial entry identifier |
| paymentId   | UUID     |      Yes | Related payment            |
| type        | Enum     |      Yes | Entry type                 |
| amount      | Decimal  |      Yes | Entry amount               |
| currency    | String   |      Yes | Currency                   |
| description | Text     |       No | Entry description          |
| createdAt   | DateTime |      Yes | Entry creation date        |

---

# 37. Invoice

## Purpose

Represents a financial invoice.

### Fields

| Field     | Type     | Required | Description        |
| --------- | -------- | -------: | ------------------ |
| id        | UUID     |      Yes | Invoice identifier |
| paymentId | UUID     |      Yes | Related payment    |
| number    | String   |      Yes | Invoice number     |
| amount    | Decimal  |      Yes | Invoice amount     |
| currency  | String   |      Yes | Currency           |
| status    | Enum     |      Yes | Invoice status     |
| issuedAt  | DateTime |       No | Issue date         |
| dueAt     | DateTime |       No | Due date           |
| createdAt | DateTime |      Yes | Creation date      |

---

# 38. Refund

## Purpose

Represents a refund associated with a payment transaction.

### Fields

| Field                | Type     | Required | Description                  |
| -------------------- | -------- | -------: | ---------------------------- |
| id                   | UUID     |      Yes | Refund identifier            |
| paymentTransactionId | UUID     |      Yes | Original transaction         |
| amount               | Decimal  |      Yes | Refund amount                |
| currency             | String   |      Yes | Currency                     |
| reason               | Text     |       No | Refund reason                |
| status               | Enum     |      Yes | Refund status                |
| externalRefundId     | String   |       No | External provider identifier |
| createdAt            | DateTime |      Yes | Creation date                |
| completedAt          | DateTime |       No | Completion date              |

---

# 39. Conversation

## Purpose

Represents a communication channel between authorized participants.

### Fields

| Field            | Type     | Required | Description             |
| ---------------- | -------- | -------: | ----------------------- |
| id               | UUID     |      Yes | Conversation identifier |
| type             | Enum     |      Yes | Conversation type       |
| subject          | String   |       No | Conversation subject    |
| projectRequestId | UUID     |       No | Related project request |
| missionId        | UUID     |       No | Related mission         |
| createdAt        | DateTime |      Yes | Creation date           |
| updatedAt        | DateTime |      Yes | Last modification date  |

---

# 40. ConversationParticipant

## Purpose

Associates authorized users with a conversation.

### Fields

| Field          | Type     | Required | Description            |
| -------------- | -------- | -------: | ---------------------- |
| id             | UUID     |      Yes | Participant identifier |
| conversationId | UUID     |      Yes | Conversation           |
| userId         | UUID     |      Yes | Participant            |
| joinedAt       | DateTime |      Yes | Participation start    |
| leftAt         | DateTime |       No | Participation end      |

### Constraints

```text
(conversationId, userId)
```

shall be unique.

---

# 41. Message

## Purpose

Represents a message exchanged inside a conversation.

### Fields

| Field          | Type     | Required | Description           |
| -------------- | -------- | -------: | --------------------- |
| id             | UUID     |      Yes | Message identifier    |
| conversationId | UUID     |      Yes | Conversation          |
| senderUserId   | UUID     |      Yes | Sender                |
| content        | Text     |      Yes | Message content       |
| createdAt      | DateTime |      Yes | Message creation date |
| editedAt       | DateTime |       No | Last edit date        |
| deletedAt      | DateTime |       No | Logical deletion date |

---

# 42. Dispute

## Purpose

Represents a dispute related to a mission or contractual relationship.

The cahier des charges provides for mediation, dispute handling and resolution.

### Fields

| Field          | Type     | Required | Description             |
| -------------- | -------- | -------: | ----------------------- |
| id             | UUID     |      Yes | Dispute identifier      |
| missionId      | UUID     |      Yes | Related mission         |
| contractId     | UUID     |       No | Related contract        |
| openedByUserId | UUID     |      Yes | User who opened dispute |
| reason         | Text     |      Yes | Dispute reason          |
| status         | Enum     |      Yes | Dispute status          |
| openedAt       | DateTime |      Yes | Opening date            |
| resolvedAt     | DateTime |       No | Resolution date         |
| createdAt      | DateTime |      Yes | Creation date           |
| updatedAt      | DateTime |      Yes | Last modification date  |

---

# 43. DisputeEvidence

## Purpose

Stores evidence associated with a dispute.

### Fields

| Field             | Type     | Required | Description          |
| ----------------- | -------- | -------: | -------------------- |
| id                | UUID     |      Yes | Evidence identifier  |
| disputeId         | UUID     |      Yes | Related dispute      |
| fileId            | UUID     |      Yes | Evidence file        |
| description       | Text     |       No | Evidence description |
| submittedByUserId | UUID     |      Yes | Submitter            |
| createdAt         | DateTime |      Yes | Submission date      |

---

# 44. DisputeDecision

## Purpose

Stores the decision resulting from dispute processing.

### Fields

| Field           | Type     | Required | Description          |
| --------------- | -------- | -------: | -------------------- |
| id              | UUID     |      Yes | Decision identifier  |
| disputeId       | UUID     |      Yes | Related dispute      |
| decidedByUserId | UUID     |      Yes | Decision maker       |
| decision        | Enum     |      Yes | Decision result      |
| explanation     | Text     |      Yes | Decision explanation |
| decidedAt       | DateTime |      Yes | Decision date        |
| createdAt       | DateTime |      Yes | Record creation date |

---

# 45. Notification

## Purpose

Represents a notification sent to a user.

### Fields

| Field     | Type     | Required | Description             |
| --------- | -------- | -------: | ----------------------- |
| id        | UUID     |      Yes | Notification identifier |
| userId    | UUID     |      Yes | Recipient               |
| type      | Enum     |      Yes | Notification type       |
| title     | String   |      Yes | Notification title      |
| content   | Text     |      Yes | Notification content    |
| status    | Enum     |      Yes | Read/unread status      |
| readAt    | DateTime |       No | Reading date            |
| createdAt | DateTime |      Yes | Creation date           |

---

# 46. File

## Purpose

Represents a file stored by AIWORX.

The platform requires files and documents for profiles, projects, contracts, deliverables, quality and disputes.

### Fields

| Field            | Type     | Required | Description             |
| ---------------- | -------- | -------: | ----------------------- |
| id               | UUID     |      Yes | File identifier         |
| uploadedByUserId | UUID     |       No | Uploading user          |
| originalName     | String   |      Yes | Original filename       |
| storageKey       | String   |      Yes | Storage reference       |
| mimeType         | String   |      Yes | MIME type               |
| sizeBytes        | Integer  |      Yes | File size               |
| checksum         | String   |       No | File integrity checksum |
| createdAt        | DateTime |      Yes | Upload date             |

---

# 47. Evaluation

## Purpose

Represents an evaluation or review associated with a completed mission.

The functional analysis identifies evaluations as part of the AIWORX lifecycle and also identifies the question of which evaluation data should be visible to other users as an open point.

### Fields

| Field           | Type     | Required | Description            |
| --------------- | -------- | -------: | ---------------------- |
| id              | UUID     |      Yes | Evaluation identifier  |
| missionId       | UUID     |      Yes | Related mission        |
| evaluatorUserId | UUID     |      Yes | Evaluator              |
| evaluatedUserId | UUID     |      Yes | Evaluated user         |
| score           | Decimal  |       No | Evaluation score       |
| comment         | Text     |       No | Evaluation comment     |
| status          | Enum     |      Yes | Evaluation status      |
| createdAt       | DateTime |      Yes | Creation date          |
| updatedAt       | DateTime |      Yes | Last modification date |

---

# 48. AuditLog

## Purpose

Stores traceability information for important actions.

The functional analysis requires important actions and modifications to remain traceable.

### Fields

| Field          | Type     | Required | Description             |
| -------------- | -------- | -------: | ----------------------- |
| id             | UUID     |      Yes | Audit record identifier |
| actorUserId    | UUID     |       No | User performing action  |
| organizationId | UUID     |       No | Organization context    |
| action         | String   |      Yes | Performed action        |
| resourceType   | String   |      Yes | Resource type           |
| resourceId     | UUID     |       No | Affected resource       |
| metadata       | JSON     |       No | Additional context      |
| createdAt      | DateTime |      Yes | Event timestamp         |

### Constraints

Audit records should remain immutable.

---

# 49. Common Enum Categories

The final Prisma schema shall define controlled enum values for fields such as:

```text
UserStatus
OrganizationStatus
MembershipStatus
ProviderQualificationStatus
ProviderProfileStatus
VerificationStatus
DocumentStatus
ServiceStatus
ProjectRequestStatus
RequirementStatus
ProposalStatus
ContractStatus
MissionStatus
MilestoneStatus
DeliverableStatus
QualityResult
CorrectionStatus
PaymentStatus
PaymentTransactionStatus
RefundStatus
DisputeStatus
NotificationStatus
EvaluationStatus
```

The exact values shall follow the approved business workflows.

The functional analysis identifies lifecycle states such as draft, submitted, qualification, validated, published, selected, contracting, signed, financing, execution, correction, final validation, reversement, evaluation, suspension, cancellation and archiving.

---

# 50. JSON Fields

JSON shall only be used for information that is genuinely structured and variable.

Potential JSON fields include:

```text
RequirementVersion.content
Specification.content
ProposalVersion.content
ContractVersion.content
Deliverable.acceptanceCriteria
QualityReport.content
PaymentEvent.payload
AuditLog.metadata
```

JSON shall not be used to avoid modeling stable relational data.

---

# 51. Data Ownership

Every business record shall have a clear ownership or organizational context where required.

Examples:

```text
ProjectRequest → Client Organization
ProviderProfile → User / Provider Organization
Contract → Client Organization / Provider Organization
Mission → Contract
Payment → Mission
Dispute → Mission
Conversation → Authorized Participants
```

---

# 52. Historical Data

The following data shall remain historically identifiable:

```text
RequirementVersion
Specification
ProposalVersion
ContractVersion
DeliverableVersion
QualityReview
CorrectionRequest
PaymentTransaction
PaymentEvent
Refund
DisputeDecision
AuditLog
```

Historical records shall not be silently overwritten.

---

# 53. Soft Deletion and Archiving

Physical deletion shall be limited for critical business data.

Where appropriate, entities may use:

```text
archivedAt
deletedAt
```

or an equivalent lifecycle mechanism.

Critical financial, contractual and audit information shall remain traceable.

---

# 54. Data Classification

The implementation shall classify data according to its sensitivity.

### Public or marketplace information

Examples:

```text
Service categories
Service descriptions
Approved public provider information
Public portfolio information
```

### Internal information

Examples:

```text
Qualification notes
Internal quality information
Internal administrative information
```

### Sensitive information

Examples:

```text
Authentication information
Personal information
Financial information
Contractual information
Private messages
Dispute evidence
```

Access to sensitive information shall be controlled by the authorization layer.

---

# 55. Data Validation

Validation shall occur at multiple levels:

```text
Frontend
    ↓
API validation
    ↓
Business validation
    ↓
Database constraints
```

The frontend is not considered a security boundary.

The backend must validate all client-provided data.

The database must preserve structural integrity.

---

# 56. Data Dictionary and Prisma

The data dictionary is the final conceptual reference before physical schema implementation.

The next implementation step is to transform these definitions into:

```text
prisma/schema.prisma
```

The Prisma schema shall define:

* models;
* fields;
* relations;
* enums;
* primary keys;
* unique constraints;
* indexes;
* delete/update behavior;
* database-specific types.

---

# 57. Final Database Design Sequence

The complete database design process is now:

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
Migration
      ↓
Database validation
```

---

# 58. Important Validation Before Implementation

Before creating `schema.prisma`, the following points must be validated:

1. Final entity names.
2. Whether `ProjectRequest` and `Requirement` are separate entities.
3. Whether `Proposal` and `Offer` represent the same concept.
4. Whether `Specification` is attached to `ProjectRequest` or `Requirement`.
5. Exact status values.
6. Exact mandatory fields.
7. Exact financial model.
8. Payment provider integration model.
9. Exact organization/provider relationship.
10. Evaluation visibility rules.
11. Dispute lifecycle.
12. Data retention rules.
13. Legal requirements affecting financial data.
14. External integration identifiers.
15. Final cascade and deletion rules.

These points must not be silently converted into implementation decisions if they remain open in the specifications.

---

# 59. Database Documentation Completed

The database documentation structure is now:

```text
docs/
└── 03-database/
    ├── 01-erd.md
    ├── 02-logical-data-model.md
    ├── 03-relationships.md
    ├── 04-cardinalities.md
    ├── 05-constraints.md
    ├── 06-indexes.md
    └── 07-data-dictionary.md
```

All seven database design documents are now defined.

The next technical phase is the physical database implementation, beginning with the Prisma schema.
