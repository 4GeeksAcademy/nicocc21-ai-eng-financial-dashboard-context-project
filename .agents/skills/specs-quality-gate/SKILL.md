# specs-quality-gate

## Purpose
Validar de forma consistente que la entrega de `frontend/specs` cumple la rubrica del proyecto antes de cerrar una fase o crear PR.

## Use When
- El usuario pida revisar si faltan items de academia para la fase de especificacion frontend.
- Se hayan creado o editado archivos en `frontend/specs`.
- Se necesite un checklist final de entrega con estado `OK/FALTA`.

## Do Not Use When
- El usuario pida implementar componentes React o backend (esta skill es solo de especificacion).
- El usuario pida scaffolding de un proyecto nuevo.

## Inputs
- Rama actual y estado git.
- Archivos objetivo:
  - `frontend/specs/api-types.ts`
  - `frontend/specs/param-types.ts`
  - `frontend/specs/components.md`
  - `frontend/specs/README.md`
- Resultado de `npx tsc --noEmit` en `frontend/`.

## Output Format
Responder en espanol con:
1. Resumen corto.
2. Checklist con estado por criterio (`OK` o `FALTA`).
3. Accion exacta siguiente (comando o archivo a corregir).

## Validation Checklist
1. Existe rama `feature/frontend-specs` o rama equivalente para entrega.
2. Existen los 4 entregables requeridos en `frontend/specs`.
3. `api-types.ts` define al menos: `FacetsResponse`, `AlertEntry`, `AlertsResponse`, `CategoryEntry`, `TopCategoriesResponse`.
4. `param-types.ts` define al menos: `DateRangeFilter`, `AlertsParams`, `TopCategoriesParams`.
5. Tipos estrictos: sin `any` y sin `object`.
6. Hay comentarios JSDoc en propiedades y/o interfaces clave.
7. `components.md` describe componentes, props tipadas y renderizado condicional.
8. `README.md` cubre las 3 funcionalidades con endpoints, tipos, restricciones y minimo 2 casos edge por funcionalidad.
9. `npx tsc --noEmit` pasa sin errores.
10. Hay al menos un commit significativo con los entregables.
11. La rama esta subida a `origin` (visible en remoto).

## Suggested Commands
```bash
cd /workspaces/nicocc21-ai-eng-financial-dashboard-context-project

git branch --show-current
git status --short
git log --oneline -n 5

test -f frontend/specs/api-types.ts && echo OK

test -f frontend/specs/param-types.ts && echo OK

test -f frontend/specs/components.md && echo OK

test -f frontend/specs/README.md && echo OK

grep -nE "\b(any|object)\b" frontend/specs/api-types.ts frontend/specs/param-types.ts

cd frontend && npx tsc --noEmit

cd .. && git ls-remote --heads origin feature/frontend-specs
```

## Notes
- Si detectas diferencias entre lo pedido por academia y el backend real, reportalas como "Riesgo" sin bloquear el checklist.
- No modificar codigo de implementacion (`frontend/src`, `backend/app`) cuando solo se este evaluando esta fase.
