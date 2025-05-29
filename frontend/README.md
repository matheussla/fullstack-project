# Frontend

## Features

- React-based single page application
- Material-UI (MUI) for modern UI components
- TypeScript support
- React Query for efficient data fetching
- React Router for navigation
- Docker support
- Responsive design
- Toast notifications

## Prerequisites

- Node.js (v20 or higher)
- Yarn or npm
- Docker and Docker Compose (optional)

## Project Structure

```
src/
├── components/    # Reusable UI components
├── pages/         # Page components
├── services/      # API services
├── hooks/         # Custom React hooks
├── contexts/      # React contexts
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── App.tsx        # Application entry point
```

## Setup

### Local Development

1. Install dependencies:
```bash
yarn install
```

2. Start the development server:
```bash
yarn start
```

The application will be available at `http://localhost:3000`

### OR

### Docker Setup

1. Build and start the containers:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3000`

## Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL="http://localhost:3001"
```

## Available Scripts

- `yarn start`: Runs the app in development mode
- `yarn build`: Builds the app for production
- `yarn test`: Launches the test runner
- `yarn eject`: Ejects from Create React App

## Dependencies

- React 18
- Material-UI (MUI) 7
- React Query
- React Router DOM
- Axios
- TypeScript
- React Toastify
