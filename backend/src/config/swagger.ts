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
      schemas: {
        Case: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            comments: {
              type: 'array',
              items: {
                type: 'string',
              },
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        CreateCase: {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            name: {
              type: 'string',
              example: 'Case Name',
            },
            description: {
              type: 'string',
              example: 'Case Description',
            },
            comments: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['Comment 1', 'Comment 2'],
            },
          },
        },
        UpdateCase: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              example: 'Updated Case Name',
            },
            description: {
              type: 'string',
              example: 'Updated Case Description',
            },
            comments: {
              type: 'array',
              items: {
                type: 'string',
              },
              example: ['Updated Comment 1', 'Updated Comment 2'],
            },
          },
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
      '/cases': {
        get: {
          tags: ['Cases'],
          summary: 'Get all cases',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'page',
              in: 'query',
              schema: {
                type: 'integer',
                default: 1,
              },
            },
            {
              name: 'limit',
              in: 'query',
              schema: {
                type: 'integer',
                default: 10,
              },
            },
          ],
          responses: {
            '200': {
              description: 'List of cases',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: {
                      $ref: '#/components/schemas/Case',
                    },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Cases'],
          summary: 'Create a new case',
          security: [{ bearerAuth: [] }],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/CreateCase',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Case created successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Case',
                  },
                },
              },
            },
          },
        },
      },
      '/cases/{id}': {
        put: {
          tags: ['Cases'],
          summary: 'Update a case',
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
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/UpdateCase',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Case updated successfully',
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/Case',
                  },
                },
              },
            },
            '404': {
              description: 'Case not found',
            },
          },
        },
        delete: {
          tags: ['Cases'],
          summary: 'Delete a case',
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
              description: 'Case deleted successfully',
            },
            '404': {
              description: 'Case not found',
            },
          },
        },
      },
    },
  },
  apis: ['./src/**/*.ts'],
};
