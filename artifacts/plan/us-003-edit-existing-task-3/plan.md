# Implementation Plan — US-003 Edit an Existing Task

## Story Summary
Implement task editing so users can update title, due date, priority, and tags for an existing task, with immediate UI updates, inline title validation, and reliable last-write-wins behavior under rapid repeated saves.

## Scope
- Add edit mode to task rows/cards in the current task list UI.
- Support editing fields: title, due date, priority, tags.
- Validate title as required during edit save.
- Persist edits to local storage and reflect changes immediately in UI state.
- Ensure repeated quick saves result in the final saved state being shown.
- Add/adjust tests for all acceptance criteria.

## Out of Scope
- New task creation behavior changes.
- New filtering/sorting behaviors beyond preserving current behavior.
- Backend/network persistence.

## Implementation Steps
1. **Assess current task model and rendering path**
   - Confirm task type supports `title`, `dueDate`, `priority`, and `tags` (or equivalent) and storage serialization/deserialization path.
   - Identify where list items are rendered and where update handlers should be attached.

2. **Add edit UI state and controls**
   - Introduce per-task edit state in `App.tsx` (or extracted component if already present).
   - Render editable controls for title, due date, priority, and tags when in edit mode.
   - Provide save/cancel actions.

3. **Implement save/update flow with validation**
   - Add inline validation for empty title on save attempt.
   - Prevent save when validation fails and surface inline error near title control.
   - On valid save, immutably update task collection in state and persist via storage helper.

4. **Harden repeated-save behavior (last confirmed save wins)**
   - Keep save handler deterministic and based on latest form values.
   - Ensure state updates are derived from current state using functional updates to avoid stale closures.
   - Verify immediate post-save render reflects the latest saved values.

5. **Add/Update tests**
   - Test successful edit for title, due date, priority, and tags with immediate UI update.
   - Test empty title blocks save with inline validation.
   - Test rapid repeated saves and assert final displayed values match last save.

6. **Validation run**
   - Execute test suite, lint, and build; resolve any failures.

## Risks / Notes
- Existing tag representation may be string vs string[]; implementation will follow current code conventions.
- Date input/display formatting differences (ISO vs localized) may require explicit normalization in tests.

## Acceptance Criteria Traceability
1. Update and save fields show immediately → Steps 2, 3, 5
2. Empty title blocks save with inline validation → Steps 3, 5
3. Rapid repeated saves end with last confirmed save displayed → Steps 4, 5
