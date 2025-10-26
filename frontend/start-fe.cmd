@echo off
echo ========================================
echo Starting Frontend Server...
echo ========================================
cd /d "%~dp0"
set HOST=
set PORT=3000
set BROWSER=none
echo.
echo Backend should be running on: http://localhost:5000
echo Frontend will start on: http://localhost:3000
echo.
npm start

