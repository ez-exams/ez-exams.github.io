@echo off
title EZ Exam - Certification Study Hub
cd /d "%~dp0"
where py >nul 2>nul
if %errorlevel%==0 (
    py run.py
) else (
    python run.py
)
pause
