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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
              <div className="text-center text-white">
                <div className="text-sm font-bold">DD</div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                Digital Detox
              </div>
            </div>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              href="/" 
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            >
              Contact
            </Link>
            <Link 
              href="/privacy" 
              className="px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-purple-600 hover:bg-purple-50"
            >
              Privacy
            </Link>
          </nav>

          {/* Enhanced Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Enhanced Download Button */}
            <a 
              href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center space-x-2 btn-gradient"
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

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95 backdrop-blur-sm">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="px-4 py-3 rounded-lg font-medium transition-colors hover:bg-purple-50 text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="px-4 py-3 rounded-lg font-medium transition-colors hover:bg-purple-50 text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="px-4 py-3 rounded-lg font-medium transition-colors hover:bg-purple-50 text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/privacy" 
                className="px-4 py-3 rounded-lg font-medium transition-colors hover:bg-purple-50 text-gray-600 hover:text-purple-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy
              </Link>
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center space-x-2 btn-gradient mx-4 mt-4"
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
