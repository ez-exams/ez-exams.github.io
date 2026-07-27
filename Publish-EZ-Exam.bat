@echo off
title Publish EZ Exam to GitHub Pages
cd /d "%~dp0"

where git >nul 2>nul
if errorlevel 1 (
    echo Git is required but was not found. Install it from https://git-scm.com
    pause
    exit /b 1
)

if not exist ".git" (
    echo First-time setup: initializing git repository...
    git init
    git remote add origin https://github.com/ez-exams/ez-exams.github.io.git
)

git add -A
git commit -m "Publish EZ Exam" || echo Nothing new to commit - pushing anyway...
git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo Push failed. If a login window appeared, sign in as stevenlb94 and run this again.
) else (
    echo.
    echo Done! Your site will be live at https://ez-exams.github.io within a couple of minutes.
)
pause
