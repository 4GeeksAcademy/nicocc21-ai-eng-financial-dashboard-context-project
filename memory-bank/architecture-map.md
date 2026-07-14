# Architecture Map

## Backend map
- Entry app: backend/app/main.py
- Router: backend/app/routes.py
- Test suite: backend/tests/test_routes.py

### Backend endpoints
- GET /health
- GET /api/metrics
- GET /api/metrics/facets
- GET /api/metrics/summary
- GET /api/metrics/categories/top
- GET /api/metrics/comparison
- GET /api/metrics/alerts
- GET /api/metrics/b2b
- GET /api/metrics/b2c

### Backend data model notes
- operation_type: income | outcome
- category: suppliers | sales | operational | administrative | others
- business_type: B2B | B2C
- group_by: day | week | month

## Frontend map
- App shell/data fetch: frontend/src/App.tsx
- KPI row/cards: frontend/src/components/dashboard/kpi-row.tsx and kpi-card.tsx
- Charts: income-outcome-chart.tsx and profit-percent-chart.tsx
- Data transforms/formatters: frontend/src/lib/financial-utils.ts
- Types: frontend/src/lib/financial-types.ts
- Utility unit tests: frontend/src/lib/financial-utils.test.ts

## Data flow
1. App mounts and fetches /api/metrics.
2. Raw movements -> computeKPIs.
3. Raw movements -> computeMonthlyData.
4. KPIs feed cards; monthly series feed line charts.
