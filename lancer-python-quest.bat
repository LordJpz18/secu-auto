@echo off
setlocal
cd /d "%~dp0"

powershell -ExecutionPolicy Bypass -File ".\run-local.ps1"

if errorlevel 1 (
    echo.
    echo Le lancement a rencontre une erreur.
    echo Verifie que Python 3 et Node.js sont installes, puis relance ce fichier.
    pause
)
