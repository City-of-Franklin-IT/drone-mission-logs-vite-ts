# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start dev server on port 6000
npm run build        # Type check and build for production
npm run preview      # Preview production build
```

### Testing
```bash
npm run test         # Run tests with Vitest
```

### Linting
```bash
npm run lint         # Run ESLint
```

### Deployment
```bash
npm run deploy       # Deploy to remote server (requires SSH access)
```

## Architecture Overview

This is a React + TypeScript drone mission logging application built with Vite. It uses Azure MSAL for authentication and communicates with a backend REST API.

### Application Structure

**Main Entities:**
- **Missions**: Core mission records with associated flights, personnel, vehicles, batteries, weather, TFRs, and inspections
- **Rosters**: Master lists of personnel, vehicles, and batteries that can be referenced in missions

**Key Technical Patterns:**
- Container/Component pattern: Containers handle data fetching and state management (in `containers/` dirs), while presentational components focus on UI
- Context + Reducer pattern for state management (see `MissionsCtx` and `RostersCtx`)
- React Query for server state management
- React Hook Form for form handling

### Path Aliases

The following path aliases are configured (defined in both `tsconfig.json` and `vite.config.ts`):
- `@/` - src root
- `@components/` - src/components
- `@config/` - src/config
- `@helpers/` - src/helpers
- `@pages/` - src/pages
- `@utils/` - src/utils
- `@assets/` - src/assets
- `@test/` - src/test (vitest only)

### Component Organization

Components are organized by feature domain:
- `src/components/missions/` - Mission-related components (tables, forms, containers)
- `src/components/rosters/` - Roster management components
- `src/components/form-elements/` - Reusable form components
- `src/components/layout/` - Layout components (Header, Footer, Layout)
- `src/components/login/` - Authentication forms
- `src/components/error/` - Error handling components

Within feature directories, components are organized by type:
- `containers/` - Container components that manage state and data
- `forms/` - Form components (split into `create/` and `update/` subdirectories)
- `tables/` - Table display components

Each component typically has:
- `index.tsx` - Main component
- `components.tsx` - Sub-components used only within this component
- `hooks.ts` - Custom hooks
- `utils.ts` - Utility functions
- `*.test.tsx` - Component tests

### State Management

**Page-Level Context:**
- `MissionsCtx` (`src/components/missions/context.tsx`) - Manages filtering, pagination, and selected mission UUID for the missions page
- `RostersCtx` (`src/components/rosters/context.tsx`) - Manages form state and filters for the rosters page

**Global Hooks:**
- `src/helpers/hooks.ts` contains authentication-related hooks:
  - `useGetToken()` - Manages MSAL token lifecycle
  - `useEnableQuery()` - Controls when React Query should run
  - `useGetUserDepartment()` - Fetches user's department from Microsoft Graph
  - `useUnauthRedirect()` - Redirects unauthorized users
  - Other auth-related hooks

### API Layer

All API calls are centralized in `src/context/App/AppActions.ts`. Each function:
- Takes form data and headers as parameters
- Returns a Promise with a typed response
- Is documented with JSDoc comments showing the HTTP method and endpoint

TypeScript interfaces for all API entities are defined in `src/context/App/types.ts`.

### Authentication

Uses Azure MSAL (Microsoft Authentication Library) for SSO:
- Configuration in `src/context/Auth/config.ts` with environment-based redirect URIs
- Development mode bypasses authentication (returns mock token)
- Production uses token refresh with automatic retry every 4 minutes
- Edge browser uses popup-based token acquisition; other browsers use silent refresh

### Environment Configuration

- `NODE_ENV` in `src/config/index.ts` determines API base URL and auth behavior
- Development uses `https://cofasv38.franklin-gov.com` API
- Production uses `https://pdapps.franklintn.gov` API
- Base path for routing is `/drone-missions`

### Styling

- Uses Tailwind CSS 4 with DaisyUI component library
- Tailwind configured via Vite plugin
- Component classes should follow Tailwind utility-first approach
- Props should be written inline (user preference)

### Testing

- Uses Vitest with jsdom environment
- Test setup in `src/test/setup.ts` includes global test mocks
- Test files colocated with components using `*.test.tsx` pattern
- Run tests with `npm run test`

### README.md
For README.md file creation use template at /opt/claude-standards/README_TEMPLATE.md as a guide