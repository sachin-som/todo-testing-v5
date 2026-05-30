# Estimation Report

## Method
T-Shirt Sizes (XS, S, M, L, XL, XXL)

## Notes
- No historical velocity or actuals were provided, so estimates are uncalibrated.
- Estimates reflect the BRD/tech-spec/architecture set in the workspace.
- Confidence reflects how stable and well-defined each story appears.

## Consensus Table
| Story ID | Title | Estimate | Confidence | Risk | Key Factors |
|----------|-------|----------|------------|------|-------------|
| US-001 | Create a Task from Main Screen | S | High | Medium | Standard CRUD flow; validation, persistence, and immediate refresh are well understood. |
| US-002 | View Active and Completed Tasks | XS | High | Low | Mostly rendering and empty/error states; depends on hydration path. |
| US-003 | Edit an Existing Task | S | High | Medium | Similar to create, but adds merge/conflict handling for rapid edits. |
| US-004 | Toggle Task Completion Status | XS | High | Low | Simple state transition with deterministic last-action behavior. |
| US-005 | Delete a Task with Confirmation | XS | High | Low | Straightforward destructive flow with confirmation and permanent delete. |
| US-006 | Persist Tasks Across Refresh and Reopen | M | Medium | Medium-High | Hydration, corruption recovery, and storage failure handling increase complexity. |
| US-007 | Present Privacy Notice and Capture Consent Record | S | Medium | Medium | Blocking first-run gate plus local consent versioning and persistence. |
| US-008 | Enforce No Remote Task Content Transfer | S | Medium | Medium | Requires careful telemetry/redaction constraints and verification of no task payload leakage. |
| US-009 | Filter Tasks by Status | XS | High | Low | Pure projection logic over existing task state. |
| US-010 | Sort Tasks by Due Date and Priority | M | Medium | Medium | Sorting rules, tie-breaks, and null due-date behavior add nuance. |
| US-011 | Assign and Edit Tags on Tasks | M | Medium | Medium-High | Tag normalization, limits, and persistence behavior make this more than a simple field edit. |
| US-012 | Filter Tasks by Tag | S | Medium | Medium | Depends on tag normalization and combined-filter determinism. |
| US-013 | Render Due Date in Local Timezone | S | Medium | Medium | Timezone/DST correctness adds test and implementation nuance. |
| US-014 | Accessibility Compliance for Core Flows | L | Medium | High | Cross-cutting work across multiple screens, interaction modes, and QA validation. |
| US-015 | Input Sanitization and Dependency Security Gate | S | Medium | Medium | Sanitization plus CI security checks are clear but span app and pipeline concerns. |
| US-016 | Define KPI Instrumentation and Baseline Plan (Spike) | M | Medium-Low | High | Discovery/spike work with unresolved analytics and privacy constraints. |

## Multi-Role Poker Table

### US-001: Create a Task from Main Screen
**Consensus:** S | **Confidence:** High | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Standard create form, validation, and local persistence path. |
| QA | XS | Happy-path and validation cases are clear and easy to test. |
| Architect | S | Fits the existing validation/repository flow without novel design. |
| PO | S | Core MVP behavior with well-defined acceptance criteria. |

**Complexity Breakdown:**
- Technical: Low — familiar CRUD pattern
- Domain: Low — simple business rules
- Dependencies: Low — browser local storage only
- Uncertainty: Low — AC is explicit
- Testing: Medium — validation and persistence edge cases
- Data: Low — single task object

### US-002: View Active and Completed Tasks
**Consensus:** XS | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | XS | Primarily list rendering and state display. |
| QA | XS | Mostly visual states and recovery cases. |
| Architect | XS | No new domain behavior; uses hydration output. |
| PO | XS | Basic visibility requirement with clear UI states. |

**Complexity Breakdown:**
- Technical: Low — presentation only
- Domain: Low — status distinction is simple
- Dependencies: Low — depends on loaded task data
- Uncertainty: Low — explicit states in AC
- Testing: Low-Medium — empty state and corruption handling
- Data: Low — read-only projection

### US-003: Edit an Existing Task
**Consensus:** S | **Confidence:** High | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Similar to create, with update and final-state handling. |
| QA | S | Needs regression for validation and rapid-save behavior. |
| Architect | S | Reuses same command/persistence pipeline with versioning guardrails. |
| PO | S | Core workflow, slightly more complex than create. |

**Complexity Breakdown:**
- Technical: Medium — update flow plus stale-write protection
- Domain: Low — same task fields
- Dependencies: Low — existing task record
- Uncertainty: Low-Medium — inline/modal UX unspecified
- Testing: Medium — rapid edits and final state verification
- Data: Low — single entity mutation

### US-004: Toggle Task Completion Status
**Consensus:** XS | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | XS | Simple status flip with immediate UI update. |
| QA | XS | Easy to cover with status transition tests. |
| Architect | XS | Minimal behavioral surface area. |
| PO | XS | Clear, lightweight MVP interaction. |

**Complexity Breakdown:**
- Technical: Low — single-field state transition
- Domain: Low — binary status only
- Dependencies: Low — task exists already
- Uncertainty: Low — direct AC
- Testing: Low — status change and last-action wins
- Data: Low — no schema expansion

### US-005: Delete a Task with Confirmation
**Consensus:** XS | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | XS | Confirmation plus permanent removal is straightforward. |
| QA | XS | Confirm/cancel paths are easy to validate. |
| Architect | XS | Uses established repository delete semantics. |
| PO | XS | Clear user-facing destructive flow. |

**Complexity Breakdown:**
- Technical: Low — confirmed delete path
- Domain: Low — no restore/undo in scope
- Dependencies: Low — existing task record
- Uncertainty: Low — acceptance criteria are explicit
- Testing: Low — two dialog paths plus permanence
- Data: Low — hard delete only

### US-006: Persist Tasks Across Refresh and Reopen
**Consensus:** M | **Confidence:** Medium | **Risk:** Medium-High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Hydration, write-through persistence, and recovery mode need careful implementation. |
| QA | M | Corruption, browser restart, and storage failure paths add test scope. |
| Architect | M | Core persistence boundary, but still bounded to local storage. |
| PO | M | Critical to trust, but not complex in user-visible behavior. |

**Complexity Breakdown:**
- Technical: Medium-High — load/save envelope and degraded mode
- Domain: Low — persistence behavior only
- Dependencies: Medium — browser storage reliability
- Uncertainty: Medium — corruption handling specifics
- Testing: High — refresh/reopen/unavailable storage scenarios
- Data: Medium — full task dataset hydration

### US-007: Present Privacy Notice and Capture Consent Record
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | First-run gate plus local acknowledgment persistence. |
| QA | S | Needs version-change and persistence scenarios. |
| Architect | S | Clean module boundary, but compliance sensitivity increases scrutiny. |
| PO | S | Important release gate with straightforward UX. |

**Complexity Breakdown:**
- Technical: Medium — blocking gate and local record storage
- Domain: Low-Medium — consent-version logic
- Dependencies: Medium — legal/privacy copy and versioning
- Uncertainty: Medium — final notice content and version rules
- Testing: Medium — first-run, repeat-run, version bump
- Data: Low — small consent record

### US-008: Enforce No Remote Task Content Transfer
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Requires verification across telemetry and client error paths. |
| QA | S | Network inspection and payload auditing are essential. |
| Architect | S | Mostly policy enforcement, but non-trivial to prove. |
| PO | S | Privacy promise is crucial, even if implementation is constrained. |

**Complexity Breakdown:**
- Technical: Medium — ensure task content never leaves device
- Domain: Low — policy requirement
- Dependencies: Medium — optional telemetry path and legal review
- Uncertainty: Medium — proof/verification approach may vary
- Testing: High — network inspection and payload assertions
- Data: Low — metadata-only events allowed

### US-009: Filter Tasks by Status
**Consensus:** XS | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | XS | Simple projection based on existing status field. |
| QA | XS | Straightforward matrix of status/filter states. |
| Architect | XS | No new persistence or domain complexity. |
| PO | XS | Basic usability enhancement. |

**Complexity Breakdown:**
- Technical: Low — list filtering only
- Domain: Low — status is already defined
- Dependencies: Low — task status data exists
- Uncertainty: Low — explicit AC
- Testing: Low — simple state permutations
- Data: Low — no write path

### US-010: Sort Tasks by Due Date and Priority
**Consensus:** M | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Sorting rules, tie-breakers, and null due dates add logic. |
| QA | M | Multiple combinations and deterministic ordering need coverage. |
| Architect | M | Query/projection engine work is moderate but contained. |
| PO | M | Useful enhancement with a few product-rule unknowns. |

**Complexity Breakdown:**
- Technical: Medium — comparators and deterministic ordering
- Domain: Medium — priority/date rules
- Dependencies: Medium — product rule for missing due dates
- Uncertainty: Medium — final null sort rule pending
- Testing: Medium-High — ordering permutations and edge cases
- Data: Low — read-only sort over existing tasks

### US-011: Assign and Edit Tags on Tasks
**Consensus:** M | **Confidence:** Medium | **Risk:** Medium-High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Tag normalization, caps, uniqueness, and persistence make it more involved. |
| QA | M | Needs coverage for duplicates, limits, normalization, and edit flows. |
| Architect | M | Interacts with validation and query/filter paths. |
| PO | M | Valuable organization feature with moderate scope. |

**Complexity Breakdown:**
- Technical: Medium-High — normalization and constraints
- Domain: Medium — tag rules affect multiple views
- Dependencies: Medium — uses existing edit flow and storage
- Uncertainty: Medium — normalization rule specifics must be consistent
- Testing: High — duplicates, limits, edit/remove behavior
- Data: Medium — tag sets per task

### US-012: Filter Tasks by Tag
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Filter logic is simple once tag normalization is stable. |
| QA | S | Combined filter behavior and empty result states need verification. |
| Architect | S | Mostly projection work with deterministic interaction rules. |
| PO | S | Useful but dependent on tag foundation. |

**Complexity Breakdown:**
- Technical: Medium — filtered view composition
- Domain: Medium — tag membership semantics matter
- Dependencies: Medium — relies on tag assignment story
- Uncertainty: Medium — combined filter precedence pending
- Testing: Medium — empty states and interactions with other filters
- Data: Low-Medium — derived from task tags

### US-013: Render Due Date in Local Timezone
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Date conversion and formatting are manageable but subtle. |
| QA | S | Timezone and DST cases can be tricky across browsers. |
| Architect | S | Small but important adapter boundary. |
| PO | S | Clear value, but edge-case heavy. |

**Complexity Breakdown:**
- Technical: Medium — UTC storage to local rendering
- Domain: Low-Medium — date presentation rule
- Dependencies: Medium — date/time browser APIs
- Uncertainty: Medium — DST and invalid clock scenarios
- Testing: High — timezone transitions and formatting consistency
- Data: Low — display transformation only

### US-014: Accessibility Compliance for Core Flows
**Consensus:** L | **Confidence:** Medium | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | L | Spans many UI components and interaction states. |
| QA | L | Requires keyboard, screen reader, contrast, and validation testing. |
| Architect | L | Cross-cutting quality work affects multiple layers. |
| PO | L | Non-negotiable release readiness item with broad surface area. |

**Complexity Breakdown:**
- Technical: High — many components and states to remediate
- Domain: Low — quality requirement, not new domain logic
- Dependencies: High — depends on create/edit/delete/toggle flows
- Uncertainty: Medium — remediation depth may vary
- Testing: High — comprehensive a11y matrix and regression
- Data: Low — no new data model impact

### US-015: Input Sanitization and Dependency Security Gate
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Sanitization plus CI security checks are well-scoped. |
| QA | S | Security assertions and dependency scan verification are clear. |
| Architect | S | Fits within existing validation and release gate design. |
| PO | S | Important safeguard with limited feature breadth. |

**Complexity Breakdown:**
- Technical: Medium — render sanitization and pipeline gate integration
- Domain: Low — security hygiene only
- Dependencies: Medium — scanning toolchain availability
- Uncertainty: Low-Medium — tooling specifics may vary
- Testing: Medium — XSS-style checks and scan enforcement
- Data: Low — no schema expansion

### US-016: Define KPI Instrumentation and Baseline Plan (Spike)
**Consensus:** M | **Confidence:** Medium-Low | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Discovery effort spans analytics, privacy, and event design. |
| QA | S | Mostly validation of definitions and constraints, but not implementation-heavy. |
| Architect | M | Requires aligning telemetry design with privacy constraints. |
| PO | M | Necessary spike to resolve open questions before implementation. |

**Complexity Breakdown:**
- Technical: Medium — event taxonomy and measurement approach
- Domain: Medium — KPI definitions need stakeholder alignment
- Dependencies: High — analytics platform and legal/privacy input
- Uncertainty: High — discovery-driven work by definition
- Testing: Medium — validation of proposed events and compliance constraints
- Data: Low — no product task data, only metadata/event definitions

## Aggregate Summary
- Overall confidence: Medium
- Top risks:
  - US-014 may expand if accessibility remediation is deeper than expected.
  - US-016 is discovery-heavy and depends on unresolved analytics/privacy decisions.
  - US-006 depends on browser storage reliability and corruption handling paths.
  - US-008 requires strong verification that no task content leaves the device.
- Recommendations:
  - Keep US-016 as a true spike with timebox and explicit outputs.
  - Confirm null due-date sort rules before implementing US-010.
  - Align tag normalization rules before US-011 and US-012.
  - Treat US-014 as a cross-cutting quality initiative with dedicated QA support.
  - Calibrate future estimates using actuals, since no historical velocity data is available.

## Review Request
Please review the estimates in the IDE panel. If you want adjustments, I can revise specific stories or re-run with a different method.
