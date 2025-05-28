import { SwaggerOptions } from 'swagger-ui-express';

import { config } from './index';

export const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fullstack Project API',
      version: '1.0.0',
      description: 'A robust fullstack project API with authentication and user management',
    },
    servers: [
      {
        url: config.URL,
        description: `${config.nodeEnv} server`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    paths: {
      '/auth/login': {
        post: {
          tags: ['Authentication'],
          summary: 'Login user',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['email', 'password'],
                  properties: {
                    email: {
                      type: 'string',
                      example: 'admin@example.com',
                    },
                    password: {
                      type: 'string',
                      example: 'admin123',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Successful login',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: {
                        type: 'string',
                      },
                      user: {
                        type: 'object',
                        properties: {
                          id: {
                            type: 'string',
                          },
                          name: {
                            type: 'string',
                          },
                          email: {
                            type: 'string',
                          },
                          role: {
                            type: 'string',
                            enum: ['ADMIN', 'EDITOR', 'VIEWER'],
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/users': {
        post: {
          tags: ['Users'],
          summary: 'Create a new user',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['name', 'email', 'password', 'role'],
                  properties: {
                    name: {
                      type: 'string',
                      example: 'User Name',
                    },
                    email: {
                      type: 'string',
                      example: 'user@example.com',
                    },
                    password: {
                      type: 'string',
                      example: 'user123',
                    },
                    role: {
                      type: 'string',
                      enum: ['ADMIN', 'EDITOR', 'VIEWER'],
                      example: 'VIEWER',
                    },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User created successfully',
            },
          },
        },
      },
      '/users/{id}': {
        delete: {
          tags: ['Users'],
          summary: 'Delete a user',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'string',
              },
            },
          ],
          responses: {
            '204': {
              description: 'User deleted successfully',
            },
            '404': {
              description: 'User not found',
            },
          },
        },
      },
    },
  },
  apis: ['./src/**/*.ts'],
};
