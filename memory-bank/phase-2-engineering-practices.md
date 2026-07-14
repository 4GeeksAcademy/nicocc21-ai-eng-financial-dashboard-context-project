# Fase 2 - Revision de Practicas de Ingenieria

## Alcance
Revision a nivel de codigo de frontend y backend para identificar al menos 5 buenas practicas y 5 riesgos/malas practicas, agrupadas por categoria.

## Buenas practicas

### Arquitectura
1. Capas claras en rutas backend y funciones helper mantienen handlers concisos.
   - Evidencia: backend/app/routes.py
2. Frontend separa componentes UI de utilidades de transformacion de datos.
   - Evidencia: frontend/src/components/dashboard/* y frontend/src/lib/financial-utils.ts

### Contratos y tipado
3. Endpoints backend usan response models explicitos, reduciendo ambiguedad de contrato.
   - Evidencia: backend/app/routes.py
4. Frontend usa modelos de dominio tipados para movimientos y payloads KPI.
   - Evidencia: frontend/src/lib/financial-types.ts, frontend/src/App.tsx

### Testing y confiabilidad
5. Generacion de datos determinista con seed=42 mejora reproducibilidad.
   - Evidencia: backend/app/routes.py
6. Existen suites de pruebas en ambos lados (comportamiento de endpoints backend y calculos de utilidades frontend).
   - Evidencia: backend/tests/test_routes.py, frontend/src/lib/financial-utils.test.ts

### Experiencia de desarrollo
7. Docker compose y proxy de Vite simplifican integracion local.
   - Evidencia: docker-compose.yml, frontend/vite.config.ts

## Riesgos y malas practicas

### Seguridad y preparacion de despliegue
1. CORS esta totalmente abierto, lo cual es riesgoso fuera de entornos controlados.
   - Evidencia: backend/app/main.py
2. Backend sirve solo datos sinteticos; no hay frontera de persistencia ni datasource real definida.
   - Evidencia: backend/app/routes.py

### Producto y consistencia
3. El idioma de UI esta mezclado (error en espanol y etiquetas mayormente en ingles), reduciendo consistencia de copy.
   - Evidencia: frontend/src/App.tsx, frontend/src/components/dashboard/kpi-row.tsx
4. Los calculos KPI ocurren en frontend mientras backend ya expone endpoints analiticos, generando posible deriva de fuente de verdad.
   - Evidencia: frontend/src/lib/financial-utils.ts, backend/app/routes.py

### Testing y quality gates
5. No se detecta workflow CI para forzar tests/lint en push o PR.
   - Evidencia: no hay archivos bajo .github/workflows
6. Las pruebas frontend actuales cubren capa de utilidades, pero no renderizado/integracion de componentes.
   - Evidencia: frontend/src/lib/financial-utils.test.ts

## Prioridades recomendadas de mitigacion
1. Definir politica de fuente de verdad para formulas KPI y resumenes (frontend vs backend).
2. Agregar politica CORS por entorno y documentar defaults seguros para produccion.
3. Agregar checks CI para pruebas backend, pruebas frontend y lint.
4. Agregar al menos una prueba frontend de integracion para estado de carga y estado de error de App.
5. Estandarizar idioma del copy de producto en la UI del dashboard.
