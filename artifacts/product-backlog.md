### 1. Reconciliation Report
| # | Sources | Conflict / Gap | Resolution / Assumption |
|---|---------|----------------|-------------------------|
| 1 | BRD vs Architecture | Architecture introduces detailed module boundaries and internal component names not explicitly listed in BRD. | Accepted as implementation detail only; user stories remain BRD-driven and avoid internals. |
| 2 | BRD vs Tech Spec | Tech spec defines explicit field constraints (e.g., title max 200 chars, max 20 tags, tag length max 30) not explicitly stated in BRD. | Treated as technical assumptions; captured as assumptions in relevant stories and flagged for Product confirmation. |
| 3 | BRD vs Architecture | Architecture proposes optional telemetry path while BRD states no task content sent remotely. | Resolved by constraining telemetry stories to non-task-content operational events only. |
| 4 | BRD vs Tech Spec | Tech spec includes optimistic versioning/conflict handling; BRD only requires correctness under rapid edits/toggles. | Keep behavioral AC around consistent final state; do not expose versioning mechanics in stories. |
| 5 | BRD vs Inputs Set | No HTML wireframe, sitemap file, or meeting notes found in workspace. | Proceeded using BRD as source of truth; flagged as documentation gap for future refinement. |
| 6 | BRD vs NFR Details | BRD includes WCAG 2.1 AA and quality gates; architecture marks this area partially uncovered in architecture section. | Added explicit quality/accessibility backlog stories to ensure delivery readiness. |
| 7 | BRD vs KPI Section | KPI baselines are open questions in BRD. | Added spike story for analytics baseline and instrumentation definition. |
| 8 | BRD vs Legal/Compliance | BRD notes legal/privacy review required but no explicit jurisdictional decision. | Added compliance/legal checkpoint story; release gate dependency called out. |

### 2. Glossary
| Term | Definition |
|------|------------|
| Everyday Organizer | Primary individual consumer persona using the Todo Application for personal task management. |
| Todo Application | The web-based Release 1 product for managing personal tasks. |
| Task | A user-managed work item with title, optional due date, priority, tags, and status. |
| Active Task | A Task not yet completed. |
| Completed Task | A Task marked as done by the Everyday Organizer. |
| Due Date | Optional deadline captured for a Task and shown in local timezone. |
| Priority | Task importance level used for ordering (Low, Medium, High). |
| Tag | User-defined label used to organize and filter Tasks. |
| Privacy Notice | First-use disclosure stating local-only storage behavior and deletion consequences. |
| Consent Record | Stored acknowledgment that the Everyday Organizer viewed the Privacy Notice version. |
| Local Device Storage | Browser-based persistence used by the Todo Application in Release 1. |
| MVP | Minimum story set required for a functional, shippable Release 1 product. |
| Post-MVP | Deferred stories planned after MVP completion. |

### 3. Summary
- **Epics:** 5
- **Total Stories:** 16
- **MVP Stories:** 11
- **Post-MVP Stories:** 5
- **Key Themes:** Core task lifecycle, local persistence/privacy, organization and date handling, quality/compliance readiness, observability and launch controls.

### 4. Infrastructure Track (Reference Only)
- Infrastructure provisioning is managed separately from the product backlog.
- Source of truth: `/workspace/artifacts/infra-blueprint.md`.
- No infra stories are included here; track infra work in the infra backlog/plan.

### 5. Epics & User Stories

## Epic: Core Task Lifecycle
Theme: Personal Productivity Core
Business Objective: Enable Everyday Organizer to quickly manage Tasks end-to-end.

### Story US-001: Create a Task from Main Screen
Label: MVP
Priority: Must
Points: 3

As an Everyday Organizer,
I want to create a Task with a title and optional details,
So that I can capture work quickly.

**Acceptance Criteria:**
- [ ] Given I am on the main screen, When I enter a valid title and save, Then a new Active Task is created and shown in the list.
- [ ] Given I attempt to save without a title, When I submit, Then Task creation is blocked and an inline validation message is shown.
- [ ] Given I provide optional Due Date, Priority, and Tag values, When I save, Then those values are saved and displayed with the Task.
- [ ] Given save succeeds, When the list refreshes, Then the new Task appears without requiring page reload.

**Dependencies:**
- Story: None
- System: Browser Local Device Storage
- Data: None
- Team: None

**Technical Notes:** Validation and persistence must keep action feedback within defined UI latency targets.
**Assumptions:** Title length and tag limits follow technical spec defaults pending Product confirmation.

### Story US-002: View Active and Completed Tasks
Label: MVP
Priority: Must
Points: 3

As an Everyday Organizer,
I want to view all Tasks with clear status distinction,
So that I can track my progress.

**Acceptance Criteria:**
- [ ] Given Tasks exist, When I open the Todo Application, Then Active Task and Completed Task entries are visually distinguishable.
- [ ] Given no Tasks exist, When I open the Todo Application, Then I see an empty state prompting Task creation.
- [ ] Given Local Device Storage is unavailable or corrupted, When I open the Todo Application, Then I receive a recoverable error message and the application does not crash.

**Dependencies:**
- Story: US-006
- System: Browser Local Device Storage
- Data: Existing Task records
- Team: None

**Technical Notes:** Empty state and error state are first-class user states and must be test-covered.
**Assumptions:** Corruption handling message content will be supplied by Product/UX copy.

### Story US-003: Edit an Existing Task
Label: MVP
Priority: Must
Points: 3

As an Everyday Organizer,
I want to edit Task details,
So that my plan stays accurate as priorities change.

**Acceptance Criteria:**
- [ ] Given a Task exists, When I update title, Due Date, Priority, or Tag values and save, Then updated values are shown immediately.
- [ ] Given I clear the title while editing, When I attempt to save, Then the update is blocked with inline validation.
- [ ] Given rapid repeated edits, When I save multiple times, Then the final displayed Task matches the last confirmed save.

**Dependencies:**
- Story: US-001
- System: Browser Local Device Storage
- Data: Existing Task record
- Team: None

**Technical Notes:** Ensure deterministic final state under rapid user actions.
**Assumptions:** Edit is inline or modal based on UX implementation choice; behavior remains unchanged.

### Story US-004: Toggle Task Completion Status
Label: MVP
Priority: Must
Points: 2

As an Everyday Organizer,
I want to mark a Task complete or return it to active,
So that I can manage progress.

**Acceptance Criteria:**
- [ ] Given an Active Task, When I mark it complete, Then it is displayed as a Completed Task immediately.
- [ ] Given a Completed Task, When I reactivate it, Then it returns to Active Task state.
- [ ] Given rapid repeated toggling, When actions end, Then final status reflects the last action.

**Dependencies:**
- Story: US-002
- System: Browser Local Device Storage
- Data: Existing Task record
- Team: None

**Technical Notes:** Single-interaction status changes should meet action latency targets.
**Assumptions:** One-click/tap toggle control is available in Task row/card.

### Story US-005: Delete a Task with Confirmation
Label: MVP
Priority: Must
Points: 3

As an Everyday Organizer,
I want confirmation before deleting a Task,
So that I avoid accidental permanent loss.

**Acceptance Criteria:**
- [ ] Given a Task exists, When I choose delete and confirm, Then the Task is permanently removed from list and Local Device Storage.
- [ ] Given I open delete confirmation, When I cancel, Then the Task remains unchanged.
- [ ] Given delete is permanent, When confirmation is shown, Then warning text explains deletion cannot be undone.

**Dependencies:**
- Story: US-002
- System: Browser Local Device Storage
- Data: Existing Task record
- Team: None

**Technical Notes:** Confirmation should block unintended destructive action.
**Assumptions:** No undo capability is in scope for Release 1.

## Epic: Local Persistence & Privacy Foundations
Theme: Trust and Data Continuity
Business Objective: Preserve user trust via persistent local behavior and transparent privacy.

### Story US-006: Persist Tasks Across Refresh and Reopen
Label: MVP
Priority: Must
Points: 5

As an Everyday Organizer,
I want my Tasks to remain after refresh and reopen,
So that I do not lose planning context.

**Acceptance Criteria:**
- [ ] Given Tasks were saved, When I refresh or reopen in the same browser on same device, Then Tasks reload automatically.
- [ ] Given I open the Todo Application in another browser or device, When no prior local data exists, Then no Tasks are shown and local-only behavior is explained.
- [ ] Given browser data was cleared, When I reopen, Then previous Tasks are unavailable and empty state is shown.
- [ ] Given Local Device Storage read fails, When app initializes, Then app enters recoverable mode without crash.

**Dependencies:**
- Story: US-001
- System: Browser Local Device Storage
- Data: Persisted Task dataset
- Team: None

**Technical Notes:** Initialization hydration path is critical reliability path.
**Assumptions:** Storage failure fallback permits continued session use with warning.

### Story US-007: Present Privacy Notice and Capture Consent Record
Label: MVP
Priority: Must
Points: 3

As an Everyday Organizer,
I want to view and acknowledge a Privacy Notice,
So that I understand where my Task data is stored.

**Acceptance Criteria:**
- [ ] Given first use, When I open the Todo Application, Then a Privacy Notice is shown before normal Task interactions.
- [ ] Given I acknowledge the Privacy Notice, When acknowledgment succeeds, Then Consent Record is saved locally with notice version and timestamp.
- [ ] Given future use with same notice version, When I open the Todo Application, Then normal Task usage is allowed without repeated blocking notice.
- [ ] Given notice version changes, When I open the Todo Application, Then acknowledgment is required again.

**Dependencies:**
- Story: US-006
- System: Browser Local Device Storage
- Data: Consent Record
- Team: Legal/Privacy Reviewer

**Technical Notes:** Consent flow is a release gate for compliance readiness.
**Assumptions:** Final Privacy Notice copy provided before UAT.

### Story US-008: Enforce No Remote Task Content Transfer
Label: MVP
Priority: Must
Points: 3

As an Everyday Organizer,
I want confidence that Task content remains on my device,
So that I trust the Todo Application.

**Acceptance Criteria:**
- [ ] Given normal Task operations, When network traffic is inspected, Then no Task content is transmitted to remote services.
- [ ] Given Privacy Notice is displayed, When I review it, Then local-only Task storage behavior is explicitly stated.
- [ ] Given optional operational telemetry is enabled, When events are sent, Then Task content fields are excluded.

**Dependencies:**
- Story: US-007
- System: Browser Local Device Storage
- Data: Privacy Notice content
- Team: Legal/Privacy Reviewer

**Technical Notes:** Operational telemetry, if used, must be metadata-only.
**Assumptions:** Security review validates payload redaction before release.

## Epic: Task Organization & Time Handling
Theme: Focus and Clarity
Business Objective: Help Everyday Organizer prioritize and find Tasks efficiently.

### Story US-009: Filter Tasks by Status
Label: MVP
Priority: Should
Points: 3

As an Everyday Organizer,
I want to filter Tasks by status,
So that I can focus on what remains.

**Acceptance Criteria:**
- [ ] Given mixed Task statuses, When I choose Active filter, Then only Active Task entries are shown.
- [ ] Given mixed Task statuses, When I choose Completed filter, Then only Completed Task entries are shown.
- [ ] Given any filter is active, When I switch back to All, Then all Task entries are shown.

**Dependencies:**
- Story: US-002
- System: None
- Data: Task status data
- Team: None

**Technical Notes:** Filter operation should remain responsive up to target dataset size.
**Assumptions:** Filter state persists for current session only unless specified otherwise.

### Story US-010: Sort Tasks by Due Date and Priority
Label: Post-MVP
Priority: Could
Points: 5

As an Everyday Organizer,
I want to sort Tasks by Due Date or Priority,
So that important items are easier to tackle.

**Acceptance Criteria:**
- [ ] Given Task list contains Due Date values, When I sort by Due Date, Then ordering follows selected sort direction.
- [ ] Given Task list contains mixed Priority values, When I sort by Priority, Then ordering follows selected sort direction.
- [ ] Given some Tasks have no Due Date, When sorting by Due Date, Then undated Tasks are placed consistently according to defined product rule.

**Dependencies:**
- Story: US-009
- System: None
- Data: Task Due Date and Priority attributes
- Team: Product Manager (for null Due Date sort rule)

**Technical Notes:** Deterministic tie-break behavior required for predictable UI.
**Assumptions:** Null Due Date rule to be finalized before implementation.

### Story US-011: Assign and Edit Tags on Tasks
Label: Post-MVP
Priority: Should
Points: 5

As an Everyday Organizer,
I want to assign and edit Tags,
So that I can organize Tasks by context.

**Acceptance Criteria:**
- [ ] Given a Task is created or edited, When I provide Tag values and save, Then Tags are displayed on that Task.
- [ ] Given duplicate Tag variants, When saved, Then Tag presentation follows a consistent normalization rule.
- [ ] Given I remove a Tag and save, When Task refreshes, Then removed Tag is no longer displayed.

**Dependencies:**
- Story: US-003
- System: Browser Local Device Storage
- Data: Tag values
- Team: None

**Technical Notes:** Tag normalization rule must be documented for QA consistency.
**Assumptions:** Max Tag count and Tag length limits use technical spec defaults.

### Story US-012: Filter Tasks by Tag
Label: Post-MVP
Priority: Could
Points: 3

As an Everyday Organizer,
I want to filter Tasks by Tag,
So that I can focus on one context at a time.

**Acceptance Criteria:**
- [ ] Given Tasks contain Tags, When I select a Tag filter, Then only Tasks containing that Tag are shown.
- [ ] Given no Tasks match selected Tag, When filter is active, Then an appropriate empty filtered state is displayed.
- [ ] Given a Tag filter is active, When I clear it, Then default Task list view returns.

**Dependencies:**
- Story: US-011
- System: None
- Data: Tag index from Task data
- Team: None

**Technical Notes:** Filter criteria interaction with status filter should remain deterministic.
**Assumptions:** Combined filter precedence defined during refinement.

### Story US-013: Render Due Date in Local Timezone
Label: Post-MVP
Priority: Should
Points: 3

As an Everyday Organizer,
I want Due Date shown in local timezone,
So that deadlines are understandable.

**Acceptance Criteria:**
- [ ] Given a Task with saved Due Date exists, When displayed, Then Due Date is shown in local timezone format.
- [ ] Given timezone or daylight-saving context changes, When I reopen the Todo Application, Then displayed Due Date remains correctly interpreted from stored UTC value.
- [ ] Given invalid local clock settings, When rendering Due Date, Then the application still displays a deterministic formatted value.

**Dependencies:**
- Story: US-010
- System: Browser date/time services
- Data: UTC Due Date values
- Team: None

**Technical Notes:** Time handling behavior should be regression-tested across timezone transitions.
**Assumptions:** Locale remains English-only in Release 1.

## Epic: Quality, Accessibility & Security Hardening
Theme: Release Readiness
Business Objective: Ensure usable, secure, and testable product quality baseline.

### Story US-014: Accessibility Compliance for Core Flows
Label: MVP
Priority: Must
Points: 5

As an Everyday Organizer,
I want accessible task interactions,
So that I can use the Todo Application with keyboard and assistive tools.

**Acceptance Criteria:**
- [ ] Given I use keyboard-only navigation, When I execute create/edit/delete/toggle flows, Then all controls are reachable with visible focus.
- [ ] Given UI text and controls are displayed, When evaluated, Then contrast and semantic labels satisfy WCAG 2.1 AA criteria.
- [ ] Given validation or error occurs, When feedback is shown, Then it is perceivable by assistive technologies.

**Dependencies:**
- Story: US-001, US-003, US-005
- System: None
- Data: Accessibility test checklist
- Team: UX Designer, QA

**Technical Notes:** Accessibility verification is a release gate and cannot be deferred for MVP launch.
**Assumptions:** Design system tokens can meet contrast needs without major rework.

### Story US-015: Input Sanitization and Dependency Security Gate
Label: MVP
Priority: Must
Points: 3

As a Product Sponsor,
I want secure handling of user input and dependency quality checks,
So that Release 1 avoids critical security regressions.

**Acceptance Criteria:**
- [ ] Given user-entered Task text fields, When rendered, Then content is sanitized/encoded to prevent script injection.
- [ ] Given release candidate build, When dependency vulnerability scan runs, Then no known critical vulnerabilities are present.
- [ ] Given security controls fail, When release decision is made, Then release is blocked until remediation or approved exception.

**Dependencies:**
- Story: US-001
- System: Security scanning toolchain
- Data: Dependency vulnerability reports
- Team: Engineering, Security Reviewer

**Technical Notes:** Security checks integrated into CI/CD quality gates.
**Assumptions:** Security reviewer is available before release freeze.

## Epic: Observability, Metrics & Launch Governance
Theme: Measurable Delivery
Business Objective: Enable data-driven product decisions and controlled launch.

### Story US-016: Define KPI Instrumentation and Baseline Plan (Spike)
Label: MVP
Priority: Should
Points: ? (spike required)

As a Product Manager,
I want a validated KPI instrumentation and baseline plan,
So that engagement goals can be measured and managed.

**Acceptance Criteria:**
- [ ] Given KPI targets are defined without baselines, When spike completes, Then event definitions and baseline capture window are documented and approved.
- [ ] Given privacy constraints, When instrumentation is proposed, Then captured events exclude Task content.
- [ ] Given launch planning, When readiness is reviewed, Then named KPI owners and reporting cadence are confirmed.

**Dependencies:**
- Story: US-008
- System: Analytics/telemetry platform
- Data: KPI definitions and event taxonomy
- Team: Product Manager, Engineering, Legal/Privacy Reviewer

**Technical Notes:** This is a timeboxed discovery story to remove planning uncertainty.
**Assumptions:** Analytics platform selection is pending and required before implementation stories.

### 5. Domain & System Signals
#### Core Entities
- **Task:** User-managed item with title, optional Due Date, Priority, Tag set, and status.
- **Consent Record:** Local acknowledgment of Privacy Notice version.
- **View Criteria:** Selected Task filtering/sorting inputs used to project list view.

#### Key Actions
- **Create Task:** Everyday Organizer → Task, trigger: save from main screen, outcome: Active Task added.
- **Edit Task:** Everyday Organizer → Task, trigger: save update, outcome: Task attributes updated.
- **Toggle Task Status:** Everyday Organizer → Task, trigger: status toggle control, outcome: Active Task ↔ Completed Task.
- **Delete Task:** Everyday Organizer → Task, trigger: confirmed delete, outcome: permanent removal.
- **Acknowledge Privacy Notice:** Everyday Organizer → Consent Record, trigger: first-use acknowledgment, outcome: notice version stored.
- **Apply Filters/Sort:** Everyday Organizer → View Criteria, trigger: filter/sort selection, outcome: projected Task list.

#### State Transitions
- **Task:** Active Task → Completed Task on status toggle complete.
- **Task:** Completed Task → Active Task on status toggle reactivate.
- **Task:** Active Task/Completed Task → Deleted on confirmed delete.
- **Consent Record:** Unacknowledged → Acknowledged on Privacy Notice acceptance.

#### External Integrations
- **Browser Local Device Storage:** Persistence and hydration of Task and Consent Record data.
- **Static Hosting/CDN:** Delivery of Todo Application assets over HTTPS.
- **Analytics/Telemetry Platform (optional):** Non-task-content operational and KPI events.

#### Constraints
- **No remote Task content transfer** (Source: BRD FR-011, BR-005).
- **No authentication in Release 1** (Source: BRD scope constraints).
- **Web-only Release 1** (Source: BRD scope).
- **Accessibility target WCAG 2.1 AA** (Source: BRD NFR-UX-3).
- **Core action responsiveness and render targets** (Source: BRD NFR performance items).

#### System Events
- **TaskCreated:** Everyday Organizer saves valid Task → system persists locally → Task appears in Active Task list.
- **TaskCreationRejected:** Everyday Organizer submits empty title → system blocks create with inline validation.
- **TaskUpdated:** Everyday Organizer saves edit → system persists change → Task view refreshes with latest values.
- **TaskStatusChanged:** Everyday Organizer toggles status → system updates state → Task moves between Active and Completed views.
- **TaskDeleted:** Everyday Organizer confirms delete → system removes Task permanently.
- **TasksHydrated:** Todo Application starts → system loads Local Device Storage data → Task list restored.
- **StorageFailureDetected:** Todo Application read/write fails → system enters recoverable mode and displays warning.
- **PrivacyNoticeAcknowledged:** Everyday Organizer accepts Privacy Notice → system stores Consent Record.
- **ViewCriteriaApplied:** Everyday Organizer applies status/tag/sort criteria → system renders filtered/sorted projection.

### 6. MVP Cut Summary
**MVP Stories:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008, US-014, US-015, US-016

**Post-MVP Stories:** US-010, US-011, US-012, US-013

**MVP Rationale:**
- Covers end-to-end critical journey: create → view → edit → complete/reactivate → delete → persist on reopen.
- Includes mandatory trust/compliance/security controls for release viability.
- Includes accessibility and security quality gates required for launch.
- Defers advanced organization enhancements (sort/tag/time-localization refinements) that do not block core usability.

### 7. Sprint Plan
Capacity assumptions: **team size = 5 engineers, velocity = 40 points, sprint length = 2 weeks**

#### Sprint 1: Deliver Core Task Lifecycle and Durable Local Behavior
| Story ID | Title | Points |
|----------|-------|--------|
| US-001 | Create a Task from Main Screen | 3 |
| US-006 | Persist Tasks Across Refresh and Reopen | 5 |
| US-002 | View Active and Completed Tasks | 3 |
| US-004 | Toggle Task Completion Status | 2 |
| US-005 | Delete a Task with Confirmation | 3 |
| US-003 | Edit an Existing Task | 3 |
| US-015 | Input Sanitization and Dependency Security Gate | 3 |
Total: **22 / 40** points

Risks:
- Local Device Storage edge cases may cause unexpected degraded-mode behavior.
- Final copy for destructive-delete warnings may arrive late.

Capacity Notes:
- Remaining capacity reserved for integration hardening, defect fixes, and test automation.

#### Sprint 2: Complete MVP Trust, Accessibility, and Launch Readiness
| Story ID | Title | Points |
|----------|-------|--------|
| US-007 | Present Privacy Notice and Capture Consent Record | 3 |
| US-008 | Enforce No Remote Task Content Transfer | 3 |
| US-014 | Accessibility Compliance for Core Flows | 5 |
| US-016 | Define KPI Instrumentation and Baseline Plan (Spike) | ? (spike required) |
| US-009 | Filter Tasks by Status | 3 |
Total: **14 + spike / 40** points

Risks:
- Legal/privacy review timing may delay signoff for Privacy Notice and telemetry policy.
- Spike outcomes may trigger additional unplanned implementation stories.

Capacity Notes:
- Substantial slack remains to absorb spike follow-up, compliance fixes, and regression stabilization.

#### Sprint 3: Post-MVP Organization Enhancements
| Story ID | Title | Points |
|----------|-------|--------|
| US-010 | Sort Tasks by Due Date and Priority | 5 |
| US-011 | Assign and Edit Tags on Tasks | 5 |
| US-012 | Filter Tasks by Tag | 3 |
| US-013 | Render Due Date in Local Timezone | 3 |
Total: **16 / 40** points

Risks:
- Product decision pending for null Due Date sorting behavior.
- Cross-browser time rendering differences may require extra QA cycles.

Capacity Notes:
- Capacity supports additional UX polish or technical debt paydown.

**Backlog (Post-MVP):** US-010, US-011, US-012, US-013

### 8. Product Roadmap

#### Milestone 1 (MVP Foundation): Core Task Management Stable
- **Timeline:** Sprint 1
- **Includes:** US-001, US-002, US-003, US-004, US-005, US-006, US-015
- **Completion Criteria:** Core CRUD/status flows are stable, locally durable, and security baseline checks are in place.
- **Dependencies:** Browser Local Device Storage reliability, CI security scan integration.
- **Label:** MVP

#### Milestone 2 (MVP Release Readiness): Trust, Accessibility, and Measurement Setup
- **Timeline:** Sprint 2
- **Includes:** US-007, US-008, US-014, US-016, US-009
- **Completion Criteria:** Privacy Notice/Consent flow approved, no remote Task content transfer validated, accessibility criteria pass for core flows, KPI instrumentation plan finalized.
- **Dependencies:** Legal/privacy review, analytics platform selection.
- **Label:** MVP

#### Milestone 3 (Productivity Enhancements): Advanced Organization Experience
- **Timeline:** Sprint 3
- **Includes:** US-010, US-011, US-012, US-013
- **Completion Criteria:** Sorting, Tag management/filtering, and timezone rendering behaviors validated and released.
- **Dependencies:** Product rule confirmation for null Due Date sorting; timezone QA matrix.
- **Label:** Post-MVP

**Dependency Chain:** Milestone 1 → Milestone 2 → Milestone 3

### 9. Risks & Assumptions

**Risks**
1. Legal/privacy interpretation delays may block release approvals.
2. Browser storage quota/availability variability may impact reliability perception.
3. Open KPI baselines may reduce confidence in early product decisions.
4. Accessibility remediations can expand late if not tested continuously.
5. Pending product decisions (e.g., null Due Date sorting) may delay Post-MVP implementation.

**Assumptions**
1. BRD is authoritative over architecture/tech-spec details where conflicts arise.
2. Technical limits (title/tag constraints) from tech spec are acceptable unless Product overrides.
3. Analytics events, if enabled, exclude Task content completely.
4. Team can absorb spike outcomes within Sprint 2 remaining capacity.
5. English-only locale is acceptable for Release 1.
