@echo off
echo Setting up Hircus Caps...

REM Check if we're in the right directory
if not exist "main.js" (
  echo Error: Please run this script from the Hircus Caps root directory
  pause
  exit /b 1
)

REM Install Node dependencies
echo Installing Node.js dependencies...
cd node
npm install

REM Clone Whisper.cpp if not present
if not exist "whisper.cpp" (
  echo Cloning Whisper.cpp...
  git clone https://github.com/ggerganov/whisper.cpp.git
  cd whisper.cpp
  REM Note: On Windows, you'll need to build Whisper.cpp manually
  cd ..
) else (
  echo Whisper.cpp already installed
)

REM Create temp directory
if not exist "temp" mkdir temp

echo Setup complete!
echo.
echo Next steps:
echo 1. Download a Whisper model and place it in node\whisper.cpp\models\
echo 2. Start the server: npm start
echo 3. Enable unsigned plugins in After Effects
echo 4. Launch After Effects and open Window ^> Extensions ^> Hircus Caps
pause