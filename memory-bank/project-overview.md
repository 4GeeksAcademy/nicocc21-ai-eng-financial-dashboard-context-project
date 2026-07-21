# Resumen del Proyecto

## Objetivo
Dashboard de metricas financieras con:
- Frontend: React + TypeScript + Vite + Recharts
- Backend: FastAPI que entrega movimientos financieros mock deterministas

## Comportamiento actual del producto (verificado)
- El dashboard consume /api/metrics desde frontend/src/App.tsx.
- Los valores KPI se calculan del lado cliente en frontend/src/lib/financial-utils.ts.
- Los datos mensuales de graficos se agregan del lado cliente en frontend/src/lib/financial-utils.ts.
- La fuente de datos backend es mock generada con seed=42 en backend/app/routes.py.

## Ejecucion
- docker compose inicia frontend (5173) y backend (8000).
- Vite hace proxy de /api al contenedor backend via frontend/vite.config.ts.

## Riesgo clave
- Riesgo de deriva de contrato: el frontend hoy consume solo /api/metrics, mientras backend expone mas endpoints analiticos aun no consumidos por App.
