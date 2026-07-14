# Regla: Estandares de Codigo del Repositorio

## Alcance
Aplica a frontend (React + TypeScript) y backend (FastAPI + Python).

## Convenciones de frontend
- Mantener el fetch de API en funciones pequenas de borde.
- Mantener los calculos de datos en helpers de frontend/src/lib.
- Mantener los componentes UI mayormente presentacionales.
- Preservar los tipos TypeScript de frontend/src/lib/financial-types.ts.
- Preferir los imports con alias existentes usando @/.

## Convenciones de backend
- Mantener contratos de endpoint explicitos con response_model de Pydantic.
- Reutilizar helpers de filtrado y resumen antes de agregar nueva logica.
- Mantener filtrado por fecha determinista y salidas ordenadas cronologicamente.
- Preservar dominios literales para category/business/operation types.

## Convenciones transversales
- Evitar cambiar el shape de respuesta API sin actualizar consumo frontend y pruebas.
- Mantener generacion mock con semilla determinista para reproducibilidad.
- Agregar pruebas para cambios de comportamiento en ambas capas cuando sea posible.
- Mantener documentacion sincronizada con rutas reales y query params reales.
