# Plan: Delete Task with Confirmation (Issue #5)

## Context
Implement deletion of tasks with a confirmation step. Confirmation must include warning text, allow cancel to keep task, and on confirm remove task from UI and local storage.

## Assumptions
- Confirmation UI can be an inline panel within the task card (no modal dependency).
- Deleting a task should close any edit state and remove it from active/completed lists immediately.

## Tasks
1. Review task rendering and state management to decide where delete confirmation state lives.
2. Add delete confirmation UI with warning text and confirm/cancel actions.
3. Implement delete handler to remove task and persist updated storage.
4. Update tests to cover confirm delete, cancel delete, and warning text.
5. Verify styling (if needed) and ensure accessibility labels for new controls.
