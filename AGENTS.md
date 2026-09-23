# AGENTS.md

## Project overview

Vibe Supply is a full-stack e-commerce site for streetwear (hoodies, tees, shoes, accessories). Built as a school project to learn Angular, TypeScript, and backend fundamentals.

## Tech stack

- **Frontend**: Angular (standalone components, signals-based state), TypeScript, Tailwind CSS v4
- **Backend**: Node.js, Express, TypeScript
- **Database**: SQLite (via better-sqlite3)
- **Auth**: JWT (jsonwebtoken) + bcrypt for password hashing

## Project structure

vibe-supply/
├── backend/
│ ├── src/
│ │ ├── controllers/ # request handlers
│ │ ├── routes/ # Express route definitions
│ │ ├── db/ # database connection, schema, seed data
│ │ ├── middleware/ # auth guard middleware
│ │ └── server.ts # entry point
│ └── .env # JWT_SECRET, PORT (not committed)
└── frontend/
└── src/app/
├── core/ # singleton services (auth, cart), guards
├── shared/ # reusable components, models, utils
└── features/ # feature pages (products, cart, checkout, admin, auth)

## Setup & running

Backend:

```bash
cd backend
npm install
npx tsx src/db/seed.ts   # resets and seeds the database
npx tsx src/server.ts    # starts API on http://localhost:3000
```

Frontend:

```bash
cd frontend
npm install
ng serve                 # starts app on http://localhost:4200
```

## Conventions used in this project

- **State management**: Angular signals (`signal()`, `computed()`, `effect()`) — not plain class properties or RxJS BehaviorSubjects, for anything that needs to update the template reactively.
- **Zoneless change detection** is enabled — all reactive state must go through signals, not plain property mutation, or the UI won't update.
- **Forms**: Reactive Forms (`FormGroup`/`FormControl`) for forms with validation (login, admin product creation); template-driven `ngModel` only for the simple navbar search input.
- **Styling**: Tailwind CSS v4, using CSS-based `@theme` tokens (see `frontend/src/styles.css`) for the design system — custom colors (`vibe-bg`, `vibe-ink`, `vibe-accent`, `vibe-border`) and fonts (`font-display`, `font-body`). Mobile-first responsive classes throughout (`sm:`, `md:`, `lg:`).
- **Backend patterns**: routes stay thin, calling into controllers; controllers use `better-sqlite3`'s prepared statements (`db.prepare(...).run()/.get()/.all()`) — never raw string-concatenated SQL.
- **API base URL**: hardcoded as `http://localhost:3000/api` in frontend services (no environment config set up yet).

## Known limitations / not implemented

- No product variants (size/color) — each product is a single SKU.
- Login/auth exists but is not a strict requirement per the assignment; any logged-in user can access `/admin`.
- No automated tests.
