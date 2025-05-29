FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3001

ENV DATABASE_URL="postgresql://postgres:postgres@db:5432/fullstack_db?schema=public"
ENV NODE_ENV=development

# Create startup script in a location that won't be overwritten by volume mount
RUN echo '#!/bin/sh' > /start.sh && \
    echo 'echo "Waiting for database..."' >> /start.sh && \
    echo 'sleep 5' >> /start.sh && \
    echo 'echo "Running Prisma migrations..."' >> /start.sh && \
    echo 'yarn prisma migrate deploy' >> /start.sh && \
    echo 'echo "Running Prisma generate..."' >> /start.sh && \
    echo 'yarn prisma generate' >> /start.sh && \
    echo 'echo "Seeding database..."' >> /start.sh && \
    echo 'yarn seed' >> /start.sh && \
    echo 'echo "Starting application..."' >> /start.sh && \
    echo 'yarn dev' >> /start.sh && \
    chmod +x /start.sh

ENTRYPOINT ["/bin/sh", "/start.sh"] 