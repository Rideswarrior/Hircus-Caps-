// Update this page (the content is just a fallback if you fail to update the page)
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Mic, FileText, Download, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Hircus Caps
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Generate accurate captions for your videos with our powerful AI-powered tool.
            Support for English, Malayalam, and Manglish.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="text-lg px-8 py-6">
              <Link to="/caption-generator">
                Get Started
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Mic className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <CardTitle>Audio Processing</CardTitle>
              <CardDescription>Upload or record audio</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our system processes your audio files or live recordings to extract speech and generate accurate captions.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <CardTitle>Smart Captioning</CardTitle>
              <CardDescription>AI-powered transcription</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Advanced speech recognition technology supports multiple languages including regional dialects.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Download className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <CardTitle>Easy Export</CardTitle>
              <CardDescription>Multiple formats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Download your captions in various formats including SRT, VTT, and TXT for any platform.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                1
              </div>
              <h3 className="font-semibold mb-2">Upload or Record</h3>
              <p className="text-sm text-gray-600">Upload an audio file or record directly</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                2
              </div>
              <h3 className="font-semibold mb-2">Select Language</h3>
              <p className="text-sm text-gray-600">Choose from supported languages</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                3
              </div>
              <h3 className="font-semibold mb-2">Generate</h3>
              <p className="text-sm text-gray-600">AI processes and creates captions</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center mx-auto mb-3">
                4
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-sm text-gray-600">Export in your preferred format</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 max-w-4xl mx-auto text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <h2 className="text-2xl font-bold mb-4">Browser-Based Caption Generation</h2>
              <p className="mb-4">
                Our tool runs entirely in your browser using the Web Speech API, ensuring your audio files never leave your computer.
                No uploads to external servers required!
              </p>
              <div className="flex items-center">
                <Globe className="mr-2" />
                <span>100% Client-side processing</span>
              </div>
            </div>
            <div className="md:w-1/3">
              <Button asChild variant="secondary" className="w-full">
                <Link to="/caption-generator">
                  Try It Now
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <MadeWithDyad />
    </div>
  );
};

export default Index;