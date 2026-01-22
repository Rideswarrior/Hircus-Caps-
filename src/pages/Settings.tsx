"use client";

import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Settings as SettingsIcon, 
  Palette, 
  Bell, 
  Download,
  Save,
  RotateCcw
} from "lucide-react";

const Settings = () => {
  const [settings, setSettings] = useState({
    theme: 'light',
    defaultLanguage: 'en-US',
    autoSave: true,
    notifications: true,
    fontSize: '16',
    captionStyle: 'default',
    exportFormat: 'srt',
    customStyle: ''
  });

  const handleSave = () => {
    // In a real app, this would save to localStorage or a backend
    console.log('Settings saved:', settings);
    alert('Settings saved successfully!');
  };

  const handleReset = () => {
    setSettings({
      theme: 'light',
      defaultLanguage: 'en-US',
      autoSave: true,
      notifications: true,
      fontSize: '16',
      captionStyle: 'default',
      exportFormat: 'srt',
      customStyle: ''
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-600">Customize your caption generation experience</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Settings Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <Link to="#" className="flex items-center p-2 rounded-lg bg-muted">
                    <SettingsIcon className="mr-3 h-5 w-5" />
                    General
                  </Link>
                  <Link to="#" className="flex items-center p-2 rounded-lg hover:bg-muted">
                    <Palette className="mr-3 h-5 w-5" />
                    Appearance
                  </Link>
                  <Link to="#" className="flex items-center p-2 rounded-lg hover:bg-muted">
                    <Bell className="mr-3 h-5 w-5" />
                    Notifications
                  </Link>
                  <Link to="#" className="flex items-center p-2 rounded-lg hover:bg-muted">
                    <Download className="mr-3 h-5 w-5" />
                    Export
                  </Link>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic preferences for the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Theme</Label>
                    <p className="text-sm text-gray-500">
                      Choose between light and dark mode
                    </p>
                  </div>
                  <Select 
                    value={settings.theme} 
                    onValueChange={(value) => setSettings({...settings, theme: value})}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Default Language</Label>
                    <p className="text-sm text-gray-500">
                      Language used for new caption generation
                    </p>
                  </div>
                  <Select 
                    value={settings.defaultLanguage} 
                    onValueChange={(value) => setSettings({...settings, defaultLanguage: value})}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="ml-IN">Malayalam (മലയാളം)</SelectItem>
                      <SelectItem value="ml-en-IN">Manglish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-save">Auto Save</Label>
                    <p className="text-sm text-gray-500">
                      Automatically save captions as you generate them
                    </p>
                  </div>
                  <Switch
                    id="auto-save"
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => setSettings({...settings, autoSave: checked})}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of the application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Font Size</Label>
                    <p className="text-sm text-gray-500">
                      Adjust the text size throughout the application
                    </p>
                  </div>
                  <Select 
                    value={settings.fontSize} 
                    onValueChange={(value) => setSettings({...settings, fontSize: value})}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="14">Small</SelectItem>
                      <SelectItem value="16">Medium</SelectItem>
                      <SelectItem value="18">Large</SelectItem>
                      <SelectItem value="20">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Caption Style</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Choose a predefined style for your captions
                  </p>
                  <Select 
                    value={settings.captionStyle} 
                    onValueChange={(value) => setSettings({...settings, captionStyle: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Default</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="bold">Bold</SelectItem>
                      <SelectItem value="outlined">Outlined</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Custom CSS</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Add custom CSS to style your captions
                  </p>
                  <Textarea
                    placeholder="Enter custom CSS styles"
                    value={settings.customStyle}
                    onChange={(e) => setSettings({...settings, customStyle: e.target.value})}
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Export Settings</CardTitle>
                <CardDescription>
                  Configure default export options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Default Export Format</Label>
                    <p className="text-sm text-gray-500">
                      Format used when downloading captions
                    </p>
                  </div>
                  <Select 
                    value={settings.exportFormat} 
                    onValueChange={(value) => setSettings({...settings, exportFormat: value})}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="srt">SRT</SelectItem>
                      <SelectItem value="vtt">VTT</SelectItem>
                      <SelectItem value="txt">TXT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Export Filename</Label>
                  <p className="text-sm text-gray-500 mb-3">
                    Default naming pattern for exported files
                  </p>
                  <Input 
                    placeholder="captions_{date}" 
                    value="captions_{date}"
                    readOnly
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;