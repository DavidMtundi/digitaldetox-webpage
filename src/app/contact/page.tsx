"use client"

import { useState } from "react"
import { Mail, MessageCircle, Clock, CheckCircle, Send, Phone, MapPin, Users, Star } from "lucide-react"
import { themeStyles } from "../../styles/theme"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: "", email: "", subject: "", message: "" })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen" style={themeStyles.background.secondary}>
      {/* Hero Section */}
      <section className="py-20" style={themeStyles.background.secondary}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={themeStyles.text.primary}>
              Get in Touch
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Have questions about Digital Detox? Need help with installation? 
              We're here to help you build healthier digital habits.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-8 mb-12">
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock className="h-5 w-5" />
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Users className="h-5 w-5" />
                <span className="text-sm font-medium">50,000+ Users</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Star className="h-5 w-5" />
                <span className="text-sm font-medium">4.8/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16" style={themeStyles.background.primary}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {/* Email Support */}
            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Mail className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={themeStyles.text.primary}>
                Email Support
              </h3>
              <p className="text-gray-600 mb-4">
                Get detailed help with your questions
              </p>
              <a 
                href="mailto:davidmtundi001@gmail.com"
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                davidmtundi001@gmail.com
              </a>
            </div>

            {/* Live Chat */}
            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <MessageCircle className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={themeStyles.text.primary}>
                Live Chat
              </h3>
              <p className="text-gray-600 mb-4">
                Chat with our support team instantly
              </p>
              <button className="text-gray-600 hover:text-gray-800 font-medium">
                Start Chat
              </button>
            </div>

            {/* Phone Support */}
            <div className="text-center p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                <Phone className="h-8 w-8 text-gray-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={themeStyles.text.primary}>
                Phone Support
              </h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our team
              </p>
              <a 
                href="tel:+254721115847"
                className="text-gray-600 hover:text-gray-800 font-medium"
              >
                +254 721 115 847
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16" style={themeStyles.background.secondary}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={themeStyles.text.primary}>
                Send us a Message
              </h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you within 24 hours
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={themeStyles.text.primary}>
                    Message Sent!
                  </h3>
                  <p className="text-gray-600">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Question</option>
                      <option value="technical">Technical Support</option>
                      <option value="feature">Feature Request</option>
                      <option value="bug">Bug Report</option>
                      <option value="billing">Billing Question</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-colors resize-none"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary text-lg py-4 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16" style={themeStyles.background.primary}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={themeStyles.text.primary}>
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Quick answers to common questions about Digital Detox
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-3" style={themeStyles.text.primary}>
                    How do I install Digital Detox?
                  </h3>
                  <p className="text-gray-600">
                    Download the app from our homepage and follow the simple setup wizard. 
                    The entire process takes less than 2 minutes.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-3" style={themeStyles.text.primary}>
                    Is Digital Detox free to use?
                  </h3>
                  <p className="text-gray-600">
                    Yes! Digital Detox is completely free with no hidden costs or premium features. 
                    We believe digital wellness should be accessible to everyone.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-3" style={themeStyles.text.primary}>
                    Can I customize which apps to block?
                  </h3>
                  <p className="text-gray-600">
                    Absolutely! You have full control over which apps and websites to block. 
                    You can also set custom schedules and exceptions.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-3" style={themeStyles.text.primary}>
                    Does it work on all devices?
                  </h3>
                  <p className="text-gray-600">
                    Digital Detox is available for Android, iOS, and Desktop. 
                    We're working on expanding to more platforms.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-3" style={themeStyles.text.primary}>
                    How do I reset my password?
                  </h3>
                  <p className="text-gray-600">
                    Digital Detox doesn't require an account or password. 
                    All your settings are stored locally on your device.
                  </p>
                </div>

                <div className="p-6 rounded-xl border border-gray-200">
                  <h3 className="text-lg font-bold mb-3" style={themeStyles.text.primary}>
                    Can I get a refund?
                  </h3>
                  <p className="text-gray-600">
                    Since Digital Detox is free, there are no charges to refund. 
                    If you're having issues, contact our support team.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}