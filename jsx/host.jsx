// host.jsx - ExtendScript for After Effects automation
// This script handles audio export and caption layer creation

// Export audio from the active composition
function exportActiveCompAudio() {
  try {
    // Get the active composition
    var activeItem = app.project.activeItem;
    
    if (!activeItem || !(activeItem instanceof CompItem)) {
      return "Error: Please select a composition";
    }
    
    // Create a temporary folder for audio export
    var tempFolder = Folder.temp;
    var audioFile = new File(tempFolder.absoluteURI + "/hircus_audio.wav");
    
    // Remove existing file if it exists
    if (audioFile.exists) {
      audioFile.remove();
    }
    
    // Set render settings for audio only
    var renderQueue = app.project.renderQueue;
    var renderItem = renderQueue.items.add(activeItem);
    
    // Set output module to WAV
    var outputModule = renderItem.outputModule(1);
    outputModule.applyTemplate("Multi-machine Sequence");
    outputModule.file = audioFile;
    
    // Set format options for WAV
    outputModule.setSetting("Audio Output", "Mono");
    outputModule.setSetting("Channels", "Mono");
    outputModule.setSetting("Sample Rate", "48000");
    outputModule.setSetting("Depth", "16");
    
    // Render the audio
    renderQueue.render();
    
    // Clean up render queue
    renderItem.remove();
    
    // Return the file path
    return audioFile.fsName;
  } catch (error) {
    return "Error: " + error.toString();
  }
}

// Create caption layers in the composition
function createCaptionLayers(captionsJSON) {
  try {
    // Parse the captions data
    var captions = JSON.parse(captionsJSON);
    
    // Get the active composition
    var activeComp = app.project.activeItem;
    
    if (!activeComp || !(activeComp instanceof CompItem)) {
      return "Error: Please select a composition";
    }
    
    // Create a null layer to hold captions
    var captionNull = activeComp.layers.addNull();
    captionNull.name = "Hircus Captions";
    
    // Position the null at the bottom center
    captionNull.property("Position").setValue([activeComp.width/2, activeComp.height - 100]);
    
    // Create text layers for each caption
    for (var i = 0; i < captions.length; i++) {
      var caption = captions[i];
      
      // Add a text layer
      var textLayer = activeComp.layers.addText(caption.text);
      textLayer.name = "Caption " + (i + 1);
      
      // Set the parent to the caption null
      textLayer.parent = captionNull;
      
      // Style the text
      var textProp = textLayer.property("Source Text");
      var textDocument = textProp.value;
      textDocument.fontSize = 48;
      textDocument.fillColor = [1, 1, 1]; // White
      textDocument.strokeColor = [0, 0, 0]; // Black
      textDocument.strokeWidth = 2;
      textDocument.strokeOverFill = true;
      textDocument.applyFill = true;
      textDocument.applyStroke = true;
      textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
      textProp.setValue(textDocument);
      
      // Position relative to parent
      textLayer.property("Position").setValue([0, 0]);
      
      // Set in/out points based on timestamps
      var startTime = caption.start;
      var endTime = caption.end;
      
      // Set the layer's in point
      textLayer.startTime = startTime;
      textLayer.inPoint = startTime;
      
      // Set the layer's duration
      textLayer.outPoint = endTime;
      
      // Add opacity animation for fade in/out
      addOpacityAnimation(textLayer, startTime, endTime);
    }
    
    return "Success";
  } catch (error) {
    return "Error: " + error.toString();
  }
}

// Add opacity animation for fade in/out effect
function addOpacityAnimation(layer, startTime, endTime) {
  try {
    // Get the opacity property
    var opacityProp = layer.property("Opacity");
    
    // Set keyframes for fade in/out
    var fadeInDuration = 0.2; // 200ms
    var fadeOutDuration = 0.2; // 200ms
    
    // Fade in
    opacityProp.setValueAtTime(startTime, 0);
    opacityProp.setValueAtTime(startTime + fadeInDuration, 100);
    
    // Fade out
    opacityProp.setValueAtTime(endTime - fadeOutDuration, 100);
    opacityProp.setValueAtTime(endTime, 0);
  } catch (error) {
    // Silently fail if animation fails
    // This ensures captions still work even if animation fails
  }
}

// Expose functions to the global scope for CSInterface
// These functions can be called from the CEP panel