# Chronos — Copilot Instructions

Purpose: Short, actionable guidance to help an AI coding agent be immediately productive in this repo.

---

## Big picture
- Chronos is a 2-tier app: a NestJS backend (Monorepo: `backend/`) and a React + Vite frontend (`frontend/`).
- State is persisted in MySQL via Prisma (`backend/prisma/schema.prisma`). Prisma client is generated and used via a `PrismaService` (see `backend/src/prisma/prisma.service.ts`).
- The app is intended to run in Docker Compose (see `docker-compose.yml`) for development: mysql (container port 3306, host mapped 3307), backend (3001), frontend (5300).

---

## Quick start (local / dev)
- Preferred (docker):
  - `docker compose up -d --build` — starts MySQL, backend and frontend. Backend entrypoint runs `npm install`, `npx prisma generate`, `npx prisma db push`, then `npm run start:dev`.
- Manual (backend):
  - cd `backend/`
  - `npm install`
  - `npx prisma generate` (regenerate client after schema changes)
  - `npx prisma db push` (or `npm run prisma:migrate` if creating migrations)
  - `npm run prisma:seed` to seed dev data (`kiss.janos@example.com` / `Password123!` are sample credentials)
  - `npm run start:dev`
- Manual (frontend):
  - cd `frontend/`
  - `npm install`
  - `npm run dev` (Vite server on port 5300)

---

## Important patterns & conventions (do not break)
- API prefix: backend sets a global prefix `app.setGlobalPrefix('api')` in `backend/src/main.ts`. Expect endpoints under `/api/*`.
- Authentication: global `JwtAuthGuard` is registered as an `APP_GUARD` (see `backend/src/app.module.ts`). Use `@Public()` on controllers/actions to bypass auth (see `backend/src/auth/public.decorator.ts`).
- DTOs + Validation: controllers rely on `class-validator` DTOs and a strict `ValidationPipe` configured with `whitelist: true` and `forbidNonWhitelisted: true`. Payloads must match DTOs exactly (see `backend/src/auth/dto/*.ts`).
- Prisma: `PrismaService` uses `@prisma/adapter-mariadb` and expects `DATABASE_URL` in `.env`. The constructor throws when `DATABASE_URL` is missing — ensure env is present in CI/dev.
- Passwords: registration and seed hashing use `argon2`. Auth endpoints return `{ user, accessToken }` where `accessToken` is a JWT signed with `JWT_SECRET` (see `backend/.env`).
- API error semantics: services throw Nest exceptions (`ConflictException`, `UnauthorizedException`, etc.) — keep consistent error types when adding code.

---

## Files & locations to check before changing behavior
- Backend app bootstrap & global wires: `backend/src/main.ts`, `backend/src/app.module.ts`
- Auth flow: `backend/src/auth/*` (controller, service, JWT strategy, guard, DTOs)
- DB models & seed: `backend/prisma/schema.prisma`, `backend/prisma/seed.ts`, `backend/prisma/migrations/`
- Prisma client wiring: `backend/src/prisma/prisma.service.ts`
- Scheduled jobs: `backend/src/scheduled/` (there is a `trust-level-audit.task.ts` file — currently empty and a logical place for cron jobs)
- Frontend entry & server port: `frontend/vite.config.ts` (port 5300), UI components in `frontend/src/components/` and pages in `frontend/src/pages/`

---

## Common tasks you may be asked to implement (hints)
- Add endpoints: follow Nest convention (module → controller → service), reuse DTOs and PrismaService for DB access.
- Add frontend API client: service files exist (`frontend/src/services/`) but are empty; follow a simple fetch/axios pattern and attach `Authorization: Bearer <token>` header for protected endpoints.
- Schema changes: edit `schema.prisma` → `npx prisma generate` → `npx prisma migrate dev` or `npx prisma db push` for quick sync; update `prisma/seed.ts` if needed.

---

## Devops & gotchas
- Docker Compose backend command runs `npx prisma db push` (not `migrate`) so local schema drift can exist if migrations are used — be explicit when changing migration strategy.
- `.env` contains `JWT_SECRET` and `DATABASE_URL`. Tests / CI should set a secure `JWT_SECRET` (current sample secret is in repo for convenience).
- `PrismaService` uses a MariaDB adapter despite a MySQL datasource string — leave adapter usage unless you intentionally change DB engine.

---

## When you open a pull request
- Mention any DB schema changes explicitly and include the sequence to apply migrations in your PR description.
- Add small, focused commits and update `prisma/seed.ts` if new required test data is needed.

---

If anything here is unclear or you want me to add examples (e.g., minimal frontend auth service implementation or an example controller change), tell me which part to expand and I will update this file. ✅
