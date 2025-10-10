## Time-Manager — Copilot instructions

These notes are for AI coding agents editing this repository. Keep guidance short and concrete so you can be productive immediately.

- Big picture: This is a simple two-part app.
  - backend/: Express API (Node 18+/ESM) that talks to a MariaDB database via `mysql2/promise` (`backend/index.js`, `backend/db.js`). Key endpoints: `GET /` and `GET /users` (see `backend/index.js`).
  - frontend/: Vue 3 + Vite SPA using `vue-router` and Bootstrap. Entrypoint: `frontend/src/main.js` and routes in `frontend/src/router/index.js`.

- How components communicate:
  - Frontend calls the backend HTTP API (local dev: backend on port 3000). Example: frontend can request `http://localhost:3000/users` to get the users table.
  - Backend reads DB connection details from env vars: `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` (see `backend/db.js` and `docker-compose.yml`).

- Developer workflows (commands you can run locally):
  - Start backend locally (nodemon):
    ```powershell
    cd backend
    npm install
    npm run dev
    ```
    This runs `nodemon index.js` (see `backend/package.json`).

  - Start frontend locally (Vite dev server):
    ```powershell
    cd frontend
    npm install
    npm run dev
    ```

  - Full stack with Docker Compose (root of repo):
    ```powershell
    docker-compose up --build
    ```
    This will build the backend image and launch a MariaDB container (see `docker-compose.yml`).

- Important, discoverable patterns & gotchas:
  - Database pool: `backend/db.js` creates a `mysql2/promise` pool with defaults pointing at host `db`. Code assumes a `users` table may exist; the `GET /users` endpoint runs `SELECT * FROM users` and returns a 500 with `{ error: "Table not ready" }` on failure.
  - Env-var names are authoritative: use `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` when changing/adding configuration.
  - Dockerfile: `backend/Dockerfile` copies source and runs `npm install`. (Note: the Dockerfile's CMD line currently appears to reference both `start` and `dev` together; be cautious if changing runtime behavior — prefer using `docker-compose` for full-stack runs.)
  - Dependency notes: `backend/package.json` lists `prisma` although there is no Prisma schema or usage in the repo; avoid introducing Prisma changes unless you add required schema and tooling.

- Editing conventions and constraints for agents:
  - Preserve existing HTTP routes and env var names unless you update `docker-compose.yml` and document the change.
  - Keep database access via `mysql2/promise` and the existing pool pattern unless you intentionally migrate (show small migration plan and run quick smoke test locally).
  - For frontend changes, prefer modifying SFCs (`.vue` files) using `<script setup>` style consistent with existing files.

- Quick examples to reference when making edits:
  - Read users in API: `backend/index.js` -> app.get('/users', async (req, res) => { const [rows] = await pool.query('SELECT * FROM users') ... })`.
  - DB pool options (connectionLimit, defaults): `backend/db.js`.
  - Routes: `frontend/src/router/index.js` — two routes ("/" -> Home, "/Login" -> Login).

- Testing & verification you should run after changes (minimal smoke tests):
  - Backend: `curl http://localhost:3000/` should return the running message. `curl http://localhost:3000/users` should return JSON or a 500 if DB/table missing.
  - Frontend: start Vite and open `http://localhost:5173/` (default) to confirm the SPA loads and routes render.

If anything here is unclear or you need more granular rules (preferred code style, linting, or test commands), tell me which area to expand and I'll iterate.
