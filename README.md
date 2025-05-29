# Fullstack Project

A modern fullstack application built with React, Node.js, and PostgreSQL.

## Technologies

### Frontend
- React 18
- TypeScript
- Material-UI (MUI) 7
- React Query
- React Router DOM
- Axios
- Vite
- React Toastify

### Backend
- Node.js
- Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- Swagger/OpenAPI
- Docker

## Features

- JWT-based authentication
- Role-based access control (ADMIN, EDITOR, VIEWER)
- Case management system
- User management
- RESTful API with OpenAPI documentation
- Docker containerization
- PostgreSQL database
- Modern and responsive UI

## Prerequisites

- Docker and Docker Compose
- Node.js (v20 or higher)
- Yarn or npm

## Getting Started

1. Clone the repository:
```bash
git clone <git@github.com:matheussla/fullstack-project.git>
cd fullstack-project
```

2. Start the application using Docker Compose:
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- API Documentation: http://localhost:3001/api-docs
- PostgreSQL: localhost:5432

## Default Users

The system comes with the following default users:

1. Admin User
   - Email: admin@example.com
   - Password: admin123
   - Role: ADMIN

2. Editor User
   - Email: editor@example.com
   - Password: editor123
   - Role: EDITOR

3. Viewer User
   - Email: viewer@example.com
   - Password: viewer123
   - Role: VIEWER

## Project Structure

```
fullstack-project/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/     # Page components
│   │   ├── services/  # API services
│   │   ├── hooks/     # Custom React hooks
│   │   ├── contexts/  # React contexts
│   │   ├── types/     # TypeScript type definitions
│   │   └── utils/     # Utility functions
│   └── ...
├── backend/           # Node.js backend application
│   ├── src/
│   │   ├── modules/   # Feature modules
│   │   ├── config/    # Configuration files
│   │   ├── shared/    # Shared utilities
│   │   └── ...
│   └── ...
└── docker-compose.yml # Docker configuration
```

## License

This project is licensed under the MIT License.