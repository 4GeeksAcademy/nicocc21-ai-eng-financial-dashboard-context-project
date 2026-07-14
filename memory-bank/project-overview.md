# Project Overview

## Goal
Financial metrics dashboard with:
- Frontend: React + TypeScript + Vite + Recharts
- Backend: FastAPI returning deterministic mock financial movements

## Current product behavior (verified)
- Dashboard fetches /api/metrics from frontend/src/App.tsx.
- KPI values are calculated client-side in frontend/src/lib/financial-utils.ts.
- Monthly chart data is aggregated client-side in frontend/src/lib/financial-utils.ts.
- Backend data source is generated mock data with seed=42 in backend/app/routes.py.

## Runtime
- docker compose starts frontend (5173) and backend (8000).
- Vite proxies /api to backend container via frontend/vite.config.ts.

## Key risk
- Contract drift risk: frontend currently consumes /api/metrics only, while backend exposes more analytics endpoints that are not yet consumed by App.
