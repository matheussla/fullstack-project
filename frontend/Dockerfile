FROM node:20-alpine

WORKDIR /app

COPY package*.json yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3000

ENV VITE_API_URL=http://localhost:3001

CMD ["yarn", "start", "--host", "0.0.0.0"] 