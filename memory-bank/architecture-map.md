# Mapa de Arquitectura

## Mapa backend
- App de entrada: backend/app/main.py
- Router: backend/app/routes.py
- Suite de pruebas: backend/tests/test_routes.py

### Endpoints backend
- GET /health
- GET /api/metrics
- GET /api/metrics/facets
- GET /api/metrics/summary
- GET /api/metrics/categories/top
- GET /api/metrics/comparison
- GET /api/metrics/alerts
- GET /api/metrics/b2b
- GET /api/metrics/b2c

### Notas del modelo de datos backend
- operation_type: income | outcome
- category: suppliers | sales | operational | administrative | others
- business_type: B2B | B2C
- group_by: day | week | month

## Mapa frontend
- Shell de App y fetch de datos: frontend/src/App.tsx
- Fila/tarjetas KPI: frontend/src/components/dashboard/kpi-row.tsx y kpi-card.tsx
- Graficos: income-outcome-chart.tsx y profit-percent-chart.tsx
- Transformaciones/formatters de datos: frontend/src/lib/financial-utils.ts
- Tipos: frontend/src/lib/financial-types.ts
- Pruebas unitarias de utilidades: frontend/src/lib/financial-utils.test.ts

## Flujo de datos
1. App monta y consume /api/metrics.
2. Movimientos crudos -> computeKPIs.
3. Movimientos crudos -> computeMonthlyData.
4. Los KPI alimentan tarjetas; la serie mensual alimenta los graficos.
