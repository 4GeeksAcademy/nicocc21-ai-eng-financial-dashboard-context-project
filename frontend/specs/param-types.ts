import type {
  BusinessType,
  GroupBy,
  OperationType,
} from "./api-types";

/**
 * Filtro de rango de fechas compartido entre funcionalidades.
 * Ambos campos son opcionales.
 */
export interface DateRangeFilter {
  /**
   * Fecha de inicio inclusiva en formato YYYY-MM-DD.
   * Si no se envía, no se aplica límite inferior.
   */
  start_date?: string;

  /**
   * Fecha de fin inclusiva en formato YYYY-MM-DD.
   * Si no se envía, no se aplica límite superior.
   */
  end_date?: string;
}

/**
 * Parámetros de /api/metrics/alerts.
 * Extiende el filtro por fecha para respetar la funcionalidad 1.
 */
export interface AlertsParams extends DateRangeFilter {
  /**
   * Umbral de alerta en ratio decimal.
   * Valor esperado por especificación de frontend: 0.01 a 1.0.
   * Valor por defecto en API actual: 0.3.
   */
  threshold?: number;

  /**
   * Nivel de agregación temporal de la alerta.
   * Si no se define, la API usa month.
   */
  group_by?: GroupBy;

  /**
   * Segmento de negocio para filtrar alertas.
   * Opcional para permitir vista global o segmentada.
   */
  business_type?: BusinessType;
}

/**
 * Parámetros de /api/metrics/categories/top.
 * Extiende rango de fechas compartido.
 */
export interface TopCategoriesParams extends DateRangeFilter {
  /**
   * Tipo de operación a agregar.
   * Para comparativa B2B vs B2C se usa income.
   */
  operation_type: OperationType;

  /**
   * Cantidad máxima de categorías a devolver.
   * Valores válidos en API: 1 a 20.
   * Para la funcionalidad 3 se usa 5.
   */
  limit?: number;

  /**
   * Segmento de negocio a consultar (B2B o B2C).
   * Permite construir paneles en paralelo.
   */
  business_type?: BusinessType;
}
