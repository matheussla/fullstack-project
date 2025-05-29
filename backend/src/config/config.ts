import dotenv from 'dotenv';

dotenv.config();

export const config = {
  databaseUrl:
    process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/fullstack_db',
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3001,
  URL: process.env.URL || 'http://localhost:3001',
  nodeEnv: process.env.NODE_ENV || 'development',
  apiPrefix: process.env.API_PREFIX || '/api/v1',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
};
