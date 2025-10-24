"use client"

import { Download, Smartphone, CheckCircle, Shield, Users, Clock, Mail, Star, Zap } from "lucide-react"
import { useState } from "react"

export default function Home() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Please enter your email address')
      return
    }
    
    setIsSubmitting(true)
    setError('')
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail('')
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Ultra-Focused Hero Section for Testing */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
            
        <div className="relative container-modern py-20 sm:py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* Simplified Hero Title */}
            <h1 className="hero-title mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Test Digital Detox App
            </h1>
            <p className="hero-subtitle mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Join our beta testing community. Help us build the perfect digital wellness app.
            </p>
            
            {/* Trust Indicators - Simplified */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="badge badge-success text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
                <Shield className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                100% Free
              </div>
              <div className="badge badge-primary text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
                <Users className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                Beta Testing
              </div>
              <div className="badge badge-primary text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2.5">
                <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                2-Min Setup
              </div>
            </div>
            
            {/* Primary CTA - Download for Testing */}
            <div className="max-w-md mx-auto mb-8 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-gradient text-center inline-block text-lg sm:text-xl py-4 px-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Download Digital Detox app for beta testing"
              >
                <Download className="h-5 w-5 mr-3" aria-hidden="true" />
                Download Beta App
              </a>
              <p className="text-sm text-gray-500 text-center mt-3">
                Android • 12.5 MB • Free
              </p>
            </div>

            {/* Secondary CTA - Email for Updates */}
            <div className="max-w-md mx-auto animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <form onSubmit={handleEmailSubmit} className="space-y-3" role="form" aria-label="Get testing updates">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email for testing updates"
                    className={`flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white hover:border-gray-400 focus:outline-none ${error ? 'border-red-300 focus:ring-red-500' : ''}`}
                    required
                    aria-describedby={error ? "email-error" : undefined}
                    aria-invalid={error ? "true" : "false"}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label={isSubmitting ? "Submitting email" : "Submit email for updates"}
                  >
                    {isSubmitting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                    ) : (
                      "Get Updates"
                    )}
                  </button>
                </div>
                {error && (
                  <p id="email-error" className="text-red-500 text-sm text-center" role="alert">{error}</p>
                )}
                {isSubmitted && (
                  <p className="text-green-600 text-sm text-center">✓ You'll receive testing updates!</p>
                )}
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Simple Features Section */}
      <section className="py-16 bg-white">
        <div className="container-modern">
          <div className="text-center mb-12">
            <h2 className="section-title">
              What You'll Test
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Help us perfect these core features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">App Blocking</h3>
              <p className="text-gray-600">Block distracting apps during focus time</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Zap className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Usage Analytics</h3>
              <p className="text-gray-600">Track your digital habits and progress</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-2xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">Focus Modes</h3>
              <p className="text-gray-600">Predefined modes for different activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple Stats Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container-modern">
          <div className="text-center mb-12">
            <h2 className="section-title">
              Join Beta Testers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="stat-number text-gradient-blue mb-2 text-3xl sm:text-4xl md:text-5xl">500+</div>
                <div className="stat-label text-sm sm:text-base">Beta Testers</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Growing daily</div>
              </div>
              <div className="text-center">
                <div className="stat-number text-gradient-blue mb-2 text-3xl sm:text-4xl md:text-5xl">4.9/5</div>
                <div className="stat-label text-sm sm:text-base">Beta Rating</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Based on 200+ reviews</div>
              </div>
              <div className="text-center">
                <div className="stat-number text-gradient-blue mb-2 text-3xl sm:text-4xl md:text-5xl">50K+</div>
                <div className="stat-label text-sm sm:text-base">Hours Tested</div>
                <div className="text-xs sm:text-sm text-gray-500 mt-1">Real usage data</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container-modern">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Help Build the Future of Digital Wellness?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Download the beta app and join our community of testers shaping the next generation of digital wellness tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Beta App</span>
              </a>
              <div className="text-blue-100 text-sm">
                <span className="font-semibold">500+</span> beta testers • <span className="font-semibold">4.9/5</span> rating
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
