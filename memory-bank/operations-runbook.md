# Runbook Operativo

## Inicio local
- Comando: docker compose up --build
- Frontend: http://localhost:5173
- Backend: http://localhost:8000
- Documentacion API: http://localhost:8000/docs

## Desarrollo solo backend
- Instalar dependencias desde backend/requirements.txt
- Ejecutar servidor con uvicorn app.main:app --reload
- debugpy opcional ya configurado en Dockerfile

## Desarrollo solo frontend
- npm install en frontend
- npm run dev
- Usa proxy de Vite para /api hacia http://backend:8000 en red de contenedores

## Comandos de prueba
- Backend: pytest (dentro de backend)
- Frontend: npm run test (dentro de frontend)

## Checklist smoke rapido
1. /health responde {"status":"ok"}
2. /api/metrics retorna registros ordenados por create_date
3. El dashboard carga sin error de fetch
4. Las tarjetas KPI muestran valores
5. Ambos graficos renderizan puntos mensuales
