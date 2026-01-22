"use client";

import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Mic, 
  FileText, 
  Download, 
  Globe, 
  Shield, 
  Zap,
  BookOpen,
  Settings,
  HelpCircle
} from "lucide-react";

const Documentation = () => {
  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Hircus Caps Documentation</h1>
          <p className="text-xl text-gray-600 mb-8">
            Everything you need to know about using our caption generation tool
          </p>
          
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link to="/caption-generator">
                Get Started
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="mr-2 h-5 w-5" />
                Audio Input Options
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Hircus Caps supports two ways to provide audio for caption generation:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Upload existing audio files (WAV, MP3, etc.)</li>
                <li>Record audio directly through your microphone</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="mr-2 h-5 w-5" />
                Language Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">
                Our tool supports multiple languages and dialects:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>English (US and UK variants)</li>
                <li>Malayalam (മലയാളം)</li>
                <li>Manglish (Malayalam in English letters)</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="mr-2 h-5 w-5" />
              How to Use
            </CardTitle>
            <CardDescription>
              Step-by-step guide to generating captions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Upload or Record Audio</h3>
                  <p>
                    Either upload an existing audio file or use the microphone to record new audio. 
                    For best results, ensure your audio is clear and free from background noise.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Select Language</h3>
                  <p>
                    Choose the appropriate language for your audio. This helps improve accuracy 
                    of the speech recognition process.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Generate Captions</h3>
                  <p>
                    Click the "Generate Captions" button to process your audio. The tool will 
                    analyze the speech and create timestamped captions.
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center mr-4">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Review and Download</h3>
                  <p>
                    Review the generated captions in the preview panel. Make any necessary edits, 
                    then download in your preferred format (SRT, VTT, or TXT).
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="mr-2 h-5 w-5" />
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                All processing happens directly in your browser. Your audio files never leave 
                your computer, ensuring complete privacy and security.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Browser Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Works best in modern browsers that support the Web Speech API:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Chrome (recommended)</li>
                <li>Edge</li>
                <li>Firefox</li>
                <li>Safari (limited support)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HelpCircle className="mr-2 h-5 w-5" />
                Troubleshooting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Common issues and solutions:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Enable microphone permissions</li>
                <li>Use a modern browser</li>
                <li>Check audio file format</li>
                <li>Ensure stable internet connection</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Ready to get started?</h2>
          <Button asChild size="lg">
            <Link to="/caption-generator">
              Try Hircus Caps Now
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Documentation;