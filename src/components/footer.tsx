import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export default function Footer() {
  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy Policy' }
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 lg:gap-12">
          {/* Enhanced Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group inline-block">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 via-blue-500 to-indigo-600 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                <div className="text-center text-white">
                  <div className="text-base font-bold">DD</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                  Digital Detox
                </div>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed text-base">
              Take control of your digital habits and build healthier relationships with technology. 
              Join thousands of users who have reclaimed their time and focus.
            </p>
            
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="font-bold text-white text-lg">500+</span>
                <span>beta testers</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="font-bold text-white text-lg">4.9/5</span>
                <span>rating</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="font-bold text-white text-lg">50K+</span>
                <span>hours tested</span>
              </div>
            </div>
          </div>

          {/* Enhanced Links */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-white">Quick Links</h3>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-all duration-200 hover:translate-x-2 transform inline-block group"
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-0 group-hover:w-2 h-0.5 bg-white transition-all duration-200"></span>
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Support */}
          <div>
            <h3 className="font-bold mb-6 text-lg text-white">Support</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:davidmtundi001@gmail.com" 
                  className="text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-3 group"
                >
                  <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span className="break-all">davidmtundi001@gmail.com</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+254721115847" 
                  className="text-gray-300 hover:text-white transition-all duration-200 flex items-center space-x-3 group"
                >
                  <Phone className="h-5 w-5 group-hover:scale-110 transition-transform" />
                  <span>+254 721 115 847</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-gray-700/50 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Digital Detox. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
