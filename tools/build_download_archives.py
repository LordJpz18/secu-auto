from __future__ import annotations

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


ROOT = Path(__file__).resolve().parent.parent
SITE_DIR = ROOT / "download-site"
ARCHIVES_DIR = SITE_DIR / "archives"

ARCHIVES = [
    {
        "name": "python-quest-backend.zip",
        "sources": [ROOT / "backend"],
    },
    {
        "name": "python-quest-frontend.zip",
        "sources": [ROOT / "frontend"],
    },
    {
        "name": "python-quest-complet.zip",
        "sources": [
            ROOT / "backend",
            ROOT / "frontend",
            ROOT / "README.md",
            ROOT / "run-local.ps1",
            ROOT / "lancer-python-quest.bat",
            ROOT / ".gitignore",
        ],
    },
]

EXCLUDED_DIRS = {
    ".git",
    ".venv",
    "node_modules",
    "dist",
    "__pycache__",
    ".mypy_cache",
    ".pytest_cache",
}

EXCLUDED_FILES = {
    ".DS_Store",
}


def iter_files(source: Path):
    if source.is_file():
        yield source
        return

    for path in source.rglob("*"):
        if not path.is_file():
            continue
        if any(part in EXCLUDED_DIRS for part in path.parts):
            continue
        if path.name in EXCLUDED_FILES:
            continue
        yield path


def archive_member_name(path: Path) -> str:
    return path.relative_to(ROOT).as_posix()


def build_archive(archive_name: str, sources: list[Path]) -> Path:
    ARCHIVES_DIR.mkdir(parents=True, exist_ok=True)
    archive_path = ARCHIVES_DIR / archive_name

    with ZipFile(archive_path, "w", compression=ZIP_DEFLATED) as zip_file:
        for source in sources:
            for path in iter_files(source):
                zip_file.write(path, archive_member_name(path))

    return archive_path


def main() -> None:
    print("Generation des archives de telechargement...")
    for archive in ARCHIVES:
        archive_path = build_archive(archive["name"], archive["sources"])
        print(f"- {archive_path.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
