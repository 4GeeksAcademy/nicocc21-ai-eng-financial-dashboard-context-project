# Rule: Evidence First

## Purpose
Avoid assumptions and document behavior only from verified code paths.

## Required workflow
1. Identify the source file(s) that implement the behavior.
2. Read the exact functions/endpoints/components involved.
3. Capture findings as facts with file references.
4. Mark anything not found in code as unknown.

## Allowed statements
- "Implemented in backend/app/routes.py"
- "Consumed in frontend/src/App.tsx"
- "Covered by tests in backend/tests/test_routes.py"

## Forbidden statements
- Product behavior not backed by source code.
- "Probably" explanations without verification.
- Documentation copied from memory when code changed.

## Minimum evidence checklist
- API endpoint definition found.
- Frontend consumer found.
- Data transform found.
- At least one test reviewed (if present).
