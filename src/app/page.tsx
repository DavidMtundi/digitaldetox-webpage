"use client"

import { Download, Smartphone, CheckCircle, Shield, Users, Clock, Mail, Star, Zap, Globe, Sparkles } from "lucide-react"
import { useState } from "react"
import { theme, themeStyles } from "../styles/theme"
import { useEmailSubscription } from "../hooks/useEmailSubscription"

export default function Home() {
  const {
    email,
    isSubmitting,
    isSubmitted,
    error,
    successMessage,
    handleEmailChange,
    handleSubmit
  } = useEmailSubscription()

  return (
    <div className="min-h-screen" style={themeStyles.background.primary}>
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        {/* Enhanced Background Elements with Better Blending */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/60 to-blue-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/60 to-purple-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-200/40 to-pink-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
            
        {/* Refined Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, ${theme.colors.patterns.primary} 25%, transparent 25%),
              linear-gradient(-45deg, ${theme.colors.patterns.primary} 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, ${theme.colors.patterns.primary} 75%),
              linear-gradient(-45deg, transparent 75%, ${theme.colors.patterns.primary} 75%)
            `,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 0 16px, 16px -16px, -16px 0px'
          }}></div>
        </div>
        
        {/* Enhanced Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/20 rounded-full blur-sm animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-purple-400/20 rounded-full blur-sm animate-float" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-2.5 h-2.5 bg-blue-500/15 rounded-full blur-sm animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-1.5 h-1.5 bg-purple-500/20 rounded-full blur-sm animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-1/3 left-1/3 w-2 h-2 bg-indigo-400/15 rounded-full blur-sm animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/4 right-1/4 w-1.5 h-1.5 bg-pink-400/20 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}}></div>
        </div>
            
        <div className="relative container-modern py-24 sm:py-28 md:py-36 lg:py-40">
          <div className="text-center max-w-5xl mx-auto">
            {/* Enhanced Hero Title with Better Typography */}
            <div className="mb-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <h1 className="hero-title mb-4 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent">
                Reclaim Your Time with Digital Detox
              </h1>
              <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-blue-600 font-medium mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Join 500+ Beta Testers</span>
              </div>
            </div>
            
            <p className="hero-subtitle mb-10 max-w-3xl mx-auto text-gray-700 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Take control of your digital habits. Block distracting apps and websites, track your usage, 
              and build healthier relationships with technology. Join our beta community and help shape the future of digital wellness.
            </p>
            
            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="badge badge-success text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 shadow-sm hover:shadow-md transition-shadow">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                100% Free Forever
              </div>
              <div className="badge badge-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 shadow-sm hover:shadow-md transition-shadow">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                500+ Beta Testers
              </div>
              <div className="badge badge-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 shadow-sm hover:shadow-md transition-shadow">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                2-Minute Setup
              </div>
              <div className="badge badge-primary text-xs sm:text-sm px-4 sm:px-5 py-2.5 sm:py-3 shadow-sm hover:shadow-md transition-shadow">
                <Star className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                4.9/5 Rating
              </div>
            </div>
            
            {/* Enhanced Primary CTA */}
            <div className="max-w-lg mx-auto mb-10 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full btn-gradient text-center inline-block text-lg sm:text-xl font-semibold py-5 px-10 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300"
                aria-label="Download Digital Detox app for beta testing"
              >
                <Download className="h-6 w-6" aria-hidden="true" />
                <span>Download Beta App</span>
              </a>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <Smartphone className="h-4 w-4" />
                  Android
                </span>
                <span>•</span>
                <span>12.5 MB</span>
                <span>•</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
            </div>

            {/* Enhanced Email Subscription Form */}
            <div className="max-w-lg mx-auto animate-fade-in-up" style={{animationDelay: '0.5s'}}>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200/50">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Get Beta Updates</h3>
                </div>
                <form onSubmit={(e) => handleSubmit(e, 'hero-section')} className="space-y-3" role="form" aria-label="Get testing updates">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => handleEmailChange(e.target.value)}
                      placeholder="Enter your email"
                      className={`flex-1 px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white hover:border-gray-400 focus:outline-none text-base ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
                      required
                      aria-describedby={error ? "email-error" : undefined}
                      aria-invalid={error ? "true" : "false"}
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 px-6 rounded-xl font-semibold"
                      aria-label={isSubmitting ? "Submitting email" : "Submit email for updates"}
                    >
                      {isSubmitting ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                  {error && (
                    <p id="email-error" className="text-red-600 text-sm text-center font-medium" role="alert">{error}</p>
                  )}
                  {isSubmitted && (
                    <p className="text-green-600 text-sm text-center font-medium flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      {successMessage || "You'll receive testing updates!"}
                    </p>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
        {/* Refined geometric background */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(90deg, ${theme.colors.patterns.secondary} 25%, transparent 25%),
              linear-gradient(90deg, transparent 75%, ${theme.colors.patterns.secondary} 75%)
            `,
            backgroundSize: '48px 48px',
            backgroundPosition: '0 0, 24px 24px'
          }}></div>
        </div>
        
        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-16 w-2 h-2 bg-blue-300/20 rounded-full blur-sm animate-float" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-32 right-24 w-1.5 h-1.5 bg-purple-300/20 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-24 left-1/3 w-2 h-2 bg-indigo-300/15 rounded-full blur-sm animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-16 right-1/4 w-1.5 h-1.5 bg-pink-300/20 rounded-full blur-sm animate-float" style={{animationDelay: '4s'}}></div>
        </div>
        
        <div className="container-modern relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Powerful Features to Test
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto text-gray-700">
              Help us perfect these core features that will transform how you interact with technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            <div className="group feature-card text-center p-8 rounded-2xl bg-white border border-gray-200/60 hover:border-blue-200 transition-all duration-300 hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">App Blocking</h3>
              <p className="text-gray-600 leading-relaxed">Block distracting apps during focus time with customizable schedules</p>
            </div>
            
            <div className="group feature-card text-center p-8 rounded-2xl bg-white border border-gray-200/60 hover:border-green-200 transition-all duration-300 hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                <Globe className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Website Blocking</h3>
              <p className="text-gray-600 leading-relaxed">Block distracting websites, social media, and adult content across all devices</p>
            </div>
              
            <div className="group feature-card text-center p-8 rounded-2xl bg-white border border-gray-200/60 hover:border-purple-200 transition-all duration-300 hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                <Zap className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Usage Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Track your digital habits and progress with detailed insights</p>
            </div>
              
            <div className="group feature-card text-center p-8 rounded-2xl bg-white border border-gray-200/60 hover:border-orange-200 transition-all duration-300 hover:shadow-xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                <CheckCircle className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Focus Modes</h3>
              <p className="text-gray-600 leading-relaxed">Predefined modes for different activities like work, sleep, and study</p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        {/* Refined geometric background pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, ${theme.colors.patterns.secondary} 25%, transparent 25%),
              linear-gradient(-45deg, ${theme.colors.patterns.secondary} 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, ${theme.colors.patterns.secondary} 75%),
              linear-gradient(-45deg, transparent 75%, ${theme.colors.patterns.secondary} 75%)
            `,
            backgroundSize: '60px 60px',
            backgroundPosition: '0 0, 0 30px, 30px -30px, -30px 0px'
          }}></div>
        </div>

        {/* Enhanced floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-2 h-2 bg-purple-300/20 rounded-full blur-sm animate-float" style={{animationDelay: '1.5s'}}></div>
          <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-blue-300/20 rounded-full blur-sm animate-float" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute bottom-28 left-1/4 w-2 h-2 bg-indigo-300/15 rounded-full blur-sm animate-float" style={{animationDelay: '3.5s'}}></div>
          <div className="absolute bottom-16 right-1/3 w-1.5 h-1.5 bg-pink-300/20 rounded-full blur-sm animate-float" style={{animationDelay: '4.5s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-purple-400/15 rounded-full blur-sm animate-float" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="container-modern relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Join Our Growing Beta Community
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto text-gray-700 mb-12">
              Help us build the perfect digital wellness app. Your feedback shapes the future of Digital Detox and helps thousands of users reclaim their time.
            </p>
            
            {/* Enhanced Stats with Better Visual Design */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
              <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200/60 hover:border-blue-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="stat-number text-gradient-blue mb-3 text-4xl sm:text-5xl md:text-6xl font-extrabold">500+</div>
                <div className="stat-label text-base sm:text-lg font-bold text-gray-900 mb-2">Active Beta Testers</div>
                <div className="text-sm text-gray-600">Join the community today</div>
                <div className="mt-4 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200/60 hover:border-purple-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="stat-number text-gradient-blue mb-3 text-4xl sm:text-5xl md:text-6xl font-extrabold">4.9/5</div>
                <div className="stat-label text-base sm:text-lg font-bold text-gray-900 mb-2">Beta Rating</div>
                <div className="text-sm text-gray-600">200+ verified reviews</div>
                <div className="mt-4 flex items-center justify-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="group text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-gray-200/60 hover:border-green-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <div className="stat-number text-gradient-blue mb-3 text-4xl sm:text-5xl md:text-6xl font-extrabold">50K+</div>
                <div className="stat-label text-base sm:text-lg font-bold text-gray-900 mb-2">Hours Tested</div>
                <div className="text-sm text-gray-600">Real-world usage data</div>
                <div className="mt-4 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-green-600" />
                </div>
              </div>
            </div>

            {/* Enhanced Call to Action */}
            <div className="max-w-lg mx-auto">
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full btn-gradient text-center inline-block text-lg sm:text-xl font-semibold py-5 px-10 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all duration-300"
                aria-label="Download Digital Detox app for beta testing"
              >
                <Download className="h-6 w-6" aria-hidden="true" />
                <span>Start Testing Now</span>
              </a>
              <div className="flex items-center justify-center gap-4 mt-4 text-sm text-gray-600">
                <span className="text-green-600 font-semibold">Free</span>
                <span>•</span>
                <span>Android</span>
                <span>•</span>
                <span>12.5 MB</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Final CTA Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90 animate-gradient"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-modern relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Join the Beta Community</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
              Ready to Build the Future of Digital Wellness?
            </h2>
            <p className="text-xl sm:text-2xl text-blue-50 mb-10 leading-relaxed max-w-2xl mx-auto">
              Download the beta app and join our community of testers shaping the next generation of digital wellness tools.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center gap-3"
              >
                <Download className="h-6 w-6" />
                <span>Download Beta App</span>
              </a>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-blue-100 text-base">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <span><span className="font-bold text-white">500+</span> beta testers</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                <span><span className="font-bold text-white">4.9/5</span> rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span><span className="font-bold text-white">50K+</span> hours tested</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
