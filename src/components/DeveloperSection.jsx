import React from 'react';
import { motion } from 'framer-motion';
import { CodeBracketIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

export default function DeveloperSection() {
  const codeExample = `import { Vocyth } from '@vocyth/sdk';

const vocyth = new Vocyth({
  apiKey: process.env.VOCYTH_API_KEY
});

// Multilingual Voice Generation
const audio = await vocyth.synthesize({
  text: "नमस्ते दुनिया", // Hello World in Hindi
  voice: "indra",
  language: "hi-IN",
  emotion: "natural"
});

// Real-time Translation Stream
const stream = vocyth.stream({
  sourceLanguage: "hi-IN",
  targetLanguage: "en-US",
  model: "neural-v2",
  quality: "ultra-hd"
});

// Voice Clone & Customize
const customVoice = await vocyth.clone({
  audioSample: "sample.mp3",
  enhancement: true,
  preserveAccent: true
});`;

  return (
    <section id="developers" className="relative bg-black py-32 overflow-hidden pt-20">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_65%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full 
                         bg-gradient-to-r from-white/[0.08] via-white/[0.05] to-white/[0.08]
                         border border-white/10 backdrop-blur-sm">
            <span className="text-sm text-white/70">Built for Developers</span>
          </div>
          
          <h2 className="text-5xl font-light mb-6">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Powerful APIs, Simple Integration
            </span>
          </h2>
        </div>

        {/* Interactive Code Demo */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          {/* Code Example */}
          <div className="relative group">
            <div className="absolute -inset-px bg-gradient-to-r from-white/20 via-white/10 to-white/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative p-6 bg-black/40 backdrop-blur-sm rounded-xl border border-white/10">
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/40" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
                  <div className="w-3 h-3 rounded-full bg-green-500/40" />
                </div>
                <span className="text-xs text-white/30 font-mono">vocyth_demo.js</span>
              </div>

              {/* Code Content */}
              <pre className="text-sm">
                <code className="text-white/70 font-mono">
                  {codeExample}
                </code>
              </pre>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-xl text-white/90 font-light">Simple Integration</h3>
              <p className="text-white/50">Get started in minutes with our powerful SDK and comprehensive documentation.</p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                'Neural Processing', 
                'Real-time Streaming', 
                'Voice Cloning', 
                'Emotion Control'
              ].map((feature) => (
                <div key={feature} className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <span className="text-sm text-white/70">{feature}</span>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="flex gap-4">
              <Link 
                to="/docs"
                className="px-6 py-3 rounded-lg bg-white/10 hover:bg-white/15 
                               text-white/90 transition-colors">
                View Documentation
              </Link>
              <button className="px-6 py-3 rounded-lg border border-white/10 hover:border-white/20 
                               text-white/90 transition-colors">
                Try Demo
              </button>
            </div>
          </div>
        </div>

        {/* Support Section */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Documentation */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
              <span className="text-2xl text-white/70">📚</span>
            </div>
            <h3 className="text-lg text-white/90 mb-2">Documentation</h3>
            <p className="text-sm text-white/50 mb-4">Comprehensive guides and API references.</p>
            <a href="#" className="text-sm text-white/70 hover:text-white/90 transition-colors">
              Read Docs →
            </a>
          </div>

          {/* Community */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
              <span className="text-2xl text-white/70">��</span>
            </div>
            <h3 className="text-lg text-white/90 mb-2">Community</h3>
            <p className="text-sm text-white/50 mb-4">Join our developer community for support.</p>
            <a href="#" className="text-sm text-white/70 hover:text-white/90 transition-colors">
              Join Discord →
            </a>
          </div>

          {/* Support */}
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
            <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-4">
              <span className="text-2xl text-white/70">🎯</span>
            </div>
            <h3 className="text-lg text-white/90 mb-2">Priority Support</h3>
            <p className="text-sm text-white/50 mb-4">Get help directly from our team.</p>
            <a href="#" className="text-sm text-white/70 hover:text-white/90 transition-colors">
              Contact Support →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}