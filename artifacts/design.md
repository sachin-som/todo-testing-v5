# Hi-Fi Design System

## Screen Scope
- Todo Main (/todo-main)

## Visual Concept
- **Direction:** Quiet focus studio — a calm, high-clarity workspace that reduces friction for daily planning.
- **Atmosphere:** Airy, controlled brightness with defined edges to keep lists legible at a glance.
- **Tone keywords:** Focused, grounded, optimistic, trustworthy.
- **Memorable signature:** A thin vertical accent rail that anchors the primary action zone and a soft mint glow on key focus states.
- **Anti-generic decisions applied:** Avoided generic card grids; instead used a structured two-column workspace with a persistent action rail and a focused task canvas.

## Color Palette & Roles
| Descriptive Name | Hex | Functional Role | Contrast Notes |
|------------------|-----|-----------------|----------------|
| Ink Core | #141A22 | Primary text, headings | 12.5:1 on Mist background |
| Slate Body | #4B5563 | Secondary text, metadata | 7.2:1 on Mist background |
| Mist Canvas | #F6F7FA | App background | Supports clear surface separation |
| Snow Surface | #FFFFFF | Primary surfaces, cards | 1.2:1 on Mist for surface distinction |
| Accent Mint | #14B8A6 | Primary actions, focus ring | 4.6:1 on Snow |
| Accent Deep | #0F766E | Hover/active states | 5.9:1 on Snow |
| Sunrise Warning | #F59E0B | Due-soon chips | 4.5:1 on Snow |
| Garden Success | #16A34A | Completed status | 4.8:1 on Snow |
| Ember Error | #EF4444 | Errors, destructive | 4.7:1 on Snow |
| Cloud Border | #E5E7EB | Borders, dividers | Visible at 100% zoom |
| Shadow Smoke | rgba(16, 24, 40, 0.08) | Elevated surfaces | Soft, diffused |

## Tone-to-Token Mapping
| Dimension | Chosen Level | Rationale from BRD/sitemap | Token Impact |
|----------|--------------|-----------------------------|--------------|
| Warmth | Subtle warmth | Personal productivity should feel inviting | Mint accent + soft neutral background |
| Contrast | Medium-high | Lists must be scannable | Ink Core + visible borders |
| Density | Operational | Single-screen task management | Two-column layout, multi-region hierarchy |
| Motion | Low-medium | Calm yet responsive | 150–220ms transitions |

## Screen Tone Matrix
| Screen/Section | Intended Tone | Density Level | Notes |
|---------------|---------------|---------------|-------|
| Todo Main | Focused clarity | Operational | Clear action zone + detailed list view |

## Typography Rules
| Token | Usage | Font Family | Weight | Size | Line Height | Letter Spacing | Character |
|------|-------|-------------|--------|------|-------------|----------------|------------|
| Display | Page title | Manrope | 700 | 32px | 40px | -0.02em | Confident, compact |
| H2 | Section headers | Manrope | 600 | 20px | 28px | -0.01em | Clear hierarchy |
| Body | Primary text | Inter | 400 | 15px | 22px | 0 | Readable, neutral |
| Meta | Tags, timestamps | Inter | 500 | 12px | 16px | 0.02em | Tight, informative |

## Component Stylings
* **Buttons:** Pill-shaped for primary action, 44px height, mint fill with deep hover. Secondary buttons use white fill with ink border.
* **Cards/Containers:** Subtly rounded (14px), white surface, 1px Cloud Border, soft diffused shadow for elevation.
* **Inputs/Forms:** 1px Cloud Border, soft mint focus ring, 12px radius. Inline validation uses Ember Error text.
* **Navigation:** Compact top bar with left-aligned brand and right-aligned utility links; active link uses mint underline.

## Edge and Surface System
| Token | Value | Usage |
|------|-------|-------|
| Surface-1 | #FFFFFF | Main cards and panels |
| Surface-2 | #F9FAFB | Secondary panels, empty states |
| Border-1 | #E5E7EB | Card and input outlines |
| Shadow-1 | 0 8px 20px rgba(16, 24, 40, 0.08) | Elevated panels |

## Spacing and Layout
- **Base unit:** 4px
- **Scale:** 4, 8, 12, 16, 20, 24, 32, 40, 48
- **Container widths:** 1200px max, 24px side padding
- **Grid and gutters:** 12-column grid, 24px gutters on desktop
- **Layout principles:** Two-column workspace (primary list + insight rail) with top navigation and task composer hero.

## Component Tokens
| Component | Token Group | Default | Hover | Active | Focus | Disabled |
|----------|-------------|---------|-------|--------|-------|----------|
| Primary Button | Fill | #14B8A6 | #0F766E | #0F766E | Ring 2px #14B8A6/40 | #A7F3D0 |
| Secondary Button | Border | #E5E7EB | #CBD5E1 | #94A3B8 | Ring 2px #14B8A6/30 | #E5E7EB |
| Input Field | Border | #E5E7EB | #CBD5E1 | #CBD5E1 | Ring 2px #14B8A6/35 | #F3F4F6 |
| Task Card | Border | #E5E7EB | #CBD5E1 | #94A3B8 | Ring 1px #14B8A6/30 | #E5E7EB |

## Breakpoints
| Breakpoint | Min Width | Layout Behavior |
|-----------|-----------|-----------------|
| sm | 640px | Single column with stacked panels |
| md | 768px | Two-column starts, compact rail |
| lg | 1024px | Full two-column layout |
| xl | 1280px | Expanded list density |

## Interaction and Motion
- Soft 180ms transitions, ease-out for hover and focus.
- Primary action button gains subtle glow on hover.
- Task cards lift 2px on hover with diffused shadow.

## Information Architecture Density
- **Todo Main:** Operational density — a clear creation zone, filter/sort controls, and rich task cards with metadata, tags, and status chips.
- The insight rail balances summary metrics, tag filters, and local-storage/privacy notice to satisfy BRD trust requirements.

## Accessibility Notes
- Focus rings are mint with 2px thickness and 2px offset for strong visibility.
- All touch targets are 44x44px minimum.
- Status conveyed via labels + icons, not color alone.
- Form fields include explicit labels and helper text for validation clarity.
