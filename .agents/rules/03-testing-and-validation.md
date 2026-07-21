# Regla: Pruebas y Validacion

## Validacion requerida antes de fusionar cambios de comportamiento
1. Pruebas backend: ejecutar pytest en backend.
2. Pruebas frontend: ejecutar vitest en frontend.
3. Flujo smoke manual:
   - abrir el dashboard
   - verificar que cargan las tarjetas KPI
   - verificar que ambos graficos renderizan datos
   - verificar que responde el endpoint de salud de la API

## Guardrails de regresion
- Si cambian query params de endpoints, agregar/actualizar primero pruebas de API.
- Si cambia matematica de KPI o graficos, agregar/actualizar primero pruebas de utilidades.
- Si cambia path de fetch/base URL, validar proxy de Vite y fallback de entorno.

## Evidencia a incluir en la descripcion del PR
- Que endpoint(s) cambiaron.
- Que componente(s) consumen el cambio.
- Que pruebas demuestran el comportamiento.
- Cualquier riesgo conocido que aun no este cubierto por pruebas.
