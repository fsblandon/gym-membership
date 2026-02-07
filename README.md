# 🏋️ Gym Membership Management – Monorepo

Simple gym management system to handle members, memberships, plans, and check-ins.

## 🧱 Tech Stack

- **Monorepo:** Nx + pnpm
- **Backend:** Node.js, Express, Prisma
- **Frontend:** React + Vite + React Router
- **Database:** PostgreSQL (Docker)
- **ORM:** Prisma

---

## 📦 Prerequisites

Make sure you have installed:

- Node.js **>= 18**
- pnpm **>= 8**
- Docker & Docker Compose

Verify:

```bash
node -v
pnpm -v
docker -v
docker compose version
```

## Project structure
apps/
 ├─ api/        # Express + Prisma backend
 └─ web/        # React + Vite frontend

## Database
### Start using Docker
```bash
docker compose up -d db
```
### Database URL
```bash
postgresql://postgres:postgres@localhost:5432/fitness
```

## Install dependencies
```bash
pnpm install
```

## Prisma
### Run Migrations
```bash
cd apps/api
pnpm prisma migrate dev
```

### Seed initial plans
```bash
npx pnpm prisma db seed
```

## Run Backend(API)
```bash
pnpm dev
```
Backend is available at:
```bash
http://localhost:3333
```

## Run Frontend(WEB)
```bash
pnpm dev
```

Frontend is available at:
```bash
http://localhost:4200
```

## Solution Diagram
![Solution Diagram](https://drive.google.com/file/d/1MQN_dInnotq7c5zfGIUzq8PZ5Qek2fhN/view)


## Proposed Schema
```bash
model Member {
  id       Int      @id @default(autoincrement())
  name     String
  email    String   @unique
  createAt DateTime @default(now())

  memberships Membership[]
  checkins    CheckIn[]
}

model Plan {
  id          Int          @id @default(autoincrement())
  name        String
  memberships Membership[]
}

model Membership {
  id        Int       @id @default(autoincrement())
  memberId  Int
  planId    Int
  startDate DateTime
  endDate   DateTime?

  member Member @relation(fields: [memberId], references: [id])
  plan   Plan   @relation(fields: [planId], references: [id])

  @@index([memberId])
}

model CheckIn {
  id       Int      @id @default(autoincrement())
  memberId Int
  date     DateTime @default(now())

  member Member @relation(fields: [memberId], references: [id])
}
```