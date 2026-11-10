@echo off
setlocal
cd /d "%~dp0"
set "TALLER_NODE=node"
where node >nul 2>nul
if errorlevel 1 (
  if exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
    set "TALLER_NODE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"
  ) else (
    echo Instala Node.js 22.13 o posterior y vuelve a abrir este archivo.
    pause
    exit /b 1
  )
)
if not exist "node_modules\express\package.json" (
  echo Instalando dependencias del proyecto...
  call npm install
  if errorlevel 1 (
    echo No se pudieron instalar. Revisa Node.js, npm y tu conexion.
    pause
    exit /b 1
  )
)
echo Abre http://localhost:3000 en tu navegador.
echo Para detener el servidor, pulsa Ctrl+C.
"%TALLER_NODE%" server.js
pause
