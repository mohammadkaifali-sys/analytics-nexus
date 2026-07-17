# Nexus Analytics - Enterprise Frontend Architecture

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Icons**: Lucide React
- **Tables**: TanStack Table (v8)
- **State Management**: Zustand
- **Theme**: Dark Mode (Default)

## Project Structure
```text
/
├── app/
│   ├── (auth)/
│   │   └── login/
│   │       └── page.tsx           # SCREEN_14
│   ├── (dashboard)/
│   │   ├── layout.tsx             # Shared Layout
│   │   ├── page.tsx               # SCREEN_5
│   │   ├── sales/                 # SCREEN_11
│   │   ├── customer/              # SCREEN_3
│   │   ├── finance/               # SCREEN_13
│   │   ├── ai-insights/           # SCREEN_9
│   │   ├── forecast/              # SCREEN_15
│   │   ├── reports/               # SCREEN_7
│   │   └── settings/              # SCREEN_16
│   └── globals.css
├── components/
│   ├── charts/                    # Reusable Recharts wrappers
│   ├── dashboard/                 # Dashboard specific components
│   ├── layout/                    # SideNavBar, TopNavBar, BottomNav
│   ├── shared/                    # KPI Cards, Stat blocks
│   └── ui/                        # shadcn/ui primitives
├── hooks/
├── lib/
│   ├── mock-data/
│   └── utils.ts
├── store/                         # Zustand stores
└── types/
```

## Design System Tokens (Tailwind Config Extension)
- **Colors**:
  - `surface`: #0c1324
  - `primary`: #06b6d4 (Cyan)
  - `secondary`: #a855f7 (Purple)
  - `accent`: #f43f5e (Rose)
- **Typography**: Inter (Sans-serif)
- **Border Radius**: 0.5rem (ROUND_EIGHT)
