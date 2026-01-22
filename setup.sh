#!/bin/bash

echo "Setting up Hircus Caps..."

# Check if we're in the right directory
if [ ! -f "main.js" ]; then
  echo "Error: Please run this script from the Hircus Caps root directory"
  exit 1
fi

# Install Node dependencies
echo "Installing Node.js dependencies..."
cd node
npm install

# Clone Whisper.cpp if not present
if [ ! -d "whisper.cpp" ]; then
  echo "Cloning Whisper.cpp..."
  git clone https://github.com/ggerganov/whisper.cpp.git
  cd whisper.cpp
  make
  cd ..
else
  echo "Whisper.cpp already installed"
fi

# Create temp directory
mkdir -p temp

echo "Setup complete!"
echo ""
echo "Next steps:"
echo "1. Download a Whisper model and place it in node/whisper.cpp/models/"
echo "2. Start the server: npm start"
echo "3. Enable unsigned plugins in After Effects"
echo "4. Launch After Effects and open Window > Extensions > Hircus Caps"