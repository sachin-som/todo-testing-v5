# Implementation Plan — US-002 View Active and Completed Tasks (Issue #2)

## Goal
Allow users to view tasks with clear active/completed distinction, show an empty state when no tasks exist, and handle unavailable/corrupted local storage gracefully without crashing.

## Acceptance Criteria Mapping
1. Active and Completed tasks are visually distinguishable.
2. Empty state prompt appears when no tasks exist.
3. If local storage is unavailable/corrupted, show recoverable error and keep app running.

## Implementation Steps
1. **Review current app state and task rendering**
   - Confirm current task model and list rendering behavior.
   - Identify UI structure to separate active/completed sections.

2. **Storage error handling hardening**
   - Refactor storage access into safe read/write helpers returning typed results.
   - Detect and recover from invalid JSON (corruption) by falling back to empty tasks.
   - Catch storage access exceptions (e.g., unavailable localStorage) and propagate user-safe error message.

3. **UI updates for status distinction**
   - Render separate sections for Active and Completed tasks, or equivalent clear visual distinction (labels/styles).
   - Add status badge/label styling for clear differentiation.

4. **Empty state UX**
   - When no tasks exist, render a prominent prompt to create first task.

5. **Recoverable error messaging**
   - Surface non-fatal banner/message when storage read fails.
   - Ensure core app interactions continue in-memory.

6. **Tests**
   - Add tests for:
     - Distinct rendering for active vs completed tasks.
     - Empty state display.
     - Corrupted storage recovery + message + no crash.
     - Storage unavailable recovery + message + no crash.

7. **Validation**
   - Run lint, tests, and build; fix issues.

## Deliverables
- Updated storage module with robust error handling.
- Updated App UI for active/completed distinction and empty state.
- New/updated tests covering US-002 acceptance criteria.
- Plan/todo artifacts under `artifacts/plan/us-002-view-active-completed-tasks-2/`.
