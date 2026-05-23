import type { ExerciseSummary } from "../types";
import { zoneThemes } from "../data/zones";

type GameBoardProps = {
  exercises: ExerciseSummary[];
  completedIds: string[];
  selectedId: string | null;
  onSelect: (exerciseId: string) => void;
};

function isUnlocked(index: number, exercises: ExerciseSummary[], completedIds: string[]) {
  if (index === 0) {
    return true;
  }
  return completedIds.includes(exercises[index - 1].id);
}

export function GameBoard({ exercises, completedIds, selectedId, onSelect }: GameBoardProps) {
  return (
    <section className="rounded-[2rem] border border-white/60 bg-white/70 p-6 shadow-glow backdrop-blur">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-quest-ocean">Plateau d'aventure</p>
          <h2 className="font-display text-2xl font-black text-quest-deep">L'île des Pythonautes</h2>
        </div>
        <div className="rounded-full bg-quest-sky px-4 py-2 text-sm font-bold text-quest-deep">
          {completedIds.length} / {exercises.length} étapes réussies
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-5">
        {exercises.map((exercise, index) => {
          const unlocked = isUnlocked(index, exercises, completedIds);
          const completed = completedIds.includes(exercise.id);
          const selected = selectedId === exercise.id;
          const theme = zoneThemes[exercise.level];

          return (
            <button
              key={exercise.id}
              type="button"
              onClick={() => unlocked && onSelect(exercise.id)}
              disabled={!unlocked}
              className={[
                "group relative min-h-40 overflow-hidden rounded-[1.5rem] border p-4 text-left transition duration-200",
                unlocked ? "cursor-pointer border-white/80 bg-white shadow-lg hover:-translate-y-1" : "cursor-not-allowed border-slate-200 bg-slate-100 opacity-70",
                selected ? "ring-4 ring-quest-sun/60" : "",
              ].join(" ")}
            >
              <div
                className={[
                  "absolute inset-x-0 top-0 h-2 bg-gradient-to-r",
                  theme.accent,
                ].join(" ")}
              />

              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-quest-sky text-lg font-black text-quest-deep">
                  {exercise.step}
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-wide text-quest-ocean">Niveau {exercise.level}</p>
                  <p className="text-xs text-slate-500">{theme.label}</p>
                </div>
              </div>

              <h3 className="min-h-[3.5rem] font-display text-lg font-black leading-tight text-quest-deep">
                {exercise.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600">{exercise.short_objective}</p>

              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {exercise.zone}
                </span>
                <span className="text-xl">
                  {completed ? "⭐" : unlocked ? "🧭" : "🔒"}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
