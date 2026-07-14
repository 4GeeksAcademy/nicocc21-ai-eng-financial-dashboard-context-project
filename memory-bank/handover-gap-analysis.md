# Handover Gap Analysis

## What we can recover with high confidence
- Technical stack and runtime topology from docker-compose + Dockerfiles.
- API contract and filters from backend/app/routes.py.
- Frontend consumption path from frontend/src/App.tsx.
- KPI and chart calculation logic from frontend/src/lib/financial-utils.ts.
- Existing test coverage areas from backend/tests/test_routes.py and frontend utility tests.

## What is still missing
- Product-level definitions (business meaning of KPIs, acceptance criteria per chart).
- Non-functional requirements (performance budgets, security constraints, SLOs).
- Release policy and branch/PR workflow conventions.
- Ownership map (who approves backend/frontend contract changes).

## Recommended next artifacts
1. ADR: source of truth for KPI formulas (frontend vs backend).
2. API contract versioning policy for /api/metrics family.
3. Definition of done checklist for dashboard changes.
4. Incident/debug playbook for data mismatch between API and UI.

## Immediate operational rule
Until product docs exist, treat source code plus tests as the only source of truth.
