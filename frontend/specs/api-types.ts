/**
 * Tipos de API usados por las 3 funcionalidades solicitadas.
 *
 * Fuente de verdad: respuestas actuales del backend en /api/metrics/facets,
 * /api/metrics/alerts y /api/metrics/categories/top.
 */

/** Tipos de operación financiera soportados por la API. */
export type OperationType = "income" | "outcome";

/**
 * Categorías financieras soportadas por la API.
 * Incluye categorías de ingresos y egresos.
 */
export type Category =
  | "suppliers"
  | "sales"
  | "operational"
  | "administrative"
  | "others";

/** Segmentos de negocio soportados por la API. */
export type BusinessType = "B2B" | "B2C";

/** Agrupaciones temporales soportadas por endpoints agregados. */
export type GroupBy = "day" | "week" | "month";

/**
 * Respuesta de /api/metrics/facets.
 * Sirve para renderizar filtros, valores permitidos y referencia de rango de fechas.
 */
export interface FacetsResponse {
  /** Tipos de operación disponibles en el dataset. */
  operation_types: OperationType[];

  /** Segmentos de negocio disponibles en el dataset. */
  business_types: BusinessType[];

  /** Categorías disponibles en el dataset. */
  categories: Category[];

  /** Fecha mínima disponible en formato YYYY-MM-DD. */
  min_date: string;

  /** Fecha máxima disponible en formato YYYY-MM-DD. */
  max_date: string;
}

/**
 * Fila de alerta devuelta por /api/metrics/alerts.
 * Nota: la API actual calcula baseline_average como promedio histórico previo.
 */
export interface AlertEntry {
  /** Periodo agregado (ejemplo: 2025-07 o 2025-W12 según group_by). */
  period: string;

  /** Total de outcome en el periodo detectado como anómalo. */
  outcome_total: number;

  /** Promedio base de outcome usado para detectar el incremento. */
  baseline_average: number;

  /** Ratio de incremento respecto al baseline (ejemplo: 0.35 = 35%). */
  increase_ratio: number;
}

/** Respuesta de /api/metrics/alerts. */
export type AlertsResponse = AlertEntry[];

/**
 * Fila de categoría devuelta por /api/metrics/categories/top.
 * Para la funcionalidad 3 se consume con operation_type=income.
 */
export interface CategoryEntry {
  /** Nombre de la categoría. */
  category: Category;

  /** Tipo de operación usado para el agregado. */
  operation_type: OperationType;

  /** Suma total de montos en la categoría. */
  total_amount: number;
}

/** Respuesta de /api/metrics/categories/top. */
export type TopCategoriesResponse = CategoryEntry[];
