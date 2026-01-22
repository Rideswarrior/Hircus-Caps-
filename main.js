// Main JavaScript logic for Hircus Caps plugin
(function () {
  'use strict';

  // Initialize CSInterface
  let cs;
  
  // DOM Elements
  const elements = {
    languageSelect: document.getElementById('language'),
    exportAudioBtn: document.getElementById('exportAudioBtn'),
    generateCaptionsBtn: document.getElementById('generateCaptionsBtn'),
    applyCaptionsBtn: document.getElementById('applyCaptionsBtn'),
    statusText: document.getElementById('statusText'),
    statusIndicator: document.getElementById('statusIndicator'),
    progressBar: document.getElementById('progressBar'),
    progressFill: document.getElementById('progressFill'),
    resultContainer: document.getElementById('resultContainer'),
    captionsPreview: document.getElementById('captionsPreview')
  };

  // State
  let audioFilePath = null;
  let captionsData = null;

  // Initialize when CSInterface is ready
  function init() {
    // Check if CSInterface is available
    if (typeof CSInterface === 'undefined') {
      console.log('CSInterface not yet available, retrying in 100ms...');
      setTimeout(init, 100);
      return;
    }
    
    // Initialize CSInterface
    cs = new CSInterface();
    
    // Add event listeners
    elements.exportAudioBtn.addEventListener('click', exportAudio);
    elements.generateCaptionsBtn.addEventListener('click', generateCaptions);
    elements.applyCaptionsBtn.addEventListener('click', applyCaptions);
    
    // Set initial status
    updateStatus('Idle', 'idle');
    
    console.log('Hircus Caps initialized with CSInterface');
  }

  // Update status indicator
  function updateStatus(text, status) {
    elements.statusText.textContent = text;
    elements.statusIndicator.className = 'indicator ' + status;
    
    // Show/hide progress bar
    if (status === 'processing') {
      elements.progressBar.classList.remove('hidden');
    } else {
      elements.progressBar.classList.add('hidden');
      elements.progressFill.style.width = '0%';
    }
  }

  // Update progress bar
  function updateProgress(percent) {
    elements.progressFill.style.width = percent + '%';
  }

  // Export audio from active composition
  async function exportAudio() {
    try {
      updateStatus('Exporting audio...', 'processing');
      updateProgress(20);
      
      // Call ExtendScript to export audio
      const result = await new Promise((resolve, reject) => {
        cs.evalScript(`exportActiveCompAudio()`, (result) => {
          if (result === 'undefined' || result === 'null') {
            reject(new Error('Failed to export audio'));
          } else {
            resolve(result);
          }
        });
      });
      
      audioFilePath = result.replace(/"/g, ''); // Remove quotes from path
      updateStatus('Audio exported successfully', 'completed');
      updateProgress(100);
      
      // Enable generate captions button
      elements.generateCaptionsBtn.disabled = false;
      
      console.log('Audio exported to:', audioFilePath);
    } catch (error) {
      updateStatus('Export failed: ' + error.message, 'error');
      console.error('Export error:', error);
    }
  }

  // Generate captions using Whisper.cpp
  async function generateCaptions() {
    try {
      updateStatus('Generating captions...', 'processing');
      updateProgress(30);
      
      const language = elements.languageSelect.value;
      
      // Send request to Node.js server
      const response = await fetch('http://localhost:3000/generate-captions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          audioPath: audioFilePath,
          language: language
        })
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      updateProgress(80);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      captionsData = data.captions;
      updateStatus('Captions generated successfully', 'completed');
      updateProgress(100);
      
      // Show results
      showCaptionsPreview();
      
      console.log('Captions generated:', captionsData);
    } catch (error) {
      updateStatus('Generation failed: ' + error.message, 'error');
      console.error('Generation error:', error);
    }
  }

  // Show captions preview
  function showCaptionsPreview() {
    if (!captionsData || captionsData.length === 0) {
      elements.captionsPreview.innerHTML = '<p>No captions generated</p>';
      return;
    }
    
    let html = '';
    captionsData.forEach(caption => {
      html += `
        <div class="caption-item">
          <div class="caption-text">${caption.text}</div>
          <div class="caption-time">${formatTime(caption.start)} - ${formatTime(caption.end)}</div>
        </div>
      `;
    });
    
    elements.captionsPreview.innerHTML = html;
    elements.resultContainer.classList.remove('hidden');
  }

  // Format time in seconds to MM:SS
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // Apply captions to composition
  async function applyCaptions() {
    try {
      updateStatus('Applying captions...', 'processing');
      updateProgress(40);
      
      if (!captionsData || captionsData.length === 0) {
        throw new Error('No captions to apply');
      }
      
      // Convert captions to JSON string for ExtendScript
      const captionsJSON = JSON.stringify(captionsData);
      
      // Call ExtendScript to create caption layers
      await new Promise((resolve, reject) => {
        cs.evalScript(`createCaptionLayers(${JSON.stringify(captionsJSON)})`, (result) => {
          if (result === 'Error') {
            reject(new Error('Failed to create caption layers'));
          } else {
            resolve();
          }
        });
      });
      
      updateStatus('Captions applied successfully', 'completed');
      updateProgress(100);
      
      console.log('Captions applied to composition');
    } catch (error) {
      updateStatus('Apply failed: ' + error.message, 'error');
      console.error('Apply error:', error);
    }
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', init);
})();