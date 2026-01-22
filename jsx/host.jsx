// host.jsx - ExtendScript for After Effects automation
// This script handles audio export and caption layer creation

// Export audio from the active composition
function exportActiveCompAudio() {
  try {
    // Get the active composition
    var activeItem = app.project.activeItem;
    
    if (!activeItem || !(activeItem instanceof CompItem)) {
      alert("Please select a composition");
      return null;
    }
    
    // Create a temporary folder for audio export
    var tempFolder = Folder.temp;
    var audioFile = new File(tempFolder.absoluteURI + "/hircus_audio.wav");
    
    // Set render settings for audio only
    var renderQueue = app.project.renderQueue;
    var renderItem = renderQueue.items.add(activeItem);
    
    // Set output module to WAV
    var outputModule = renderItem.outputModule(1);
    outputModule.applyTemplate("Multi-machine Sequence");
    outputModule.file = audioFile;
    
    // Set format options for WAV
    var formatOptions = new ImportOptions();
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
    alert("Error exporting audio: " + error.toString());
    return null;
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
      alert("Please select a composition");
      return "Error";
    }
    
    // Create a null layer to hold captions
    var captionNull = activeComp.layers.addNull();
    captionNull.name = "Hircus Captions";
    
    // Create text layers for each caption
    for (var i = 0; i < captions.length; i++) {
      var caption = captions[i];
      
      // Add a text layer
      var textLayer = activeComp.layers.addText(caption.text);
      textLayer.name = "Caption " + (i + 1);
      
      // Set the parent to the caption null
      textLayer.parent = captionNull;
      
      // Position the text layer (centered at bottom)
      var textProp = textLayer.property("Source Text");
      var textDocument = textProp.value;
      textDocument.fontSize = 48;
      textDocument.fillColor = [1, 1, 1]; // White
      textDocument.strokeColor = [0, 0, 0]; // Black
      textDocument.strokeWidth = 2;
      textDocument.strokeOverFill = true;
      textDocument.applyFill = true;
      textDocument.applyStroke = true;
      textProp.setValue(textDocument);
      
      // Center the text horizontally
      var layerWidth = textLayer.sourceRectAtTime(0, false).width;
      var compWidth = activeComp.width;
      textLayer.property("Position").setValue([compWidth/2, activeComp.height - 100]);
      
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
    alert("Error creating caption layers: " + error.toString());
    return "Error";
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