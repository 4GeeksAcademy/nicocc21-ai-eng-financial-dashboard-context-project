# Operations Runbook

## Local start
- Command: docker compose up --build
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- API docs: http://localhost:8000/docs

## Backend-only development
- Install deps from backend/requirements.txt
- Run server with uvicorn app.main:app --reload
- Optional debugpy is already configured in Dockerfile

## Frontend-only development
- npm install in frontend
- npm run dev
- Uses Vite proxy for /api to http://backend:8000 in container networking

## Test commands
- Backend: pytest (inside backend)
- Frontend: npm run test (inside frontend)

## Quick smoke checklist
1. /health returns {"status":"ok"}
2. /api/metrics returns records sorted by create_date
3. Dashboard loads without fetch error
4. KPI cards show values
5. Both charts render with monthly points
