"use client"

import { Download, Smartphone, Monitor, Laptop, ChevronDown, CheckCircle, Rocket, Play, Shield, Users, Clock } from "lucide-react"
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
    <div className="min-h-screen" style={{ backgroundColor: '#f4f4f0' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center max-w-4xl mx-auto">
            {/* App Icon */}
            {/* <div className="mb-12">
              <div className="w-40 h-20 mx-auto rounded-2xl bg-white flex items-center justify-center shadow-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1" style={{ color: '#6A0DAD' }}>
                    Digital
                  </div>
                  <div className="text-sm font-medium tracking-wide" style={{ color: '#000000' }}>
                    DETOX.
                  </div>
                </div>
              </div>
            </div> */}
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight" style={{ color: '#000000' }}>
              Break Free from Digital Distractions
            </h1>
            <p className="text-2xl md:text-3xl mb-6 max-w-3xl mx-auto leading-relaxed" style={{ color: '#000000' }}>
              Take control of your digital habits and build a healthier relationship with technology.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <Shield className="h-5 w-5" />
                <span className="text-sm font-medium">100% Free</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">50,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">2-Min Setup</span>
              </div>
            </div>
            
            {/* Email Signup */}
            <div className="max-w-md mx-auto mb-12">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: '#000000' }}>
                  Get Early Access
                </h3>
                <p className="text-gray-600 text-center mb-6 text-sm">
                  Be the first to know when Digital Detox launches. No spam, just updates.
                </p>
                {isSubmitted ? (
                  <div className="text-center py-4">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h4 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      You're on the list!
                    </h4>
                    <p className="text-gray-600 text-sm">
                      We'll notify you as soon as Digital Detox is ready.
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
                      className="w-full text-white px-6 py-3 rounded-lg font-medium hover:opacity-80 transition-all duration-200 bg-gray-800 hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* How it Works Section */}
      <section className="py-32" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
              How it Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in minutes with our simple 3-step process
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-2xl">1</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Download & Install</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Download Digital Detox for your device and complete the quick setup process in under 2 minutes.
              </p>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200 transform translate-x-6"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-2xl">2</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Customize Your Blocks</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Choose which apps and websites to block, set your focus times, and create personalized restrictions.
              </p>
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200 transform translate-x-6"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <span className="text-gray-600 font-bold text-2xl">3</span>
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>Track & Improve</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Monitor your progress, see your usage patterns, and build healthier digital habits over time.
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-6 py-3">
              <Clock className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Total setup time: Less than 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download-section" className="py-32" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
              Download Digital Detox
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose your platform and start building healthier digital habits today
            </p>
          </div>

          {/* Platform Tabs */}
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="flex rounded-lg p-1" style={{ backgroundColor: '#f4f4f0' }}>
                {Object.entries(platformData).map(([key, platform]) => {
                  const IconComponent = platform.icon
                  const isActive = selectedPlatform === key
                  return (
                    <button
                      key={key}
                      onClick={() => setSelectedPlatform(key)}
                      className={`px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2 ${
                        isActive 
                          ? 'text-white bg-gray-800' 
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{platform.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Download Interface */}
            <div className="rounded-2xl p-8 shadow-lg" style={{ backgroundColor: '#ffffff' }}>
              {platformData[selectedPlatform as keyof typeof platformData].available ? (
                <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                  {/* Download Details */}
                  <div className="flex-1">
                    <div className="text-2xl font-bold mb-2" style={{ color: '#000000' }}>
                      {platformData[selectedPlatform as keyof typeof platformData].fileType}
                    </div>
                    <div className="text-gray-600">
                      {platformData[selectedPlatform as keyof typeof platformData].requirements}
                    </div>
                  </div>

                  {/* Primary Download Button */}
                  <div className="flex-1 lg:text-right">
                    <button 
                      className="px-8 py-4 rounded-lg font-medium text-white transition-colors bg-gray-800 hover:bg-gray-900"
                    >
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                /* Coming Soon Card */
                <div className="flex flex-col items-center justify-center py-16">
                  <div className="rounded-2xl p-12 border-2 border-dashed border-gray-300 text-center max-w-md" style={{ backgroundColor: '#f4f4f0' }}>
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      <Rocket className="h-8 w-8 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4" style={{ color: '#000000' }}>
                      Coming Soon
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      This feature is under development and will be available shortly. Stay tuned!
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
              Why Digital Detox
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to build healthier digital habits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#000000' }}>App Blocking</h3>
              <p className="text-gray-600 leading-relaxed">Block distracting apps during focus time</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#000000' }}>Website Restrictions</h3>
              <p className="text-gray-600 leading-relaxed">Block access to distracting websites</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#000000' }}>Usage Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Track your digital habits and progress</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-gray-50 transition-colors duration-200">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-3" style={{ color: '#000000' }}>Focus Modes</h3>
              <p className="text-gray-600 leading-relaxed">Predefined modes for different activities</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: '#000000' }}>
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to know about Digital Detox
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* FAQ Item 1 */}
            <div className="rounded-2xl p-8 bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-200">
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#000000' }}>
                <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-sm font-bold text-gray-600">Q</span>
                Is Digital Detox really free?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-10">
                Yes! Digital Detox is completely free to download and use. We believe everyone deserves access to tools that help build healthier digital habits. No credit card required, no hidden fees, no premium features locked behind paywalls.
              </p>
            </div>

            {/* FAQ Item 2 */}
            <div className="rounded-2xl p-8 bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-200">
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#000000' }}>
                <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-sm font-bold text-gray-600">Q</span>
                How does Digital Detox protect my privacy?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-10">
                Your privacy is our top priority. All data is stored locally on your device. We don't collect personal information, track your usage, or share your data with third parties. Your digital detox journey remains completely private.
              </p>
            </div>

            {/* FAQ Item 3 */}
            <div className="rounded-2xl p-8 bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-200">
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#000000' }}>
                <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-sm font-bold text-gray-600">Q</span>
                Can I customize which apps and websites to block?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-10">
                Absolutely! Digital Detox gives you complete control. You can block specific apps, websites, or entire categories. Set custom schedules, create focus modes for different activities, and adjust restrictions as your needs change.
              </p>
            </div>

            {/* FAQ Item 4 */}
            <div className="rounded-2xl p-8 bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-200">
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#000000' }}>
                <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-sm font-bold text-gray-600">Q</span>
                Will Digital Detox work on my device?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-10">
                Digital Detox is currently available for Android devices. We're working on iOS and Desktop versions that will be released soon. Our Android app supports Android 6.0 and later versions.
              </p>
            </div>

            {/* FAQ Item 5 */}
            <div className="rounded-2xl p-8 bg-gray-50 border border-gray-200 hover:shadow-md transition-all duration-200">
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#000000' }}>
                <span className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center mr-4 text-sm font-bold text-gray-600">Q</span>
                How quickly will I see results?
              </h3>
              <p className="text-gray-600 leading-relaxed ml-10">
                Most users notice improved focus and reduced digital distractions within the first week. Our analytics help you track your progress and see patterns in your digital habits. The key is consistency and gradually building healthier routines.
              </p>
            </div>
          </div>

          {/* Contact Support */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-2 bg-gray-50 rounded-full px-6 py-3 border border-gray-200">
              <span className="text-gray-700 font-medium">Still have questions?</span>
              <a href="mailto:support@digitaldetox.app" className="text-gray-800 font-semibold hover:underline">
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
