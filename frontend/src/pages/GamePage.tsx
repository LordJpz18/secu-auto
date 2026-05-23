import type { ExerciseDetail, ExerciseSummary, ProgressState, RunResponse } from "../types";
import { ExercisePanel } from "../components/ExercisePanel";
import { GameBoard } from "../components/GameBoard";
import { ProgressPanel } from "../components/ProgressPanel";

type GamePageProps = {
  exercises: ExerciseSummary[];
  selectedExercise: ExerciseDetail | null;
  selectedId: string | null;
  progress: ProgressState;
  code: string;
  result: RunResponse | null;
  errorMessage: string | null;
  isRunning: boolean;
  onSelect: (exerciseId: string) => void;
  onCodeChange: (value: string) => void;
  onRun: () => void;
  onContinue: () => void;
  onReset: () => void;
};

export function GamePage(props: GamePageProps) {
  const {
    exercises,
    selectedExercise,
    selectedId,
    progress,
    code,
    result,
    errorMessage,
    isRunning,
    onSelect,
    onCodeChange,
    onRun,
    onContinue,
    onReset,
  } = props;

  const nextExercise = exercises.find((exercise, index) => {
    if (progress.completedIds.includes(exercise.id)) {
      return false;
    }
    return index === 0 || progress.completedIds.includes(exercises[index - 1].id);
  });

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 lg:px-8 xl:py-8">
      <ProgressPanel
        completedCount={progress.completedIds.length}
        totalCount={exercises.length}
        unlockedTitle={nextExercise?.title}
        onReset={onReset}
      />

      <GameBoard
        exercises={exercises}
        completedIds={progress.completedIds}
        selectedId={selectedId}
        onSelect={onSelect}
      />

      <ExercisePanel
        exercise={selectedExercise}
        code={code}
        onCodeChange={onCodeChange}
        onRun={onRun}
        onContinue={onContinue}
        result={result}
        errorMessage={errorMessage}
        isRunning={isRunning}
      />
    </div>
  );
}
