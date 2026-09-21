# AIWORX — Backend Architecture

## 1. Purpose

This document defines the internal architecture of the AIWORX backend.

It describes:

* backend structure;
* application layers;
* backend modules;
* request processing;
* controllers;
* services;
* repositories;
* middleware;
* validation;
* error handling;
* transactions;
* background processing;
* integrations;
* security responsibilities.

The purpose is to provide a clear technical structure for backend implementation.

---

# 2. Backend Architecture Overview

The AIWORX backend shall follow a modular layered architecture.

The main structure is:

```text
Client
   |
   v
API / Routes
   |
   v
Middleware
   |
   v
Controllers
   |
   v
Application Services
   |
   v
Business Logic
   |
   v
Repositories
   |
   v
Database
```

External services shall be accessed through dedicated integration components.

```text
Application Services
        |
        +---- External Services
        |
        +---- Payment Provider
        |
        +---- Email Provider
        |
        +---- File Storage
        |
        +---- AI Services
        |
        +---- Electronic Signature Provider
```

---

# 3. Backend Responsibilities

The backend is responsible for:

* authentication;
* authorization;
* request validation;
* business rules;
* workflow management;
* database access;
* transaction management;
* file management;
* payment processing;
* external integrations;
* notifications;
* audit logging;
* error handling;
* background processing;
* security enforcement.

The backend is the authoritative layer for business rules and protected operations.

---

# 4. Backend Layers

The backend shall be organized into the following layers:

```text
API Layer
Application Layer
Domain Layer
Data Access Layer
Infrastructure Layer
```

Each layer has a specific responsibility.

---

# 5. API Layer

The API Layer is responsible for communication between the frontend and backend.

Its responsibilities include:

* defining API routes;
* receiving HTTP requests;
* applying middleware;
* validating request structure;
* invoking controllers;
* returning HTTP responses.

The API Layer shall not contain complex business logic.

---

# 6. Routes

Routes define the available API endpoints.

Routes shall:

* define HTTP methods;
* define endpoint paths;
* attach required middleware;
* connect requests to controllers;
* remain organized by functional module.

Example structure:

```text
/api
    /auth
    /users
    /organizations
    /providers
    /needs
    /matching
    /invitations
    /offers
    /contracts
    /payments
    /missions
    /quality
    /disputes
    /evaluations
    /notifications
    /files
    /admin
```

The exact endpoint names shall be defined during API implementation.

---

# 7. Controllers

Controllers are responsible for handling incoming API requests.

A controller shall:

1. receive the request;
2. extract required input;
3. call the appropriate application service;
4. process the service result;
5. return the appropriate HTTP response.

Controllers shall remain lightweight.

Controllers shall not contain complex business rules.

The business logic shall be implemented in services or domain components.

---

# 8. Application Services

Application Services coordinate business use cases.

They are responsible for:

* executing use cases;
* coordinating multiple domain components;
* starting transactions when required;
* calling repositories;
* calling external integrations;
* applying application-level rules;
* returning structured results.

Examples of application services include:

```text
UserService
OrganizationService
ProviderService
NeedService
MatchingService
InvitationService
OfferService
ContractService
PaymentService
MissionService
QualityService
DisputeService
EvaluationService
NotificationService
FileService
```

The exact service structure may be refined during implementation.

---

# 9. Domain Layer

The Domain Layer contains the core business rules.

It represents the main business concepts of AIWORX.

The domain layer shall manage concepts such as:

* User;
* Organization;
* Provider;
* Need;
* Specification;
* Offer;
* Contract;
* Payment;
* Mission;
* Milestone;
* Deliverable;
* Quality Control;
* Dispute;
* Evaluation.

Business rules shall be implemented in a way that makes them independently testable.

---

# 10. Business Rules

Business rules shall be enforced by the backend.

Examples of business-rule categories include:

* valid workflow transitions;
* authorization requirements;
* provider qualification requirements;
* offer validity;
* contract requirements;
* payment conditions;
* mission progression;
* quality validation;
* dispute rules;
* evaluation rules.

The frontend may display business rules but shall not be the authoritative source for enforcing them.

---

# 11. Repository Layer

Repositories provide access to persistent data.

Their responsibilities include:

* querying data;
* creating records;
* updating records;
* deleting records when authorized;
* retrieving related records;
* executing database operations;
* supporting transactions.

Repositories shall isolate database-specific implementation from business logic.

---

# 12. Repository Principles

Repositories shall:

* expose only required data operations;
* avoid containing business workflows;
* avoid HTTP logic;
* avoid frontend logic;
* provide predictable interfaces;
* support transaction requirements.

Business decisions should not be implemented inside repositories unless the operation is directly related to data persistence.

---

# 13. Database Access

The backend shall access the database through a dedicated database layer or ORM/data-access mechanism.

The database layer shall manage:

* connections;
* queries;
* transactions;
* relationships;
* migrations;
* database errors.

Database credentials shall remain outside source code.

---

# 14. Middleware

Middleware provides reusable processing between the HTTP request and controller.

The backend may use middleware for:

* authentication;
* authorization;
* request validation;
* rate limiting;
* request logging;
* error handling;
* security headers;
* request identification.

Middleware shall remain focused on cross-cutting concerns.

---

# 15. Authentication Middleware

Authentication middleware verifies whether the request is associated with a valid authenticated identity.

It shall:

* validate authentication credentials or tokens;
* identify the current user;
* reject invalid authentication;
* make authenticated identity available to subsequent processing.

Authentication failures shall return controlled responses.

---

# 16. Authorization Middleware

Authorization verifies whether the authenticated user is allowed to access a protected operation.

Authorization may depend on:

* user role;
* permission;
* organization membership;
* resource ownership;
* resource state;
* administrative privileges.

Authorization shall be enforced on the backend.

---

# 17. Request Validation

Incoming requests shall be validated before business processing.

Validation shall cover:

* required fields;
* field types;
* allowed values;
* string lengths;
* numeric ranges;
* dates;
* identifiers;
* nested structures;
* file metadata where applicable.

Invalid requests shall be rejected before executing the corresponding business operation.

---

# 18. Response Structure

API responses shall use consistent structures.

Successful responses should provide:

* requested data;
* relevant metadata when required;
* pagination information when applicable.

Error responses should provide:

* error code;
* readable message;
* relevant validation information when applicable;
* request identifier when required.

Internal implementation details shall not be exposed.

---

# 19. Error Handling

The backend shall use centralized error handling.

Errors shall be classified into:

```text
Validation Error
Authentication Error
Authorization Error
Not Found Error
Conflict Error
Business Rule Error
External Service Error
Internal Error
```

The error-handling mechanism shall:

* convert internal errors into controlled API responses;
* log relevant technical information;
* avoid exposing sensitive information;
* provide appropriate HTTP status codes.

---

# 20. Business Workflow Processing

Business workflows shall be handled by application services and domain logic.

A typical workflow is:

```text
Request
   |
   v
Validation
   |
   v
Authentication
   |
   v
Authorization
   |
   v
Controller
   |
   v
Application Service
   |
   v
Business Rules
   |
   v
Repository / External Service
   |
   v
Response
```

Workflow state changes shall be validated before being persisted.

---

# 21. Transaction Management

Transactions shall be used when multiple database operations must be executed atomically.

A transaction shall ensure that:

```text
Operation A
    +
Operation B
    +
Operation C
```

either succeed together or are rolled back together.

Transactions shall be considered for:

* offer acceptance;
* contract creation;
* payment state updates;
* mission state changes;
* quality validation;
* dispute resolution;
* creation of related records.

External service operations shall be handled separately from database transactions.

---

# 22. External Service Layer

External services shall be accessed through dedicated integration components.

The backend shall not place provider-specific API calls directly inside controllers or core business logic.

The integration layer shall manage:

* API communication;
* authentication;
* request formatting;
* response parsing;
* errors;
* timeouts;
* retries;
* external identifiers.

---

# 23. Payment Integration

Payment integration shall be isolated from the main business logic.

The payment component shall manage:

* payment creation;
* payment status;
* external transaction identifiers;
* webhook processing;
* payment verification;
* payment failures;
* refunds where applicable.

Payment webhook processing shall be idempotent.

Sensitive payment information shall not be unnecessarily stored by AIWORX.

---

# 24. File Management

The File Service shall manage file-related operations.

It shall handle:

* file upload;
* file metadata;
* file association;
* access authorization;
* file validation;
* file retrieval;
* file deletion;
* storage references.

The backend shall verify that a user has permission to access a private file.

---

# 25. Notification Processing

Notifications shall be generated from relevant business events.

The Notification Service shall manage:

* notification creation;
* notification delivery;
* notification status;
* user preferences;
* retry mechanisms;
* delivery failures.

Notifications may be processed asynchronously when immediate processing is not required.

---

# 26. Background Jobs

Background jobs shall be used for operations that do not require immediate completion.

Possible background operations include:

* sending emails;
* sending notifications;
* file processing;
* AI processing;
* periodic verification;
* cleanup operations;
* retries;
* scheduled maintenance.

Background jobs shall provide appropriate failure handling.

---

# 27. Audit Logging

Important backend operations shall generate audit events.

Audit information may include:

* user;
* action;
* resource;
* timestamp;
* previous state when required;
* new state when required;
* relevant metadata.

Audit logging shall not expose unnecessary sensitive information.

---

# 28. Security Responsibilities

Security shall be implemented throughout the backend.

The backend shall enforce:

* authentication;
* authorization;
* input validation;
* secure password handling;
* access control;
* file access control;
* rate limiting where required;
* secure external integrations;
* secret management;
* secure error handling.

Security controls shall not depend exclusively on frontend implementation.

---

# 29. Logging

The backend shall use structured logging.

Logs shall help identify:

* application errors;
* authentication failures;
* authorization failures;
* external service failures;
* important workflow events;
* background job failures;
* unexpected errors.

Sensitive information shall not be unnecessarily logged.

---

# 30. Configuration

Application configuration shall be separated from application source code.

Configuration may include:

* database URL;
* API keys;
* authentication configuration;
* payment configuration;
* storage configuration;
* email configuration;
* AI configuration;
* environment settings.

Sensitive configuration shall be stored using secure environment or secret-management mechanisms.

---

# 31. Backend Folder Structure

The backend shall follow a modular structure.

The initial structure shall be:

```text
backend/
├── src/
│   ├── config/
│   ├── middlewares/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── organizations/
│   │   ├── providers/
│   │   ├── needs/
│   │   ├── matching/
│   │   ├── invitations/
│   │   ├── offers/
│   │   ├── contracts/
│   │   ├── payments/
│   │   ├── missions/
│   │   ├── quality/
│   │   ├── disputes/
│   │   ├── evaluations/
│   │   ├── notifications/
│   │   ├── files/
│   │   └── admin/
│   ├── integrations/
│   ├── database/
│   ├── shared/
│   ├── app/
│   └── server/
│
├── tests/
├── package.json
└── README.md
```

The exact technology-specific structure shall be defined during implementation.

---

# 32. Module Internal Structure

Each major backend module should follow a consistent internal organization.

The structure may be organized as:

```text
module/
├── controller
├── service
├── repository
├── validation
├── routes
├── types
└── tests
```

Additional components may be introduced when required by the module.

The structure shall remain consistent across modules whenever possible.

---

# 33. Shared Components

Shared backend components shall contain functionality used by multiple modules.

They may include:

* common types;
* utilities;
* constants;
* error classes;
* response helpers;
* pagination;
* date utilities;
* validation utilities;
* security utilities.

Shared components shall not become a place for unrelated business logic.

---

# 34. Module Dependencies

Modules shall communicate through clearly defined interfaces.

A module should not directly access another module's internal implementation when this can be avoided.

For example:

```text
Payment Module
      |
      v
Payment Service
      |
      v
Payment Integration
```

rather than:

```text
Controller
      |
      v
External Payment API
```

This separation improves maintainability and testability.

---

# 35. API Security

All protected API endpoints shall require appropriate authentication and authorization.

The backend shall also apply:

* input validation;
* rate limiting where required;
* secure headers;
* controlled error responses;
* request tracing;
* appropriate logging.

Public endpoints shall be explicitly identified.

Protected endpoints shall not be assumed to be secure merely because they are not displayed in the frontend.

---

# 36. Performance Considerations

The backend shall avoid unnecessary:

* database queries;
* repeated external requests;
* large responses;
* synchronous processing of long operations.

Performance-sensitive operations may use:

* pagination;
* indexing;
* caching;
* asynchronous jobs;
* optimized queries.

Performance optimization shall be based on actual requirements and measurements.

---

# 37. Testing Strategy

Each backend module shall be designed for testability.

Tests shall cover:

* business rules;
* services;
* repositories;
* API endpoints;
* authentication;
* authorization;
* workflow transitions;
* external integrations;
* error handling.

Critical business operations shall have dedicated tests.

---

# 38. Maintainability

The backend shall prioritize:

* readable code;
* consistent naming;
* modular organization;
* limited coupling;
* clear interfaces;
* reusable components;
* automated tests;
* technical documentation.

Business logic shall not be unnecessarily duplicated across modules.

---

# 39. Relationship With Other Architecture Documents

This document defines the internal backend structure.

It is related to:

```text
01-general-architecture.md
03-business-modules.md
04-data-flows.md
05-authentication-and-authorization.md
06-external-integrations.md
07-security.md
08-technical-decisions.md
```

The backend architecture shall remain consistent with:

```text
01-scope/
03-database/
```

and with the validated requirements and constraints.
