from __future__ import annotations

import json
import subprocess
import sys
import tempfile
import textwrap
from pathlib import Path

from .exercises import get_exercise_or_none

MAX_CODE_SIZE = 6000
TIMEOUT_SECONDS = 2
BLOCKED_PATTERNS = [
    "import os",
    "import sys",
    "import subprocess",
    "__import__",
    "open(",
    "eval(",
    "exec(",
]


class RunnerError(Exception):
    pass


def _child_script(user_code: str, tests: list[dict[str, str]]) -> str:
    test_block = []
    for test in tests:
        test_block.append(
            textwrap.dedent(
                f"""
                try:
                    {test["assertion"]}
                    results.append({{"name": {test["name"]!r}, "passed": True, "message": "Test réussi."}})
                except AssertionError as error:
                    results.append({{"name": {test["name"]!r}, "passed": False, "message": str(error)}})
                except Exception as error:
                    results.append({{"name": {test["name"]!r}, "passed": False, "message": "Erreur pendant le test : " + str(error)}})
                """
            ).strip()
        )

    safe_prelude = textwrap.dedent(
        """
        import json

        results = []
        """
    ).strip()

    body = "\n\n".join(test_block)
    return f"{safe_prelude}\n\n{user_code.rstrip()}\n\n{body}\n\nprint('PYTHON_QUEST_RESULTS=' + json.dumps(results, ensure_ascii=False))\n"


def run_exercise_code(exercise_id: str, code: str) -> dict:
    exercise = get_exercise_or_none(exercise_id)
    if exercise is None:
        raise RunnerError("Exercice introuvable.")

    if len(code) > MAX_CODE_SIZE:
        raise RunnerError("Ton code est trop long pour cette version de l'atelier.")

    lowered = code.lower()
    if any(pattern in lowered for pattern in BLOCKED_PATTERNS):
        raise RunnerError("Ce code utilise une instruction bloquée pour protéger l'atelier.")

    script = _child_script(code, exercise["tests"])

    try:
        with tempfile.TemporaryDirectory(prefix="python-quest-") as temp_dir:
            script_path = Path(temp_dir) / "submission.py"
            script_path.write_text(script, encoding="utf-8")

            completed = subprocess.run(
                [sys.executable, str(script_path)],
                cwd=temp_dir,
                capture_output=True,
                text=True,
                timeout=TIMEOUT_SECONDS,
            )
    except subprocess.TimeoutExpired as error:
        raise RunnerError("Le code a pris trop de temps. Essaie une boucle qui s'arrête vraiment.") from error
    except OSError as error:
        raise RunnerError("Le serveur n'a pas réussi à lancer le code Python.") from error

    stdout = completed.stdout or ""
    stderr = completed.stderr or ""

    marker = "PYTHON_QUEST_RESULTS="
    marker_line = next((line for line in stdout.splitlines() if line.startswith(marker)), None)

    if marker_line is None:
        message = "Le code n'a pas renvoyé de résultats de test."
        if stderr.strip():
            message += f" Détail technique: {stderr.strip()[:300]}"
        raise RunnerError(message)

    try:
        details = json.loads(marker_line[len(marker) :])
    except json.JSONDecodeError as error:
        raise RunnerError("Le serveur n'a pas pu lire les résultats des tests.") from error

    passed_tests = sum(1 for detail in details if detail.get("passed"))
    total_tests = len(details)
    success = passed_tests == total_tests and total_tests > 0

    if completed.returncode != 0 and not details:
        snippet = stderr.strip()[:300] or "Erreur inconnue."
        raise RunnerError(f"Ton code a provoqué une erreur : {snippet}")

    if success:
        message = exercise["success_message"]
    elif completed.returncode != 0 and stderr.strip():
        message = f"{exercise['failure_hint']} Erreur repérée : {stderr.strip().splitlines()[-1][:200]}"
    else:
        message = exercise["failure_hint"]

    return {
        "success": success,
        "passed_tests": passed_tests,
        "total_tests": total_tests,
        "details": details,
        "message": message,
    }
