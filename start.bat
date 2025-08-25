@echo off
REM Script to start Remove Background Image application on Windows

echo 🚀 Starting Remove Background Image application...

REM Check if virtual environment exists
if not exist "venv" (
    echo ❌ Virtual environment not found. Please create one:
    echo python -m venv venv
    echo venv\Scripts\activate
    echo pip install -r requirements.txt
    pause
    exit /b 1
)

REM Activate virtual environment
echo 📦 Activating virtual environment...
call venv\Scripts\activate

REM Run application
echo 🌐 Starting web server...
python run.py

pause
