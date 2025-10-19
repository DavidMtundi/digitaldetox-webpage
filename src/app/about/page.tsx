"use client"

import { Shield, Users, Target, Heart, Smartphone, Monitor, Tablet, Clock, TrendingUp, Award } from "lucide-react"

export default function About() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f4f0' }}>
      {/* Hero Section */}
      <section className="py-20" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: '#000000' }}>
              About Digital Detox
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              We're on a mission to help you build healthier relationships with technology. 
              Take control of your digital habits and reclaim your time.
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">50,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <TrendingUp className="h-5 w-5" />
                <span className="text-sm font-medium">2M+ Hours Saved</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#000000' }}>
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe technology should enhance your life, not control it. Digital Detox gives you 
                the power to use technology intentionally and mindfully.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Protect Your Focus
                </h3>
                <p className="text-gray-600">
                  Block distracting apps and websites during your most important moments. 
                  Create boundaries that help you stay focused on what matters.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Improve Wellbeing
                </h3>
                <p className="text-gray-600">
                  Reduce screen time, improve sleep quality, and build healthier relationships 
                  with technology and the people around you.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <Target className="h-8 w-8 text-gray-600" />
                </div>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Build Better Habits
                </h3>
                <p className="text-gray-600">
                  Track your usage patterns and set meaningful goals. Transform your relationship 
                  with technology one habit at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6" style={{ color: '#000000' }}>
                Key Features
              </h2>
              <p className="text-lg text-gray-600">
                Everything you need to take control of your digital life
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      App Blocking
                    </h3>
                    <p className="text-gray-600">
                      Block distracting apps during focus time with customizable schedules and exceptions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Monitor className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      Website Restrictions
                    </h3>
                    <p className="text-gray-600">
                      Restrict access to specific websites and create custom focus modes for different activities.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      Usage Tracking
                    </h3>
                    <p className="text-gray-600">
                      Track your digital usage patterns and get insights to help you make better decisions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-6 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      Custom Schedules
                    </h3>
                    <p className="text-gray-600">
                      Set up personalized focus schedules that work with your daily routine and commitments.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Smartphone className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      Cross-Platform
                    </h3>
                    <p className="text-gray-600">
                      Available on Android, iOS, and Desktop with seamless synchronization across devices.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 p-6 rounded-xl border border-gray-200">
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Heart className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: '#000000' }}>
                      Privacy First
                    </h3>
                    <p className="text-gray-600">
                      Your data stays on your device. No cloud storage, no tracking, complete privacy.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Digital Detox Section */}
      <section className="py-16" style={{ backgroundColor: '#ffffff' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#000000' }}>
              Why Digital Detox?
            </h2>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <div className="text-6xl font-bold mb-4" style={{ color: '#000000' }}>
                96
              </div>
              <p className="text-lg text-gray-600 mb-4">
                The average person checks their phone 96 times per day
              </p>
              <p className="text-sm text-gray-500">
                Source: Research by RescueTime
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              In today's hyperconnected world, digital distractions are everywhere. From endless 
              notifications to addictive social media feeds, technology has become a constant source 
              of interruption. Digital Detox helps you reclaim your time, improve your focus, and 
              build healthier relationships with technology and the people around you.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
                  Better Focus
                </h3>
                <p className="text-gray-600 text-sm">
                  Eliminate distractions and improve your ability to concentrate on important tasks.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
                  More Time
                </h3>
                <p className="text-gray-600 text-sm">
                  Reclaim hours of your day by reducing mindless scrolling and app usage.
                </p>
              </div>
              <div className="p-6 rounded-xl border border-gray-200">
                <h3 className="text-lg font-bold mb-3" style={{ color: '#000000' }}>
                  Better Sleep
                </h3>
                <p className="text-gray-600 text-sm">
                  Improve sleep quality by reducing blue light exposure and late-night usage.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16" style={{ backgroundColor: '#f4f4f0' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8" style={{ color: '#000000' }}>
              Built by Digital Wellness Experts
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our team combines expertise in psychology, technology, and user experience design 
              to create tools that genuinely help people build healthier relationships with technology.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  Research-Based Approach
                </h3>
                <p className="text-gray-600">
                  Every feature is designed based on scientific research about digital wellness, 
                  habit formation, and behavioral psychology.
                </p>
              </div>

              <div className="p-8 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4" style={{ color: '#000000' }}>
                  User-Centered Design
                </h3>
                <p className="text-gray-600">
                  We listen to our community of 50,000+ users to continuously improve the app 
                  and add features that matter most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}