# ANTIGRAVITY Documentation

## Token Mapping System
This document tracks the conversion from Figma Semantic Variables to Tailwind CSS classes used in the project.

### Colors
| Figma Variable | Recursive Primitive | Tailwind Token | Usage |
| :--- | :--- | :--- | :--- |
| **Primary** | `#CCFF00` | `brand-lime` | Main actions, Active icons, Highlights |
| **Surface** | `#000000` | `brand-black` | Primary Buttons, Sidebar Active BG, Titles |
| **Background** | `#F9FAFB` | `ui-bg` | App background |
| **Card BG** | `#FFFFFF` | `ui-card` | Widgets, KPI Cards |
| **Text Primary** | `#111827` | `text-primary` | Headings, Strong text |
| **Text Secondary**| `#6B7280` | `text-secondary`| Descriptions, Meta data |
| **Success** | `#22C55E` | `status-success`| Positive values (Income) |
| **Danger** | `#EF4444` | `status-danger` | Negative values (Expenses) |

### Shapes
| Token | Value | Usage |
| :--- | :--- | :--- |
| `rounded-pill` | `9999px` | Buttons, Inputs, Status Badges |
| `rounded-card` | `1.5rem` | Dashboard Widgets, KPI Cards |

### Typography
- **Family**: Inter (Google Fonts)
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

## Component Rules
### Sidebar
- **Expanded**: Width `64` (16rem). Shows Logo, Links with Text, User Profile.
- **Collapsed**: Width `20` (5rem). Shows Logo Icon, Centered Icons, User Avatar.
- **Active State**: `bg-brand-black` + `text-text-inverse`. Icon is `text-brand-lime`.
- **Inactive State**: Transparent bg. Text/Icon `text-text-secondary` -> Hover: `bg-brand-gray-100`.
