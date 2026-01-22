export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 1000);
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')},${millis.toString().padStart(3, '0')}`;
};

export const generateSrtContent = (captions: Array<{ start: number; end: number; text: string }>): string => {
  let srtContent = '';
  captions.forEach((caption, index) => {
    srtContent += `${index + 1}\n`;
    srtContent += `${formatTime(caption.start)} --> ${formatTime(caption.end)}\n`;
    srtContent += `${caption.text}\n\n`;
  });
  return srtContent;
};

export const generateVttContent = (captions: Array<{ start: number; end: number; text: string }>): string => {
  let vttContent = 'WEBVTT\n\n';
  captions.forEach((caption, index) => {
    vttContent += `${index + 1}\n`;
    vttContent += `${formatTime(caption.start)} --> ${formatTime(caption.end)}\n`;
    vttContent += `${caption.text}\n\n`;
  });
  return vttContent;
};

export const generateTxtContent = (captions: Array<{ start: number; end: number; text: string }>): string => {
  let txtContent = '';
  captions.forEach((caption, index) => {
    txtContent += `[${formatTime(caption.start)} - ${formatTime(caption.end)}] ${caption.text}\n`;
  });
  return txtContent;
};

export const downloadFile = (content: string, filename: string, type: string) => {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const validateAudioFile = (file: File): boolean => {
  const validTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/ogg', 'audio/webm'];
  return validTypes.includes(file.type);
};

export const getFileSize = (file: File): string => {
  if (file.size < 1024) return `${file.size} B`;
  if (file.size < 1024 * 1024) return `${Math.round(file.size / 1024)} KB`;
  return `${Math.round(file.size / (1024 * 1024))} MB`;
};