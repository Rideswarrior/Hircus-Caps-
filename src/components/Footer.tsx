"use client";

import React from 'react';
import { Link } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-6 mb-4 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-lg font-semibold">Hircus Caps</span>
            </Link>
            <nav className="flex items-center space-x-6">
              <Link 
                to="/documentation" 
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Documentation
              </Link>
              <Link 
                to="/settings" 
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Settings
              </Link>
            </nav>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Hircus Caps. All rights reserved.
          </div>
        </div>
        <MadeWithDyad />
      </div>
    </footer>
  );
};

export default Footer;