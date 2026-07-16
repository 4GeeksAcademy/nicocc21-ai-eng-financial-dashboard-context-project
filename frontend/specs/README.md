# Frontend Specs: contratos de datos y reglas de UI

Este documento define contratos y comportamiento esperado para 3 funcionalidades nuevas.
No implementa componentes ni llamadas reales, solo establece especificaciones.

## 1) Filtro por rango de fechas en dashboard principal

Endpoint consumido:
- GET /api/metrics/facets

Objetivo de uso:
- Obtener referencia de rango valido de fechas (min_date, max_date).

Tipo de respuesta:
- FacetsResponse

Parametros de consulta para filtro compartido:
- DateRangeFilter
  - start_date?: string (YYYY-MM-DD)
  - end_date?: string (YYYY-MM-DD)

Restricciones validas:
- Ambos parametros son opcionales.
- Si ambos faltan, se consulta sin filtro de fecha.
- Si solo uno existe, se envia un filtro parcial.

Casos edge y UI esperada:
1. Solo start_date informado.
   - UI mantiene el filtro parcial y actualiza todas las vistas con limite inferior.
2. Solo end_date informado.
   - UI mantiene el filtro parcial y actualiza todas las vistas con limite superior.
3. start_date mayor que end_date.
   - UI muestra validacion local y no dispara consultas hasta corregir.
4. facets no disponibles por error.
   - UI muestra mensaje de error y desactiva temporalmente los inputs de fecha.

## 2) Tabla de alertas de anomalias

Endpoint consumido:
- GET /api/metrics/alerts

Tipo de request:
- AlertsParams
  - threshold?: number
  - group_by?: "day" | "week" | "month"
  - business_type?: "B2B" | "B2C"
  - start_date?: string
  - end_date?: string

Tipo de response:
- AlertsResponse (AlertEntry[])
  - period: string
  - outcome_total: number
  - baseline_average: number
  - increase_ratio: number

Restricciones validas:
- threshold visual esperado: 0.01 a 1.0.
- threshold por defecto: 0.3.
- group_by recomendado: month para lectura ejecutiva.
- Debe incluir start_date y end_date cuando el filtro global este activo.

Casos edge y UI esperada:
1. Respuesta vacia [].
   - UI debe mostrar estado vacio explicito (no ocultar la tabla).
2. threshold fuera del rango permitido en UI.
   - UI bloquea envio, muestra error de validacion y conserva ultimo valor valido aplicado.
3. Error de red o backend.
   - UI muestra error contextual y opcion de reintento.
4. Cambio de rango de fecha con threshold fijo.
   - UI recalcula tabla automaticamente con los nuevos parametros.

## 3) Vista comparativa B2B vs B2C

Endpoints consumidos:
- GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2B
- GET /api/metrics/categories/top?operation_type=income&limit=5&business_type=B2C
- GET /api/metrics/facets (solo para referencia de rango disponible)

Tipo de request:
- TopCategoriesParams
  - operation_type: "income" | "outcome"
  - limit?: number
  - business_type?: "B2B" | "B2C"
  - start_date?: string
  - end_date?: string

Tipo de response:
- TopCategoriesResponse (CategoryEntry[])
  - category: "suppliers" | "sales" | "operational" | "administrative" | "others"
  - operation_type: "income" | "outcome"
  - total_amount: number

Restricciones validas:
- Para esta funcionalidad:
  - operation_type debe ser income.
  - limit debe ser 5.
- API acepta limit entre 1 y 20.
- Reutiliza DateRangeFilter del dashboard.

Casos edge y UI esperada:
1. Panel B2B sin resultados y panel B2C con resultados.
   - UI renderiza estado vacio solo en B2B, sin bloquear B2C.
2. Ambos paneles sin resultados.
   - UI muestra vacio en ambos paneles y grafico comparativo en estado vacio.
3. Error en un panel y exito en el otro.
   - UI muestra error aislado por panel y mantiene datos del panel exitoso.
4. Totales B2B y B2C iguales.
   - UI grafica ambos valores con etiquetas de valor para evitar ambiguedad visual.

## Mapeo de tipos por funcionalidad

Funcionalidad 1:
- Request: DateRangeFilter (aplicable a endpoints filtrables)
- Response: FacetsResponse

Funcionalidad 2:
- Request: AlertsParams
- Response: AlertsResponse, AlertEntry

Funcionalidad 3:
- Request: TopCategoriesParams, DateRangeFilter
- Response: TopCategoriesResponse, CategoryEntry, FacetsResponse
