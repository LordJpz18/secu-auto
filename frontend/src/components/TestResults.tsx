import type { RunResponse } from "../types";

type TestResultsProps = {
  result: RunResponse | null;
  errorMessage: string | null;
  isRunning: boolean;
};

export function TestResults({ result, errorMessage, isRunning }: TestResultsProps) {
  return (
    <section className="rounded-[1.75rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Tests</p>
          <h3 className="text-lg font-black">Résultats de l'aventure</h3>
        </div>
        {isRunning ? (
          <div className="rounded-full bg-cyan-400/20 px-3 py-1 text-sm font-semibold text-cyan-200">Analyse en cours...</div>
        ) : null}
      </div>

      {errorMessage ? (
        <div className="rounded-2xl border border-rose-400/30 bg-rose-500/10 p-4 text-sm text-rose-100">{errorMessage}</div>
      ) : null}

      {!result && !errorMessage ? (
        <p className="text-sm text-slate-300">Lance les tests pour voir si ton code aide les Pythonautes.</p>
      ) : null}

      {result ? (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className={`rounded-full px-4 py-2 text-sm font-bold ${result.success ? "bg-emerald-400/20 text-emerald-200" : "bg-amber-400/20 text-amber-100"}`}>
              {result.passed_tests} / {result.total_tests} tests réussis
            </span>
            <span className="text-sm text-slate-300">{result.message}</span>
          </div>

          <div className="grid gap-3">
            {result.details.map((detail) => (
              <div
                key={detail.name}
                className={`rounded-2xl border p-4 text-sm ${
                  detail.passed
                    ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
                    : "border-amber-400/30 bg-amber-500/10 text-amber-50"
                }`}
              >
                <div className="mb-1 flex items-center justify-between">
                  <strong>{detail.name}</strong>
                  <span>{detail.passed ? "Réussi" : "À corriger"}</span>
                </div>
                <p>{detail.message}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  );
}
