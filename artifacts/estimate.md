# Estimate Report

## Method
T-Shirt Sizes (calibrated against the sprint plan story-point guidance)

## Consensus Table
| Story ID | Title | Estimate | Confidence | Risk | Key Factors |
|----------|-------|----------|------------|------|-------------|
| US-001 | Create a Task from Main Screen | S | High | Low | Standard CRUD, validation, local persistence, clear AC |
| US-002 | View Active and Completed Tasks | S | High | Low | Basic list rendering, empty state, storage recovery path |
| US-003 | Edit an Existing Task | S | Medium | Medium | CRUD update flow, inline validation, rapid-save consistency |
| US-004 | Toggle Task Completion Status | XS | High | Low | Simple state transition, low scope, deterministic final state |
| US-005 | Delete a Task with Confirmation | S | High | Low | Confirmation UX, permanent delete, straightforward persistence |
| US-006 | Persist Tasks Across Refresh and Reopen | M | Medium | Medium | Hydration/recovery, local storage failure handling, core reliability path |
| US-007 | Present Privacy Notice and Capture Consent Record | S | Medium | Medium | First-run gate, consent persistence, legal/UX dependency |
| US-008 | Enforce No Remote Task Content Transfer | S | Medium | Medium | Security/privacy validation, telemetry redaction constraints |
| US-009 | Filter Tasks by Status | S | High | Low | Simple projection/filtering, limited dependency risk |
| US-010 | Sort Tasks by Due Date and Priority | M | Medium | Medium | Deterministic sort rules, null due date rule unresolved |
| US-011 | Assign and Edit Tags on Tasks | M | Medium | Medium | Tag normalization, edit interaction, validation constraints |
| US-012 | Filter Tasks by Tag | S | Medium | Medium | Depends on tag model, combined filter precedence ambiguity |
| US-013 | Render Due Date in Local Timezone | S | Medium | Medium | Date conversion edge cases, timezone/DST regression risk |
| US-014 | Accessibility Compliance for Core Flows | M | Medium | Medium | Cross-cutting UI/QA effort, WCAG coverage, test hardening |
| US-015 | Input Sanitization and Dependency Security Gate | S | Medium | Medium | Security controls, CI gate integration, dependency scan setup |
| US-016 | Define KPI Instrumentation and Baseline Plan (Spike) | M | Low | High | Spike/discovery work, unknown analytics platform, open KPIs |

## Multi-Role Poker Table

### US-001: Create a Task from Main Screen
**Consensus:** S | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Standard create form, validation, and local write-through persistence |
| QA | S | Straightforward happy path and validation checks |
| Architect | S | Fits existing command/repository pattern with no novel design |
| PO | S | Matches the sprint-plan guidance and core MVP scope |

**Complexity Breakdown:**
- Technical: Low — conventional CRUD pattern
- Domain: Low — clear business rule set
- Dependencies: Low — Browser local storage only
- Uncertainty: Low — well-defined acceptance criteria
- Testing: Medium — validation and persistence coverage
- Data: Low — simple task record shape

### US-002: View Active and Completed Tasks
**Consensus:** S | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | List rendering and state separation are routine |
| QA | S | UI states are finite: empty, active, completed, storage failure |
| Architect | S | Projection logic is simple and already modeled |
| PO | S | Essential core visibility feature, not complex in scope |

**Complexity Breakdown:**
- Technical: Low
- Domain: Low
- Dependencies: Low to Medium — relies on persisted records
- Uncertainty: Low
- Testing: Medium — empty/error states need coverage
- Data: Low

### US-003: Edit an Existing Task
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Similar to create, but with patching and version handling |
| QA | S | Editing edge cases and rapid-save behavior need testing |
| Architect | M | Optimistic consistency and final-state determinism add care |
| PO | S | Still a standard CRUD capability, but slightly more involved |

**Complexity Breakdown:**
- Technical: Medium — update path plus final-state correctness
- Domain: Low
- Dependencies: Low
- Uncertainty: Medium — inline/modal UX not fixed
- Testing: Medium to High — rapid repeated edits
- Data: Low

### US-004: Toggle Task Completion Status
**Consensus:** XS | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | XS | One state transition and UI update |
| QA | XS | Easy to validate active/completed transitions |
| Architect | XS | Minimal surface area with existing data model |
| PO | XS | Smallest core workflow item |

**Complexity Breakdown:**
- Technical: Low
- Domain: Low
- Dependencies: Low
- Uncertainty: Low
- Testing: Low to Medium
- Data: Low

### US-005: Delete a Task with Confirmation
**Consensus:** S | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Confirmation dialog plus permanent removal logic |
| QA | S | Confirmation/cancel paths are bounded and testable |
| Architect | S | Reuses existing repository/delete pattern |
| PO | S | Clear user value with modest implementation effort |

**Complexity Breakdown:**
- Technical: Low
- Domain: Low
- Dependencies: Low
- Uncertainty: Low
- Testing: Medium — confirm/cancel and permanence checks
- Data: Low

### US-006: Persist Tasks Across Refresh and Reopen
**Consensus:** M | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Hydration, serialization, and failure recovery add real depth |
| QA | M | Needs browser/storage failure scenarios and refresh coverage |
| Architect | M | Core reliability path with versioned envelope handling |
| PO | M | Critical MVP story, slightly larger than basic CRUD |

**Complexity Breakdown:**
- Technical: Medium to High — hydration and corruption handling
- Domain: Low
- Dependencies: Medium — local storage behavior variability
- Uncertainty: Medium — recovery mode details matter
- Testing: High — refresh/reopen, unavailable/corrupt storage
- Data: Medium — whole dataset persistence

### US-007: Present Privacy Notice and Capture Consent Record
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Modal gate plus local consent storage is manageable |
| QA | S | First-run and version-change flows are finite |
| Architect | S | Fits consent manager pattern cleanly |
| PO | S | Compliance-critical but not a huge build |

**Complexity Breakdown:**
- Technical: Low to Medium
- Domain: Medium — legal/privacy copy dependency
- Dependencies: Medium — legal/UX approval
- Uncertainty: Medium
- Testing: Medium
- Data: Low

### US-008: Enforce No Remote Task Content Transfer
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Mostly policy enforcement and payload redaction checks |
| QA | S | Requires network inspection and telemetry validation |
| Architect | S | Constraint is clear, implementation is straightforward but sensitive |
| PO | S | Privacy requirement is essential, but scoped narrowly |

**Complexity Breakdown:**
- Technical: Medium — ensure no task content leaks
- Domain: Low
- Dependencies: Medium — telemetry behavior and review
- Uncertainty: Medium
- Testing: Medium to High — verification is non-trivial
- Data: Low

### US-009: Filter Tasks by Status
**Consensus:** S | **Confidence:** High | **Risk:** Low

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Simple projection over existing task state |
| QA | S | Three filter states and clear expected outputs |
| Architect | S | Straightforward query engine behavior |
| PO | S | Basic organizational affordance with limited scope |

**Complexity Breakdown:**
- Technical: Low
- Domain: Low
- Dependencies: Low
- Uncertainty: Low
- Testing: Low to Medium
- Data: Low

### US-010: Sort Tasks by Due Date and Priority
**Consensus:** M | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Two sort modes plus null due-date rule and tie-breaking |
| QA | M | Combinatorial ordering cases and edge conditions |
| Architect | M | Deterministic comparator rules need discipline |
| PO | M | User-visible but rule-dependent and a bit ambiguous |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Medium — null due-date policy unresolved
- Dependencies: Medium — product rule confirmation needed
- Uncertainty: Medium
- Testing: High — ordering matrix and DST-adjacent cases
- Data: Low

### US-011: Assign and Edit Tags on Tasks
**Consensus:** M | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Tag normalization, edit UX, and persistence updates |
| QA | M | Multiple tag variants and normalization rules to verify |
| Architect | M | Data model and query impacts extend beyond simple CRUD |
| PO | M | Useful enhancement with moderate complexity |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Medium — normalization rules matter
- Dependencies: Medium
- Uncertainty: Medium
- Testing: Medium to High — duplicate/limit behavior
- Data: Medium — list-based tag field handling

### US-012: Filter Tasks by Tag
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Once tags exist, tag filtering is a small query addition |
| QA | S | Mostly projection behavior plus empty filtered state |
| Architect | S | Depends on tag indexing/model already in place |
| PO | S | Clear enhancement but not structurally large |

**Complexity Breakdown:**
- Technical: Low to Medium
- Domain: Medium — combined filter precedence needs definition
- Dependencies: Medium — depends on US-011
- Uncertainty: Medium
- Testing: Medium
- Data: Low

### US-013: Render Due Date in Local Timezone
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Date formatting is known, but DST/local clock edge cases add work |
| QA | S | Timezone matrix and regression checks are needed |
| Architect | S | Clear adapter boundary, but correctness matters |
| PO | S | Small functional scope with potentially tricky correctness |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Low
- Dependencies: Medium — browser date/time APIs
- Uncertainty: Medium
- Testing: High — timezone/DST cases
- Data: Low

### US-014: Accessibility Compliance for Core Flows
**Consensus:** M | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Requires refactoring controls, labels, and keyboard support |
| QA | M | Accessibility verification can be time-consuming and iterative |
| Architect | M | Cross-cutting concern across multiple flows |
| PO | M | Launch-critical but not a single narrow feature |

**Complexity Breakdown:**
- Technical: Medium to High — pervasive UI changes
- Domain: Low
- Dependencies: Medium — design system and QA support
- Uncertainty: Medium
- Testing: High — WCAG and assistive-tech checks
- Data: Low

### US-015: Input Sanitization and Dependency Security Gate
**Consensus:** S | **Confidence:** Medium | **Risk:** Medium

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | S | Sanitization and CI gate integration are bounded but important |
| QA | S | Security checks are discrete and automatable |
| Architect | S | Fits existing validation/security pipeline cleanly |
| PO | S | Necessary release gate, modest build size |

**Complexity Breakdown:**
- Technical: Medium
- Domain: Low
- Dependencies: Medium — scan toolchain and reviewer availability
- Uncertainty: Medium
- Testing: Medium
- Data: Low

### US-016: Define KPI Instrumentation and Baseline Plan (Spike)
**Consensus:** M | **Confidence:** Low | **Risk:** High

| Role | Estimate | Rationale |
|------|----------|-----------|
| Developer | M | Discovery work likely spans event design and constraints |
| QA | M | Validation depends on whatever telemetry plan emerges |
| Architect | M | Spike spans product, privacy, and platform decisions |
| PO | M | Unknowns are high, so a timeboxed medium spike is appropriate |

**Complexity Breakdown:**
- Technical: Medium
- Domain: High — KPI definitions and baseline decisions unresolved
- Dependencies: High — analytics platform and privacy review
- Uncertainty: High
- Testing: Medium
- Data: Medium — event taxonomy and baseline capture plan

## Aggregate Summary
- **Total:** 4 XS, 9 S, 3 M
- **Overall confidence:** Medium
- **Top risks:**
  - US-006 storage hydration/corruption recovery
  - US-010 null due-date sorting rule ambiguity
  - US-014 accessibility scope and regression effort
  - US-016 analytics/KPI spike uncertainty
- **Recommendations:**
  - Confirm null due-date sort rule before implementation.
  - Treat US-006 and US-014 as early-risk stories due to cross-cutting impact.
  - Keep US-016 timeboxed as a spike and split follow-on work if needed.
  - Calibrate future estimates with actuals from the sprint plan.
