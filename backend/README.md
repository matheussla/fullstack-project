# Backend

## API Documentation

The complete API documentation is available at: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

## Features

- JWT-based authentication
- Role-based access control
- PostgreSQL database with Prisma ORM
- Docker support
- TypeScript support

## Prerequisites

- Node.js (v20 or higher)
- Yarn or npm
- Docker and Docker Compose (optional)

## Project Structure

```
src/
├── auth/           # Authentication module
├── config/         # Configuration files
├── shared/         # Shared utilities and middleware
├── cases/          # Case management module
├── users/          # User management module
└── index.ts        # Application entry point
```

## Setup

### Local Development

1. Install dependencies:
```bash
yarn install
```

2. Generate Prisma client:
```bash
yarn prisma:generate
```

3. Run migrations:
```bash
yarn prisma:migrate
```

4. Run migrations:
```bash
yarn seed
```

5. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:3001`

### OR

### Docker Setup

1. Build and start the containers:
```bash
docker-compose up --build
```

The application will be available at `http://localhost:3001`

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/fullstack_db?schema=public"
JWT_SECRET="your-secret-key"
NODE_ENV="development"
URL=""
```