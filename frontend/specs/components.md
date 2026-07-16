# Especificacion de componentes frontend

Este documento define que componentes se necesitan para las 3 funcionalidades nuevas.
Solo describe estructura, props y reglas de renderizado condicional.

## Funcionalidad 1: Filtro por rango de fechas en dashboard principal

### DateRangeFilterBar
- Objetivo: capturar fecha de inicio y fecha de fin para filtrar todo el dashboard.
- Ubicacion: parte superior del dashboard principal, junto al encabezado.

Props:
- minDate: string
- maxDate: string
- value: DateRangeFilter
- onChange: (next: DateRangeFilter) => void
- onClear: () => void
- disabled?: boolean

Renderizado y comportamiento:
- Mostrar dos inputs date:
  - input inicio enlazado a start_date.
  - input fin enlazado a end_date.
- Ambos inputs son opcionales.
- Mostrar texto de referencia visible:
  - Rango disponible: minDate a maxDate.
- Boton Limpiar:
  - resetea start_date y end_date a undefined.
- Si solo start_date tiene valor:
  - la UI mantiene el valor y muestra estado activo de filtro parcial.
- Si solo end_date tiene valor:
  - la UI mantiene el valor y muestra estado activo de filtro parcial.
- Si ambos estan vacios:
  - la UI indica que se muestran todos los datos.

### DashboardDataScopeProvider
- Objetivo: centralizar el estado del rango de fechas para compartirlo con KPIs, graficos, alertas y comparativa B2B vs B2C.

Props:
- children: ReactNode

Estado interno recomendado:
- dateRange: DateRangeFilter
- facets: FacetsResponse | null
- isFacetsLoading: boolean
- facetsError: string | null

Reglas:
- Cargar facets una vez para obtener min_date y max_date.
- Exponer dateRange seleccionado para reutilizar en llamadas futuras.

## Funcionalidad 2: Tabla de alertas de anomalias

### AlertsThresholdControl
- Objetivo: permitir que el usuario ajuste el threshold.
- Ubicacion: encima de la tabla de alertas.

Props:
- value: number
- onChange: (next: number) => void
- min?: number
- max?: number
- step?: number
- disabled?: boolean

Reglas:
- Valor inicial visual: 0.3.
- Rango visual permitido: 0.01 a 1.0.
- Si el usuario escribe fuera de rango:
  - mostrar error de validacion y bloquear refresco de tabla.

### AlertsTable
- Objetivo: renderizar periodos con incrementos de outcome detectados.
- Ubicacion: debajo de los graficos existentes.

Props:
- rows: AlertsResponse
- loading: boolean
- error: string | null
- threshold: number
- dateRange: DateRangeFilter

Columnas:
- periodo (period)
- outcome registrado (outcome_total)
- media base (baseline_average)
- incremento porcentual (increase_ratio * 100)

Renderizado condicional:
- loading=true:
  - mostrar skeleton de tabla.
- error != null:
  - mostrar mensaje de error no bloqueante.
- rows vacio y sin error:
  - mostrar estado vacio explicito:
    - No se detectaron anomalias para el umbral y rango seleccionado.
- rows con elementos:
  - renderizar tabla completa.

Reglas de datos:
- Debe consumir siempre el dateRange global cuando exista.
- Debe recalcularse cuando cambie threshold.

## Funcionalidad 3: Vista comparativa B2B vs B2C

### BusinessComparisonSection
- Objetivo: encapsular cada panel (B2B o B2C).

Props:
- title: string
- businessType: "B2B" | "B2C"
- rows: TopCategoriesResponse
- loading: boolean
- error: string | null

Contenido:
- Tabla top-5 categorias de ingresos.
- Columnas:
  - categoria
  - total de ingresos
  - porcentaje sobre el total del grupo

Renderizado condicional:
- loading=true:
  - skeleton de tabla.
- error != null:
  - mensaje de error para ese panel.
- rows vacio y sin error:
  - estado vacio explicito:
    - No hay categorias de ingreso para este segmento en el rango seleccionado.

### B2BvsB2CComparisonChart
- Objetivo: comparar el total de ingresos agregado entre ambos segmentos.

Props:
- b2bTotalIncome: number
- b2cTotalIncome: number
- loading: boolean

Renderizado:
- grafico unico (barra o columnas) con dos series: B2B y B2C.
- loading=true:
  - skeleton del grafico.
- cuando ambos totales sean 0:
  - estado vacio explicito con mensaje.

### BusinessComparisonView
- Objetivo: composicion final de funcionalidad 3.

Props:
- dateRange: DateRangeFilter

Reglas:
- Realizar 2 consultas separadas a top categories:
  - una con business_type=B2B.
  - otra con business_type=B2C.
- En ambas consultas:
  - operation_type=income
  - limit=5
  - incluir start_date y end_date si existen.
- Renderizar dos paneles en paralelo y el grafico comparativo debajo.
