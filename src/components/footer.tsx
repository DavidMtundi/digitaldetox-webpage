"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone } from 'lucide-react';
import { useExternalLinks } from '@/hooks/useExternalLinks';

export default function Footer() {
  const { links } = useExternalLinks();
  const footerLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/support', label: 'Support Us' },
    { href: '/privacy', label: 'Privacy Policy' }
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' }
  ];

  return (
    <footer className="bg-emerald-600 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 md:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          {/* Enhanced Brand Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6 group inline-block">
              <div className="w-14 h-14 relative flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                <Image 
                  src="/digitaldetox.png" 
                  alt="Digital Detox Logo" 
                  width={56} 
                  height={56} 
                  className="object-contain"
                />
              </div>
              <div>
                <div className="text-xl font-bold text-white group-hover:text-emerald-100 transition-colors duration-300">
                  Digital Detox
                </div>
              </div>
            </Link>
            
            <p className="text-emerald-50 mb-6 max-w-sm leading-relaxed text-sm">
              Take control of your digital habits and build healthier relationships with technology. Join thousands of users who have reclaimed their time and focus.
            </p>
            
            <div className="space-y-2">
              <div className="text-sm text-emerald-50">
                <span className="font-bold text-white text-base">50,000+</span> users
              </div>
              <div className="text-sm text-emerald-50">
                <span className="font-bold text-white text-base">4.8/5</span> rating
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-6 text-base text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-emerald-50 hover:text-white transition-colors text-sm block">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-emerald-50 hover:text-white transition-colors text-sm block">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-emerald-50 hover:text-white transition-colors text-sm block">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-emerald-50 hover:text-white transition-colors text-sm block">
                  Support Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-emerald-50 hover:text-white transition-colors text-sm block">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-6 text-base text-white">Support</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href={`mailto:${links.contact.email}`}
                  className="text-emerald-50 hover:text-white transition-colors text-sm block flex items-start gap-3 group"
                >
                  <Mail className="h-5 w-5 mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="break-all">{links.contact.email}</span>
                </a>
              </li>
              <li>
                <a 
                  href={`tel:${links.contact.phone}`}
                  className="text-emerald-50 hover:text-white transition-colors text-sm block flex items-center gap-3 group"
                >
                  <Phone className="h-5 w-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span>{links.contact.phone}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-6 text-base text-white">Legal</h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href} 
                    className="text-emerald-50 hover:text-white transition-colors text-sm block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-emerald-500/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-emerald-50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Digital Detox. All rights reserved.
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              {legalLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="text-emerald-50 hover:text-white transition-colors duration-200"
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
