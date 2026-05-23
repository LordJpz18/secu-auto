type ProgressPanelProps = {
  completedCount: number;
  totalCount: number;
  unlockedTitle?: string;
  onReset: () => void;
};

export function ProgressPanel({ completedCount, totalCount, unlockedTitle, onReset }: ProgressPanelProps) {
  const percentage = Math.round((completedCount / totalCount) * 100);

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-[2rem] bg-gradient-to-r from-quest-deep via-quest-ocean to-quest-violet bg-[length:200%_200%] p-6 text-white shadow-glow animate-shimmer">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-100">Cap sur l'île</p>
        <h1 className="mt-2 font-display text-4xl font-black leading-tight">Python Quest</h1>
        <p className="mt-3 max-w-2xl text-sky-50">
          Un plateau de 20 missions pour apprendre Python pas à pas : fonctions, listes, boucles, dictionnaires et mini-algorithmes.
        </p>
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-sm font-semibold text-cyan-50">
            <span>Progression</span>
            <span>{percentage}%</span>
          </div>
          <div className="h-4 overflow-hidden rounded-full bg-white/25">
            <div className="h-full rounded-full bg-quest-sun transition-all duration-300" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>

      <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-glow backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-quest-ocean">Carnet d'exploration</p>
        <div className="mt-4 space-y-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Étapes réussies</p>
            <p className="font-display text-3xl font-black text-quest-deep">
              {completedCount} / {totalCount}
            </p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-800">
            <strong>Prochaine aventure :</strong> {unlockedTitle ?? "Commence par la première case."}
          </div>
          <button
            type="button"
            onClick={onReset}
            className="w-full rounded-full border border-slate-300 px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100"
          >
            Réinitialiser la progression
          </button>
        </div>
      </div>
    </section>
  );
}
