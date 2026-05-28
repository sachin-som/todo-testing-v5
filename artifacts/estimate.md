# Estimate Summary

## Method
Story Points (Fibonacci)

## Consensus Table
| Story ID | Title | Estimate | Confidence | Risk | Key Factors |
|----------|-------|----------|------------|------|-------------|
| US-001 | Create a Task from Main Screen | 5 SP | High | Medium | Required validation, local persistence, optional fields, immediate refresh |
| US-002 | View Active and Completed Tasks | 3 SP | High | Low | Simple projection, empty state, recoverable storage error handling |
| US-003 | Edit an Existing Task | 5 SP | Medium | Medium | Stale-save handling, validation, deterministic final state under rapid edits |
| US-004 | Toggle Task Completion Status | 2 SP | High | Low | Small state transition, but needs final-state consistency on rapid toggles |
| US-005 | Delete a Task with Confirmation | 3 SP | High | Medium | Confirmation flow, permanent delete, safe warning copy |
| US-006 | Persist Tasks Across Refresh and Reopen | 8 SP | Medium | High | Hydration path, corruption/unavailable storage handling, degraded mode |
| US-007 | Present Privacy Notice and Capture Consent Record | 3 SP | High | Medium | First-run gate, local consent record, versioned re-acknowledgment |
| US-008 | Enforce No Remote Task Content Transfer | 5 SP | Medium | High | Privacy enforcement, telemetry exclusions, inspection/verification effort |
| US-009 | Filter Tasks by Status | 2 SP | High | Low | Straightforward query logic and UI state |
| US-010 | Sort Tasks by Due Date and Priority | 5 SP | Medium | Medium | Deterministic ordering, null due date rule, tie-break behavior |
| US-011 | Assign and Edit Tags on Tasks | 5 SP | Medium | Medium | Normalization rules, edit persistence, UI/QA permutations |
| US-012 | Filter Tasks by Tag | 3 SP | High | Low | Reuses query engine patterns; filtered empty-state handling |
| US-013 | Render Due Date in Local Timezone | 5 SP | Medium | Medium | Timezone conversion, DST/browser differences, deterministic formatting |
| US-014 | Accessibility Compliance for Core Flows | 8 SP | Medium | High | Cross-cutting a11y work across create/edit/delete/toggle flows |
| US-015 | Input Sanitization and Dependency Security Gate | 5 SP | Medium | High | Rendering safety, dependency scan integration, release gating |
| US-016 | Define KPI Instrumentation and Baseline Plan (Spike) | 3 SP | Low | High | Discovery spike with uncertain telemetry/privacy constraints |

## Multi-Role Poker Table

### US-001: Create a Task from Main Screen
**Consensus:** 5 SP | **Confidence:** High | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Form handling, validation, storage write, and list refresh are standard but integrated |
| QA | 3 | Mostly normal-path testing, plus validation edge cases |
| Architect | 5 | Fits existing local-storage and state-manager patterns |
| PO | 5 | Comparable to core create flow with optional fields and fast feedback |

**Complexity Breakdown:**
- Technical: Medium — form, validation, persistence, rerender
- Domain: Low — familiar CRUD behavior
- Dependencies: Low — local-only storage
- Uncertainty: Low — clear acceptance criteria
- Testing: Medium — validation and persistence checks
- Data: Low — simple task record creation

### US-002: View Active and Completed Tasks
**Consensus:** 3 SP | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | List rendering and state distinction are straightforward |
| QA | 2 | Main cases are display states and storage error path |
| Architect | 3 | Uses existing projection/hydration structure |
| PO | 3 | Low surface-area story with clear user value |

**Complexity Breakdown:**
- Technical: Low
- Domain: Low
- Dependencies: Low to Medium — depends on persisted data and hydration path
- Uncertainty: Low
- Testing: Medium — empty/error states
- Data: Low

### US-003: Edit an Existing Task
**Consensus:** 5 SP | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Similar to create, but with patching and conflict-safe final state |
| QA | 5 | Need tests for validation, stale edits, and rapid repeated saves |
| Architect | 5 | Versioned update flow adds a modest coordination layer |
| PO | 3 | Looks simple from UX, but hidden edge cases justify higher size |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Low
- Dependencies: Medium — depends on create/view persistence state
- Uncertainty: Medium — rapid edits and final-state behavior
- Testing: Medium to High
- Data: Low to Medium — patching existing records

### US-004: Toggle Task Completion Status
**Consensus:** 2 SP | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 2 | Small status update with minimal UI change |
| QA | 2 | Easy to verify active/completed transitions |
| Architect | 2 | Reuses state transition mechanics |
| PO | 2 | Narrow but important interaction |

**Complexity Breakdown:**
- Technical: Low
- Domain: Low
- Dependencies: Medium — relies on existing task row/state
- Uncertainty: Low
- Testing: Low to Medium
- Data: Low

### US-005: Delete a Task with Confirmation
**Consensus:** 3 SP | **Confidence:** High | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | Confirmation modal plus permanent delete action |
| QA | 3 | Need cancel/confirm and permanence checks |
| Architect | 3 | Straightforward command with destructive semantics |
| PO | 3 | Small scope but high user impact if wrong |

**Complexity Breakdown:**
- Technical: Low to Medium
- Domain: Low
- Dependencies: Medium — needs task selection and persistence
- Uncertainty: Low
- Testing: Medium — destructive flow coverage
- Data: Low

### US-006: Persist Tasks Across Refresh and Reopen
**Consensus:** 8 SP | **Confidence:** Medium | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 8 | Hydration, serialization, corruption handling, and fallback mode add complexity |
| QA | 8 | Requires browser restart, refresh, unavailable storage, and corruption scenarios |
| Architect | 8 | Core durability path with recovery semantics and versioned envelopes |
| PO | 5 | User-facing concept is simple, but the reliability work is substantial |

**Complexity Breakdown:**
- Technical: High — hydration and persistence reliability path
- Domain: Medium
- Dependencies: High — browser storage behavior and envelope format
- Uncertainty: Medium to High — corruption/unavailable storage edge cases
- Testing: High
- Data: Medium — persisted dataset lifecycle

### US-007: Present Privacy Notice and Capture Consent Record
**Consensus:** 3 SP | **Confidence:** High | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | First-run gate plus local consent write is narrow in scope |
| QA | 3 | Mostly versioning and repeat-visit behavior |
| Architect | 3 | Fits consent manager pattern cleanly |
| PO | 3 | Compliance-driven but implementation remains contained |

**Complexity Breakdown:**
- Technical: Low to Medium
- Domain: Low
- Dependencies: Medium — depends on persistence and notice versioning
- Uncertainty: Low
- Testing: Medium
- Data: Low

### US-008: Enforce No Remote Task Content Transfer
**Consensus:** 5 SP | **Confidence:** Medium | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Requires code review, telemetry discipline, and payload exclusions |
| QA | 5 | Verification via network inspection and telemetry checks is non-trivial |
| Architect | 5 | Privacy guarantees cut across app boundaries and observability |
| PO | 3 | Business requirement is clear, but proving compliance adds effort |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Medium
- Dependencies: High — touches telemetry and privacy notice flow
- Uncertainty: Medium
- Testing: High — network inspection and regression proof
- Data: Low

### US-009: Filter Tasks by Status
**Consensus:** 2 SP | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 2 | Basic filter projection on existing state |
| QA | 2 | Small matrix of statuses and empty states |
| Architect | 2 | Simple query path reusing projection engine |
| PO | 2 | Clear and low-risk enhancement |

**Complexity Breakdown:**
- Technical: Low
- Domain: Low
- Dependencies: Low
- Uncertainty: Low
- Testing: Low
- Data: Low

### US-010: Sort Tasks by Due Date and Priority
**Consensus:** 5 SP | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Multiple sort rules and deterministic tie-breaks |
| QA | 5 | Needs coverage for missing due dates and ordering rules |
| Architect | 5 | Comparator logic and stable projections are moderately tricky |
| PO | 3 | Appears simple, but product decisions make it less trivial |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Medium
- Dependencies: Medium — null due date rule needs confirmation
- Uncertainty: Medium
- Testing: Medium to High
- Data: Low

### US-011: Assign and Edit Tags on Tasks
**Consensus:** 5 SP | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Tag normalization, edit behavior, and display rules add breadth |
| QA | 5 | Requires normalization and duplicate-tag scenarios |
| Architect | 5 | Reuses task persistence but expands validation and query surface |
| PO | 3 | Useful feature, but implementation scope is broader than it first appears |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Medium
- Dependencies: Medium — depends on edit flow and data model
- Uncertainty: Medium
- Testing: Medium
- Data: Medium — tag uniqueness/normalization

### US-012: Filter Tasks by Tag
**Consensus:** 3 SP | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | Reuses query infrastructure with one extra criterion |
| QA | 3 | Moderate matrix across tags and empty filtered state |
| Architect | 3 | Deterministic filter interaction is straightforward |
| PO | 2 | Narrow enhancement, mostly dependent on tags existing |

**Complexity Breakdown:**
- Technical: Low to Medium
- Domain: Low
- Dependencies: Medium — depends on tag data model
- Uncertainty: Low
- Testing: Medium
- Data: Low

### US-013: Render Due Date in Local Timezone
**Consensus:** 5 SP | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | UTC storage, local rendering, and DST handling need careful implementation |
| QA | 5 | Timezone transitions and browser locale variations expand test cases |
| Architect | 5 | Requires clear adapter boundaries to avoid ambiguity |
| PO | 3 | Seems UI-only, but date correctness makes it more involved |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Medium
- Dependencies: Medium — depends on sort/date data model
- Uncertainty: Medium
- Testing: High — timezone and DST variance
- Data: Low

### US-014: Accessibility Compliance for Core Flows
**Consensus:** 8 SP | **Confidence:** Medium | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 8 | Cross-cutting UI refactor, semantics, focus management, and error states |
| QA | 8 | Requires keyboard, screen reader, and contrast validation across flows |
| Architect | 8 | A11y touches multiple components and cannot be bolted on cheaply |
| PO | 5 | Important quality gate, but easy to underestimate breadth |

**Complexity Breakdown:**
- Technical: High
- Domain: Medium
- Dependencies: High — spans create/edit/delete/toggle flows
- Uncertainty: Medium
- Testing: High
- Data: Low

### US-015: Input Sanitization and Dependency Security Gate
**Consensus:** 5 SP | **Confidence:** Medium | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 5 | Sanitization and security checks require attention to render paths and CI gate setup |
| QA | 5 | Must validate XSS resistance and release-blocking scan behavior |
| Architect | 5 | Security control is a release-quality concern across the stack |
| PO | 3 | Requirement is straightforward, but governance and tooling add effort |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Low
- Dependencies: High — CI/security tooling and release process
- Uncertainty: Medium
- Testing: High
- Data: Low

### US-016: Define KPI Instrumentation and Baseline Plan (Spike)
**Consensus:** 3 SP | **Confidence:** Low | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | 3 | Discovery work, likely bounded by research and documentation |
| QA | 2 | Limited implementation, more about validating assumptions |
| Architect | 3 | Spike to clarify telemetry/privacy constraints and baseline approach |
| PO | 3 | Planning story with uncertain downstream follow-up |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Medium
- Dependencies: High — analytics and legal/privacy decisions
- Uncertainty: High
- Testing: Medium
- Data: Medium

## Aggregate Summary
- Total: 77 points
- Overall confidence: Medium
- Top risks:
  - US-006 persistence/hydration reliability and corruption handling
  - US-014 accessibility across multiple core flows
  - US-008 privacy enforcement proof and telemetry discipline
  - US-015 security tooling and release gating
- Recommendations:
  - Keep US-006 as a focused slice if possible; consider splitting hydration from corruption recovery if the team wants lower risk
  - Treat US-014 as a cross-cutting quality epic, not a last-minute polish task
  - Confirm the null due-date sort rule before committing to US-010
  - Preserve spike outcomes from US-016 to avoid hidden follow-up work

## Notes
- Estimates are uncalibrated; no historical velocity file was provided.
- Story sizes reflect the local-first, browser-storage architecture and the cross-cutting compliance/security/a11y requirements.
- Spikes and quality gates were sized with the likely follow-up implementation effort in mind, not just documentation time.
