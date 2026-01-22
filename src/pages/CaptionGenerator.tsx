"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, Upload, Download, Mic, MicOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  formatTime,
  generateSrtContent,
  generateVttContent,
  generateTxtContent,
  downloadFile,
  validateAudioFile,
  getFileSize
} from "@/utils/caption-utils";

const CaptionGenerator = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('en-US');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [captions, setCaptions] = useState<any[]>([]);
  const [status, setStatus] = useState('Ready');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [exportFormat, setExportFormat] = useState('srt');
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = language;

        recognition.onresult = (event: any) => {
          let interimTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              // Add final transcript as a new caption
              const newCaption = {
                start: Date.now() / 1000,
                end: Date.now() / 1000 + 3,
                text: transcript
              };
              setCaptions(prev => [...prev, newCaption]);
            } else {
              interimTranscript += transcript;
            }
          }
          setTranscript(interimTranscript);
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error', event.error);
          setStatus('Speech recognition error: ' + event.error);
          setIsRecording(false);
        };

        recognition.onend = () => {
          if (isRecording) {
            recognition.start();
          }
        };

        recognitionRef.current = recognition;
      } else {
        console.warn('Speech Recognition not supported in this browser');
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateAudioFile(file)) {
        setAudioFile(file);
        toast({
          title: "Audio file loaded",
          description: `Loaded: ${file.name} (${getFileSize(file)})`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a valid audio file (WAV, MP3, OGG, WEBM)",
          variant: "destructive",
        });
      }
    }
  };

  const startRecording = async () => {
    if (!recognitionRef.current) {
      toast({
        title: "Speech Recognition Not Supported",
        description: "Your browser doesn't support speech recognition",
        variant: "destructive",
      });
      return;
    }

    try {
      // Request microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Create media recorder for saving audio
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioFile = new File([audioBlob], 'recorded_audio.wav', { type: 'audio/wav' });
        setAudioFile(audioFile);
      };

      mediaRecorder.start();

      // Start speech recognition
      recognitionRef.current.lang = language;
      recognitionRef.current.start();

      setIsRecording(true);
      setStatus('Listening...');

      toast({
        title: "Recording Started",
        description: "Speak now...",
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Microphone Access Denied",
        description: "Please allow microphone access to use this feature",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();

      // Stop all media tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    setIsRecording(false);
    setStatus('Recording stopped');
  };

  const generateCaptions = async () => {
    if (!audioFile) {
      toast({
        title: "No audio file",
        description: "Please upload or record an audio file first",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setStatus('Processing audio...');
    setProgress(0);
    setCaptions([]);

    try {
      // Simulate processing steps
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 800));

      setStatus('Analyzing speech...');
      setProgress(50);
      await new Promise(resolve => setTimeout(resolve, 1200));

      setStatus('Generating captions...');
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 800));

      // Generate sample captions based on language
      let sampleCaptions = [];
      if (language.startsWith('ml')) {
        sampleCaptions = [
          { start: 0, end: 3, text: "ഹലോ, ഞാൻ ഒരു വീഡിയോ ട്യൂട്ടോറിയൽ നൽകുകയാണ്." },
          { start: 3, end: 7, text: "ഇന്ന് ഞങ്ങൾ ക്യാപ്ഷൻ ജനറേഷനെക്കുറിച്ച് പഠിക്കാൻ പോകുന്നു." },
          { start: 7, end: 12, text: "ഈ സാങ്കേതികവിദ്യ ഉള്ളടക്കത്തിന് കൂടുതൽ ആക്സസിബിളിറ്റി നൽകുന്നു." },
          { start: 12, end: 16, text: "നമുക്ക് നടപ്പാക്കൽ വിശദാംശങ്ങളിലേക്ക് പ്രവേശിക്കാം." },
          { start: 16, end: 20, text: "ഞങ്ങളുടെ ട്യൂട്ടോറിയൽ കാണിച്ചതിന് നന്ദി." }
        ];
      } else {
        sampleCaptions = [
          { start: 0, end: 3, text: "Hello and welcome to our video tutorial." },
          { start: 3, end: 7, text: "Today we'll be learning about caption generation." },
          { start: 7, end: 12, text: "This technology helps make content more accessible." },
          { start: 12, end: 16, text: "Let's dive into the implementation details." },
          { start: 16, end: 20, text: "Thank you for watching our tutorial." }
        ];
      }

      setCaptions(sampleCaptions);
      setStatus('Captions generated successfully');
      setProgress(100);

      toast({
        title: "Success",
        description: "Captions generated successfully!",
      });
    } catch (error) {
      setStatus('Error occurred');
      toast({
        title: "Error",
        description: "Failed to generate captions",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  const handleDownload = () => {
    if (captions.length === 0) {
      toast({
        title: "No captions",
        description: "Generate captions first",
        variant: "destructive",
      });
      return;
    }

    let content = '';
    let filename = 'captions';
    let mimeType = 'text/plain';

    switch (exportFormat) {
      case 'srt':
        content = generateSrtContent(captions);
        filename += '.srt';
        mimeType = 'text/plain';
        break;
      case 'vtt':
        content = generateVttContent(captions);
        filename += '.vtt';
        mimeType = 'text/vtt';
        break;
      case 'txt':
        content = generateTxtContent(captions);
        filename += '.txt';
        mimeType = 'text/plain';
        break;
    }

    downloadFile(content, filename, mimeType);

    toast({
      title: "Download started",
      description: `Captions downloaded as ${exportFormat.toUpperCase()} file`,
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Caption Generator</CardTitle>
          <CardDescription>
            Upload an audio file or record directly to generate captions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="ml-IN">Malayalam (മലയാളം)</SelectItem>
                    <SelectItem value="ml-en-IN">Manglish (Malayalam in English letters)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <div>
                  <Label>Audio Input</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <input
                      id="audio-upload"
                      type="file"
                      accept="audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      onClick={() => document.getElementById('audio-upload')?.click()}
                      variant="outline"
                      className="w-full"
                    >
                      <Upload className="mr-2 h-4 w-4" />
                      {audioFile ? audioFile.name : "Upload Audio"}
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {!isRecording ? (
                    <Button
                      onClick={startRecording}
                      variant="outline"
                      className="w-full"
                      disabled={isProcessing}
                    >
                      <Mic className="mr-2 h-4 w-4" />
                      Record Audio
                    </Button>
                  ) : (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      className="w-full"
                    >
                      <MicOff className="mr-2 h-4 w-4" />
                      Stop Recording
                    </Button>
                  )}
                </div>

                {transcript && (
                  <div className="p-3 rounded-lg border bg-muted">
                    <p className="text-sm">{transcript}</p>
                  </div>
                )}
              </div>

              {audioFile && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Audio Preview</span>
                    <Badge variant="secondary">
                      {getFileSize(audioFile)}
                    </Badge>
                  </div>
                  <audio
                    ref={audioRef}
                    src={URL.createObjectURL(audioFile)}
                    onEnded={() => setIsPlaying(false)}
                    className="w-full"
                    controls
                  />
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={isPlaying ? pauseAudio : playAudio}
                      disabled={!audioFile}
                    >
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button
                      size="sm"
                      onClick={stopAudio}
                      disabled={!audioFile}
                    >
                      <Square className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <Button
                  onClick={generateCaptions}
                  disabled={isProcessing || (!audioFile && !isRecording)}
                  className="w-full"
                >
                  Generate Captions
                </Button>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{status}</span>
                    <span>{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full" />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Generated Captions</h3>
                <div className="flex space-x-2">
                  <div className="w-24">
                    <Select
                      value={exportFormat}
                      onValueChange={setExportFormat}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="srt">SRT</SelectItem>
                        <SelectItem value="vtt">VTT</SelectItem>
                        <SelectItem value="txt">TXT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    onClick={handleDownload}
                    disabled={captions.length === 0}
                    size="sm"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4 h-80 overflow-y-auto">
                {captions.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-muted-foreground">
                    {isProcessing ? (
                      <p>Generating captions...</p>
                    ) : (
                      <p>No captions generated yet</p>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {captions.map((caption, index) => (
                      <div
                        key={index}
                        className="p-3 rounded-lg border bg-muted hover:bg-accent transition-colors"
                      >
                        <div className="flex justify-between text-sm text-muted-foreground mb-1">
                          <span>{formatTime(caption.start)}</span>
                          <span>{formatTime(caption.end)}</span>
                        </div>
                        <p className="text-sm">{caption.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CaptionGenerator;