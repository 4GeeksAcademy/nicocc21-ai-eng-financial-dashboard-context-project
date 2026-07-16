import { Suspense, lazy, useEffect, useState } from "react";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import {
  type FinancialMovement,
  type KPIMetrics,
  type MonthlyDataPoint,
} from "@/lib/financial-types";
import { computeKPIs, computeMonthlyData } from "@/lib/financial-utils";

const KPIRow = lazy(() =>
  import("@/components/dashboard/kpi-row").then((module) => ({
    default: module.KPIRow,
  })),
);
const IncomeOutcomeChart = lazy(() =>
  import("@/components/dashboard/income-outcome-chart").then((module) => ({
    default: module.IncomeOutcomeChart,
  })),
);
const ProfitPercentChart = lazy(() =>
  import("@/components/dashboard/profit-percent-chart").then((module) => ({
    default: module.ProfitPercentChart,
  })),
);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function fetchFinancialData(): Promise<FinancialMovement[]> {
  const response = await fetch(`${API_BASE_URL}/api/metrics`);
  if (!response.ok) {
    throw new Error(`Failed to fetch financial data: ${response.status}`);
  }
  return response.json();
}

function App() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFinancialData()
      .then((movements) => {
        setMetrics(computeKPIs(movements));
        setMonthlyData(computeMonthlyData(movements));
      })
      .catch(() => {
        setError(
          "No se pudo cargar la informacion financiera. Revisa la API de backend.",
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <main
        id="main-content"
        aria-busy={loading}
        className="dark min-h-screen bg-background text-foreground"
      >
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8">
          <DashboardHeader period="2024 - Full Year" />

          {error ? (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive-foreground"
            >
              {error}
            </div>
          ) : null}

          <section aria-labelledby="kpi-heading">
            <h2 id="kpi-heading" className="sr-only">
              Indicadores clave
            </h2>
            <Suspense fallback={<div className="h-48 rounded-lg border border-border/60" />}>
              <KPIRow metrics={metrics} loading={loading} />
            </Suspense>
          </section>

          <section
            aria-labelledby="charts-heading"
            className="grid grid-cols-1 gap-4 xl:grid-cols-2"
          >
            <h2 id="charts-heading" className="sr-only">
              Graficos financieros
            </h2>
            <Suspense fallback={<div className="h-[360px] rounded-lg border border-border/60" />}>
              <IncomeOutcomeChart data={monthlyData} loading={loading} />
            </Suspense>
            <Suspense fallback={<div className="h-[360px] rounded-lg border border-border/60" />}>
              <ProfitPercentChart data={monthlyData} loading={loading} />
            </Suspense>
          </section>
        </div>
      </div>
      </main>
    </>
  );
}

export default App;
