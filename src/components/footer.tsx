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
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Enhanced Brand Section */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200">
                <div className="text-center text-white">
                  <div className="text-sm font-bold">DD</div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                  Digital Detox
                </div>
              </div>
            </Link>
            
            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
              Take control of your digital habits and build healthier relationships with technology. 
              Join thousands of users who have reclaimed their time and focus.
            </p>
            
            <div className="flex space-x-6">
              <div className="text-sm text-gray-300">
                <span className="font-semibold text-white">50,000+</span> users
              </div>
              <div className="text-sm text-gray-300">
                <span className="font-semibold text-white">4.8/5</span> rating
              </div>
            </div>
          </div>

          {/* Enhanced Links */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Quick Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enhanced Support */}
          <div>
            <h3 className="font-semibold mb-6 text-lg">Support</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:support@digitaldetox.app" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>support@digitaldetox.app</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+1555DETOX1" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) DETOX-1</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} Digital Detox. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
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
