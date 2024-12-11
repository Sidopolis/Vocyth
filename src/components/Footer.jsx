import React from 'react';
import { motion } from 'framer-motion';
import { 
  GlobeAltIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';

// ... existing imports ...

export default function Footer() {
  return (
    <footer className="relative bg-black pt-32 pb-12 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        <div className="absolute bottom-0 left-0 right-0 h-[400px] bg-gradient-to-t from-purple-500/5 via-black to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Stats Bar - Adjusted spacing and hover effects */}
        <div className="mb-24">
          <div className="grid grid-cols-4 gap-8">
            {[
              { value: '99.9%', label: 'Uptime SLA', color: 'from-purple-500/20' },
              { value: '45ms', label: 'Average Latency', color: 'from-blue-500/20' },
              { value: '24/7', label: 'Support', color: 'from-cyan-500/20' },
              { value: '150+', label: 'API Endpoints', color: 'from-green-500/20' }
            ].map((stat, index) => (
              <div key={index} className="group relative">
                {/* Enhanced Hover Effect Card */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/[0.03] to-transparent 
                              rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                {/* Stat Content */}
                <div className="relative text-center p-6">
                  <div className="text-4xl font-light text-white mb-3 group-hover:transform 
                                group-hover:scale-110 transition-all duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                  
                  {/* Improved Animated Underline */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] 
                                bg-gradient-to-r from-transparent via-white/30 to-transparent
                                group-hover:w-2/3 transition-all duration-500" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Content - Improved grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24">
          {/* Brand & Live Status */}
          <div>
            <div className="flex items-center gap-3 mb-8 group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center
                            group-hover:bg-white/10 transition-all duration-300">
                <span className="text-white group-hover:scale-110 transition-transform duration-300">
                  <img src="/voice.svg" alt="Vocyth" className="w-6 h-6" />
                </span>
              </div>
              <span className="text-xl text-white">Vocyth</span>
            </div>
            
            {/* Enhanced System Status Card */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/10 backdrop-blur-sm
                          hover:border-white/20 transition-all duration-300 group">
              <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <span className="absolute inset-0 bg-green-500/30 rounded-full animate-ping" />
                  <span className="relative block w-2 h-2 rounded-full bg-green-500" />
                </div>
                <span className="text-white/80 text-sm">All Systems Operational</span>
              </div>
              
              {/* Live Metrics with improved animations */}
              <div className="space-y-4">
                {[
                  { name: 'API', value: '100%' },
                  { name: 'Latency', value: '45ms' },
                  { name: 'Success Rate', value: '99.9%' }
                ].map((metric, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-500">{metric.name}</span>
                      <span className="text-gray-400">{metric.value}</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-green-500/40 to-green-500/10 
                                    rounded-full w-full transform origin-left scale-x-100 
                                    group-hover:animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Sections with improved hover effects */}
          {['Product', 'Company'].map((section) => (
            <div key={section}>
              <h3 className="text-white mb-6 font-light">{section}</h3>
              <ul className="space-y-4">
                {['Documentation', 'API Reference', 'Status', 'Pricing'].map((link) => (
                  <li key={link}>
                    <a href="#" className="group relative text-gray-500 hover:text-white transition-colors duration-300">
                      <span className="relative z-10">{link}</span>
                      {/* Enhanced Hover Effect Line */}
                      <span className="absolute -bottom-1 left-0 w-0 h-px bg-white/30 
                                     group-hover:w-full transition-all duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Section with improved form styling */}
          <div>
            <h3 className="text-white mb-6 font-light">Stay Updated</h3>
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">
                Get the latest updates and news directly in your inbox.
              </p>
              
              <div className="relative group">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full bg-black/40 text-white rounded-lg px-4 py-3 
                           border border-white/10 focus:border-white/20
                           outline-none transition-all duration-300
                           placeholder:text-white/30"
                />
                
                {/* Enhanced Submit Button */}
                <button className="mt-3 w-full group relative px-4 py-3 rounded-lg 
                                 overflow-hidden transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 
                                opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <span className="relative text-white/90 text-sm">Subscribe</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-24 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/30">
              © 2024 Vocyth. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-white/50 hover:text-white/70 transition-colors">Terms</a>
              <a href="#" className="text-sm text-white/50 hover:text-white/70 transition-colors">Privacy</a>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
                <span className="text-sm text-white/50">All systems normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}