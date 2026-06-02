# Plan: US-005 Delete a Task with Confirmation

## Goal
Add delete confirmation workflow so tasks are only removed after explicit confirmation, with warning text that deletion is permanent and cancellation preserves the task.

## Steps
1. Extend UI state in `App.tsx` to track deletion confirmation target and render a confirmation prompt with warning text.
2. Wire delete action to open confirmation modal/prompt and handle confirm/cancel flows, updating local storage on confirm only.
3. Add/adjust tests in `App.test.tsx` to cover confirm deletes, cancel preserves task, and warning copy.
4. Run tests/lint (or note limitations) to validate changes.
