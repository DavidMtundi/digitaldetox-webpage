"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Download } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToDownload = () => {
    const downloadSection = document.getElementById('download-section')
    if (downloadSection) {
      downloadSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="sticky top-0 w-full border-b backdrop-blur-sm z-50" style={{ backgroundColor: '#000000' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="h-8 w-16 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="text-lg font-bold mb-0.5 text-white">
                  Digital
                </div>
                <div className="text-sm font-medium tracking-wide text-white">
                  DETOX.
                </div>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="font-medium transition-colors hover:opacity-70 px-3 py-2 rounded-md text-white"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="font-medium transition-colors hover:opacity-70 px-3 py-2 rounded-md text-white"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="font-medium transition-colors hover:opacity-70 px-3 py-2 rounded-md text-white"
            >
              Contact
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Download Button */}
            <button 
              onClick={scrollToDownload}
              className="hidden sm:flex items-center space-x-2 btn-primary"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors hover:opacity-70 text-white"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="font-medium transition-colors hover:opacity-70 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="font-medium transition-colors hover:opacity-70 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="font-medium transition-colors hover:opacity-70 text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <button 
                onClick={() => {
                  scrollToDownload()
                  setIsMenuOpen(false)
                }}
                className="flex items-center space-x-2 btn-primary w-full justify-center"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
