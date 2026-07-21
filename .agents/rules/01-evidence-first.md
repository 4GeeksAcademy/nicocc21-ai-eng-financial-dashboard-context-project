# Regla: Evidencia Primero

## Proposito
Evitar suposiciones y documentar comportamiento solo desde rutas de codigo verificadas.

## Flujo requerido
1. Identificar los archivos fuente que implementan el comportamiento.
2. Leer las funciones/endpoints/componentes exactos involucrados.
3. Registrar hallazgos como hechos con referencias de archivo.
4. Marcar como desconocido todo lo que no este en el codigo.

## Afirmaciones permitidas
- "Implementado en backend/app/routes.py"
- "Consumido en frontend/src/App.tsx"
- "Cubierto por pruebas en backend/tests/test_routes.py"

## Afirmaciones prohibidas
- Comportamiento de producto sin respaldo en codigo fuente.
- Explicaciones de "probablemente" sin verificacion.
- Documentacion copiada de memoria cuando el codigo cambio.

## Checklist minimo de evidencia
- Definicion de endpoint API encontrada.
- Consumidor en frontend encontrado.
- Transformacion de datos encontrada.
- Al menos una prueba revisada (si existe).
