from __future__ import annotations

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .exercises import EXERCISES, get_exercise_or_none, serialize_exercise_detail, serialize_exercise_summary
from .models import ExerciseDetail, ExerciseSummary, RunRequest, RunResponse
from .runner import RunnerError, run_exercise_code

app = FastAPI(
    title="Python Quest API",
    version="0.1.0",
    description="API privée pour l'atelier Python Quest.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/api/exercises", response_model=list[ExerciseSummary])
def list_exercises() -> list[ExerciseSummary]:
    return [ExerciseSummary(**serialize_exercise_summary(exercise)) for exercise in EXERCISES]


@app.get("/api/exercises/{exercise_id}", response_model=ExerciseDetail)
def get_exercise(exercise_id: str) -> ExerciseDetail:
    exercise = get_exercise_or_none(exercise_id)
    if exercise is None:
        raise HTTPException(status_code=404, detail="Exercice introuvable.")
    return ExerciseDetail(**serialize_exercise_detail(exercise))


@app.post("/api/run", response_model=RunResponse)
def run_code(payload: RunRequest) -> RunResponse:
    try:
        result = run_exercise_code(payload.exercise_id, payload.code)
    except RunnerError as error:
        raise HTTPException(status_code=400, detail=str(error)) from error
    except Exception as error:  # pragma: no cover - safety net
        raise HTTPException(status_code=500, detail="Une erreur inattendue est arrivée côté serveur.") from error
    return RunResponse(**result)
