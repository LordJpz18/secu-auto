from __future__ import annotations

from typing import List

from pydantic import BaseModel, Field


class ExampleModel(BaseModel):
    input: str
    output: str


class ExerciseSummary(BaseModel):
    id: str
    level: int
    step: int
    title: str
    zone: str
    short_objective: str


class ExerciseDetail(ExerciseSummary):
    story: str
    instructions: str
    function_name: str
    starter_code: str
    examples: List[ExampleModel]
    success_message: str
    failure_hint: str


class RunRequest(BaseModel):
    exercise_id: str = Field(..., min_length=1)
    code: str = Field(..., min_length=1, max_length=6000)


class TestResultModel(BaseModel):
    name: str
    passed: bool
    message: str


class RunResponse(BaseModel):
    success: bool
    passed_tests: int
    total_tests: int
    details: List[TestResultModel]
    message: str
