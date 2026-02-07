# apps/web/Dockerfile
FROM node:20-alpine

WORKDIR /app
RUN corepack enable

COPY package.json pnpm-lock.yaml ./
COPY apps/web/package.json apps/web/

RUN pnpm install
COPY . .

EXPOSE 5173
CMD ["pnpm", "preview:web"]
