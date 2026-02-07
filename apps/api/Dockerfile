FROM node:20-alpine

WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/

RUN pnpm install

COPY . .

EXPOSE 3333

CMD ["pnpm", "dev"]
