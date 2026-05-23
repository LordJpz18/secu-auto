import Editor from "@monaco-editor/react";
import type { ExerciseDetail, RunResponse } from "../types";
import { TestResults } from "./TestResults";

type ExercisePanelProps = {
  exercise: ExerciseDetail | null;
  code: string;
  onCodeChange: (value: string) => void;
  onRun: () => void;
  onContinue: () => void;
  result: RunResponse | null;
  errorMessage: string | null;
  isRunning: boolean;
};

export function ExercisePanel({
  exercise,
  code,
  onCodeChange,
  onRun,
  onContinue,
  result,
  errorMessage,
  isRunning,
}: ExercisePanelProps) {
  if (!exercise) {
    return (
      <section className="rounded-[2rem] border border-dashed border-white/60 bg-white/40 p-8 text-center shadow-glow backdrop-blur">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-quest-ocean">Mission</p>
        <h2 className="mt-3 font-display text-3xl font-black text-quest-deep">Choisis une étape sur le plateau</h2>
        <p className="mx-auto mt-3 max-w-2xl text-slate-600">
          Chaque case raconte une petite histoire et te demande d'écrire une fonction Python. Quand les 5 tests réussissent, la suite de l'île se débloque.
        </p>
      </section>
    );
  }

  return (
    <section className="grid gap-5 xl:grid-cols-[1.05fr_1.25fr]">
      <div className="rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-glow backdrop-blur">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-quest-sky px-3 py-1 text-xs font-black uppercase tracking-wide text-quest-deep">
            Niveau {exercise.level} • Étape {exercise.step}
          </span>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">{exercise.zone}</span>
        </div>

        <h2 className="font-display text-3xl font-black text-quest-deep">{exercise.title}</h2>
        <p className="mt-3 rounded-2xl bg-sky-50 p-4 text-slate-700">{exercise.story}</p>

        <div className="mt-5 space-y-5">
          <div>
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-quest-ocean">Objectif</h3>
            <p className="text-slate-700">{exercise.instructions}</p>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-quest-ocean">Fonction attendue</h3>
            <code className="block rounded-2xl bg-slate-900 px-4 py-3 text-sm text-cyan-200">{exercise.function_name}</code>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-black uppercase tracking-wide text-quest-ocean">Exemples</h3>
            <div className="space-y-2">
              {exercise.examples.map((example) => (
                <div key={example.input} className="rounded-2xl bg-slate-50 p-3 text-sm text-slate-700">
                  <p>
                    <strong>Entrée :</strong> <code>{example.input}</code>
                  </p>
                  <p>
                    <strong>Sortie :</strong> <code>{example.output}</code>
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            <strong>Indice bienveillant :</strong> {exercise.failure_hint}
          </div>
        </div>
      </div>

      <div className="grid gap-5">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 bg-slate-900 px-5 py-3 text-white">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Éditeur Python</p>
              <p className="text-sm text-slate-300">Écris seulement la fonction demandée.</p>
            </div>
            <button
              type="button"
              onClick={onRun}
              disabled={isRunning}
              className="rounded-full bg-quest-sun px-5 py-2 text-sm font-black text-slate-900 transition hover:brightness-105 disabled:cursor-wait disabled:opacity-70"
            >
              {isRunning ? "Tests..." : "Lancer les tests"}
            </button>
          </div>

          <Editor
            height="440px"
            defaultLanguage="python"
            language="python"
            value={code}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              fontSize: 15,
              wordWrap: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
            onChange={(value) => onCodeChange(value ?? "")}
          />
        </div>

        <TestResults result={result} errorMessage={errorMessage} isRunning={isRunning} />

        {result?.success ? (
          <button
            type="button"
            onClick={onContinue}
            className="rounded-full bg-gradient-to-r from-quest-ocean to-quest-violet px-6 py-4 text-base font-black text-white shadow-lg transition hover:-translate-y-0.5"
          >
            Continuer l'aventure
          </button>
        ) : null}
      </div>
    </section>
  );
}
