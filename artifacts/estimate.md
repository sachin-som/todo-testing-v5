# Estimation Report

## Method
Story Points (Fibonacci: 1, 2, 3, 5, 8, 13, 21)

## Notes
- No historical velocity or actuals were provided, so estimates are uncalibrated.
- Estimates reflect the BRD/tech-spec/architecture set in the workspace.
- Confidence reflects how stable and well-defined each story appears.
- Scope limited to MVP stories from `artifacts/product-backlog.md`.

## Consensus Table
| Story ID | Title | Estimate | Confidence | Risk | Key Factors |
|----------|-------|----------|------------|------|-------------|
| US-001 | Create a Task from Main Screen | 3 SP | High | Medium | Standard CRUD flow; validation, persistence, and immediate refresh are well understood. |
| US-002 | View Active and Completed Tasks | 2 SP | High | Low | Mostly rendering and empty/error states; depends on hydration path. |
| US-003 | Edit an Existing Task | 3 SP | High | Medium | Similar to create, but adds merge/conflict handling for rapid edits. |
| US-004 | Toggle Task Completion Status | 2 SP | High | Low | Simple state transition with deterministic last-action behavior. |
| US-005 | Delete a Task with Confirmation | 2 SP | High | Low | Straightforward destructive flow with confirmation and permanent delete. |
| US-006 | Persist Tasks Across Refresh and Reopen | 5 SP | Medium | Medium-High | Hydration, corruption recovery, and storage failure handling increase complexity. |
| US-007 | Present Privacy Notice and Capture Consent Record | 3 SP | Medium | Medium | Blocking first-run gate plus local consent versioning and persistence. |
| US-008 | Enforce No Remote Task Content Transfer | 3 SP | Medium | Medium | Requires careful telemetry/redaction constraints and verification of no task payload leakage. |
| US-014 | Accessibility Compliance for Core Flows | 8 SP | Medium | High | Cross-cutting work across multiple screens, interaction modes, and QA validation. |
| US-015 | Input Sanitization and Dependency Security Gate | 3 SP | Medium | Medium | Sanitization plus CI security checks are clear but span app and pipeline concerns. |
| US-016 | Define KPI Instrumentation and Baseline Plan (Spike) | 5 SP | Medium-Low | High | Discovery/spike work with unresolved analytics and privacy constraints. |

## Multi-Role Poker Table

### US-001: Create a Task from Main Screen
**Consensus:** 3 SP | **Confidence:** High | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | Standard create form, validation, and local persistence path. |
| QA | 2 | Happy-path and validation cases are clear and easy to test. |
| Architect | 3 | Fits the existing validation/repository flow without novel design. |
| PO | 3 | Core MVP behavior with well-defined acceptance criteria. |

**Complexity Breakdown:**
- Technical: Low — familiar CRUD pattern
- Domain: Low — simple business rules
- Dependencies: Low — browser local storage only
- Uncertainty: Low — AC is explicit
- Testing: Medium — validation and persistence edge cases
- Data: Low — single task object

### US-002: View Active and Completed Tasks
**Consensus:** 2 SP | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 2 | Primarily list rendering and state display. |
| QA | 2 | Mostly visual states and recovery cases. |
| Architect | 2 | No new domain behavior; uses hydration output. |
| PO | 2 | Basic visibility requirement with clear UI states. |

**Complexity Breakdown:**
- Technical: Low — presentation only
- Domain: Low — status distinction is simple
- Dependencies: Low — depends on loaded task data
- Uncertainty: Low — explicit states in AC
- Testing: Low-Medium — empty state and corruption handling
- Data: Low — read-only projection

### US-003: Edit an Existing Task
**Consensus:** 3 SP | **Confidence:** High | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | Similar to create, with update and final-state handling. |
| QA | 3 | Needs regression for validation and rapid-save behavior. |
| Architect | 3 | Reuses same command/persistence pipeline with versioning guardrails. |
| PO | 3 | Core workflow, slightly more complex than create. |

**Complexity Breakdown:**
- Technical: Medium — update flow plus stale-write protection
- Domain: Low — same task fields
- Dependencies: Low — existing task record
- Uncertainty: Low-Medium — inline/modal UX unspecified
- Testing: Medium — rapid edits and final state verification
- Data: Low — single entity mutation

### US-004: Toggle Task Completion Status
**Consensus:** 2 SP | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 2 | Simple status flip with immediate UI update. |
| QA | 2 | Easy to cover with status transition tests. |
| Architect | 2 | Minimal behavioral surface area. |
| PO | 2 | Clear, lightweight MVP interaction. |

**Complexity Breakdown:**
- Technical: Low — single-field state transition
- Domain: Low — binary status only
- Dependencies: Low — task exists already
- Uncertainty: Low — direct AC
- Testing: Low — status change and last-action wins
- Data: Low — no schema expansion

### US-005: Delete a Task with Confirmation
**Consensus:** 2 SP | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 2 | Confirmation plus permanent removal is straightforward. |
| QA | 2 | Confirm/cancel paths are easy to validate. |
| Architect | 2 | Uses established repository delete semantics. |
| PO | 2 | Clear user-facing destructive flow. |

**Complexity Breakdown:**
- Technical: Low — confirmed delete path
- Domain: Low — no restore/undo in scope
- Dependencies: Low — existing task record
- Uncertainty: Low — acceptance criteria are explicit
- Testing: Low — two dialog paths plus permanence
- Data: Low — hard delete only

### US-006: Persist Tasks Across Refresh and Reopen
**Consensus:** 5 SP | **Confidence:** Medium | **Risk:** Medium-High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Hydration, write-through persistence, and recovery mode need careful implementation. |
| QA | 5 | Corruption, browser restart, and storage failure paths add test scope. |
| Architect | 5 | Core persistence boundary, but still bounded to local storage. |
| PO | 5 | Critical to trust, but not complex in user-visible behavior. |

**Complexity Breakdown:**
- Technical: Medium-High — load/save envelope and degraded mode
- Domain: Low — persistence behavior only
- Dependencies: Medium — browser storage reliability
- Uncertainty: Medium — corruption handling specifics
- Testing: High — refresh/reopen/unavailable storage scenarios
- Data: Medium — full task dataset hydration

### US-007: Present Privacy Notice and Capture Consent Record
**Consensus:** 3 SP | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | First-run gate plus local acknowledgment persistence. |
| QA | 3 | Needs version-change and persistence scenarios. |
| Architect | 3 | Clean module boundary, but compliance sensitivity increases scrutiny. |
| PO | 3 | Important release gate with straightforward UX. |

**Complexity Breakdown:**
- Technical: Medium — blocking gate and local record storage
- Domain: Low-Medium — consent-version logic
- Dependencies: Medium — legal/privacy copy and versioning
- Uncertainty: Medium — final notice content and version rules
- Testing: Medium — first-run, repeat-run, version bump
- Data: Low — small consent record

### US-008: Enforce No Remote Task Content Transfer
**Consensus:** 3 SP | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | Requires verification across telemetry and client error paths. |
| QA | 3 | Network inspection and payload auditing are essential. |
| Architect | 3 | Mostly policy enforcement, but non-trivial to prove. |
| PO | 3 | Privacy promise is crucial, even if implementation is constrained. |

**Complexity Breakdown:**
- Technical: Medium — ensure task content never leaves device
- Domain: Low — policy requirement
- Dependencies: Medium — optional telemetry path and legal review
- Uncertainty: Medium — proof/verification approach may vary
- Testing: High — network inspection and payload assertions
- Data: Low — metadata-only events allowed

### US-014: Accessibility Compliance for Core Flows
**Consensus:** 8 SP | **Confidence:** Medium | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 8 | Spans many UI components and interaction states. |
| QA | 8 | Requires keyboard, screen reader, contrast, and validation testing. |
| Architect | 8 | Cross-cutting quality work affects multiple layers. |
| PO | 8 | Non-negotiable release readiness item with broad surface area. |

**Complexity Breakdown:**
- Technical: High — many components and states to remediate
- Domain: Low — quality requirement, not new domain logic
- Dependencies: High — depends on create/edit/delete/toggle flows
- Uncertainty: Medium — remediation depth may vary
- Testing: High — comprehensive a11y matrix and regression
- Data: Low — no new data model impact

### US-015: Input Sanitization and Dependency Security Gate
**Consensus:** 3 SP | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | Sanitization plus CI security checks are well-scoped. |
| QA | 3 | Security assertions and dependency scan verification are clear. |
| Architect | 3 | Fits within existing validation and release gate design. |
| PO | 3 | Important safeguard with limited feature breadth. |

**Complexity Breakdown:**
- Technical: Medium — render sanitization and pipeline gate integration
- Domain: Low — security hygiene only
- Dependencies: Medium — scanning toolchain availability
- Uncertainty: Low-Medium — tooling specifics may vary
- Testing: Medium — XSS-style checks and scan enforcement
- Data: Low — no schema expansion

### US-016: Define KPI Instrumentation and Baseline Plan (Spike)
**Consensus:** 5 SP | **Confidence:** Medium-Low | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Discovery effort spans analytics, privacy, and event design. |
| QA | 3 | Mostly validation of definitions and constraints, but not implementation-heavy. |
| Architect | 5 | Requires aligning telemetry design with privacy constraints. |
| PO | 5 | Necessary spike to resolve open questions before implementation. |

**Complexity Breakdown:**
- Technical: Medium — event taxonomy and measurement approach
- Domain: Medium — KPI definitions need stakeholder alignment
- Dependencies: High — analytics platform and legal/privacy input
- Uncertainty: High — discovery-driven work by definition
- Testing: Medium — validation of proposed events and compliance constraints
- Data: Low — no product task data, only metadata/event definitions

## Aggregate Summary
- Total: 37 SP
- Overall confidence: Medium
- Top risks:
  - US-014 may expand if accessibility remediation is deeper than expected.
  - US-016 is discovery-heavy and depends on unresolved analytics/privacy decisions.
  - US-006 depends on browser storage reliability and corruption handling paths.
  - US-008 requires strong verification that no task content leaves the device.
- Recommendations:
  - Keep US-016 as a true spike with timebox and explicit outputs.
  - Confirm privacy notice copy and versioning rules before US-007 implementation.
  - Treat US-014 as a cross-cutting quality initiative with dedicated QA support.
  - Calibrate future estimates using actuals, since no historical velocity data is available.

## Review Request
Please review the estimates in the IDE panel. If you want adjustments, I can revise specific stories or re-run with a different method.
