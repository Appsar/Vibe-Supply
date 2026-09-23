# Vibe Supply

A full-stack e-commerce site for streetwear, built as a school project using Angular, TypeScript, Express, and SQLite.

## Features

- Product catalog with search, category browsing, and product detail pages
- Shopping cart with persistent storage (localStorage)
- Checkout flow (Kunduppgifter form, per wireframe)
- User registration/login (JWT-based auth)
- Admin panel — view all products, add new products, delete products
- "Nyhet" badge on products added within the last 7 days
- Responsive design (mobile, tablet, desktop)

## Tech stack

- **Frontend**: Angular 21 (standalone components, signals), TypeScript, Tailwind CSS v4
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite (via better-sqlite3)
- **Auth**: JWT + bcrypt

See `AGENTS.md` for full project structure and conventions.

## Setup

1. Install dependencies:

```bash
   cd backend && npm install
   cd ../frontend && npm install
```

2. Seed the database (creates `vibe-supply.db` with sample products):

```bash
   cd backend
   npx tsx src/db/seed.ts
```

3. Start the backend (keep this terminal running):

```bash
   npx tsx src/server.ts
```

Runs on `http://localhost:3000`

4. In a separate terminal, start the frontend:

```bash
   cd frontend
   ng serve
```

Runs on `http://localhost:4200`

## Test account

You can register a new account via the site, or use:

- Email: `test@example.com`
- Password: `password123`
  _(only needed to access `/admin` — logging in isn't otherwise required to browse/shop)_

## Project structure & conventions

See `AGENTS.md`.

---

_This project was originally scaffolded with [Angular CLI](https://github.com/angular/angular-cli)._
