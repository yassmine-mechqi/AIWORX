# AIWORX — Security

## 1. Purpose

This document defines the security architecture and security requirements of the AIWORX platform.

The objective is to protect:

* user accounts;
* personal data;
* organization data;
* provider information;
* contracts;
* financial information;
* files and documents;
* mission data;
* audit information;
* authentication credentials;
* external service credentials.

Security shall be applied throughout the application lifecycle.

---

# 2. Security Principles

AIWORX security shall be based on the following principles:

* defense in depth;
* least privilege;
* secure by default;
* default deny for protected resources;
* authentication before protected access;
* authorization before protected operations;
* data minimization;
* secure handling of secrets;
* traceability of sensitive actions;
* protection of data in transit and at rest;
* controlled external integrations;
* regular security testing.

---

# 3. Security Architecture

The security architecture shall protect each layer of the platform.

```text
User
  |
  v
Frontend
  |
  v
Secure Communication
  |
  v
API
  |
  +---- Authentication
  |
  +---- Authorization
  |
  +---- Validation
  |
  v
Application Services
  |
  +---- Business Rules
  |
  +---- Security Controls
  |
  v
Database / Storage
  |
  v
External Services
```

Security controls shall not depend exclusively on the frontend.

---

# 4. Authentication Security

Authentication shall protect access to user accounts.

The platform shall support secure authentication mechanisms.

Authentication security shall include:

* secure credential handling;
* secure sessions;
* password protection;
* authentication failure handling;
* account status verification;
* session expiration;
* session revocation;
* credential recovery protection.

---

# 5. Two-Factor Authentication

Two-factor authentication shall be supported for the platform according to the validated authentication architecture.

The general flow is:

```text
User
  |
  v
Primary Authentication
  |
  v
Second Factor
  |
  +---- Valid ----> Authentication Successful
  |
  +---- Invalid --> Authentication Denied
```

The second factor shall not be stored as plaintext sensitive information.

---

# 6. Password Security

Passwords shall never be stored in plaintext.

The system shall use an appropriate password hashing mechanism.

Password security shall include:

* secure hashing;
* appropriate password policy;
* protected password reset;
* session invalidation where required after credential changes;
* protection against brute-force attempts.

---

# 7. Password Reset

Password reset shall use a controlled and time-limited mechanism.

```text
User
  |
  v
Password Reset Request
  |
  v
Verification Mechanism
  |
  v
Temporary Reset Authorization
  |
  v
New Password
  |
  v
Secure Password Hash
  |
  v
Database
```

Reset credentials shall expire after their allowed lifetime.

---

# 8. Session Security

Sessions shall be protected against unauthorized use.

Security controls shall include:

* controlled expiration;
* secure storage;
* revocation;
* protection against session theft;
* invalidation after critical security events where required.

Session information shall not be exposed unnecessarily.

---

# 9. Authorization Security

Authorization shall be enforced server-side.

The backend shall verify:

* authenticated identity;
* role;
* permission;
* organization membership;
* resource ownership;
* resource relationship;
* workflow state;
* business rules.

A frontend restriction shall never be considered sufficient authorization.

---

# 10. Least Privilege

Users and system components shall receive only the permissions required for their responsibilities.

For example:

```text
Client
  -> Client Resources

Provider
  -> Provider Resources

Quality Expert
  -> Quality Resources

Finance Administrator
  -> Financial Resources

Administrator
  -> Administrative Resources
```

Unnecessary access shall not be granted.

---

# 11. Organization Isolation

AIWORX shall prevent unauthorized cross-organization access.

The backend shall verify the organization context before returning or modifying protected data.

```text
User
  |
  v
Organization Context
  |
  v
Resource Organization
  |
  +---- Authorized ----> Continue
  |
  +---- Unauthorized --> Deny + Audit
```

---

# 12. API Security

API endpoints shall be protected according to their access requirements.

Security controls shall include:

* authentication;
* authorization;
* input validation;
* rate limiting;
* secure error handling;
* request size limits;
* controlled file uploads;
* audit of sensitive operations.

---

# 13. Input Validation

All external input shall be validated before processing.

This includes:

* request bodies;
* query parameters;
* route parameters;
* uploaded files;
* webhook payloads;
* external API responses.

Validation shall verify:

* data type;
* format;
* size;
* required fields;
* allowed values;
* business constraints.

---

# 14. Output Protection

API responses shall expose only information that the requesting user is authorized to receive.

Sensitive internal information shall not be returned unnecessarily.

Examples of information that shall not be exposed unnecessarily include:

* passwords;
* authentication secrets;
* internal service credentials;
* private database information;
* unrelated organization data;
* internal security information.

---

# 15. Secure Communication

Communication between clients and backend services shall use secure transport.

Protected communications shall use HTTPS/TLS in environments where the application is deployed over a network.

Sensitive data shall not be transmitted through insecure channels.

---

# 16. Data Encryption

Sensitive data shall be protected during transmission and, where applicable, while stored.

The architecture shall support:

```text
Data in Transit
      |
      v
TLS / HTTPS

Data at Rest
      |
      v
Database / Storage Protection
```

The exact encryption mechanisms shall be finalized during technical implementation.

---

# 17. Database Security

Database access shall be restricted to authorized backend services.

Users shall not directly access the database.

Database security shall include:

* authentication;
* restricted network access;
* least-privilege database credentials;
* secure configuration;
* encrypted connections where applicable;
* backups;
* monitoring;
* controlled migrations.

---

# 18. Database Credentials

Database credentials shall:

* never be committed to Git;
* never be hardcoded in source code;
* never be exposed to frontend applications;
* be stored securely;
* be separated by environment.

---

# 19. Secrets Management

Application and integration secrets shall be managed securely.

Secrets may include:

* database credentials;
* authentication secrets;
* payment provider credentials;
* signature provider credentials;
* storage credentials;
* email provider credentials;
* AI provider credentials;
* webhook secrets.

Secrets shall not be committed to the repository.

---

# 20. Environment Separation

AIWORX shall maintain separate environments for:

```text
Development
Testing / Pre-production
Production
```

Production credentials and data shall not be reused in development environments.

---

# 21. File Security

Uploaded files shall be validated before being accepted.

Security controls may include:

* allowed file types;
* file size limits;
* malware scanning;
* quarantine;
* private storage;
* access authorization;
* secure download;
* retention rules.

The cahier des charges specifically requires infected files to be quarantined, rejected, and associated with an alert.

---

# 22. File Access Control

Private files shall be accessible only to authorized users.

The authorization flow shall be:

```text
File Request
    |
    v
Authentication
    |
    v
Authorization
    |
    v
Associated Resource Check
    |
    +---- Allowed ----> File Access
    |
    +---- Denied -----> Access Denied
```

A public file URL shall not bypass authorization.

---

# 23. Malware Protection

Uploaded files shall be checked according to the final infrastructure and security implementation.

If a file is identified as infected:

```text
Upload
  |
  v
Security Scan
  |
  v
Malware Detected
  |
  +---- Quarantine
  |
  +---- Reject Upload
  |
  +---- Generate Alert
```

The infected file shall not become available as a normal application resource.

---

# 24. Rate Limiting

Sensitive endpoints shall be protected against excessive requests.

Rate limiting shall be considered for:

* login;
* password reset;
* registration;
* verification;
* public forms;
* messaging;
* API endpoints;
* webhook endpoints where applicable.

Rate-limit thresholds shall be configured according to the final infrastructure.

---

# 25. Brute-Force Protection

Authentication endpoints shall be protected against repeated malicious attempts.

Controls may include:

* rate limiting;
* temporary blocking;
* progressive delays;
* security monitoring;
* additional authentication requirements.

---

# 26. Webhook Security

Webhook endpoints shall validate external events before processing them.

Validation may include:

* signature verification;
* secret verification;
* timestamp verification;
* event identifier;
* payload validation;
* idempotency.

Invalid webhook requests shall not modify business data.

---

# 27. Idempotency Security

State-changing operations shall be protected against duplicate execution where required.

Examples include:

* payments;
* payment webhooks;
* signature callbacks;
* other asynchronous events.

The platform shall prevent duplicate financial transactions.

The cahier des charges explicitly requires a double-click payment to produce only one transaction through idempotency.

---

# 28. Audit Logging

Important and sensitive actions shall be auditable.

Audit events may include:

* authentication;
* authorization failures;
* role changes;
* permission changes;
* financial operations;
* contract changes;
* dispute actions;
* administrative actions;
* sensitive data access;
* workflow state changes.

---

# 29. Audit Data

An audit event should contain sufficient information to identify:

```text
Actor
Action
Resource
Timestamp
Result
Context
```

Audit records shall be protected against unauthorized modification.

---

# 30. Security Logging

Security-related logs may include:

* failed login attempts;
* successful login;
* unauthorized access attempts;
* suspicious activity;
* rate-limit violations;
* invalid webhooks;
* external integration failures;
* security alerts.

Sensitive secrets shall never be included in logs.

---

# 31. Error Handling

Errors shall not expose sensitive implementation information.

API responses shall use controlled error messages.

The system shall avoid exposing:

* stack traces;
* database credentials;
* internal file paths;
* internal service secrets;
* SQL queries;
* authentication information.

Detailed technical information may be recorded securely in internal logs.

---

# 32. Security Headers

The web application and API infrastructure shall apply appropriate security headers according to the deployment architecture.

The final configuration shall be validated before production.

---

# 33. CORS

Cross-origin access shall be explicitly configured.

The backend shall not allow unrestricted origins without a documented reason.

Allowed origins shall be defined per environment.

---

# 34. CSRF Protection

Where cookie-based authentication is used, the application shall implement appropriate CSRF protection.

The exact mechanism shall depend on the final authentication architecture.

---

# 35. SQL Injection Protection

Database operations shall use parameterized queries or an ORM/data-access mechanism that safely handles parameters.

User-provided input shall never be concatenated directly into SQL statements.

---

# 36. XSS Protection

User-generated content shall be handled safely.

The application shall:

* validate input;
* escape output where appropriate;
* sanitize content where required;
* avoid unsafe HTML rendering.

This is particularly important for:

* messages;
* comments;
* profile information;
* descriptions;
* uploaded document metadata.

---

# 37. Security of External Integrations

External integrations shall follow the same security principles as internal services.

External credentials shall be protected.

External responses shall be validated.

External failures shall not bypass internal authorization.

---

# 38. Personal Data Protection

AIWORX shall take into account the Moroccan legal framework applicable to personal data, including Law No. 09-08 and applicable CNDP formalities.

The platform shall define for relevant processing activities:

* purpose;
* legal basis;
* retention period;
* recipients;
* access rules;
* applicable user rights.

---

# 39. Personal Data Categories

The architecture shall consider protection of data such as:

* identity information;
* organization information;
* legal documents;
* payment-related information;
* contracts;
* conversations;
* files;
* deliverables;
* evaluations;
* disputes.

These categories are identified in the project requirements.

---

# 40. Data Minimization

AIWORX shall only collect and process data required for the intended functionality.

The system shall avoid unnecessary collection of personal information.

External services shall receive only the data required for their operation.

---

# 41. Data Access

Access to personal data shall be controlled according to:

* user identity;
* role;
* organization;
* resource relationship;
* business purpose;
* authorization.

Users shall not automatically receive access to all data stored by the platform.

---

# 42. Data Retention

Data retention periods shall be defined for relevant data categories.

The retention policy shall consider:

* legal requirements;
* contractual requirements;
* business requirements;
* security requirements.

Undefined retention periods shall remain open questions until validated.

---

# 43. User Rights

The platform shall support the applicable mechanisms for personal-data rights, including where applicable:

* access;
* rectification;
* opposition;
* deletion.

The exact operational process shall be defined according to the applicable legal and organizational requirements.

---

# 44. Data Transfers

Transfers or hosting outside Morocco shall be identified and validated before activation.

External hosting or service providers shall therefore be evaluated before production use.

---

# 45. Privacy and Legal Documents

The platform shall support the implementation of the required legal and privacy documentation, including where applicable:

* privacy policy;
* cookies policy;
* terms and conditions;
* service or sales conditions;
* contractual documents;
* complaint and mediation procedures.

---

# 46. Security of Organizations

Organization data shall be isolated according to the authorization architecture.

A user removed from an organization shall no longer have access to resources requiring that membership.

Existing historical information shall remain preserved according to retention rules.

---

# 47. User Removal Security

When a user is removed from an organization, the system shall:

```text
User Removed
     |
     +---- Revoke Relevant Sessions
     |
     +---- Remove Organization Access
     |
     +---- Preserve Required History
     |
     +---- Reassign Required Tasks
     |
     +---- Audit Event
```

This behavior is explicitly identified as an edge case in the project requirements.

---

# 48. Provider Suspension Security

When a provider is suspended:

```text
Provider Suspended
      |
      +---- Prevent New Offers
      |
      +---- Review Active Missions
      |
      +---- Restrict Relevant Access
      |
      +---- Audit Event
```

Active missions shall be reviewed according to the applicable business rules.

---

# 49. Security of Financial Operations

Financial operations shall receive additional protection.

Controls shall include:

* authorization;
* idempotency;
* auditability;
* external transaction verification;
* controlled state transitions;
* restricted access to financial information.

---

# 50. Security of Contracts

Contract operations shall be protected through:

* authorization;
* versioning;
* controlled access;
* signature verification;
* auditability;
* document protection.

Contract modifications shall preserve relevant history.

---

# 51. Security of Messages

Messaging functionality shall be protected against:

* unauthorized access;
* unauthorized participants;
* malicious content;
* abuse;
* sensitive information leakage.

Anti-circumvention controls shall be applied according to the validated business requirements.

The cahier des charges identifies the need to detect and block attempts to exchange contact information for bypassing the platform.

---

# 52. Security Monitoring

Infrastructure and application monitoring shall detect:

* application errors;
* availability problems;
* unusual authentication failures;
* suspicious access attempts;
* external service failures;
* resource problems;
* important security events.

---

# 53. Backups

Critical data shall be backed up automatically according to the defined backup policy.

Backup scope shall include the data required to restore the platform.

Backups shall be protected against unauthorized access.

---

# 54. Backup Restoration Testing

Backup restoration shall be tested periodically.

A backup shall not be considered reliable only because it was successfully created.

The restoration process shall verify that:

```text
Backup
  |
  v
Restore
  |
  v
Data Integrity
  |
  v
Application Usability
```

---

# 55. Security Testing

Security testing shall be performed before production release.

Testing shall cover:

* authentication;
* authorization;
* access isolation;
* API security;
* file security;
* external integrations;
* input validation;
* sensitive operations;
* common application vulnerabilities.

---

# 56. Vulnerability Management

Identified vulnerabilities shall be classified according to their severity.

Critical vulnerabilities shall be corrected before production release.

Dependencies shall be monitored for known security vulnerabilities.

---

# 57. Dependency Security

Third-party dependencies shall be controlled.

The project shall:

* use trusted dependencies;
* keep dependencies maintained;
* monitor vulnerabilities;
* remove unnecessary dependencies;
* review important dependency updates.

---

# 58. Source Code Security

The source repository shall not contain:

* passwords;
* API keys;
* production credentials;
* private certificates;
* payment secrets;
* webhook secrets.

Sensitive configuration shall be externalized.

---

# 59. Git Security

Before committing code, developers shall verify that sensitive files are excluded.

Examples include:

```text
.env
.env.*
credentials files
private keys
production configuration
temporary secrets
```

The repository shall use an appropriate `.gitignore`.

---

# 60. Production Security

Before production deployment, the team shall verify:

* authentication;
* authorization;
* HTTPS;
* secrets;
* environment configuration;
* database security;
* file storage;
* backups;
* monitoring;
* logging;
* rate limiting;
* security headers;
* external integrations;
* vulnerability status.

---

# 61. Security Incident Handling

Security incidents shall be handled through a controlled process.

```text
Security Event
      |
      v
Detection
      |
      v
Investigation
      |
      v
Containment
      |
      v
Correction
      |
      v
Recovery
      |
      v
Audit / Documentation
```

The detailed incident-response procedure shall be defined separately if required.

---

# 62. Security and Availability

Security controls shall not unnecessarily prevent recovery or availability.

When an external security dependency fails, the application shall enter a controlled state rather than incorrectly confirming a sensitive operation.

---

# 63. Security and Performance

Security mechanisms shall be implemented without creating unnecessary performance bottlenecks.

However, security shall not be removed solely to improve performance.

---

# 64. Security Responsibilities

Security responsibilities shall be distributed across the system.

```text
Frontend
  -> Secure presentation

Backend
  -> Authentication
  -> Authorization
  -> Validation
  -> Business security

Database
  -> Data protection

Infrastructure
  -> Network / runtime security

External Integrations
  -> Secure communication and credentials

Operations
  -> Monitoring / backup / incident response
```

---

# 65. Security Acceptance Criteria

The security architecture shall be considered ready for production only when the required controls have been implemented and tested.

At minimum, the project shall verify:

* authenticated access;
* role-based authorization;
* organization isolation;
* protected files;
* secure secrets;
* HTTPS;
* audit of sensitive actions;
* rate limiting;
* secure password handling;
* external webhook validation;
* payment idempotency;
* backups;
* restoration testing;
* security testing.

---

# 66. Relationship With Other Architecture Documents

This document is related to:

```text
01-general-architecture.md
02-backend-architecture.md
03-business-modules.md
04-data-flows.md
05-authentication-and-authorization.md
06-external-integrations.md
08-technical-decisions.md
```

It shall remain consistent with:

```text
01-scope/
03-database/
```

and with the validated requirements, constraints, workflows, and business rules.
