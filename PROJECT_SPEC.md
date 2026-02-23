# PROJECT SPEC

Project: `Sales Record`

Purpose: 

This document is the **source of truth** for product behavior, architecture decisions, and key technical choices.  
All implementation work must follow `GUIDELINES.md` which is located at the root of the project.
At the start of every task and before proceeding to the next step in the PLAN, Junie must re-load PROJECT_SPEC.md and GUIDELINES.md from disk, state what the next step is, and ask the User for permission to proceed.
All behavior mentioned below are to be incrementally implemented will be broken down into smaller tasks defined in `tasks.md` and worked on one at a time.

Record voice and provide a transcript

# Brainstorming

## F.0 Walking Skeleton
- F.0.0 Hello World is runnable [COMPLETED]
- F.0.1 If the repo has not been initialized and pushed to github, push it to the remote using the github CLI
- F.0.2 Deploy the app to ECS (Elastic Container Registry) via Github Actions

---

## 1. Scope and Outcomes

---

## 2. Repo Layout and Boundaries

### 2.1 Code Roots
- Client (frontend) root: `src/client/`
- Service (backend) root: `src/service/`

### 2.2 Data Storage
- All persisted data must be stored in local JSON files under `src/db/`.
- Generated SVG artifacts may be stored on disk; any file paths or metadata are recorded in JSON under `src/db/`.

---

## 3. Product Requirements

### 3.1 Feature Requirements (FR.*)

---

## 4. Technical Requirements (TR.*)

### 4.1 Engineering Process
- Always follow the coding style and rules in `GUIDELINES.md`.
- Work in a TDD workflow when user opts in as specified by `GUIDELINES.md`.
- Before starting or resuming work after any prompt, re-read `GUIDELINES.md`.
- Before starting or resuming work after any prompt, provide the next behavior PLAN as specified by `GUIDELINES.md`.

### 4.2 Project Bootstrap
- Initial project boilerplate must be copied from: `~/zevia/code/ai/react-app-boilerplate`
- The new folder name must be: 

### 4.3 UI Components / Styling
- Always use `shadcn/ui` components when third-party UI components are needed.

### 4.4 React Architecture
- Separate application logic from React views.
- Views must be humble and ignorant of implementation details:
    - Handler, fetch, and other logic must live in hooks.
    - Hooks call repositories/services via injected dependencies. Therefore there will be two layers below hooks:
      - Repositories which make API calls and return data.
      - Business which is any app agnostic business logic that hooks need in order to orchestrate the model's use cases.

### 4.5 Testing
- Use Jest, React Testing Library, and React Hook Testing Library as appropriate.
- Backend / Server code will use Jest as its testing framework
- Tests are written first (TDD), one at a time, per `GUIDELINES.md`.
- Test naming and variables must use domain language. Do not use technical terms like "mock". Use domain terms for test data and "fake" for stubs (e.g., `fakeRepository` instead of `mockRepository`). Do not use `jest.fn()` for stubs; use simple functions.
- Do not test for loading state in hook tests.
- Treat the System Under Test (SUT) as a black box. Avoid using spies or asserting that internal dependencies were called when the output itself can be asserted.
- UI tests must use `data-testid` instead of finding elements by text (e.g., `getByText`, `findByText`). Data test IDs must represent domain concepts (e.g., `data-testid="font-selection"`).
- Commit messages for TDD steps must follow the format: `feat: <feature-id>: Step <number>: <step-name>`.
- Function placement: Always put functions being called from the parent, below the parent.

### 4.6 Data / JSON DB
Store all data in local JSON files under `src/db/`.

Minimum required:
- `src/db/<something>.json` stores font metadata used by the app (name, IDs, metadata needed by the system).

### 4.7 LLM Requests (TOON)
Whenever sending API calls to LLM Models, ensure that any request this app sends is converted first using TOON format notation:
- https://github.com/toon-format/toon

---

## 5. UI Specification

### 5.1 Primary Screen

---

## 6. Backend / Service Architecture

### 6.1 Onion Architecture Layers (required)
The service code must follow this strict layering:

**Controller → Command → Business Logic -> Repository → Data Layer**

Rules:
- Controllers are pass-through adapters only (delivery mechanism boundary).
- Commands represent user commands/use-cases and orchestrate the use-case.
- Business logic is pure and domain agnostic.
- Repositories orchestrate access to data sources and provide stable domain-oriented interfaces.
- Data layer performs IO (HTTP, filesystem, DB drivers, SDK wrappers) and is injected into repositories.

### 6.2 Controller Layer (Pass-through)
Controllers must:
- Accept delivery mechanism input (HTTP request, queue message, etc.)
- Translate it into a pure request Data JS Object (no framework types)
- Call the command with the request Data JS Object
- Translate the response Data JS Object back into a delivery mechanism response

Controllers must not:
- Contain business decisions
- Perform domain orchestration
- Touch persistence directly

### 6.3 Command Layer (Use-cases)
Commands must:
- Represent a single user use-case
- Accept request DTOs that have been stripped of delivery concerns
- Use injected pure business logic and injected repositories/services to execute the use-case
- Produce a response Data JS Object

Commands must not:
- Depend on HTTP/framework types (Express/Fastify req/res, headers, etc.)
- Construct their dependencies internally

### 6.4 Request/Response DTOs
- Request and response objects passed between layers must be plain data (serializable, delivery-agnostic).
- No framework objects, no HTTP types, no SDK types inside DTOs.

---

## 7. Data Model (Initial)

---

## 8. Technology Plan (Bird’s-eye)

### 8.1 Client (src/client)
- React + TypeScript
- shadcn/ui components:
    - Combobox/dropdown for fonts
    - Inputs for text
    - Cards/tiles
 
### 8.2 Service (src/service)


---

## 9. Open Questions / Risk Areas


---
