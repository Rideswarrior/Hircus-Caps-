"use client";

import React, { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Square, Upload, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CaptionGenerator = () => {
  const { toast } = useToast();
  const [language, setLanguage] = useState('en');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [captions, setCaptions] = useState<any[]>([]);
  const [status, setStatus] = useState('Idle');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        toast({
          title: "Audio file loaded",
          description: `Loaded: ${file.name}`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload an audio file",
          variant: "destructive",
        });
      }
    }
  };

  const generateCaptions = async () => {
    if (!audioFile) {
      toast({
        title: "No audio file",
        description: "Please upload an audio file first",
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('Analyzing speech...');
      setProgress(50);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setStatus('Generating captions...');
      setProgress(80);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate sample captions
      const sampleCaptions = [
        { start: 0, end: 3, text: "Hello and welcome to our video tutorial." },
        { start: 3, end: 7, text: "Today we'll be learning about caption generation." },
        { start: 7, end: 12, text: "This technology helps make content more accessible." },
        { start: 12, end: 16, text: "Let's dive into the implementation details." },
        { start: 16, end: 20, text: "Thank you for watching our tutorial." }
      ];
      
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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
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

  const downloadCaptions = () => {
    if (captions.length === 0) {
      toast({
        title: "No captions",
        description: "Generate captions first",
        variant: "destructive",
      });
      return;
    }

    // Create SRT content
    let srtContent = '';
    captions.forEach((caption, index) => {
      srtContent += `${index + 1}\n`;
      srtContent += `${formatTime(caption.start)},000 --> ${formatTime(caption.end)},000\n`;
      srtContent += `${caption.text}\n\n`;
    });

    // Create and download file
    const blob = new Blob([srtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'captions.srt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Download started",
      description: "Captions downloaded as SRT file",
    });
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Caption Generator</CardTitle>
          <CardDescription>
            Upload an audio file to automatically generate captions
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
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="ml">Malayalam (മലയാളം)</SelectItem>
                    <SelectItem value="ml-en">Manglish (Malayalam in English letters)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="audio-upload">Audio File</Label>
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

              {audioFile && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Audio Preview</span>
                    <Badge variant="secondary">
                      {Math.round(audioFile.size / 1024)} KB
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
                  disabled={isProcessing || !audioFile}
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
                <Button 
                  onClick={downloadCaptions}
                  disabled={captions.length === 0}
                  size="sm"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download SRT
                </Button>
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