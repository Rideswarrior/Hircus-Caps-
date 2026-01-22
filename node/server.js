// server.js - Node.js server for Whisper.cpp integration
const express = require('express');
const cors = require('cors');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Language mapping for Whisper
const languageMap = {
  'en': 'en',
  'ml': 'ml',
  'ml-en': 'ml' // For Manglish, we'll use Malayalam model but preserve English letters
};

// Generate captions endpoint
app.post('/generate-captions', (req, res) => {
  try {
    const { audioPath, language } = req.body;
    
    if (!audioPath) {
      return res.status(400).json({ error: 'Audio path is required' });
    }
    
    if (!fs.existsSync(audioPath)) {
      return res.status(400).json({ error: 'Audio file not found' });
    }
    
    // Determine language for Whisper
    const whisperLanguage = languageMap[language] || 'en';
    
    // Path for Whisper executable (adjust based on your installation)
    const whisperPath = path.join(__dirname, 'whisper.cpp', 'main');
    
    // Check if Whisper executable exists
    if (!fs.existsSync(whisperPath)) {
      return res.status(500).json({ 
        error: 'Whisper.cpp not found. Please install Whisper.cpp in the node/whisper.cpp directory' 
      });
    }
    
    // Output file path for captions
    const outputBase = path.join(__dirname, 'temp', `captions_${Date.now()}`);
    const outputSrt = `${outputBase}.srt`;
    
    // Whisper command with parameters
    // Using params optimized for caption generation:
    // -otxt: output text only
    // -olrc: output in LRC format (easier to parse)
    // -l: language
    const command = `"${whisperPath}" -m "${path.join(__dirname, 'whisper.cpp', 'models', 'ggml-base.en.bin')}" -f "${audioPath}" -l ${whisperLanguage} -osrt -of "${outputBase}" --output-txt`;
    
    console.log('Executing Whisper command:', command);
    
    // Execute Whisper
    exec(command, { cwd: path.join(__dirname, 'whisper.cpp') }, (error, stdout, stderr) => {
      if (error) {
        console.error('Whisper execution error:', error);
        return res.status(500).json({ 
          error: `Whisper processing failed: ${error.message}` 
        });
      }
      
      // Check if output files were created
      if (!fs.existsSync(outputSrt)) {
        console.error('SRT file not created. Stderr:', stderr);
        return res.status(500).json({ 
          error: 'Caption file not generated. Check Whisper installation and model files.' 
        });
      }
      
      // Parse SRT file to JSON
      try {
        const captions = parseSrtFile(outputSrt);
        res.json({ captions });
      } catch (parseError) {
        console.error('SRT parsing error:', parseError);
        res.status(500).json({ 
          error: 'Failed to parse caption file' 
        });
      }
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Parse SRT file to JSON
function parseSrtFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const blocks = content.split(/\n\s*\n/).filter(block => block.trim());
  
  const captions = [];
  
  for (const block of blocks) {
    const lines = block.trim().split('\n');
    if (lines.length < 3) continue;
    
    // Parse time format: HH:MM:SS,mmm --> HH:MM:SS,mmm
    const timeLine = lines[1];
    const timeMatch = timeLine.match(/(\d{2}):(\d{2}):(\d{2}),(\d{3})\s*-->\s*(\d{2}):(\d{2}):(\d{2}),(\d{3})/);
    
    if (timeMatch) {
      const start = 
        parseInt(timeMatch[1]) * 3600 + 
        parseInt(timeMatch[2]) * 60 + 
        parseInt(timeMatch[3]) + 
        parseInt(timeMatch[4]) / 1000;
        
      const end = 
        parseInt(timeMatch[5]) * 3600 + 
        parseInt(timeMatch[6]) * 60 + 
        parseInt(timeMatch[7]) + 
        parseInt(timeMatch[8]) / 1000;
      
      // Join all remaining lines as caption text
      const text = lines.slice(2).join(' ').trim();
      
      captions.push({
        start: parseFloat(start.toFixed(3)),
        end: parseFloat(end.toFixed(3)),
        text: text
      });
    }
  }
  
  return captions;
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
  console.log(`Hircus Caps server running on http://localhost:${PORT}`);
  
  // Create temp directory if it doesn't exist
  const tempDir = path.join(__dirname, 'temp');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }
});

module.exports = app;