param(
    [switch]$ForceInstall
)

$ErrorActionPreference = "Stop"

function Write-Step($message) {
    Write-Host ""
    Write-Host "==> $message" -ForegroundColor Cyan
}

function Find-PythonCommand {
    if (Get-Command py -ErrorAction SilentlyContinue) {
        return @("py", "-3")
    }

    if (Get-Command python -ErrorAction SilentlyContinue) {
        return @("python")
    }

    throw "Python 3 n'est pas installé. Installe Python 3.11+ puis relance ce script."
}

function Ensure-Command($name, $installHint) {
    if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
        throw "$name n'est pas disponible. $installHint"
    }
}

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $projectRoot "backend"
$frontendDir = Join-Path $projectRoot "frontend"
$venvDir = Join-Path $backendDir ".venv"
$venvPython = Join-Path $venvDir "Scripts\python.exe"
$frontendEnv = Join-Path $frontendDir ".env"
$frontendEnvExample = Join-Path $frontendDir ".env.example"

Write-Step "Vérification des outils"
$pythonCommand = Find-PythonCommand
$pythonArgs = @($pythonCommand | Select-Object -Skip 1)
Ensure-Command -name "npm" -installHint "Installe Node.js LTS depuis https://nodejs.org/."

Write-Host "Python OK : $($pythonCommand -join ' ')" -ForegroundColor Green
Write-Host "npm OK" -ForegroundColor Green

if (-not (Test-Path $venvPython)) {
    Write-Step "Création de l'environnement Python"
    & $pythonCommand[0] @pythonArgs -m venv $venvDir
}

Write-Step "Installation du backend"
if ($ForceInstall -or -not (Test-Path (Join-Path $venvDir "Scripts\uvicorn.exe"))) {
    & $venvPython -m pip install --upgrade pip
    & $venvPython -m pip install -r (Join-Path $backendDir "requirements.txt")
} else {
    Write-Host "Dépendances backend déjà présentes." -ForegroundColor Green
}

Write-Step "Installation du frontend"
if ($ForceInstall -or -not (Test-Path (Join-Path $frontendDir "node_modules"))) {
    Push-Location $frontendDir
    try {
        npm install
    }
    finally {
        Pop-Location
    }
} else {
    Write-Host "Dépendances frontend déjà présentes." -ForegroundColor Green
}

if (-not (Test-Path $frontendEnv) -and (Test-Path $frontendEnvExample)) {
    Write-Step "Création du fichier frontend/.env"
    Copy-Item $frontendEnvExample $frontendEnv
}

$backendCommand = "& '$venvPython' -m uvicorn app.main:app --reload --port 8000"
$frontendCommand = "Set-Location '$frontendDir'; npm run dev"

Write-Step "Ouverture des serveurs"
Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    "Set-Location '$backendDir'; $backendCommand"
)

Start-Sleep -Seconds 2

Start-Process powershell -ArgumentList @(
    "-NoExit",
    "-Command",
    $frontendCommand
)

Write-Host ""
Write-Host "Python Quest est en cours de démarrage." -ForegroundColor Green
Write-Host "Frontend : http://localhost:5173" -ForegroundColor Yellow
Write-Host "Backend  : http://localhost:8000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Relance avec .\run-local.ps1 -ForceInstall si tu veux réinstaller les dépendances." -ForegroundColor DarkGray
