# Implementation Plan — US-001 Create a Task from Main Screen (Issue #1)

## Goal
Implement task creation from the main screen with required title validation, optional fields (due date, priority, tags), immediate list refresh, and local device persistence.

## Scope from Acceptance Criteria
1. Create active task with valid title and show in list.
2. Block submit when title is empty and show inline validation.
3. Save and display optional Due Date, Priority, and Tag values.
4. Show newly created task immediately without page reload.

## Assumptions
- Existing app stack and architecture follow docs in `artifacts/tech-spec.md` and current repository conventions.
- Persistence is browser local storage as specified.
- "Tag" may be represented as a single value or list depending on existing model; implementation will align with existing domain shape.

## Implementation Steps
1. **Codebase reconnaissance**
   - Inspect current source structure, task model, storage adapter, and UI composition.
   - Identify where main screen form and task list are wired.

2. **Define/extend task creation contract**
   - Ensure task entity supports: `title` (required), `details` (optional), `dueDate` (optional), `priority` (optional), `tag(s)` (optional), `status=active`, and stable id/timestamps if used.
   - Keep compatibility with existing data shape.

3. **Implement create-task UI flow**
   - Add/adjust main screen create form fields.
   - Add submit handling with inline validation for empty title.
   - Map form values to task creation payload.

4. **Persist created tasks locally**
   - Wire creation path to local storage repository/service.
   - Ensure append/save logic keeps existing tasks and writes valid JSON structure.

5. **Render created task and optional metadata**
   - Ensure task list updates reactively after successful submit.
   - Display optional due date/priority/tag values when present.

6. **Testing**
   - Add/extend tests covering all ACs:
     - successful creation and list render
     - blocked empty-title submission + inline validation
     - optional fields persisted and displayed
     - immediate in-session visibility after save (no reload)
   - Include storage interaction assertions where current testing patterns permit.

7. **Validation run**
   - Run lint, tests, and build.
   - Fix issues until clean.

## Deliverables
- Updated UI and domain/storage code for task creation.
- Tests proving acceptance criteria.
- Plan/todo artifacts for traceability.
