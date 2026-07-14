# Rule: Code Standards For This Repo

## Scope
Applies to frontend (React + TypeScript) and backend (FastAPI + Python).

## Frontend conventions
- Keep API fetching in small boundary functions.
- Keep data calculations in frontend/src/lib helpers.
- Keep UI components mostly presentational.
- Preserve TypeScript types from frontend/src/lib/financial-types.ts.
- Prefer existing alias imports using @/.

## Backend conventions
- Keep endpoint contracts explicit with Pydantic response_model.
- Reuse existing filter and summarization helpers before adding new logic.
- Keep date filtering deterministic and sorted outputs chronological.
- Preserve literal domains for category/business/operation types.

## Cross-cutting conventions
- Avoid changing API response shape without updating frontend usage and tests.
- Keep seeded mock generation deterministic for reproducibility.
- Add tests for behavior changes in both relevant layers when possible.
- Keep docs synchronized with real endpoint paths and query params.
