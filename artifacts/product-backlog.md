# Product Backlog — Todo App MVP

## Assumptions
- Product is a basic web Todo application for individual consumers.
- Scope aligned to BRD/Tech Spec: local-only storage, no auth, no reminders in R1.
- Stories are split to remain sprint-sized and testable.

## Epic 1: Task Management Core

### Story 1.1 — Create a task with required title and optional details
**As an** Everyday Organizer  
**I want** to create a task with a required title and optional due date, priority, and tags  
**So that** I can capture and organize work quickly.

**Acceptance Criteria (Given/When/Then)**
1. **Given** I am on the main page and the create form is visible, **when** I enter a title containing at least 1 non-whitespace character and select Save, **then** exactly one new task is added in Active status with the entered title.
2. **Given** the title input is empty or whitespace-only, **when** I select Save, **then** no task is created, an inline validation message is shown adjacent to the title field, and focus moves to (or remains on) the title input.
3. **Given** I provide any combination of due date, priority, and tags, **when** the task is saved successfully, **then** each provided value is displayed on the task item and persisted after page refresh.
4. **Given** task creation succeeds, **when** save completes, **then** all form fields reset to default values and keyboard focus returns to the title input within the same view.

---

### Story 1.2 — View task list and empty state
**As an** Everyday Organizer  
**I want** to see all tasks with clear status indicators  
**So that** I know what is pending and what is complete.

**Acceptance Criteria (Given/When/Then)**
1. **Given** at least one Active and one Completed task exist in storage, **when** I open or refresh the app, **then** both are rendered in the task list with distinct visual status indicators.
2. **Given** no tasks exist in storage, **when** I open the app, **then** an empty-state message is shown with a clear call-to-action to create the first task.
3. **Given** stored task data cannot be parsed or is unavailable, **when** the app loads, **then** the UI remains interactive, a non-blocking recoverable error message is shown, and the create-task flow remains usable.

---

### Story 1.3 — Toggle task completion status
**As an** Everyday Organizer  
**I want** to mark tasks complete or active in one interaction  
**So that** I can track progress.

**Acceptance Criteria (Given/When/Then)**
1. **Given** a task is in Active status, **when** I trigger Complete for that task, **then** that same task transitions to Completed status immediately in the UI.
2. **Given** a task is in Completed status, **when** I trigger Mark Active for that task, **then** that same task transitions back to Active status immediately in the UI.
3. **Given** I change a task’s status, **when** I refresh the app, **then** the most recently selected status is restored from storage for that task.

---

### Story 1.4 — Delete a task with confirmation
**As an** Everyday Organizer  
**I want** a confirmation step before permanent delete  
**So that** I avoid accidental task loss.

**Acceptance Criteria (Given/When/Then)**
1. **Given** a task exists in the list, **when** I select Delete, **then** a confirmation dialog appears identifying the target task before deletion occurs.
2. **Given** the confirmation dialog is open, **when** I confirm deletion, **then** the task is removed from the visible list and is no longer present after page refresh.
3. **Given** the confirmation dialog is open, **when** I cancel or dismiss the dialog, **then** no changes are made to the task and it remains visible.

---

## Epic 2: Editing & Organization

### Story 2.1 — Edit task details
**As an** Everyday Organizer  
**I want** to edit title, due date, priority, and tags  
**So that** my plans stay accurate as priorities change.

**Acceptance Criteria (Given/When/Then)**
1. **Given** an existing task is in edit mode, **when** I update one or more editable fields and save, **then** the task displays the new values immediately and the same values persist after refresh.
2. **Given** I remove all non-whitespace characters from title during edit, **when** I attempt to save, **then** save is blocked, a title validation message is shown, and the original task values remain unchanged.
3. **Given** I have unsaved edits, **when** I cancel edit mode, **then** all unsaved changes are discarded and the task reverts to its last saved values.

---

### Story 2.2 — Filter tasks by status
**As an** Everyday Organizer  
**I want** to filter tasks by All, Active, and Completed  
**So that** I can focus on relevant work.

**Acceptance Criteria (Given/When/Then)**
1. **Given** tasks include both Active and Completed statuses, **when** I select the Active filter, **then** only Active tasks are shown and no Completed task is visible.
2. **Given** tasks include both Active and Completed statuses, **when** I select the Completed filter, **then** only Completed tasks are shown and no Active task is visible.
3. **Given** any status filter is currently applied, **when** I select the All filter, **then** all tasks are shown regardless of status.

---

### Story 2.3 — Sort tasks by due date or priority
**As an** Everyday Organizer  
**I want** to sort tasks by due date or priority  
**So that** I can work in the most effective order.

**Acceptance Criteria (Given/When/Then)**
1. **Given** tasks have varying due dates, **when** I apply due-date sort, **then** tasks are displayed in a deterministic order according to configured sort direction.
2. **Given** tasks have varying priority levels, **when** I apply priority sort, **then** tasks are displayed according to a documented priority ranking rule.
3. **Given** some tasks have no due date, **when** due-date sort is active, **then** undated tasks are placed consistently at the defined start or end of the sorted list.

---

### Story 2.4 — Add and filter by tags
**As an** Everyday Organizer  
**I want** to assign tags and filter by tag  
**So that** I can organize tasks by context.

**Acceptance Criteria (Given/When/Then)**
1. **Given** I assign one or more tags to a task and save, **when** the save succeeds, **then** those tags are rendered on the task item and remain after refresh.
2. **Given** tasks include tags, **when** I apply a specific tag filter, **then** only tasks containing that tag are shown.
3. **Given** entered tags include mixed case and leading/trailing spaces, **when** the task is saved, **then** tags are normalized by the product rule and filtering uses the normalized value.

---

## Epic 3: Persistence, Privacy & Accessibility

### Story 3.1 — Persist tasks in local browser storage
**As an** Everyday Organizer  
**I want** my tasks restored in the same browser/device  
**So that** I keep my planning state between sessions.

**Acceptance Criteria (Given/When/Then)**
1. **Given** I create, edit, delete, or toggle tasks, **when** I refresh or relaunch in the same browser profile, **then** the latest saved state is restored.
2. **Given** I open the app in a different browser profile or device, **when** I view tasks, **then** prior tasks are not present and local-only behavior is communicated in-product.
3. **Given** browser storage for the app is cleared, **when** I relaunch the app, **then** no prior tasks are loaded and the empty state is displayed.

---

### Story 3.2 — Display and record privacy notice
**As a** privacy-conscious user  
**I want** clear local-only storage disclosure  
**So that** I understand where my task data is stored.

**Acceptance Criteria (Given/When/Then)**
1. **Given** first-time app usage or no recorded acknowledgment, **when** I enter the app, **then** a blocking privacy notice is shown before regular task interaction.
2. **Given** the privacy notice is displayed, **when** I explicitly acknowledge it, **then** acknowledgment is persisted locally and I can proceed to the main task experience.
3. **Given** a newer notice version is available than the stored acknowledgment version, **when** I next open the app, **then** I am required to acknowledge the updated notice again before using task features.

---

### Story 3.3 — Accessibility for core task flows
**As a** keyboard and assistive technology user  
**I want** to complete core task actions accessibly  
**So that** I can use the app without a mouse.

**Acceptance Criteria (Given/When/Then)**
1. **Given** I navigate using keyboard only, **when** I tab through the UI, **then** every interactive control in core flows is reachable in logical order with visible focus indication.
2. **Given** focus is in the create-task form, **when** I press Enter on submit, **then** task creation behavior and validation outcomes match pointer-based submission.
3. **Given** a task status changes, **when** using assistive technologies, **then** the updated state is exposed through semantic labels/attributes that can be programmatically determined.

---

## Prioritization (Suggested)
- **P0 (Sprint 1):** 1.1, 1.2, 1.3, 1.4, 3.1, 3.2
- **P1 (Sprint 2):** 2.1, 2.2, 2.3, 2.4, 3.3

## Dependencies
- Story 2.2 depends on Story 1.3 (status toggling).
- Story 2.3 depends on Story 1.1 and 2.1 (due date/priority data availability).
- Story 2.4 depends on Story 1.1 and 2.1 (tag creation/edit).
- Story 3.2 should be implemented before public release to satisfy privacy/compliance expectations.
