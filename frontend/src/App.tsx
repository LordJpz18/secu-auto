import { useEffect, useState } from "react";
import { GamePage } from "./pages/GamePage";
import type { ExerciseDetail, ExerciseSummary, ProgressState, RunResponse } from "./types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const STORAGE_KEY = "python-quest-progress";

const defaultProgress: ProgressState = {
  completedIds: [],
  draftCode: {},
};

function loadProgress(): ProgressState {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return defaultProgress;
  }

  try {
    const parsed = JSON.parse(raw) as ProgressState;
    return {
      completedIds: Array.isArray(parsed.completedIds) ? parsed.completedIds : [],
      draftCode: parsed.draftCode && typeof parsed.draftCode === "object" ? parsed.draftCode : {},
    };
  } catch {
    return defaultProgress;
  }
}

export default function App() {
  const [exercises, setExercises] = useState<ExerciseSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseDetail | null>(null);
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress());
  const [code, setCode] = useState("");
  const [result, setResult] = useState<RunResponse | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/exercises`);
        if (!response.ok) {
          throw new Error("Impossible de charger les exercices.");
        }
        const data = (await response.json()) as ExerciseSummary[];
        setExercises(data);
        setSelectedId((current) => current ?? data[0]?.id ?? null);
      } catch (error) {
        setLoadingError(error instanceof Error ? error.message : "Erreur inconnue.");
      }
    };

    fetchExercises().catch(() => {
      setLoadingError("Le chargement des exercices a échoué.");
    });
  }, []);

  useEffect(() => {
    const fetchExercise = async () => {
      if (!selectedId) {
        return;
      }

      setResult(null);
      setErrorMessage(null);

      try {
        const response = await fetch(`${API_BASE_URL}/api/exercises/${selectedId}`);
        if (!response.ok) {
          throw new Error("Impossible d'ouvrir cette étape.");
        }
        const data = (await response.json()) as ExerciseDetail;
        setSelectedExercise(data);
        setCode(progress.draftCode[data.id] ?? data.starter_code);
      } catch (error) {
        setErrorMessage(error instanceof Error ? error.message : "Erreur inconnue.");
      }
    };

    fetchExercise().catch(() => {
      setErrorMessage("Cette étape n'a pas pu être chargée.");
    });
  }, [selectedId]);

  const handleSelect = (exerciseId: string) => {
    const index = exercises.findIndex((exercise) => exercise.id === exerciseId);
    const unlocked = index === 0 || progress.completedIds.includes(exercises[index - 1].id);
    if (!unlocked) {
      return;
    }
    setSelectedId(exerciseId);
  };

  const handleCodeChange = (value: string) => {
    if (!selectedId) {
      return;
    }
    setCode(value);
    setProgress((current) => ({
      ...current,
      draftCode: {
        ...current.draftCode,
        [selectedId]: value,
      },
    }));
  };

  const handleRun = async () => {
    if (!selectedId) {
      return;
    }

    setIsRunning(true);
    setErrorMessage(null);
    setResult(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ exercise_id: selectedId, code }),
      });

      if (!response.ok) {
        const errorBody = (await response.json().catch(() => null)) as { detail?: string } | null;
        throw new Error(errorBody?.detail ?? "Le serveur n'a pas pu lancer les tests.");
      }

      const data = (await response.json()) as RunResponse;
      setResult(data);

      if (data.success) {
        setProgress((current) => ({
          ...current,
          completedIds: current.completedIds.includes(selectedId)
            ? current.completedIds
            : [...current.completedIds, selectedId],
          draftCode: {
            ...current.draftCode,
            [selectedId]: code,
          },
        }));
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Erreur inconnue.");
    } finally {
      setIsRunning(false);
    }
  };

  const handleContinue = () => {
    if (!selectedId) {
      return;
    }
    const index = exercises.findIndex((exercise) => exercise.id === selectedId);
    const nextExercise = exercises[index + 1];
    if (nextExercise) {
      setSelectedId(nextExercise.id);
    }
  };

  const handleReset = () => {
    setProgress(defaultProgress);
    setResult(null);
    setErrorMessage(null);
    if (selectedExercise) {
      setCode(selectedExercise.starter_code);
    }
  };

  if (loadingError) {
    return (
      <div className="flex min-h-screen items-center justify-center p-6">
        <div className="max-w-xl rounded-[2rem] bg-white/80 p-8 text-center shadow-glow">
          <h1 className="font-display text-3xl font-black text-quest-deep">Python Quest</h1>
          <p className="mt-4 text-slate-700">{loadingError}</p>
          <p className="mt-2 text-sm text-slate-500">Vérifie que le backend FastAPI tourne bien sur http://localhost:8000.</p>
        </div>
      </div>
    );
  }

  return (
    <GamePage
      exercises={exercises}
      selectedExercise={selectedExercise}
      selectedId={selectedId}
      progress={progress}
      code={code}
      result={result}
      errorMessage={errorMessage}
      isRunning={isRunning}
      onSelect={handleSelect}
      onCodeChange={handleCodeChange}
      onRun={handleRun}
      onContinue={handleContinue}
      onReset={handleReset}
    />
  );
}
