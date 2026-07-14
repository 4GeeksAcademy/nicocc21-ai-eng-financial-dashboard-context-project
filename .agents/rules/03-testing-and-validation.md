# Rule: Testing And Validation

## Required validation before merging behavior changes
1. Backend tests: run pytest in backend.
2. Frontend tests: run vitest in frontend.
3. Manual smoke flow:
   - open dashboard
   - verify KPI cards load
   - verify both charts render data
   - verify API health endpoint responds

## Regression guardrails
- If endpoint params change, add/update API tests first.
- If KPI or chart math changes, add/update utility tests first.
- If fetch path/base URL changes, validate Vite proxy and env fallback.

## Evidence to include in PR description
- What endpoint(s) changed.
- What component(s) consume the change.
- What tests prove the behavior.
- Any known risks not yet covered by tests.
