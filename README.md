# Drone Mission Logs

A React application built with Vite and TypeScript for documenting drone operations by FAA Part 107 licensed pilots for Franklin Police Department and Franklin Fire Department staff.

## Live Application

**Production:** [https://pdapps.franklintn.gov/drone-missions](https://pdapps.franklintn.gov/drone-missions)
**Production:** [https://fireapps.franklintn.gov/drone-missions](https://fireapps.franklintn.gov/drone-missions)

## Tech Stack

- **Frontend Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **State Management:** @tanstack/react-query v4
- **Routing:** React Router
- **Authentication:** SSO via Microsoft Entra

## API

- **Production API:** `https://api.franklin-gov.com/api/v2/pd` | [GitHub Repository](https://github.com/City-of-Franklin-IT/pd-api-ts)
- **Proxy:** `https://pdapps.franklintn.gov/api/v2/pd`
- **API Documentation:** [https://pdapps.franklintn.gov/api/v2/pd/api-docs](https://dev.franklintn.gov/api/v2/pd/api-docs)

## Database

**SQL Server Database:** `[PDDBV05].[DroneMissionLogs]`

## Features

- Mission logging and tracking for drone operations
- Mission search and filtering with pagination
- Detailed mission reports and documentation

```
src/
├── assets/          # Static assets (icons, images)
├── components/      # Reusable UI components
├── context/         # React context providers (Auth, etc.)
├── helpers/         # Utility functions and custom hooks
├── pages/           # Page components
```

## Recent Updates

- Migrated from react-query v3 to @tanstack/react-query v4
- Enhanced authentication flow for Edge browser compatibility
- Improved pagination functionality
- Updated header component layout

## License

Proprietary - City of Franklin, Tennessee