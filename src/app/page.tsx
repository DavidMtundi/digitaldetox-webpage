"use client"

import { Download, Smartphone, Shield, Users, Clock, Mail, Star, Zap, Globe, Sparkles, BarChart3, Bell, MessageSquare, ArrowRight, Quote, Lock, Heart } from "lucide-react"
import Image from "next/image"
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
    <div className="min-h-screen bg-white">
      {/* Hero Section - Clause Style with Focus Background */}
      <section className="relative overflow-hidden bg-white">
        {/* Background Image/Pattern - Focus Related */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/40 via-white to-blue-50/30"></div>
        
        {/* Abstract Focus Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 30%, #10b981 2px, transparent 2px),
              radial-gradient(circle at 80% 70%, #059669 2px, transparent 2px),
              radial-gradient(circle at 50% 50%, #10b981 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px, 150px 150px, 80px 80px',
            backgroundPosition: '0 0, 50px 50px, 25px 25px'
          }}></div>
        </div>

        {/* Concentric Circles - Focus Visualization */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-emerald-200/20" style={{
            background: 'radial-gradient(circle, transparent 40%, rgba(16, 185, 129, 0.05) 100%)'
          }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-emerald-300/15" style={{
            background: 'radial-gradient(circle, transparent 50%, rgba(16, 185, 129, 0.03) 100%)'
          }}></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-emerald-400/10" style={{
            background: 'radial-gradient(circle, transparent 60%, rgba(16, 185, 129, 0.02) 100%)'
          }}></div>
        </div>

        {/* Checkerboard Pattern - Boxes */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(16, 185, 129, 0.08) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(16, 185, 129, 0.08) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(16, 185, 129, 0.08) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(16, 185, 129, 0.08) 75%)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 0 20px, 20px -20px, -20px 0px'
          }}></div>
        </div>
        
        {/* Additional Subtle Checkerboard Layer */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(45deg, rgba(16, 185, 129, 0.05) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(16, 185, 129, 0.05) 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, rgba(16, 185, 129, 0.05) 75%),
              linear-gradient(-45deg, transparent 75%, rgba(16, 185, 129, 0.05) 75%)
            `,
            backgroundSize: '80px 80px',
            backgroundPosition: '0 0, 0 40px, 40px -40px, -40px 0px'
          }}></div>
        </div>

        {/* Light Overlay for Text Readability */}
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[0.5px]"></div>
        
        <div className="container-modern py-16 sm:py-20 md:py-24 lg:py-28 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Main Headline - Creative */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Reclaim Your <span className="text-underline-yellow">Focus</span>, Reclaim Your <span className="text-underline-yellow">Life</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 max-w-3xl mx-auto leading-relaxed">
              Join our beta testing community. Help us build the perfect digital wellness app that helps you break free from distractions and become your best self.
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-6">
              <div className="badge badge-success text-xs sm:text-sm px-3 sm:px-4 py-2 shadow-sm">
                <Shield className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                100% Free
              </div>
              <div className="badge badge-primary text-xs sm:text-sm px-3 sm:px-4 py-2 shadow-sm">
                <Users className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                Beta Testing
              </div>
              <div className="badge badge-primary text-xs sm:text-sm px-3 sm:px-4 py-2 shadow-sm">
                <Clock className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2" />
                2-Min Setup
              </div>
            </div>

            {/* Download Section - Official Platform Badges */}
            <div className="mb-6 mt-12 sm:mt-16 md:mt-20">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                  {/* Google Play Badge - Official */}
                  <a
                    href="https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative hover:opacity-90 transition-opacity duration-200"
                  >
                    <div className="relative w-full aspect-[3.5/1]">
                      <Image
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Get it on Google Play"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2 text-center">Stable release</div>
                  </a>

                  {/* App Store Badge - Official */}
                  <div className="group relative opacity-60 cursor-not-allowed">
                    <div className="relative w-full aspect-[3.5/1]">
                      <Image
                        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us?size=250x83&releaseDate=1289944800"
                        alt="Download on the App Store"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2 text-center">Coming soon</div>
                  </div>

                  {/* Windows Badge - Official */}
                  <div className="group relative opacity-60 cursor-not-allowed">
                    <div className="relative w-full aspect-[3.5/1] bg-black rounded-lg flex items-center justify-center p-2">
                      <div className="flex items-center gap-2 w-full">
                        <svg viewBox="0 0 88 88" className="w-8 h-8 flex-shrink-0">
                          <path fill="#00ADEF" d="M0 12.402l35.687 4.86.016 34.23-35.67.203zm35.67 33.53l.028 32.14-35.67 4.9V46.08zm37.358-38.03l35.67 4.86v40.527l-35.67.2zm35.67 45.013l-.013 9.24L88 77.64V46.05z"/>
                        </svg>
                        <div className="flex-1 text-white">
                          <div className="text-[9px] text-white/80 leading-tight mb-0.5">Available on</div>
                          <div className="text-xs font-bold text-white leading-tight">Windows</div>
                        </div>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2 text-center">Coming soon</div>
                  </div>

                  {/* Mac App Store Badge - Official */}
                  <div className="group relative opacity-60 cursor-not-allowed">
                    <div className="relative w-full aspect-[3.5/1]">
                      <Image
                        src="https://tools.applemediaservices.com/api/badges/download-on-the-mac-app-store/black/en-us?size=250x83&releaseDate=1289944800"
                        alt="Download on the Mac App Store"
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                    <div className="text-[10px] text-gray-400 mt-2 text-center">Coming soon</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
              <a 
                href="/contact"
                className="btn-secondary"
              >
                Get a Demo
              </a>
            </div>
          </div>
        </div>
      </section>


      {/* Features Section - Clause Style */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
        {/* Grid Lines Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0'
          }}></div>
        </div>
        <div className="container-modern relative z-10">
            <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              What You'll Test
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Help us perfect these core features
            </p>
          </div>

          {/* Feature Cards with Visuals */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
            {/* Feature 1: Dynamic Dashboard */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="mb-5">
                <div className="w-14 h-14 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                  <BarChart3 className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">App Blocking</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Block distracting apps during focus time
                </p>
              </div>
              {/* Visual Mockup */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-700">Usage Analytics</div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-200"></div>
                    <div className="w-6 h-6 rounded-full bg-blue-200"></div>
                    <div className="w-6 h-6 rounded-full bg-purple-200"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-emerald-500 rounded" style={{width: '85%'}}></div>
                  <div className="h-8 bg-gray-300 rounded" style={{width: '60%'}}></div>
                  <div className="h-8 bg-gray-300 rounded" style={{width: '45%'}}></div>
                  <div className="h-8 bg-gray-300 rounded" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>

            {/* Feature 2: Website Blocking */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="mb-5">
                <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-3">
                  <Globe className="h-7 w-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Website Blocking</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Block distracting websites, social media, and adult content
                </p>
              </div>
              {/* Visual Mockup */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700">New messages, comment, or replies</span>
                    <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700">Social emails</span>
                    <div className="w-10 h-6 bg-gray-300 rounded-full relative">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <span className="text-sm text-gray-700">Reminders</span>
                    <div className="w-10 h-6 bg-emerald-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 3: Usage Analytics */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="mb-5">
                <div className="w-14 h-14 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
                  <BarChart3 className="h-7 w-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Usage Analytics</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Track your digital habits and progress
                </p>
              </div>
              {/* Visual Mockup */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-gray-700">Usage Analytics</div>
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-200"></div>
                    <div className="w-6 h-6 rounded-full bg-blue-200"></div>
                    <div className="w-6 h-6 rounded-full bg-purple-200"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-8 bg-emerald-500 rounded" style={{width: '85%'}}></div>
                  <div className="h-8 bg-gray-300 rounded" style={{width: '60%'}}></div>
                  <div className="h-8 bg-gray-300 rounded" style={{width: '45%'}}></div>
                  <div className="h-8 bg-gray-300 rounded" style={{width: '30%'}}></div>
                </div>
              </div>
            </div>

            {/* Feature 4: Focus Modes */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="mb-5">
                <div className="w-14 h-14 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
                  <Zap className="h-7 w-7 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Focus Modes</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-3">
                  Predefined modes for different activities
                </p>
              </div>
              {/* Visual Mockup */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 mb-1">Work Mode</div>
                    <div className="text-xs text-gray-600">Block social media</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 mb-1">Sleep Mode</div>
                    <div className="text-xs text-gray-600">Block all apps</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-sm font-medium text-gray-900 mb-1">Study Mode</div>
                    <div className="text-xs text-gray-600">Focus on learning</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 5: Block Porn - Be the Best Version of YOU */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
              <div className="mb-5">
                <div className="w-14 h-14 rounded-xl bg-red-100 flex items-center justify-center mb-3">
                  <Lock className="h-7 w-7 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Block Porn</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-2">
                  Be the best version of <span className="font-bold text-emerald-600">YOU</span>!
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">
                  Protect yourself from adult content and build healthier digital habits
                </p>
              </div>
              {/* Visual Mockup */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="space-y-2">
                  <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">Adult Content</div>
                      <div className="text-xs text-gray-600">Blocked</div>
                    </div>
                    <div className="w-10 h-6 bg-red-500 rounded-full relative">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200 flex items-center justify-between">
                    <div>
                      <div className="text-sm font-medium text-gray-900 mb-1">Safe Browsing</div>
                      <div className="text-xs text-gray-600">Active</div>
                    </div>
                    <Heart className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs font-semibold text-emerald-600 mb-1">Your Best Self</div>
                    <div className="text-xs text-gray-600">Protected & Focused</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Beta Community */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-white overflow-hidden">
        {/* Grid Lines Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(16, 185, 129, 0.2) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(16, 185, 129, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0'
          }}></div>
        </div>
        <div className="container-modern relative z-10">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
              Join Our Beta Testing Community
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
              Help us build the perfect digital wellness app. Your feedback shapes the future of Digital Detox.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto mb-8">
            <div className="text-center p-5 bg-white rounded-xl border border-gray-200">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">500+</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Active Beta Testers</div>
              <div className="text-xs text-gray-600">Join the community</div>
            </div>
            <div className="text-center p-5 bg-white rounded-xl border border-gray-200">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">4.9/5</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Beta Rating</div>
              <div className="text-xs text-gray-600">200+ reviews</div>
            </div>
            <div className="text-center p-5 bg-white rounded-xl border border-gray-200">
              <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">50K+</div>
              <div className="text-sm font-semibold text-gray-900 mb-1">Hours Tested</div>
              <div className="text-xs text-gray-600">Real usage data</div>
            </div>
          </div>

          <div className="text-center">
            <a 
              href="https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 mb-3"
            >
              <Download className="h-4 w-4" />
              Download for Android
            </a>
            <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-600">
              <span className="text-emerald-600 font-semibold">Free</span>
              <span>•</span>
              <span>Available Now</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 md:py-20 lg:py-24 bg-emerald-600 overflow-hidden">
        {/* Grid Lines Overlay */}
        <div className="absolute inset-0 opacity-[0.1] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            backgroundPosition: '0 0'
          }}></div>
        </div>
        <div className="container-modern relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5">
              Ready to Help Build the Future of Digital Wellness?
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-emerald-50 mb-6 max-w-2xl mx-auto">
              Download the beta app and join our community of testers shaping the next generation of digital wellness tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/contact"
                className="btn-secondary bg-white text-emerald-600 border-2 border-white hover:bg-gray-50"
              >
                Get a Demo
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.davidmtundi.digitaldetox&hl=en-US&ah=3WY6T2CHMySIEXGXLKprhIh8XAg"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download for Android
              </a>
            </div>
            <div className="flex items-center justify-center gap-4 mt-5 text-xs sm:text-sm text-emerald-50">
              <span><span className="font-semibold text-white">500+</span> beta testers</span>
              <span>•</span>
              <span><span className="font-semibold text-white">4.9/5</span> rating</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
