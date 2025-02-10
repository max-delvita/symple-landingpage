"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/80 backdrop-blur-sm">
      <div className="custom-screen flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 hover-lift">
          <Image src="/logo.svg" alt="AskSymple Logo" width={32} height={32} />
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-semibold">AskSymple.ai</span>
            <span className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-primary/20 to-primary/10 text-primary rounded-full border border-primary/20">Beta</span>
          </div>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/#features" className="text-sm md:text-base hover:text-primary custom-transition">
            Features
          </Link>
          <Link href="/#how-it-works" className="text-sm md:text-base hover:text-primary custom-transition">
            How It Works
          </Link>
          <Link href="/team" className="text-sm md:text-base hover:text-primary custom-transition">
            Team
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 hover:bg-secondary/50 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border">
          <div className="custom-screen py-4 flex flex-col space-y-4">
            <Link 
              href="/#features" 
              className="text-base hover:text-primary custom-transition px-4 py-2 hover:bg-secondary/50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              href="/#how-it-works" 
              className="text-base hover:text-primary custom-transition px-4 py-2 hover:bg-secondary/50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              href="/team" 
              className="text-base hover:text-primary custom-transition px-4 py-2 hover:bg-secondary/50 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Team
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
} 