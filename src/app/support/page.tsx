"use client"

import { Heart, Sparkles, Shield, Users, TrendingUp, Gift, ArrowRight, CheckCircle, Star, Zap } from "lucide-react"
import { themeStyles } from "../../styles/theme"
import { useState } from "react"
import { useExternalLinks } from "@/hooks/useExternalLinks"

export default function Support() {
  const [hoveredAmount, setHoveredAmount] = useState<string | null>(null)
  const { links } = useExternalLinks()

  const donationAmounts = [
    { amount: 10, label: "$10", popular: false },
    { amount: 25, label: "$25", popular: true },
    { amount: 50, label: "$50", popular: false },
    { amount: 100, label: "$100", popular: false },
  ]

  const donationUrl = links.donation.url || "#"

  const benefits = [
    {
      icon: Sparkles,
      title: "Premium Features",
      description: "Help us develop advanced features like AI-powered insights and cross-platform sync"
    },
    {
      icon: Shield,
      title: "Enhanced Security",
      description: "Support our commitment to privacy-first architecture and data protection"
    },
    {
      icon: Users,
      title: "Community Growth",
      description: "Enable us to reach more people struggling with digital addiction"
    },
    {
      icon: TrendingUp,
      title: "Continuous Innovation",
      description: "Fund research and development of cutting-edge digital wellness tools"
    }
  ]

  const impactStats = [
    { number: "500+", label: "Beta Testers", icon: Users },
    { number: "50K+", label: "Hours Tested", icon: Zap },
    { number: "4.9/5", label: "User Rating", icon: Star },
  ]

  return (
    <div className="min-h-screen" style={themeStyles.background.primary}>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-200/60 to-blue-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-200/60 to-purple-300/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-float" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative container-modern py-20 sm:py-24 md:py-32 lg:py-40">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/80 backdrop-blur-sm border border-blue-200/50 mb-6 animate-fade-in-up">
              <Heart className="h-4 w-4 text-blue-600" />
              <span className="text-blue-600 text-sm font-semibold">Support Our Mission</span>
            </div>
            
            <h1 className="hero-title mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              Help Us Build the Future of Digital Wellness
            </h1>
            
            <p className="hero-subtitle mb-12 max-w-2xl mx-auto text-gray-700 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              Your support enables us to continue developing Digital Detox, reach more people, and create 
              innovative features that help millions reclaim their time and focus.
            </p>

            {/* Impact Stats */}
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 mb-12 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              {impactStats.map((stat, index) => (
                <div key={index} className="flex items-center gap-3 px-5 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/60 shadow-sm">
                  <stat.icon className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Support Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
        <div className="container-modern relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">
              Why Your Support Matters
            </h2>
            <p className="section-subtitle max-w-3xl mx-auto text-gray-700">
              Every contribution helps us improve Digital Detox and make digital wellness accessible to everyone
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-7xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group feature-card text-center p-8 rounded-2xl bg-white border border-gray-200/60 hover:border-blue-200 transition-all duration-300 hover:shadow-xl"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-lg">
                  <benefit.icon className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="container-modern relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="section-title mb-4">
                Make a Donation
              </h2>
              <p className="section-subtitle max-w-2xl mx-auto text-gray-700">
                Choose an amount or enter a custom donation. Every contribution makes a difference.
              </p>
            </div>

            {/* Donation Amounts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {donationAmounts.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => donationUrl && donationUrl !== "#" ? window.open(donationUrl, '_blank', 'noopener,noreferrer') : {}}
                  onMouseEnter={() => setHoveredAmount(option.label)}
                  onMouseLeave={() => setHoveredAmount(null)}
                  disabled={!donationUrl || donationUrl === "#"}
                  className={`group relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                    !donationUrl || donationUrl === "#"
                      ? 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-60'
                      : option.popular
                      ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                      : hoveredAmount === option.label
                      ? 'border-blue-400 bg-blue-50 shadow-md scale-105'
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  {option.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      Popular
                    </div>
                  )}
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${
                      option.popular ? 'text-blue-600' : 'text-gray-900'
                    }`}>
                      {option.label}
                    </div>
                    <div className="text-xs text-gray-500">One-time</div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-blue-600" />
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Amount Button */}
            <div className="mb-8">
              <a
                href={donationUrl && donationUrl !== "#" ? donationUrl : "#"}
                target={donationUrl && donationUrl !== "#" ? "_blank" : undefined}
                rel={donationUrl && donationUrl !== "#" ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!donationUrl || donationUrl === "#") {
                    e.preventDefault();
                  }
                }}
                className={`group w-full text-center inline-block text-lg sm:text-xl font-semibold py-5 px-10 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${
                  donationUrl && donationUrl !== "#"
                    ? "btn-gradient hover:shadow-2xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                }`}
              >
                <Gift className="h-6 w-6" />
                <span>Donate Custom Amount</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50">
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="font-medium">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">One-Time Donation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="font-medium">100% Transparent</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-indigo-600/90 animate-gradient"></div>
        
        <div className="container-modern relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-6">
              <Sparkles className="h-4 w-4 text-white" />
              <span className="text-white text-sm font-medium">Your Impact</span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 text-white leading-tight">
              Together, We're Making a Difference
            </h2>
            <p className="text-xl sm:text-2xl text-blue-50 mb-10 leading-relaxed">
              Your support helps us continue our mission to help millions of people build healthier 
              relationships with technology and reclaim their time.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">100%</div>
                <div className="text-blue-100">Goes to Development</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">Free</div>
                <div className="text-blue-100">Forever for Users</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-white mb-2">Open</div>
                <div className="text-blue-100">Source Principles</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Thank You Section */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
        <div className="container-modern relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
              <Heart className="h-12 w-12 text-red-500" />
            </div>
            <h2 className="section-title mb-6">
              Thank You for Your Support
            </h2>
            <p className="section-subtitle text-gray-700 mb-8">
              Every donation, no matter the size, helps us continue building Digital Detox and making 
              digital wellness accessible to everyone. We're grateful for your contribution to our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={donationUrl && donationUrl !== "#" ? donationUrl : "#"}
                target={donationUrl && donationUrl !== "#" ? "_blank" : undefined}
                rel={donationUrl && donationUrl !== "#" ? "noopener noreferrer" : undefined}
                onClick={(e) => {
                  if (!donationUrl || donationUrl === "#") {
                    e.preventDefault();
                  }
                }}
                className={`group text-lg font-semibold py-4 px-8 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:ring-offset-2 flex items-center justify-center gap-3 shadow-xl transition-all duration-300 ${
                  donationUrl && donationUrl !== "#"
                    ? "btn-gradient hover:shadow-2xl"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                }`}
              >
                <Gift className="h-5 w-5" />
                <span>Donate Now</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

