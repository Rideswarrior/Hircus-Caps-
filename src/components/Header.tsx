"use client";

import React from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Mic, 
  BookOpen, 
  Settings as SettingsIcon 
} from "lucide-react";

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center space-x-2">
            <Mic className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold">Hircus Caps</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Home
            </Link>
            <Link 
              to="/caption-generator" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Generator
            </Link>
            <Link 
              to="/documentation" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Documentation
            </Link>
            <Link 
              to="/settings" 
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/caption-generator">
              <Mic className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/documentation">
              <BookOpen className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/settings">
              <SettingsIcon className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;