# Analisis de Brechas del Handover

## Que podemos recuperar con alta confianza
- Stack tecnico y topologia de ejecucion desde docker-compose + Dockerfiles.
- Contrato API y filtros desde backend/app/routes.py.
- Ruta de consumo frontend desde frontend/src/App.tsx.
- Logica de calculo de KPI y graficos desde frontend/src/lib/financial-utils.ts.
- Cobertura de pruebas existente desde backend/tests/test_routes.py y pruebas de utilidades frontend.

## Que sigue faltando
- Definiciones a nivel producto (significado de negocio de KPI, criterios de aceptacion por grafico).
- Requisitos no funcionales (presupuestos de rendimiento, restricciones de seguridad, SLOs).
- Politica de releases y convenciones de flujo branch/PR.
- Mapa de ownership (quien aprueba cambios de contrato backend/frontend).

## Artefactos recomendados siguientes
1. ADR: fuente de verdad para formulas KPI (frontend vs backend).
2. Politica de versionado de contrato API para la familia /api/metrics.
3. Checklist definition of done para cambios del dashboard.
4. Playbook de incidentes/debug para desajustes entre API y UI.

## Regla operativa inmediata
Hasta que existan docs de producto, tratar codigo fuente + pruebas como unica fuente de verdad.
