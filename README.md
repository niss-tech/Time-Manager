# Time-Manager

Run the frontend dev server (Vue + Vite)

1. Install dependencies

```powershell
cd frontend
npm install
```

2. Start dev server

```powershell
npm run dev
```
# Vue 3 + Vite

---

Backend (API) - quick run & Prisma

1. Install backend deps

```powershell
cd backend
npm install
```

2. Create `.env` in `backend/` (example)

```powershell
@'
DATABASE_URL="mysql://app_user:root@127.0.0.1:3306/time_manager"
BASE_URL="http://localhost:5173"
PORT=3000
'@ | Out-File -Encoding utf8 .\.env
```

3. Generate Prisma client and push schema to DB

```powershell
cd backend
npx prisma generate
# push schema (fast for dev)
npx prisma db push
```

4. Start the backend server

```powershell
# dev with nodemon
npm run dev
# or production
npm start
```

5. Inspect the database (Prisma Studio)

```powershell
cd backend
npx prisma studio
```

Docker (optional): start only DB or full stack

```powershell
cd "c:\Github Projects\Time-Manager"
# start db service only
docker-compose up -d db
# or full stack (fix Dockerfile CMD if needed)
docker-compose up --build
```

Troubleshooting:
- If `prisma db push` fails, ensure `DATABASE_URL` is correct and the DB is running.
- If the backend container exits immediately, check `backend/Dockerfile` CMD (should be `CMD ["npm","start"]` or `CMD ["npm","run","dev"]`).