"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Download } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 w-full backdrop-blur-lg bg-white/95 border-b border-gray-200/80 z-50 shadow-sm transition-all duration-300">
      <div className="container-modern">
        <div className="flex h-14 sm:h-16 md:h-20 items-center justify-between gap-2 sm:gap-4">
          {/* Enhanced Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group flex-shrink-0 min-w-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative flex items-center justify-center group-hover:scale-110 transition-all duration-300 flex-shrink-0">
              <Image 
                src="/digitaldetox.png" 
                alt="Digital Detox Logo" 
                width={48} 
                height={48} 
                className="object-contain"
                priority
              />
            </div>
            <span className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300 truncate">Digital Detox</span>
          </Link>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <Link 
              href="/" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
            >
              Contact
            </Link>
            <Link 
              href="/support" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
            >
              Support Us
            </Link>
            <Link 
              href="/privacy" 
              className="nav-link px-4 py-2 rounded-lg font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50"
            >
              Privacy
            </Link>
          </nav>

          {/* Enhanced Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4 flex-shrink-0">
            {/* Log in link */}
            <Link 
              href="/contact"
              className="hidden sm:block text-sm md:text-base text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              Log in
            </Link>
            {/* Start Now Button */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex btn-primary text-xs sm:text-sm md:text-base px-3 sm:px-4 py-1.5 sm:py-2"
            >
              Start Now
            </a>

            {/* Enhanced Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg transition-all duration-200 hover:bg-gray-100 active:bg-gray-200 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex-shrink-0"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/98 backdrop-blur-lg animate-fade-in-up">
            <nav className="flex flex-col space-y-2">
              <Link 
                href="/" 
                className="nav-link px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="nav-link px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="nav-link px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                href="/support" 
                className="nav-link px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Support Us
              </Link>
              <Link 
                href="/privacy" 
                className="nav-link px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-sm sm:text-base font-medium transition-all duration-200 text-gray-700 hover:text-emerald-600 hover:bg-emerald-50"
                onClick={() => setIsMenuOpen(false)}
              >
                Privacy
              </Link>
              <a 
                href="https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsMenuOpen(false)}
                className="btn-primary mx-4 mt-3 text-sm sm:text-base px-4 py-2.5 sm:py-3"
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
