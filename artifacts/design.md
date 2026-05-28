# Lo-Fi Wireframe Plan

## Scope
- Single-page wireframe for a web-based personal todo app.
- Core regions mapped from BRD and sitemap-like task flow:
  - header / app title
  - task creation form
  - filter and sort controls
  - task list with active and completed states
  - edit / complete / delete actions
  - privacy / local-only storage note
  - empty / error / confirmation states

## Assumptions
- No separate sitemap file was present, so the wireframe focuses on the main application screen implied by the BRD and current todo story.
- The design should emphasize the main task-management flow rather than secondary pages.
- Since Release 1 is local-only and no login is required, no account or sync surfaces are included.

## Requirement-to-UI Mapping
- FR-001, FR-002: task form with title plus optional due date, priority, and tags; inline validation state.
- FR-003: task list showing active and completed items with clear status distinction.
- FR-004: edit affordance and edit panel/state.
- FR-005: completion toggle on each task.
- FR-006: delete action with confirmation state.
- FR-007, FR-011, NFR-SEC-3, NFR-PRIV-1: local-only storage notice and persistence reminder.
- FR-008, FR-009: filters for status, sort controls, and tag filter chips.
- US-002: empty state prompt and recoverable error state.

## Structural Notes
- Keep the page as one continuous top-to-bottom HTML wireframe.
- Use real controls for buttons, inputs, selects, checkboxes, and links.
- Use short labels and placeholders only; detailed copy stays suppressed.
- Add `data-req` attributes and comments for traceability.

## Output Intent
- A single HTML file using Tailwind CDN.
- Monochrome grayscale wireframe styling.
- Light interaction via in-page state toggles if needed.
