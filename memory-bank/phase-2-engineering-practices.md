# Phase 2 - Engineering practices review

## Scope
Code-level review of frontend and backend to identify at least 5 good practices and 5 risks/bad practices, grouped by category.

## Good practices

### Architecture
1. Clear layering in backend routes and helper functions keeps endpoint handlers concise.
   - Evidence: backend/app/routes.py
2. Frontend separates UI components from data transformation utilities.
   - Evidence: frontend/src/components/dashboard/* and frontend/src/lib/financial-utils.ts

### Contracts and typing
3. Backend endpoints use explicit response models, reducing contract ambiguity.
   - Evidence: backend/app/routes.py
4. Frontend uses typed domain models for movements and KPI payloads.
   - Evidence: frontend/src/lib/financial-types.ts, frontend/src/App.tsx

### Testing and reliability
5. Deterministic data generation with seed=42 improves reproducibility.
   - Evidence: backend/app/routes.py
6. Test suites exist on both sides (backend endpoint behavior and frontend utility calculations).
   - Evidence: backend/tests/test_routes.py, frontend/src/lib/financial-utils.test.ts

### Dev experience
7. Docker compose and Vite proxy simplify local integration.
   - Evidence: docker-compose.yml, frontend/vite.config.ts

## Risks and bad practices

### Security and deploy readiness
1. CORS is fully open, which is risky outside controlled environments.
   - Evidence: backend/app/main.py
2. Backend serves synthetic data only; no persistence or real datasource boundary is defined.
   - Evidence: backend/app/routes.py

### Product and consistency
3. UI language is mixed (Spanish error text with mostly English labels), reducing copy consistency.
   - Evidence: frontend/src/App.tsx, frontend/src/components/dashboard/kpi-row.tsx
4. KPI calculations happen in frontend while backend already has analytics endpoints, creating potential source-of-truth drift.
   - Evidence: frontend/src/lib/financial-utils.ts, backend/app/routes.py

### Testing and quality gates
5. No CI workflow detected to enforce tests/lint on push or PR.
   - Evidence: no files under .github/workflows
6. Current frontend tests cover utility layer but not component rendering/integration behavior.
   - Evidence: frontend/src/lib/financial-utils.test.ts

## Recommended mitigation priorities
1. Define a source-of-truth policy for KPI and summary formulas (frontend vs backend).
2. Add environment-based CORS policy and document production-safe defaults.
3. Add CI checks for backend tests, frontend tests, and lint.
4. Add at least one integration-level frontend test for App data-loading state and error state.
5. Standardize product copy language in the dashboard UI.
