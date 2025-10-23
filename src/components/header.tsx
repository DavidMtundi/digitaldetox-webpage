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
    <header className="sticky top-0 w-full backdrop-blur-md bg-white/90 border-b border-gray-200 z-50 shadow-sm">
      <div className="container-modern">
        <div className="flex h-16 items-center justify-between">
          {/* Modern Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-200">
              <span className="text-white font-bold text-sm">DD</span>
            </div>
            <span className="text-xl font-bold text-gradient-blue">Digital Detox</span>
          </Link>

          {/* Modern Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="nav-link"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="nav-link"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="nav-link"
            >
              Contact
            </Link>
            <Link 
              href="/privacy" 
              className="nav-link"
            >
              Privacy
            </Link>
          </nav>

          {/* Modern Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Modern Download Button */}
            <a 
              href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-primary"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </a>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-colors hover:bg-gray-100 text-gray-600"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Modern Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/privacy" 
                className="nav-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy
              </Link>
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mx-4 mt-4"
              >
                <Download className="h-4 w-4" />
                <span>Download</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
