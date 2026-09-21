# AIWORX — Business Modules

## 1. Purpose

This document defines the main business modules of the AIWORX platform.

Each module represents a coherent business domain with clearly defined responsibilities.

The objective is to:

* separate business responsibilities;
* reduce coupling between modules;
* define module boundaries;
* identify the main entities handled by each module;
* define interactions between modules;
* provide a reference for backend implementation.

---

# 2. Module Architecture

The AIWORX backend shall be organized into independent but coordinated business modules.

The main modules are:

```text
Business Modules
│
├── Identity and Access
├── Users and Organizations
├── Providers
├── Needs
├── Matching
├── Invitations
├── Offers and Negotiation
├── Contracts
├── Payments
├── Missions
├── Quality
├── Disputes
├── Evaluations
├── Notifications
├── Files and Documents
├── Audit
└── Administration
```

Each module shall have a defined responsibility and shall avoid implementing responsibilities belonging to another module.

---

# 3. Identity and Access Module

## 3.1 Purpose

The Identity and Access Module manages user authentication and access control.

## 3.2 Responsibilities

The module is responsible for:

* user registration;
* authentication;
* password management;
* session management;
* authentication credentials;
* roles;
* permissions;
* access control;
* account status.

## 3.3 Main Data

The module works with:

* users;
* credentials;
* sessions;
* roles;
* permissions;
* role assignments.

## 3.4 Main Interactions

The module interacts with:

* Users and Organizations;
* Administration;
* Audit;
* Notifications.

---

# 4. Users and Organizations Module

## 4.1 Purpose

This module manages platform users and organizations.

## 4.2 Responsibilities

It manages:

* user profiles;
* organization profiles;
* organization membership;
* organization roles;
* organization status;
* user-to-organization relationships.

## 4.3 Main Data

The module works with:

* users;
* organizations;
* memberships;
* organization roles;
* profiles.

## 4.4 Main Interactions

The module interacts with:

* Identity and Access;
* Providers;
* Needs;
* Contracts;
* Missions;
* Administration;
* Audit.

---

# 5. Providers Module

## 5.1 Purpose

The Providers Module manages service providers participating in the AIWORX platform.

## 5.2 Responsibilities

It manages:

* provider profiles;
* provider categories;
* qualifications;
* verification;
* provider status;
* availability;
* provider information.

## 5.3 Main Data

The module works with:

* provider profiles;
* categories;
* qualifications;
* verification records;
* availability information.

## 5.4 Main Interactions

The module interacts with:

* Users and Organizations;
* Needs;
* Matching;
* Invitations;
* Offers;
* Missions;
* Evaluations;
* Administration.

---

# 6. Needs Module

## 6.1 Purpose

The Needs Module manages the service requirements submitted through the platform.

## 6.2 Responsibilities

It manages:

* need creation;
* need qualification;
* need specifications;
* specification versions;
* need status;
* need lifecycle;
* required criteria.

## 6.3 Main Data

The module works with:

* needs;
* specifications;
* specification versions;
* requirements;
* criteria;
* need statuses.

## 6.4 Main Interactions

The module interacts with:

* Users and Organizations;
* Matching;
* Invitations;
* Offers;
* Contracts;
* Missions;
* Files;
* Audit.

---

# 7. Matching Module

## 7.1 Purpose

The Matching Module identifies providers that may correspond to a specific need.

## 7.2 Responsibilities

It manages:

* matching criteria;
* provider matching;
* matching results;
* matching status;
* matching decisions;
* AI-assisted matching where validated.

## 7.3 Main Data

The module works with:

* needs;
* providers;
* matching criteria;
* matching results;
* matching scores where defined;
* matching decisions.

## 7.4 Main Interactions

The module interacts with:

* Needs;
* Providers;
* Invitations;
* AI integrations;
* Audit.

---

# 8. Invitations Module

## 8.1 Purpose

The Invitations Module manages invitations sent to providers for a specific need.

## 8.2 Responsibilities

It manages:

* invitation creation;
* invitation sending;
* invitation status;
* invitation expiration;
* provider response;
* invitation history.

## 8.3 Main Data

The module works with:

* invitations;
* providers;
* needs;
* invitation statuses;
* invitation timestamps.

## 8.4 Main Interactions

The module interacts with:

* Matching;
* Providers;
* Needs;
* Offers;
* Notifications;
* Audit.

---

# 9. Offers and Negotiation Module

## 9.1 Purpose

The Offers and Negotiation Module manages provider offers and negotiation processes.

## 9.2 Responsibilities

It manages:

* offer creation;
* offer submission;
* offer versions;
* offer modification;
* negotiation;
* acceptance;
* rejection;
* expiration.

## 9.3 Main Data

The module works with:

* offers;
* offer versions;
* prices;
* conditions;
* negotiation information;
* offer statuses.

## 9.4 Main Interactions

The module interacts with:

* Providers;
* Needs;
* Invitations;
* Contracts;
* Notifications;
* Audit.

---

# 10. Contracts Module

## 10.1 Purpose

The Contracts Module manages contractual relationships resulting from accepted offers.

## 10.2 Responsibilities

It manages:

* contract creation;
* contract versions;
* contract parties;
* contract terms;
* contract status;
* signature workflow;
* contract documents.

## 10.3 Main Data

The module works with:

* contracts;
* contract versions;
* contract parties;
* contract documents;
* signature information;
* contract statuses.

## 10.4 Main Interactions

The module interacts with:

* Offers;
* Users and Organizations;
* Payments;
* Missions;
* Files and Documents;
* Electronic Signature Integration;
* Audit.

---

# 11. Payments Module

## 11.1 Purpose

The Payments Module manages payment-related operations.

## 11.2 Responsibilities

It manages:

* payment requests;
* payment initiation;
* payment status;
* external transaction identifiers;
* payment confirmation;
* payment failures;
* refunds where applicable;
* payment webhooks;
* transaction traceability.

## 11.3 Main Data

The module works with:

* payments;
* transactions;
* external payment references;
* payment statuses;
* refund records where applicable.

## 11.4 Main Interactions

The module interacts with:

* Contracts;
* Missions;
* External Payment Provider;
* Notifications;
* Audit.

---

# 12. Missions Module

## 12.1 Purpose

The Missions Module manages the execution of an accepted contractual service.

## 12.2 Responsibilities

It manages:

* mission creation;
* mission status;
* execution tracking;
* milestones;
* deliverables;
* deadlines;
* mission progression.

## 12.3 Main Data

The module works with:

* missions;
* milestones;
* deliverables;
* deadlines;
* mission statuses.

## 12.4 Main Interactions

The module interacts with:

* Contracts;
* Payments;
* Providers;
* Users and Organizations;
* Quality;
* Disputes;
* Evaluations;
* Notifications;
* Audit.

---

# 13. Quality Module

## 13.1 Purpose

The Quality Module manages the validation of delivered work.

## 13.2 Responsibilities

It manages:

* quality criteria;
* quality controls;
* quality validation;
* correction requests;
* quality status;
* validation history.

## 13.3 Main Data

The module works with:

* quality criteria;
* quality controls;
* validation records;
* correction requests;
* quality statuses.

## 13.4 Main Interactions

The module interacts with:

* Missions;
* Deliverables;
* Providers;
* Disputes;
* Notifications;
* Audit.

---

# 14. Disputes Module

## 14.1 Purpose

The Disputes Module manages conflicts between parties.

## 14.2 Responsibilities

It manages:

* dispute creation;
* dispute status;
* dispute reasons;
* evidence;
* investigation;
* resolution;
* penalties where applicable.

## 14.3 Main Data

The module works with:

* disputes;
* dispute parties;
* evidence;
* dispute statuses;
* resolutions;
* penalties.

## 14.4 Main Interactions

The module interacts with:

* Missions;
* Contracts;
* Payments;
* Quality;
* Users and Organizations;
* Administration;
* Files;
* Notifications;
* Audit.

---

# 15. Evaluations Module

## 15.1 Purpose

The Evaluations Module manages evaluations following completed or relevant platform interactions.

## 15.2 Responsibilities

It manages:

* evaluations;
* ratings;
* written feedback;
* evaluation status;
* evaluation history.

## 15.3 Main Data

The module works with:

* evaluations;
* ratings;
* comments;
* evaluation relationships;
* evaluation statuses.

## 15.4 Main Interactions

The module interacts with:

* Missions;
* Providers;
* Users and Organizations;
* Administration;
* Audit.

---

# 16. Notifications Module

## 16.1 Purpose

The Notifications Module manages communication of important platform events to users.

## 16.2 Responsibilities

It manages:

* notification creation;
* notification delivery;
* notification status;
* notification preferences;
* delivery failures;
* retries.

## 16.3 Main Data

The module works with:

* notifications;
* notification types;
* notification preferences;
* delivery records.

## 16.4 Main Interactions

The module interacts with:

* Users and Organizations;
* Invitations;
* Offers;
* Contracts;
* Payments;
* Missions;
* Quality;
* Disputes.

---

# 17. Files and Documents Module

## 17.1 Purpose

The Files and Documents Module manages files associated with platform entities.

## 17.2 Responsibilities

It manages:

* file upload;
* file metadata;
* document association;
* storage references;
* file access;
* file validation;
* file lifecycle;
* deletion.

## 17.3 Main Data

The module works with:

* files;
* documents;
* storage references;
* file metadata;
* access information.

## 17.4 Main Interactions

The module interacts with:

* Users and Organizations;
* Providers;
* Needs;
* Contracts;
* Missions;
* Quality;
* Disputes;
* External File Storage.

---

# 18. Audit Module

## 18.1 Purpose

The Audit Module provides traceability for important platform operations.

## 18.2 Responsibilities

It manages:

* audit event creation;
* actor identification;
* resource identification;
* timestamps;
* action tracking;
* important state changes.

## 18.3 Main Data

The module works with:

* audit events;
* actors;
* actions;
* resources;
* timestamps;
* event metadata.

## 18.4 Main Interactions

The Audit Module may receive events from all major business modules.

It interacts with:

* Identity and Access;
* Users and Organizations;
* Providers;
* Needs;
* Offers;
* Contracts;
* Payments;
* Missions;
* Quality;
* Disputes;
* Administration.

---

# 19. Administration Module

## 19.1 Purpose

The Administration Module provides authorized administrative functions for operating the AIWORX platform.

## 19.2 Responsibilities

It manages:

* user administration;
* organization administration;
* provider verification;
* platform configuration;
* dispute administration;
* operational monitoring;
* access to administrative information.

## 19.3 Main Data

The module accesses data from multiple business modules according to administrative permissions.

## 19.4 Main Interactions

The Administration Module interacts with:

* Identity and Access;
* Users and Organizations;
* Providers;
* Needs;
* Contracts;
* Payments;
* Missions;
* Quality;
* Disputes;
* Evaluations;
* Audit.

---

# 20. Module Dependency Overview

The main business dependencies can be represented as follows:

```text
Identity and Access
        |
        v
Users and Organizations
        |
        +------------------+
        |                  |
        v                  v
   Providers           Needs
        |                  |
        +--------+---------+
                 |
                 v
             Matching
                 |
                 v
            Invitations
                 |
                 v
       Offers and Negotiation
                 |
                 v
             Contracts
                 |
          +------+------+
          |             |
          v             v
      Payments       Missions
                        |
              +---------+---------+
              |         |         |
              v         v         v
           Quality   Disputes  Evaluations
```

Notifications, Files, Audit, and Administration provide supporting capabilities across multiple modules.

---

# 21. Module Communication Rules

Business modules shall communicate through defined application interfaces.

A module should not directly modify another module's internal data.

For example:

```text
Module A
   |
   v
Module A Service
   |
   v
Defined Interface
   |
   v
Module B Service
```

Direct access to another module's internal repository should be avoided unless explicitly justified.

---

# 22. Module Ownership of Data

Each business module shall be responsible for the business data belonging to its domain.

Examples:

```text
Identity and Access
    -> authentication and access data

Providers
    -> provider qualification data

Needs
    -> need and specification data

Offers
    -> offer and negotiation data

Contracts
    -> contract data

Payments
    -> payment data

Missions
    -> mission execution data

Quality
    -> quality validation data

Disputes
    -> dispute data

Evaluations
    -> evaluation data
```

Shared references between modules shall use stable identifiers and controlled interfaces.

---

# 23. Cross-Module Operations

Some business operations involve multiple modules.

For example, contract creation may involve:

```text
Offer
   |
   v
Contract
   |
   +---- Payment
   |
   +---- Mission
   |
   +---- Notification
   |
   +---- Audit
```

The application layer shall coordinate these operations.

No individual module should be responsible for the entire workflow of another module.

---

# 24. Module State Management

Modules responsible for workflows shall define explicit states.

Examples include:

```text
Need
    -> Draft
    -> Qualified
    -> Open
    -> Matched
    -> Closed
```

```text
Offer
    -> Draft
    -> Submitted
    -> Negotiating
    -> Accepted
    -> Rejected
    -> Expired
```

```text
Mission
    -> Planned
    -> In Progress
    -> Submitted
    -> Under Review
    -> Completed
    -> Disputed
```

The final list of states and transitions shall follow the validated business rules.

---

# 25. Module Security

Each module shall enforce the permissions relevant to its resources.

Security shall be applied at:

* API level;
* service level;
* resource level;
* database access level where required.

A successful authentication shall not automatically grant access to all modules or resources.

---

# 26. Module Testing

Each module shall have tests covering its main business behavior.

Testing should include:

* valid operations;
* invalid operations;
* authorization;
* business rules;
* state transitions;
* data validation;
* database interactions;
* external service interactions where applicable.

Critical cross-module workflows shall also have integration tests.

---

# 27. Module Extensibility

The module architecture shall allow additional functionality to be introduced without modifying unrelated modules unnecessarily.

New functionality should:

* belong to an existing module when appropriate;
* create a new module when it represents a distinct business domain;
* expose clear interfaces;
* preserve existing business rules;
* include appropriate tests.

---

# 28. Module Boundaries

The following boundaries shall be maintained:

* authentication logic belongs to Identity and Access;
* provider qualification belongs to Providers;
* need lifecycle belongs to Needs;
* matching logic belongs to Matching;
* negotiation logic belongs to Offers and Negotiation;
* contractual logic belongs to Contracts;
* payment processing belongs to Payments;
* execution tracking belongs to Missions;
* quality validation belongs to Quality;
* conflict resolution belongs to Disputes;
* evaluation management belongs to Evaluations.

This separation prevents uncontrolled coupling between business domains.

---

# 29. Relationship With Other Architecture Documents

This document is based on the general architecture defined in:

```text
01-general-architecture.md
```

It provides the foundation for:

```text
02-backend-architecture.md
04-data-flows.md
05-authentication-and-authorization.md
06-external-integrations.md
07-security.md
08-technical-decisions.md
```

The module structure shall remain consistent with the requirements, workflows, constraints, and database architecture.
