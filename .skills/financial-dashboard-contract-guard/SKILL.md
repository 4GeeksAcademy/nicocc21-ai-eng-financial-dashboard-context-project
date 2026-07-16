# financial-dashboard-contract-guard

## Objective
Evitar desalineaciones entre frontend y backend del dashboard financiero verificando contratos, filtros y estados vacios antes de merge.

## Inputs
- Endpoints de backend bajo `backend/app/routes.py`.
- Tipos y consumo frontend en `frontend/src` y `frontend/specs`.
- Requerimiento funcional activo (filtros, alertas, comparativas B2B/B2C).

## Output
- Lista de validaciones en formato `OK/FALTA/RIESGO`.
- Archivos y lineas sugeridas para correccion.
- Recomendacion de prueba minima a ejecutar.

## Acceptance Criteria
1. Todo filtro de fecha en UI usa formato `YYYY-MM-DD` y se propaga a endpoints compatibles.
2. Parametros opcionales en backend se reflejan como opcionales en tipos frontend.
3. Estados vacios y errores son explicitos en UI (no desaparicion silenciosa de secciones).
4. Campos numericos relevantes (ratio, porcentajes, montos) tienen reglas de formato consistentes.
5. Diferencias entre enunciado y API real quedan documentadas como riesgo.

## Checklist
1. Verificar que `facets` define rango de fechas usable por el frontend.
2. Verificar que alertas y top categories aceptan filtros esperados.
3. Verificar que tipos en frontend no usen `any` para payloads de API.
4. Verificar que componentes muestran estado vacio cuando no hay datos.
5. Verificar que al menos una prueba o validacion manual cubre cada flujo critico.

## Recommended Commands
```bash
cd /workspaces/nicocc21-ai-eng-financial-dashboard-context-project

# Backend contract quick scan
grep -nE "@router.get\(" backend/app/routes.py

# Frontend type and quality checks
cd frontend
npx tsc --noEmit
npm run lint
npm run test
```
