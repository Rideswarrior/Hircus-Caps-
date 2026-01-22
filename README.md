# Hircus Caps - After Effects Caption Generator

A powerful, offline-capable caption generator plugin for Adobe After Effects that supports English, Malayalam, and Manglish.

## Features

- **Offline Speech Recognition**: Uses Whisper.cpp for local audio processing
- **Multi-language Support**: English, Malayalam (മലയാളം), and Manglish
- **One-click Workflow**: Export audio, generate captions, apply to composition
- **Non-destructive**: Creates new caption layers without modifying existing content
- **Creator-friendly**: Clean, modern interface designed for content creators

## Installation

### Prerequisites

1. Adobe After Effects 2025
2. Node.js (v16 or higher)
3. Whisper.cpp installed in `node/whisper.cpp/`

### Setup Instructions

1. **Install the plugin**:
   - Copy the entire plugin folder to your After Effects extensions directory:
     - **Windows**: `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions\`
     - **Mac**: `/Library/Application Support/Adobe/CEP/extensions/`

2. **Install Whisper.cpp**:
   - Clone Whisper.cpp into `node/whisper.cpp/`:
     ```bash
     cd node
     git clone https://github.com/ggerganov/whisper.cpp.git
     cd whisper.cpp
     make
     ```
   - Download a model (e.g., ggml-base.en.bin) and place it in `node/whisper.cpp/models/`

3. **Install Node dependencies**:
   ```bash
   cd node
   npm install
   ```

4. **Start the server**:
   ```bash
   cd node
   npm start
   ```

5. **Enable unsigned plugins in After Effects**:
   - Close After Effects
   - Open Registry Editor (Windows) or Terminal (Mac)
   - **Windows**: Navigate to `HKEY_CURRENT_USER\Software\Adobe\CSXS.12` and add a new entry `PlayerDebugMode` of type "string" with value "1"
   - **Mac**: Run in Terminal:
     ```bash
     defaults write com.adobe.CSXS.12 PlayerDebugMode 1
     ```

6. **Launch After Effects** and go to `Window > Extensions > Hircus Caps`

## Usage

1. Open your composition in After Effects
2. Select the language for your audio
3. Click "Export Audio" to extract audio from your composition
4. Click "Generate Captions" to process the audio with Whisper
5. Review the generated captions in the preview panel
6. Click "Apply to Composition" to create caption layers in your project

## Language Support

- **English**: Standard English speech recognition
- **Malayalam (മലയാളം)**: Native Malayalam language support
- **Manglish**: Malayalam spoken using English letters (preserves creator slang)

## Troubleshooting

### Common Issues

1. **"CSInterface is not defined"**:
   - Ensure unsigned plugins are enabled in After Effects
   - Restart After Effects after enabling debug mode

2. **"Whisper.cpp not found"**:
   - Verify Whisper.cpp is installed in `node/whisper.cpp/`
   - Ensure you've run `make` in the whisper.cpp directory

3. **"Model not found"**:
   - Download a Whisper model and place it in `node/whisper.cpp/models/`
   - Recommended: `ggml-base.en.bin` for English, `ggml-base.bin` for multilingual

4. **Server connection failed**:
   - Ensure the Node.js server is running (`npm start` in the node directory)
   - Check that the server is accessible at http://localhost:3000

## Technical Details

### Architecture

- **Frontend**: CEP Panel (HTML/CSS/JavaScript)
- **Backend**: Node.js server with Express
- **Speech Processing**: Whisper.cpp (local, offline)
- **AE Automation**: ExtendScript (.jsx)

### File Structure

```
Hircus Caps/
├── CSXS/
│   └── manifest.xml          # Plugin manifest
├── jsx/
│   └── host.jsx              # After Effects automation
├── node/
│   ├── server.js             # Node.js backend
│   ├── package.json          # Server dependencies
│   ├── whisper.cpp/          # Whisper installation
│   └── temp/                 # Temporary files
├── index.html                # Main UI
├── main.js                   # Frontend logic
├── style.css                 # Styling
└── README.md                # This file
```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request

## Support

For issues, feature requests, or questions, please open an issue on our GitHub repository.

Made with ❤️ for creators