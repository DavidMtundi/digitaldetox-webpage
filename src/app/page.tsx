"use client"

import { Download, Smartphone, Monitor, Laptop, ChevronDown, CheckCircle, Rocket, Play, Shield, Users, Clock, Mail } from "lucide-react"
import { useState } from "react"

// Digital Detox app versions
const digitalDetoxVersions = {
  android: [
    { version: "2.1.0", size: "12.5 MB", date: "2024-01-15", features: ["App blocking", "Website restrictions", "Usage analytics", "Focus modes"] },
    { version: "2.0.5", size: "11.8 MB", date: "2023-12-20", features: ["App blocking", "Website restrictions", "Usage analytics"] },
    { version: "1.9.2", size: "10.2 MB", date: "2023-11-10", features: ["App blocking", "Website restrictions"] }
  ],
  ios: [
    { version: "2.1.0", size: "15.2 MB", date: "2024-01-15", features: ["App blocking", "Website restrictions", "Usage analytics", "Focus modes"] },
    { version: "2.0.5", size: "14.8 MB", date: "2023-12-20", features: ["App blocking", "Website restrictions", "Usage analytics"] },
    { version: "1.9.2", size: "13.5 MB", date: "2023-11-10", features: ["App blocking", "Website restrictions"] }
  ],
  desktop: [
    { version: "3.0.1", size: "45.8 MB", date: "2024-01-15", features: ["Website blocking", "App restrictions", "Usage analytics", "Parental controls"] },
    { version: "2.9.5", size: "42.1 MB", date: "2023-12-20", features: ["Website blocking", "App restrictions", "Usage analytics"] },
    { version: "2.8.3", size: "38.7 MB", date: "2023-11-10", features: ["Website blocking", "App restrictions"] }
  ]
}

export default function Home() {
  const [selectedPlatform, setSelectedPlatform] = useState('android')
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

  const platformData = {
    android: {
      name: 'Android',
      icon: Smartphone,
      downloadText: 'Download for Android',
      fileType: 'Android (.apk)',
      requirements: 'Android 6.0 or later',
      color: 'green',
      available: true
    },
    ios: {
      name: 'iOS',
      icon: Smartphone,
      downloadText: 'Download for iOS',
      fileType: 'iOS (.ipa)',
      requirements: 'iOS 12.0 or later',
      color: 'blue',
      available: false
    },
    desktop: {
      name: 'Desktop',
      icon: Monitor,
      downloadText: 'Download for macOS',
      fileType: 'macOS (.dmg)',
      requirements: 'All macOS versions 10.12+',
      color: 'purple',
      available: false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-purple-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float"></div>
        </div>
        
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-5xl mx-auto">
            {/* Enhanced App Icon */}
            {/* <div className="mb-12 animate-fade-in-up">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-pulse-glow">
                <div className="text-center text-white">
                  <div className="text-2xl font-bold mb-1">Digital</div>
                  <div className="text-sm font-medium tracking-wide">DETOX.</div>
                </div>
              </div>
            </div> */}
            
            {/* Enhanced Typography */}
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight text-gradient animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Break Free from Digital Distractions
            </h1>
            <p className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto leading-relaxed text-gray-600 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Take control of your digital habits and build a healthier relationship with technology.
            </p>
            
            {/* Enhanced Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-6 mb-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Shield className="h-4 w-4 text-green-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">100% Free</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">50,000+ Users</span>
              </div>
              <div className="flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="h-4 w-4 text-purple-600" />
                </div>
                <span className="text-sm font-semibold text-gray-700">2-Min Setup</span>
              </div>
            </div>
            
            {/* Enhanced Email Signup */}
            <div className="max-w-md mx-auto mb-12 animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-300">
                <h3 className="text-2xl font-bold mb-4 text-center text-gradient-purple">
                  Get Early Access
                </h3>
                <p className="text-gray-600 text-center mb-6 text-sm leading-relaxed">
                  Be the first to know when Digital Detox launches. No spam, just updates.
                </p>
                {isSubmitted ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      You&apos;re on the list!
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We&apos;ll notify you as soon as Digital Detox is ready.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors ${
                          error ? 'border-red-300' : 'border-gray-300'
                        }`}
                        required
                      />
                      {error && (
                        <p className="text-red-500 text-sm mt-1">{error}</p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-gradient disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Adding to list...</span>
                        </>
                      ) : (
                        <span>Notify Me When Ready</span>
                      )}
                    </button>
                  </form>
                )}
                <p className="text-xs text-gray-500 text-center mt-3">
                  Join 2,500+ people already on the waitlist
                </p>
                
                {/* Direct Download Option */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 text-center mb-4">
                    Or download the app directly
                  </p>
                  <a 
                    href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full btn-secondary text-center inline-block"
                  >
                    <Download className="h-4 w-4 inline mr-2" />
                    Get Digital Detox App
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Firebase App Distribution CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              Ready to Start Your Digital Detox Journey?
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Download the app now and join thousands of users who have reclaimed their focus and built healthier digital habits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
              >
                <Download className="h-5 w-5" />
                <span>Download Digital Detox</span>
              </a>
              <div className="text-purple-100 text-sm">
                <span className="font-semibold">50,000+</span> downloads • <span className="font-semibold">4.8/5</span> rating
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced How it Works Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              How it Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center relative group">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">Download & Install</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Download Digital Detox for your device and complete the quick setup process in under 2 minutes.
              </p>
              {/* Enhanced connecting line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-purple-200 to-blue-200 transform translate-x-6 rounded-full"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative group">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">Customize Your Blocks</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Choose which apps and websites to block, set your focus times, and create personalized restrictions.
              </p>
              {/* Enhanced connecting line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-1 bg-gradient-to-r from-purple-200 to-blue-200 transform translate-x-6 rounded-full"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">Track & Improve</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Monitor your progress, see your usage patterns, and build healthier digital habits over time.
              </p>
            </div>
          </div>

          {/* Enhanced Additional Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Clock className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-700 font-semibold">Total setup time: Less than 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Download Section */}
      <section id="download-section" className="py-32 bg-gradient-to-br from-gray-50 to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Download Digital Detox
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your platform and start building healthier digital habits today
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {Object.entries(platformData).map(([key, platform]) => {
                const IconComponent = platform.icon
                const isActive = selectedPlatform === key
                return (
                  <div 
                    key={key}
                    onClick={() => setSelectedPlatform(key)}
                    className={`relative p-8 rounded-3xl transition-all duration-300 transform hover:scale-105 cursor-pointer ${
                      platform.available 
                        ? 'bg-white shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-purple-200' 
                        : 'bg-gray-100 border-2 border-dashed border-gray-300'
                    } ${isActive ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}
                  >
                    {platform.available && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                          Available
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center ${
                        platform.available 
                          ? 'bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg' 
                          : 'bg-gray-200'
                      }`}>
                        <IconComponent className={`h-10 w-10 ${platform.available ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      
                      <h3 className="text-2xl font-bold mb-4 text-gray-900">{platform.name}</h3>
                      <p className="text-gray-600 mb-6">{platform.requirements}</p>
                      
                      {platform.available ? (
                        <a 
                          href="https://appdistribution.firebase.dev/i/fb68432dcd015219"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full btn-gradient inline-block text-center"
                        >
                          Download Now
                        </a>
                      ) : (
                        <div className="text-center">
                          <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gray-200 flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-gray-400" />
                          </div>
                          <p className="text-gray-500 font-medium">Coming Soon</p>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Why Digital Detox
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build healthier digital habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-900 transition-colors">App Blocking</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">Block distracting apps during focus time</p>
              </div>
            </div>
            
            <div className="group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-900 transition-colors">Website Restrictions</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">Block access to distracting websites</p>
              </div>
            </div>
            
            <div className="group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-900 transition-colors">Usage Analytics</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">Track your digital habits and progress</p>
              </div>
            </div>
            
            <div className="group relative p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-purple-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-purple-900 transition-colors">Focus Modes</h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">Predefined modes for different activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced FAQ Section */}
      <section className="py-32 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Digital Detox
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="group rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 group-hover:text-purple-600 transition-colors">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-4 text-sm font-bold text-white">Q</span>
                Is Digital Detox really free?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-12">
                Yes! Digital Detox is completely free to download and use. We believe everyone deserves access to tools that help build healthier digital habits. No credit card required, no hidden fees, no premium features locked behind paywalls.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="group rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 group-hover:text-purple-600 transition-colors">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-4 text-sm font-bold text-white">Q</span>
                How does Digital Detox protect my privacy?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-12">
                Your privacy is our top priority. All data is stored locally on your device. We don&apos;t collect personal information, track your usage, or share your data with third parties. Your digital detox journey remains completely private.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="group rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 group-hover:text-purple-600 transition-colors">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-4 text-sm font-bold text-white">Q</span>
                Can I customize which apps and websites to block?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-12">
                Absolutely! Digital Detox gives you complete control. You can block specific apps, websites, or entire categories. Set custom schedules, create focus modes for different activities, and adjust restrictions as your needs change.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="group rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 group-hover:text-purple-600 transition-colors">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-4 text-sm font-bold text-white">Q</span>
                Will Digital Detox work on my device?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-12">
                Digital Detox is currently available for Android devices. We&apos;re working on iOS and Desktop versions that will be released soon. Our Android app supports Android 6.0 and later versions.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="group rounded-3xl p-8 bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-xl font-bold mb-4 flex items-center text-gray-900 group-hover:text-purple-600 transition-colors">
                <span className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mr-4 text-sm font-bold text-white">Q</span>
                How quickly will I see results?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-12">
                Most users notice improved focus and reduced digital distractions within the first week. Our analytics help you track your progress and see patterns in your digital habits. The key is consistency and gradually building healthier routines.
              </p>
            </div>
          </div>

          {/* Enhanced Contact Support */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-8 py-4 shadow-lg border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Mail className="h-4 w-4 text-white" />
              </div>
              <span className="text-gray-700 font-semibold">Still have questions?</span>
              <a href="mailto:support@digitaldetox.app" className="text-purple-600 font-semibold hover:text-purple-700 hover:underline transition-colors">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
