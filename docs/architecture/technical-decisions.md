# AIWORX — Technical Decisions

## 1. Purpose

This document records the technical decisions for the AIWORX platform.

Its objectives are to:

* document important technical choices;
* explain the reason for each choice;
* distinguish validated decisions from pending decisions;
* avoid undocumented architectural changes;
* maintain consistency between the requirements, architecture, database, backend and infrastructure.

A technical decision shall not contradict the validated requirements.

---

# 2. Decision Status

Each technical decision shall have one of the following statuses:

```text
Proposed
Validated
Rejected
Pending
```

A decision marked as `Pending` shall not be treated as a final implementation constraint.

---

# 3. Backend Technology

## Decision

The backend shall use a structured TypeScript server architecture.

The reference architecture recommends:

```text
NestJS
```

or clearly separated server-side TypeScript modules providing equivalent architectural capabilities.

## Reason

The reference stack identifies NestJS or structured TypeScript server modules because they provide:

* structured architecture;
* validation;
* security mechanisms;
* API documentation;
* maintainability.

## Status

```text
Validated as reference
```

The exact framework shall be confirmed before backend implementation if a different equivalent solution is considered.

---

# 4. Primary Database

## Decision

The primary database shall be a relational database.

The reference technology is:

```text
PostgreSQL
```

## Reason

PostgreSQL is recommended because AIWORX requires:

* reliable transactions;
* relational business data;
* financial traceability;
* structured relationships;
* consistency;
* support for complex queries.

## Status

```text
Validated as reference
```

---

# 5. ORM / Data Access Layer

## Decision

The backend shall use a mature ORM or equivalent data-access solution.

The reference technology is:

```text
Prisma
```

or an equivalent mature solution.

## Reason

The reference stack identifies Prisma because it provides:

* migrations;
* type safety;
* maintainability;
* structured database access.

## Status

```text
Validated as reference
```

The final ORM choice shall be confirmed before database implementation.

---

# 6. Cache and Asynchronous Jobs

## Decision

The architecture shall support caching and asynchronous task processing.

The reference technology is:

```text
Redis
```

combined with a compatible worker mechanism.

## Main Uses

Redis and workers may support:

* notifications;
* email processing;
* WhatsApp processing;
* PDF generation;
* AI processing;
* file processing;
* reminders;
* retries;
* rate limiting;
* asynchronous operations.

## Status

```text
Validated as reference
```

---

# 7. Object Storage

## Decision

Large files and documents shall use object storage.

The reference architecture recommends:

```text
S3-compatible object storage
```

## Main Uses

Object storage may contain:

* documents;
* contracts;
* signed documents;
* deliverables;
* attachments;
* other uploaded files.

The relational database shall primarily store file metadata and storage references.

## Status

```text
Validated as reference
```

---

# 8. Search

## Decision

The initial architecture shall avoid unnecessary search infrastructure complexity.

The reference architecture recommends:

```text
PostgreSQL for initial search
```

with the possibility of introducing a dedicated search engine later if required.

## Reason

This allows the project to:

* reduce initial complexity;
* avoid unnecessary infrastructure;
* keep the first implementation maintainable;
* introduce dedicated search infrastructure only when justified.

## Status

```text
Validated as reference
```

---

# 9. Frontend

## Decision

The frontend is outside the current backend implementation responsibility.

The reference cahier des charges recommends:

```text
Next.js + TypeScript
```

for the frontend.

## Reason

The reference architecture identifies:

* responsive application support;
* SSR/SEO for the website;
* component sharing.

## Status

```text
Reference
```

The final frontend implementation is managed separately from the backend work.

---

# 10. API Architecture

## Decision

The backend shall expose a documented API.

The API shall be:

* versioned;
* authenticated where required;
* authorization-protected;
* validated;
* documented with OpenAPI;
* consistent in its error responses.

## Status

```text
Validated
```

---

# 11. API Versioning

## Decision

The API shall use explicit versioning.

Example:

```text
/api/v1/
```

The exact URL convention may be adjusted during backend implementation.

## Reason

API versioning allows future changes without immediately breaking existing consumers.

## Status

```text
Validated
```

---

# 12. API Documentation

## Decision

The backend API shall be documented using OpenAPI.

The documentation shall describe:

* endpoints;
* request parameters;
* request bodies;
* response structures;
* authentication requirements;
* authorization requirements;
* error responses.

## Status

```text
Validated
```

---

# 13. Authentication Architecture

## Decision

Protected resources shall require authentication.

Authentication and authorization shall be implemented server-side.

The final authentication mechanism shall be selected according to the security requirements and technical validation.

## Required Properties

The selected mechanism shall support:

* secure authentication;
* session or token management;
* expiration;
* revocation;
* secure credential handling;
* authorization integration;
* appropriate protection for sensitive operations.

## Status

```text
Pending technical validation
```

---

# 14. Authorization Architecture

## Decision

AIWORX shall use role-based and resource-level authorization.

Authorization shall consider:

* user role;
* permission;
* organization;
* resource ownership;
* resource relationship;
* workflow state;
* business rules.

## Status

```text
Validated
```

---

# 15. Organization Isolation

## Decision

The backend shall enforce organization-level data isolation.

A user shall not automatically access resources belonging to another organization.

## Reason

AIWORX handles data belonging to multiple organizations and therefore requires controlled access boundaries.

## Status

```text
Validated
```

---

# 16. Database Migration Strategy

## Decision

Database schema changes shall be managed through versioned migrations.

The selected ORM or database tooling shall provide a controlled migration mechanism.

## Required Properties

Migrations shall:

* be version controlled;
* be reproducible;
* be reviewed;
* be tested before production;
* preserve data integrity.

## Status

```text
Validated
```

---

# 17. Database Transactions

## Decision

Critical business operations shall use database transactions where multiple related changes must succeed or fail together.

Examples include:

* financial ledger operations;
* state transitions;
* creation of related business records;
* payment state updates;
* important workflow transitions.

## Status

```text
Validated
```

---

# 18. Financial Data Architecture

## Decision

AIWORX shall maintain an internal financial register.

The external payment provider remains the source of truth for the actual movement of funds.

AIWORX shall maintain its internal accounting/transaction records without retroactively modifying validated financial entries.

The reference architecture requires traceability of:

* gross client amount;
* client fees;
* provider base amount;
* commission;
* provider net amount;
* taxes;
* refunds;
* external references.

## Status

```text
Validated
```

---

# 19. Payment Idempotency

## Decision

Payment operations shall use idempotency mechanisms.

A repeated request shall not create multiple financial transactions.

The system shall also deduplicate repeated payment webhooks.

## Status

```text
Validated
```

---

# 20. Webhook Architecture

## Decision

External webhooks shall be:

* authenticated or signed;
* validated;
* timestamped where supported;
* idempotent;
* deduplicated;
* logged;
* processed through controlled business logic.

## Status

```text
Validated
```

---

# 21. External Integration Architecture

## Decision

External services shall be accessed through adapters or integration interfaces.

The business modules shall not depend directly on provider-specific implementations.

The architecture shall support integrations for:

* payment;
* electronic signature;
* messaging;
* storage;
* analytics;
* AI providers.

The cahier des charges explicitly requires these integrations to be handled through adapters.

## Status

```text
Validated
```

---

# 22. Payment Provider

## Decision

AIWORX shall use an external payment provider.

The exact provider has not been fixed in this architecture document.

## Required Properties

The selected provider shall support the required payment workflow and integration mechanisms.

The final choice shall consider:

* security;
* supported payment methods;
* webhook support;
* transaction traceability;
* idempotency;
* geographic availability;
* regulatory requirements;
* integration complexity.

## Status

```text
Pending
```

---

# 23. Electronic Signature Provider

## Decision

AIWORX shall use an external electronic-signature service where required.

The exact provider has not yet been fixed.

## Required Properties

The selected provider shall support:

* document signing;
* signature status;
* callbacks/webhooks;
* signature verification;
* document traceability.

## Status

```text
Pending
```

---

# 24. Messaging Integration

## Decision

Messaging integrations shall be isolated behind a dedicated integration layer.

The architecture may support:

* email;
* WhatsApp;
* in-platform notifications.

The exact external providers shall be selected separately.

## Status

```text
Pending provider selection
```

---

# 25. AI Provider

## Decision

AI-assisted functionality shall communicate with external AI services through adapters.

The exact provider shall not be hardcoded into business modules.

## Required Properties

The selected AI service shall support the required AI functionality while respecting:

* security;
* privacy;
* data minimization;
* reliability;
* cost constraints.

## Status

```text
Pending provider selection
```

---

# 26. File Processing

## Decision

File processing shall be handled through controlled backend services and asynchronous workers where necessary.

Processing may include:

* validation;
* virus scanning;
* quarantine;
* metadata extraction;
* PDF generation;
* storage.

## Status

```text
Validated
```

---

# 27. Asynchronous Processing

## Decision

Long-running or non-blocking operations shall use asynchronous workers when appropriate.

Examples include:

```text
Email
WhatsApp
PDF Generation
AI Analysis
File Processing
Reminders
Retries
```

## Reason

These operations should not unnecessarily block synchronous API requests.

## Status

```text
Validated
```

---

# 28. Caching

## Decision

Caching shall be introduced only where it provides a clear performance or scalability benefit.

Potential cache targets include:

* frequently accessed reference data;
* temporary workflow information;
* rate limiting;
* short-lived computation results.

Business-critical persistent data shall remain in the primary database.

## Status

```text
Validated
```

---

# 29. Observability

## Decision

The platform shall provide monitoring and logging for:

* application health;
* errors;
* availability;
* infrastructure resources;
* important external integrations;
* security events.

## Status

```text
Validated
```

---

# 30. Correlation IDs

## Decision

Important requests and asynchronous operations should use correlation identifiers.

The identifier shall allow an operation to be traced across:

```text
API
  |
  v
Application Service
  |
  v
Worker
  |
  v
External Provider
  |
  v
Webhook
  |
  v
Database / Audit
```

## Status

```text
Validated
```

---

# 31. Error Handling

## Decision

The backend shall use standardized error handling.

Errors shall be:

* classified;
* logged appropriately;
* returned using controlled API responses;
* free from sensitive implementation details.

## Status

```text
Validated
```

---

# 32. Retry Strategy

## Decision

Retries shall only be applied to operations that are safe to retry.

Retryable failures may include:

* temporary network failures;
* temporary provider unavailability;
* transient timeout.

Critical state-changing operations shall use idempotency before retrying.

## Status

```text
Validated
```

---

# 33. Circuit Breaker

## Decision

External providers may use circuit-breaker mechanisms when repeated failures could affect system stability.

The exact implementation shall be selected during backend and infrastructure implementation.

## Status

```text
Pending implementation
```

---

# 34. Security Technology Decisions

The architecture shall enforce:

* HTTPS/TLS;
* secure password hashing;
* secure secrets management;
* authorization;
* rate limiting;
* audit logging;
* secure file handling;
* protected webhooks;
* input validation.

The exact libraries and infrastructure services shall be selected during implementation.

## Status

```text
Validated at architectural level
```

---

# 35. Infrastructure Decision

## Decision

The application shall be deployable using infrastructure capable of supporting:

```text
Frontend
API
Workers
PostgreSQL
Redis
Object Storage
External Integrations
Monitoring
```

The exact hosting provider and deployment architecture remain subject to technical validation.

## Status

```text
Pending
```

---

# 36. Environment Strategy

The project shall separate at least:

```text
Development
Testing / Pre-production
Production
```

Each environment shall have independent configuration.

Production secrets shall not be reused in development.

## Status

```text
Validated
```

---

# 37. Configuration Management

Application configuration shall be externalized.

Configuration shall include environment-specific values such as:

* database connection;
* Redis connection;
* external API endpoints;
* integration credentials;
* feature configuration;
* security configuration.

Secrets shall not be stored in source code.

## Status

```text
Validated
```

---

# 38. Backup Strategy

Critical data shall be backed up automatically.

The backup strategy shall define:

* backup frequency;
* retention;
* storage;
* encryption;
* restoration process;
* restoration testing.

The exact operational values remain subject to infrastructure validation.

## Status

```text
Validated at requirement level
```

---

# 39. Testing Strategy

The project shall use multiple testing levels:

```text
Unit Tests
     |
     v
Integration Tests
     |
     v
API Tests
     |
     v
Security Tests
     |
     v
End-to-End Tests
```

The exact framework and tooling shall be selected during backend implementation.

## Status

```text
Validated
```

---

# 40. Test Data

Development and testing environments shall use appropriate test data.

Production personal or financial data shall not be copied into development environments without an explicitly validated and compliant process.

## Status

```text
Validated
```

---

# 41. Source Control

The source code shall be managed using Git.

The repository shall contain:

* source code;
* configuration templates;
* migrations;
* tests;
* documentation;
* infrastructure configuration where appropriate.

Sensitive secrets shall not be committed.

## Status

```text
Validated
```

---

# 42. Documentation

Important technical decisions shall remain documented.

Changes to major architectural decisions shall be recorded before implementation.

The documentation shall remain synchronized with the actual implementation.

## Status

```text
Validated
```

---

# 43. Decision Change Process

A major technical decision shall follow:

```text
Problem
  |
  v
Possible Solutions
  |
  v
Evaluation
  |
  v
Decision
  |
  v
Documentation
  |
  v
Implementation
  |
  v
Validation
```

A previously validated decision may be changed when a documented reason justifies the change.

---

# 44. Pending Technical Decisions

The following decisions require confirmation before their final implementation:

* exact backend framework if an alternative to the reference stack is considered;
* exact ORM if an alternative to Prisma is considered;
* exact authentication mechanism;
* exact 2FA mechanism;
* exact payment provider;
* exact electronic-signature provider;
* exact messaging providers;
* exact AI provider;
* exact hosting provider;
* exact object-storage provider;
* exact Redis/worker implementation;
* exact monitoring solution;
* exact deployment strategy;
* exact backup infrastructure.

These items shall not be invented or silently converted into fixed implementation decisions.

---

# 45. Reference Technology Stack

The current reference stack is:

```text
Frontend
    Next.js + TypeScript

Backend
    NestJS or structured TypeScript server modules

Database
    PostgreSQL

ORM
    Prisma or equivalent mature ORM

Cache / Workers
    Redis + compatible worker

File Storage
    S3-compatible object storage

Search
    PostgreSQL initially
    Dedicated search engine if required
```

This stack is derived from the reference technology stack in the AIWORX cahier des charges.

---

# 46. Architectural Principle

Technical choices shall remain subordinate to the functional and non-functional requirements.

The project shall prefer:

```text
Requirement
    |
    v
Architectural Need
    |
    v
Technical Decision
    |
    v
Implementation
```

and not:

```text
Technology
    |
    v
Force Requirement
```

---

# 47. Final Decision Rule

Before implementing a technical component, the team shall verify:

1. the requirement exists;
2. the architectural need is understood;
3. the technical choice is compatible with the architecture;
4. security requirements are satisfied;
5. data requirements are satisfied;
6. integration requirements are satisfied;
7. the decision is documented;
8. pending decisions have been validated.

---

# 48. Relationship With Other Architecture Documents

This document is related to:

```text
01-general-architecture.md
02-backend-architecture.md
03-business-modules.md
04-data-flows.md
05-authentication-and-authorization.md
06-external-integrations.md
07-security.md
```

It also depends on:

```text
01-scope/
```

and will directly influence:

```text
03-database/
backend/
infrastructure/
tests/
```

---

# 49. Architecture Completion

With this document completed, the architecture documentation phase contains:

```text
02-architecture/
│
├── 01-general-architecture.md
├── 02-backend-architecture.md
├── 03-business-modules.md
├── 04-data-flows.md
├── 05-authentication-and-authorization.md
├── 06-external-integrations.md
├── 07-security.md
└── 08-technical-decisions.md
```

The next phase is the database architecture and modeling phase.
