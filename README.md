# Drone Mission Logs

A web application for logging and managing drone missions with integrated personnel, vehicle, and equipment tracking.

![React](https://img.shields.io/badge/React-18.3-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) ![Vite](https://img.shields.io/badge/Vite-6.3-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-cyan)

## Overview

Drone Mission Logs is a comprehensive mission management system that enables departments to track drone operations, including flight details, personnel assignments, vehicle/battery usage, weather conditions, and temporary flight restrictions (TFRs). The application uses Azure SSO for authentication and provides role-based access for Police, Fire, and IT departments.

## Features

- **Mission Management** - Create, update, and delete mission records with associated flights, personnel, and equipment
- **Roster Management** - Maintain master lists of personnel, vehicles, and batteries for quick reference
- **Multi-Department Support** - Separate data and access controls for Police, Fire, and IT departments
- **Flight Tracking** - Log multiple flights per mission with takeoff/landing timestamps
- **Equipment Tracking** - Track vehicle and battery assignments per mission
- **Weather Logging** - Record temperature, wind, and visibility conditions
- **TFR Management** - Document temporary flight restriction information
- **Filtering & Search** - Filter missions by date range, personnel, and search terms
- **Pagination** - Navigate large datasets with paginated views
- **Azure SSO** - Secure authentication via Microsoft Azure Active Directory

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- Azure AD tenant access for authentication

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd drone-mission-logs-vite-ts

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:6000/drone-missions`

## Configuration

### Environment Variables

The application uses hardcoded configuration in `src/config/index.ts`. Update the following constants as needed:

| Constant | Description | Default Value |
|----------|-------------|---------------|
| `APP_BASE` | Base path for routing | `/drone-missions` |
| `APP_TITLE` | Application title | `Drone Missions` |
| `NODE_ENV` | Environment mode | `production` |
| `CLIENT_ID` | Azure AD client ID | `ff3cbe5e-f332-4013-8fd5-d2e121c39af9` |

### Azure MSAL Configuration

Authentication configuration is in `src/context/Auth/config.ts`. The redirect URIs are environment-based:

- **Production (pdapps.franklintn.gov)**: `https://pdapps.franklintn.gov/drone-missions`
- **Production (fireapps.franklintn.gov)**: `https://fireapps.franklintn.gov/drone-missions`
- **Development**: Bypasses authentication with mock token

### API Endpoints

Base URLs are configured in `src/context/App/AppActions.ts`:

- **Development**: `https://cofasv38.franklin-gov.com/api/v2/pd/drone`
- **Production**: `https://pdapps.franklintn.gov/api/v2/pd/drone`

## Usage

### Development Mode

```bash
npm run dev
```

Development mode runs on port 6000 and bypasses Azure authentication using mock tokens.

### Production Build

```bash
npm run build
```

This runs TypeScript type checking followed by Vite build. Output is in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/          # React components organized by feature
│   ├── missions/       # Mission-related components
│   │   ├── containers/ # Container components for state/data
│   │   ├── forms/      # Create and update forms
│   │   └── tables/     # Table display components
│   ├── rosters/        # Roster management components
│   ├── form-elements/  # Reusable form components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── login/          # Authentication components
│   └── error/          # Error boundary components
├── context/            # Context providers and state management
│   ├── App/            # API actions and TypeScript types
│   └── Auth/           # Azure MSAL configuration
├── pages/              # Top-level page components
├── helpers/            # Custom hooks and utilities
├── utils/              # Utility functions and wrappers
├── config/             # Application configuration
├── assets/             # Static assets
└── test/               # Test setup and mocks
```

## Components

### Key Component Patterns

**Container Components** (`src/components/*/containers/`)
- Manage data fetching, filtering, and pagination
- Use React Query for server state
- Provide data to presentational components

**Form Components** (`src/components/*/forms/`)
- Use React Hook Form for validation and submission
- Split into `create/` and `update/` directories
- Each form includes sub-components, hooks, and utilities

**Context Providers**
- `MissionsProvider` - Manages mission filtering, pagination, and selection
- `RostersProvider` - Manages roster form state and filters

## Development

### Testing

```bash
npm run test
```

Tests are written using Vitest with React Testing Library. Test files are colocated with components using the `*.test.tsx` pattern.

### Linting

```bash
npm run lint
```

ESLint is configured with React and TypeScript rules.

### Type Checking

TypeScript strict mode is enabled. Type checking runs automatically during the build process.

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Server

```bash
npm run deploy
```

This command uses SCP to deploy the `dist/` directory to the configured remote server. Requires SSH access to `andrew@cofasv32`.

## API Structure

All API interactions are centralized in `src/context/App/AppActions.ts`. Key endpoints include:

| Resource | Endpoints | Methods |
|----------|-----------|---------|
| Missions | `/mission`, `/mission/:uuid` | GET, POST, PUT, DELETE |
| Flights | `/flight`, `/flight/:uuid` | POST, PUT, DELETE |
| Personnel | `/personnel`, `/personnel/:uuid` | POST, PUT, DELETE |
| Vehicles | `/vehicle`, `/vehicle/:uuid` | POST, PUT, DELETE |
| Batteries | `/battery`, `/battery/:uuid` | POST, PUT, DELETE |
| Weather | `/weather`, `/weather/:uuid` | POST, PUT |
| TFRs | `/tfr`, `/tfr/:uuid` | POST, PUT, DELETE |
| Rosters | `/vehicle-roster`, `/battery-roster`, `/personnel-roster` | GET, POST, PUT, DELETE |

All API calls require Bearer token authentication via Azure AD.
