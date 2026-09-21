# AIWORX — General Architecture

## 1. Purpose

This document defines the general technical architecture of the AIWORX platform.

It establishes the main architectural components, their responsibilities, their interactions, and the technical principles that guide the implementation of the platform.

This document provides the architectural foundation for:

* backend development;
* database design;
* API design;
* authentication and authorization;
* external integrations;
* security;
* testing;
* deployment;
* monitoring and maintenance.

Detailed technical decisions shall be documented separately and validated before becoming final implementation decisions.

---

# 2. Architectural Objectives

The AIWORX architecture shall provide:

* clear separation of responsibilities;
* modular backend organization;
* secure access to platform resources;
* strong data integrity;
* traceability of important operations;
* controlled communication between modules;
* support for external services;
* scalability according to project requirements;
* maintainability;
* testability;
* reliable error handling;
* secure file and document management.

---

# 3. High-Level Architecture

AIWORX shall use a layered and modular architecture.

The main architectural layers are:

1. Presentation Layer
2. API Layer
3. Application Layer
4. Domain / Business Layer
5. Data Access Layer
6. Database Layer
7. External Services Layer
8. Infrastructure Layer

The frontend belongs to the Presentation Layer.

The backend is responsible for the API, application logic, business rules, data access, security, integrations, and operational processing.

---

# 4. Main Architectural Components

## 4.1 Frontend

The frontend provides the user interface of the AIWORX platform.

Its responsibilities include:

* displaying platform information;
* collecting user input;
* displaying forms;
* displaying dashboards;
* displaying workflow states;
* communicating with the backend API;
* managing client-side interface state;
* displaying validation and error messages.

The frontend shall not contain authoritative business rules.

Business rules affecting security, data integrity, or workflow validity shall be enforced by the backend.

---

## 4.2 Backend API

The backend API is the main entry point for frontend requests.

Its responsibilities include:

* authentication;
* authorization;
* request validation;
* business process execution;
* data access;
* workflow management;
* file management;
* notifications;
* external service communication;
* audit logging;
* error handling.

The API shall expose controlled endpoints corresponding to the functional modules of the platform.

---

## 4.3 Application Layer

The Application Layer coordinates application use cases.

Its responsibilities include:

* receiving validated requests;
* executing use cases;
* coordinating business modules;
* managing transactions;
* invoking business services;
* calling repositories;
* calling external services when required;
* returning structured results.

The Application Layer should remain independent from HTTP-specific implementation details whenever possible.

---

## 4.4 Domain / Business Layer

The Domain / Business Layer contains the core business rules of AIWORX.

It manages concepts such as:

* users;
* organizations;
* roles;
* providers;
* provider qualifications;
* needs;
* specifications;
* matching;
* invitations;
* offers;
* negotiations;
* contracts;
* payments;
* missions;
* milestones;
* deliverables;
* quality;
* disputes;
* penalties;
* evaluations.

Business rules should remain independent from infrastructure-specific implementation whenever practical.

---

## 4.5 Data Access Layer

The Data Access Layer provides controlled access to persistent data.

Its responsibilities include:

* creating records;
* retrieving records;
* updating records;
* deleting records when authorized;
* executing database queries;
* managing relationships;
* supporting transactions;
* enforcing data access boundaries.

Application and business logic should not directly depend on low-level database implementation details.

---

## 4.6 Database Layer

The Database Layer stores the persistent data required by AIWORX.

It shall contain data related to:

* users;
* organizations;
* roles;
* provider profiles;
* qualifications;
* needs;
* specifications;
* matching;
* invitations;
* offers;
* negotiations;
* contracts;
* payments;
* missions;
* milestones;
* deliverables;
* quality controls;
* disputes;
* evaluations;
* notifications;
* files and documents;
* audit records.

The detailed database architecture shall be defined in `docs/03-database/`.

---

# 5. Architectural Layers

## 5.1 Presentation Layer

The Presentation Layer is responsible for interaction with platform users.

It communicates with the backend through the API.

It shall not directly access the database.

---

## 5.2 API Layer

The API Layer handles communication between the frontend and backend.

Its responsibilities include:

* routing;
* authentication middleware;
* authorization middleware;
* request validation;
* response formatting;
* API error handling;
* API versioning when required.

---

## 5.3 Application Layer

The Application Layer implements application use cases.

Main use-case categories include:

* account management;
* user management;
* organization management;
* provider management;
* need management;
* matching;
* invitation management;
* offer management;
* contract management;
* payment processing;
* mission management;
* quality management;
* dispute management;
* evaluation management.

---

## 5.4 Domain / Business Layer

The Domain / Business Layer contains the core business concepts and rules.

It should be protected from unnecessary dependencies on:

* HTTP;
* database drivers;
* external APIs;
* infrastructure providers;
* frontend technologies.

---

## 5.5 Infrastructure Layer

The Infrastructure Layer contains the technical implementations required by the application.

It may include:

* database access;
* authentication providers;
* file storage;
* email services;
* payment services;
* electronic signature services;
* notification services;
* AI services;
* logging;
* monitoring;
* background jobs.

---

# 6. Backend Architectural Approach

The initial backend architecture shall follow a modular monolith approach unless a validated architectural decision requires another architecture.

The backend shall contain clearly separated business modules while remaining within the same application.

This approach provides:

* simpler initial deployment;
* simpler development;
* easier local testing;
* reduced infrastructure complexity;
* clear business separation;
* possibility of future service extraction.

A module may later be separated into an independent service if justified by:

* scalability requirements;
* performance requirements;
* availability requirements;
* security requirements;
* operational requirements.

Such a decision shall be documented in `08-technical-decisions.md`.

---

# 7. Main Backend Modules

The backend shall be organized around the following functional modules:

## 7.1 Identity and Access

Responsible for:

* registration;
* authentication;
* password management;
* sessions;
* roles;
* permissions;
* authorization.

## 7.2 Users and Organizations

Responsible for:

* user profiles;
* organization profiles;
* organization membership;
* organization roles;
* organization status.

## 7.3 Providers

Responsible for:

* provider profiles;
* provider categories;
* qualifications;
* verification;
* availability;
* provider status.

## 7.4 Needs

Responsible for:

* need creation;
* need qualification;
* specifications;
* specification versions;
* need lifecycle;
* need status.

## 7.5 Matching

Responsible for:

* matching needs with providers;
* matching criteria;
* matching results;
* matching status;
* AI-assisted matching where applicable.

## 7.6 Invitations

Responsible for:

* provider invitations;
* invitation status;
* invitation expiration;
* invitation responses.

## 7.7 Offers and Negotiation

Responsible for:

* offer creation;
* offer versions;
* offer submission;
* negotiation;
* acceptance;
* rejection;
* expiration.

## 7.8 Contracts

Responsible for:

* contract generation;
* contract versions;
* contract status;
* contract parties;
* signature workflow;
* contract documents.

## 7.9 Payments

Responsible for:

* payment requests;
* payment status;
* external payment providers;
* payment confirmation;
* webhooks;
* transaction traceability;
* refunds where applicable.

## 7.10 Missions

Responsible for:

* mission creation;
* mission status;
* milestones;
* deliverables;
* execution tracking.

## 7.11 Quality

Responsible for:

* quality criteria;
* quality controls;
* validation;
* correction requests;
* quality status.

## 7.12 Disputes

Responsible for:

* dispute creation;
* dispute status;
* evidence;
* resolution;
* penalties where applicable.

## 7.13 Evaluations

Responsible for:

* evaluations;
* ratings;
* feedback;
* reputation-related data.

## 7.14 Notifications

Responsible for:

* in-platform notifications;
* email notifications;
* notification events;
* notification preferences.

## 7.15 Files and Documents

Responsible for:

* file metadata;
* document association;
* storage references;
* access control;
* file lifecycle.

## 7.16 Audit

Responsible for:

* audit events;
* actor identification;
* affected resources;
* timestamps;
* important state changes.

## 7.17 Administration

Responsible for:

* platform administration;
* user administration;
* provider administration;
* verification;
* dispute administration;
* configuration;
* operational monitoring.

---

# 8. Component Communication

The general communication flow is:

```text
Frontend
    |
    v
API Layer
    |
    v
Application Layer
    |
    v
Domain / Business Layer
    |
    v
Data Access Layer
    |
    v
Database
```

External services are accessed through the backend:

```text
Backend
    |
    +---- Payment Provider
    |
    +---- Electronic Signature Provider
    |
    +---- Email Provider
    |
    +---- File Storage
    |
    +---- AI Services
    |
    +---- Other External Services
```

The frontend shall not directly access sensitive external services when this could expose credentials, secrets, or security-sensitive operations.

---

# 9. API Architecture

The backend shall expose a structured API.

The API shall provide endpoints for:

* authentication;
* users;
* organizations;
* providers;
* needs;
* matching;
* invitations;
* offers;
* contracts;
* payments;
* missions;
* quality;
* disputes;
* evaluations;
* notifications;
* files;
* administration.

The API shall use consistent conventions for:

* HTTP methods;
* URL structures;
* request validation;
* response structures;
* HTTP status codes;
* error structures;
* authentication;
* authorization;
* pagination;
* filtering;
* sorting;
* versioning.

Detailed API specifications shall be defined during backend architecture and implementation.

---

# 10. Authentication and Authorization

Authentication verifies the identity of a user.

Authorization determines whether the authenticated user is allowed to perform a specific operation.

The architecture shall separate:

* authentication;
* identity;
* roles;
* permissions;
* resource ownership;
* organization access;
* administrative access.

Authorization shall always be enforced by the backend.

Frontend restrictions shall not be considered sufficient security controls.

---

# 11. Data Isolation

The architecture shall ensure that users only access data for which they have the required permissions.

The backend shall verify:

* authenticated identity;
* user role;
* organization membership;
* resource ownership;
* resource status;
* operation permissions.

Sensitive data shall not be returned through unauthorized API responses.

---

# 12. Business Workflow Architecture

AIWORX contains several business workflows.

Important workflows shall have explicit states and controlled transitions.

These workflows include:

* user lifecycle;
* provider qualification;
* need lifecycle;
* invitation lifecycle;
* offer lifecycle;
* contract lifecycle;
* payment lifecycle;
* mission lifecycle;
* quality lifecycle;
* dispute lifecycle.

State transitions shall be controlled by backend business rules.

Invalid transitions shall be rejected.

Important transitions shall be recorded for traceability.

---

# 13. Transaction Management

Database transactions shall be used when multiple related database operations must succeed or fail together.

Transactions shall be considered for:

* creation of related business records;
* offer acceptance;
* contract creation;
* payment state updates;
* mission state transitions;
* quality validation;
* dispute resolution.

External services are not automatically part of database transactions.

External failures shall therefore be handled explicitly.

---

# 14. External Integrations

External services shall be isolated behind dedicated integration components.

External-service-specific logic shall not be distributed throughout the business modules.

Each integration shall provide, where applicable:

* configuration;
* authentication;
* request handling;
* response handling;
* error handling;
* timeout handling;
* retry handling;
* logging;
* idempotency.

The exact external providers shall be determined after validation of the open questions.

---

# 15. Payment Architecture

Payment operations shall use an external payment provider selected according to validated business and technical requirements.

The backend shall manage:

* payment initiation;
* payment status;
* external payment identifiers;
* webhook processing;
* payment confirmation;
* payment failures;
* reconciliation;
* refunds where applicable.

The backend shall not store sensitive card information unless explicitly required, validated, and legally permitted.

Payment webhook processing shall be idempotent.

---

# 16. File and Document Architecture

Files and documents shall be stored separately from relational business data when appropriate.

The database shall store file metadata and references.

The file architecture shall manage:

* file storage;
* file identification;
* file association;
* access control;
* file status;
* retention;
* deletion;
* security validation.

Private documents shall only be accessible to authorized users.

---

# 17. Notification Architecture

Important business events may generate notifications.

The notification system shall support:

* notification creation;
* notification persistence;
* notification delivery;
* delivery status;
* user preferences;
* retry handling;
* failure tracking.

The notification system shall remain independent from the core business modules as much as practical.

---

# 18. Audit Architecture

Important business and security operations shall generate audit events.

An audit event should contain:

* actor;
* action;
* affected resource;
* timestamp;
* relevant context;
* result when required.

Audit records shall be protected against unauthorized modification.

The audit mechanism shall support traceability and investigation of important platform operations.

---

# 19. Error Handling

The backend shall use a consistent error-handling strategy.

Errors shall be categorized into:

* validation errors;
* authentication errors;
* authorization errors;
* resource-not-found errors;
* business-rule errors;
* conflict errors;
* external-service errors;
* internal errors.

The API shall return controlled error responses.

Internal technical information shall not be exposed to clients.

This includes:

* stack traces;
* database details;
* internal service information;
* secrets;
* credentials.

---

# 20. Logging and Monitoring

The backend shall provide structured logging for important application events.

Monitoring shall cover, where applicable:

* application availability;
* application errors;
* response performance;
* infrastructure resources;
* external service failures;
* background processing failures.

Logs shall respect security and privacy requirements.

Sensitive information shall not be unnecessarily stored in logs.

---

# 21. Security Architecture

Security shall be applied across all architectural layers.

The architecture shall provide protection against:

* unauthorized access;
* privilege escalation;
* injection attacks;
* insecure file access;
* brute-force attacks;
* API abuse;
* unauthorized data access;
* insecure external integrations;
* accidental exposure of secrets.

Security requirements defined in the scope and constraints documentation shall be treated as architectural requirements.

---

# 22. Scalability

The initial architecture shall prioritize simplicity, maintainability, and reliability while allowing future scaling.

Potential scaling mechanisms include:

* horizontal backend scaling;
* database optimization;
* caching;
* asynchronous processing;
* queue-based processing;
* external object storage;
* independent scaling of resource-intensive components.

Scaling decisions shall be based on validated requirements and measured system behavior.

---

# 23. Asynchronous Processing

Operations that do not require an immediate response may be processed asynchronously.

Potential asynchronous operations include:

* email notifications;
* platform notifications;
* file processing;
* AI processing;
* background verification;
* periodic maintenance;
* retries;
* scheduled operations.

The exact asynchronous infrastructure shall be defined after the corresponding requirements are validated.

---

# 24. Configuration Management

Application configuration shall be separated from source code.

Configuration may include:

* database connection settings;
* external service configuration;
* API keys;
* application environment;
* security configuration;
* storage configuration;
* notification configuration.

Sensitive configuration shall be stored securely.

Secrets shall never be committed to source control.

---

# 25. Environment Architecture

The project shall support separate environments:

```text
Development
     |
     v
Testing / Validation
     |
     v
Production
```

Each environment shall have appropriate:

* configuration;
* database;
* credentials;
* external integrations;
* logging;
* security settings.

Production credentials shall not be reused in development.

---

# 26. Testing Architecture

The architecture shall support multiple levels of testing:

* unit tests;
* business-rule tests;
* integration tests;
* API tests;
* database tests;
* authentication tests;
* authorization tests;
* external integration tests;
* end-to-end tests where required.

Critical business rules shall be independently testable.

---

# 27. Deployment Architecture

The application shall be deployable through a controlled deployment process.

Deployment shall include:

* backend application;
* database;
* file storage;
* required external integrations;
* environment configuration;
* monitoring;
* logging;
* backup mechanisms.

Database changes shall be managed through versioned migrations.

---

# 28. Versioning

The architecture shall support versioning of important business objects where required.

Versioning is particularly relevant for:

* specifications;
* offers;
* contracts;
* important documents;
* business configurations.

Version history shall preserve traceability when required.

---

# 29. Architectural Principles

The following principles shall guide the implementation.

## Principle 1 — Separation of Concerns

Each component shall have a clearly defined responsibility.

## Principle 2 — Backend Authority

The backend is the authoritative layer for business rules and security.

## Principle 3 — Explicit Business States

Important workflows shall use explicit states and controlled transitions.

## Principle 4 — Data Integrity

Business data shall remain consistent through appropriate validation and database constraints.

## Principle 5 — Traceability

Important operations and state changes shall remain traceable.

## Principle 6 — Security by Design

Security shall be considered during architecture and implementation.

## Principle 7 — Modular Design

Business modules shall remain logically separated.

## Principle 8 — Testability

Business logic shall be structured so that it can be tested independently.

## Principle 9 — Controlled Integrations

External services shall be accessed through dedicated integration components.

## Principle 10 — Configuration Separation

Environment-specific and sensitive configuration shall remain outside the source code.

---

# 30. Architectural Dependencies

Some architectural decisions depend on unresolved questions identified in the scope documentation.

These include:

* final provider categories;
* matching methodology;
* payment provider;
* electronic signature provider;
* notification channels;
* AI provider;
* file storage solution;
* hosting infrastructure;
* expected user volume;
* expected data volume;
* security requirements;
* legal and compliance requirements.

These decisions shall be validated before their corresponding implementation choices become final.

---

# 31. Relationship With Other Architecture Documents

This document provides the general architectural foundation for AIWORX.

The other architecture documents are:

```text
02-architecture/
├── 01-general-architecture.md
├── 02-backend-architecture.md
├── 03-business-modules.md
├── 04-data-flows.md
├── 05-authentication-and-authorization.md
├── 06-external-integrations.md
├── 07-security.md
└── 08-technical-decisions.md
```

This document shall remain consistent with:

```text
01-scope/
03-database/
```

and with the validated requirements, constraints, workflows, and business rules.

---

# 32. Architectural Validation

Before implementation, the architecture shall be reviewed against:

* functional requirements;
* non-functional requirements;
* business rules;
* workflows;
* constraints;
* open questions;
* security requirements;
* database requirements;
* integration requirements.

Unresolved architectural dependencies shall remain explicitly documented until validated.

---

# 33. Status

**Document:** `01-general-architecture.md`

**Status:** Draft / Architecture Baseline

**Language:** English

**Purpose:** General technical architecture reference

**Next architecture documents:**

* `02-backend-architecture.md`
* `03-business-modules.md`
* `04-data-flows.md`
* `05-authentication-and-authorization.md`
* `06-external-integrations.md`
* `07-security.md`
* `08-technical-decisions.md`
