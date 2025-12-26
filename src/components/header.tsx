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
    <header className="sticky top-0 w-full backdrop-blur-lg bg-white/95 border-b border-gray-200/80 z-50 shadow-sm transition-all duration-300">
      <div className="container-modern">
        <div className="flex h-18 sm:h-20 items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
              <span className="text-white font-bold text-sm sm:text-base">DD</span>
            </div>
            <span className="text-xl sm:text-2xl font-bold text-gradient-blue group-hover:scale-105 transition-transform duration-300">Digital Detox</span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              href="/" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              Contact
            </Link>
            <Link 
              href="/privacy" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
            >
              Privacy
            </Link>
          </nav>

          {/* Enhanced Right side actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Enhanced Download Button */}
            <a 
              href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-primary"
            >
              <Download className="h-4 w-4" />
              <span>Download</span>
            </a>

            {/* Enhanced Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-xl transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-gray-200 bg-white/98 backdrop-blur-lg animate-fade-in-up">
            <nav className="flex flex-col space-y-3">
              <Link 
                href="/" 
                className="nav-link px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="nav-link px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="nav-link px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/privacy" 
                className="nav-link px-4 py-3 rounded-xl font-medium transition-all duration-200 text-gray-700 hover:text-blue-600 hover:bg-blue-50"
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
