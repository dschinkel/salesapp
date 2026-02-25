# 1. Core Project Documentation

Treat the following files as the authoritative sources for project state and behavior:

## 1.1 Execution Guidance — `@AGENTS.md`
Execution contract for autonomous agents and AI tooling. Defines:

- Architecture boundaries (granular patterns defined in `@GUIDELINES.md`)
- Workflows
- Allowed actions
- Testing expectations
- Review gates
- Safety constraints
- Decision-making rules

## 1.2 Source of Truth for Feature Driven Development — `@PROJECT_SPEC.md`
Consult first to understand:
- Feature requirements
- Technical stack
- Design goals

## 1.3 Behavioral & Style Manual — `@GUIDELINES.md`
Mandatory compliance with:
- Coding standards
- Architectural patterns
- Naming conventions
- TDD doctrine
- XP principles

Always consult before implementing or refactoring.

## 1.4 Mandatory Progress Log — `@tasks.md`
Ledger for all work.

Rules:
- Identify relevant Task ID before beginning work.
- Upon completing a piece of behavior, update this file immediately with a status change and brief summary.


# 2. Project Setup & Bootstrapping

Before performing any feature work or refactoring, ensure the project environment is initialized.

## 2.1 Initialization Check
If the project root lacks standard scaffolding (e.g., missing `src/` or `tailwind.config.js`):

Action:
- Execute `../react-app-boilerplate/init.sh`

Goal:
- Establish baseline scaffolding
- Run `yarn`
- Push the repository to GitHub as a new private repository (using the GitHub CLI)

Constraints:
- Use a "Safe Merge" strategy (`rsync -au`) to preserve existing newer files in the destination

Verification:
- `node_modules/` exists
- A new remote origin is linked via the GitHub CLI (`gh`)


# 3. Repository Layout & Boundaries

## 3.1 Project Bootstrap Source
Initial project boilerplate must be copied from:
`~/zevia/code/ai/react-app-boilerplate`

## 3.2 Code Roots
- Client (frontend) root: `src/client/`
- Service (backend) root: `src/service/`

## 3.3 Data Storage
- All persisted data must be stored in local JSON files under `src/db/`
- Generated SVG artifacts may be stored on disk
- Any file paths or metadata must be recorded in JSON under `src/db/`

Minimum required:
- `src/db/<something>.json` stores font metadata used by the app (name, IDs, metadata needed by the system)


# 4. Engineering Process

## 4.1 Standards Enforcement
- Always follow the coding style and rules in `GUIDELINES.md`
- Re-read `GUIDELINES.md` before starting or resuming work
- Provide the next behavior PLAN before implementation, as specified by `GUIDELINES.md`

## 4.2 TDD Workflow
- Work in a TDD workflow when the user opts in, as specified by `GUIDELINES.md`
- Tests are written first, one behavior at a time


# 5. UI Components / Styling

## 5.1 UI Library Constraint
- Always use `shadcn/ui` components when third-party UI components are needed


# 6. Architecture

## 6.1 React Architecture

### 6.1.1 Separation of Concerns
- Separate application logic from React views
- Views must be humble and ignorant of implementation details

Rules:
- Handler, fetch, and other logic must live in hooks or layers below the view
- Hooks call repositories/services/business logic via injected dependencies

Below hooks must exist two layers:

- Repositories  
  Make API calls and return data

- Business  
  App-agnostic business logic that hooks use to orchestrate use cases


## 6.2 Backend / Service Architecture

### 6.2.1 Onion Architecture Layers (Required)
The service code must follow strict layering:

Controller → Command → Business Logic → Repository → Data Layer

Rules:
- Controllers are pass-through adapters only
- Commands represent use-cases and orchestrate them
- Business logic is pure and domain agnostic
- Repositories provide stable domain-oriented interfaces
- Data layer performs IO (HTTP, filesystem, DB drivers, SDK wrappers)

### 6.2.2 Controller Layer (Pass-through)
Controllers must:
- Accept delivery mechanism input (HTTP request, queue message, etc.)
- Translate it into a pure request data object (no framework types)
- Call the command with the request data object
- Translate the response data object back into a delivery mechanism response

Controllers must not:
- Contain business decisions
- Perform domain orchestration
- Touch persistence directly

### 6.2.3 Command Layer (Use-cases)
Commands must:
- Represent a single user use-case
- Accept request DTOs stripped of delivery concerns
- Use injected business logic and repositories/services
- Produce a response data object

Commands must not:
- Depend on HTTP/framework types
- Construct dependencies internally

### 6.2.4 Request / Response DTOs
- Must be plain serializable data
- Delivery-agnostic
- No framework, HTTP, or SDK types


# 7. Data Model (Initial)

## 8 Client (src/client)
- React + TypeScript
- shadcn/ui components:
  - Combobox / dropdown for fonts
  - Inputs for text
  - Cards / tiles

## 9 Service (src/service)


# 10. Testing

## 10.1 Frameworks
- Jest
- React Testing Library
- React Hook Testing Library
- Backend uses Jest

## 10.2 TDD Enforcement
- Tests written first (TDD), one at a time, per `GUIDELINES.md`

## 10.3 Test Language Rules
- Use domain language
- Do not use "mock"
- Use `fakeX` for stubs
- Do not use `jest.fn()`

## 10.4 Structural Testing Rules
- Do not test loading state in hook tests
- Treat SUT as black box
- Avoid spies when output can be asserted

## 10.5 Outside-in TDD from UI
- TDD outside-in starting at the React hook layer unless told otherwise

## 10.6 UI Test Rules
- Use `data-testid`
- Do not use `getByText` / `findByText`
- Test IDs represent domain concepts

## 10.7 TDD Commit Format
`feat: <feature-id>: Step <number>: <step-name>`

## 10.8 Function Placement Rule
Functions called from a parent must be placed below the parent.

## 10.9 Coverage Requirements
- All new code must have branch coverage
- Tests should be concise (≤ 5 lines preferred)
- Test uniqueness must be obvious at a glance


# 11. LLM Requests (TOON)

Whenever sending API calls to LLM models:

- Requests must be converted using TOON format notation first

Reference:
https://github.com/toon-format/toon


# 12. Git & Remote Automation

## 12.1 Repository Setup
- If the local repo is not linked to GitHub:
  - Create a new private remote repository named after the current directory
  - Perform the initial push

## 12.2 Package Management
- Always use `yarn`
- If `package.json` changes, run `yarn install` immediately

## 12.3 Auto-Sync
After completing any task in `tasks.md`:
- Verify clean working state
- Push the current branch to GitHub


# 13. Agent Behavioral Rules (Self-Review)

Before finalizing any task:

1. Guideline Compliance — code follows `GUIDELINES.md`
2. Spec Alignment — implementation fulfills `PROJECT_SPEC.md`
3. No Regressions — existing logic remains intact
4. Documentation Sync — `tasks.md` updated
5. Clean Up — remove logs, TODOs, unused imports


# 14. Junie Brave / Fully Autonomous Mode Only

## 14.1 Auto-Commit
After completing any behavior that modifies files:
- Perform a local commit
- Message must reference the Task ID
- Message must be descriptive

## 14.2 Auto-Push
If the session is successful and basic checks pass:
- Push the current branch to the remote origin


# 15. Extreme Programming (XP)

## 15.1 Four Rules of Simple Design
Follow:
https://martinfowler.com/bliki/BeckDesignRules.html

1. Passes the tests — all tests must pass
2. Reveals intention — good naming
3. No duplication
4. Fewest elements — avoid unnecessary classes/functions while preserving readability


# Voice to Text
  - Use Gemini API for voice to text

