import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import { config, swaggerOptions } from './config';
import routes from './routes';
import { errorHandler } from './shared/errors';
import { logger } from './shared/logger';

const app = express();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOptions.definition));

app.get('/health', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/', routes);

app.use(errorHandler);

const PORT = config.port || 3001;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
