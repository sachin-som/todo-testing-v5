# Implementation Plan — US-004 Toggle Task Completion Status

## Story Summary
Enable users to toggle a task between Active and Completed states with immediate UI updates, persistence to local storage, and deterministic final state under rapid repeated toggles.

## Scope
- Add UI controls to mark active tasks as completed and completed tasks as active.
- Update in-memory task state and local storage on each toggle.
- Ensure task moves between Active and Completed sections immediately.
- Ensure rapid repeated toggles produce final status matching the last action.
- Add/extend tests to cover all acceptance criteria.

## Out of Scope
- Changes to task creation/edit validation.
- New filters/sorting beyond existing behavior.

## Implementation Steps
1. **Review current task rendering and status model**
   - Confirm existing `status: 'active' | 'completed'` model and section grouping logic.
   - Identify existing per-task action buttons and where toggle handlers should attach.

2. **Implement toggle handlers**
   - Add handler to mark an active task as completed.
   - Add handler to reactivate a completed task.
   - Use functional state updates to avoid stale state issues under rapid interactions.

3. **Persist toggles and error recovery behavior**
   - Persist updated task list via storage helper after each toggle.
   - Preserve current storage error messaging behavior on save failure.

4. **Update UI actions and immediate movement between sections**
   - Active section: add control (e.g., "Mark Complete").
   - Completed section: add control (e.g., "Mark Active").
   - Ensure task displays in the correct section immediately after action.

5. **Add/Update tests for US-004**
   - Test active → completed transition and immediate section change.
   - Test completed → active transition and immediate section change.
   - Test rapid repeated toggles and assert final status equals last action.

6. **Validation run**
   - Run test, lint, and build commands; fix issues until clean (or document environment limitation if blocked).

## Risks / Notes
- Existing edit controls introduced in US-003 should coexist with toggle controls; keep behavior independent and predictable.
- Section assertions in tests should target semantic headings/containers to avoid brittle selector coupling.

## Acceptance Criteria Traceability
1. Active task marked complete appears as Completed immediately → Steps 2, 4, 5
2. Completed task reactivated returns to Active → Steps 2, 4, 5
3. Rapid repeated toggling ends with final status matching last action → Steps 2, 5
