import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function CircularFeature() {
  const features = [
    {
      id: 'voice',
      title: 'Voice Synthesis',
      description: 'Natural and expressive voice generation',
      position: { top: '8%', left: '50%', transform: 'translateX(-50%)' },
      method: 'voice.generate()',
      code: '$ voice.generate()',
      glowColor: 'from-purple-500/30 to-blue-500/30'
    },
    {
      id: 'realtime',
      title: 'Real-time Analysis',
      description: 'Instant processing and response',
      position: { top: '50%', right: '8%', transform: 'translateY(-50%)' },
      method: 'realtime.generate()',
      code: '$ stream.analyze()',
      glowColor: 'from-blue-500/30 to-cyan-500/30'
    },
    {
      id: 'text',
      title: 'Text Processing',
      description: 'Real-time text analysis and processing',
      position: { bottom: '8%', left: '50%', transform: 'translateX(-50%)' },
      method: 'text.generate()',
      code: '$ text.process()',
      glowColor: 'from-cyan-500/30 to-green-500/30'
    },
    {
      id: 'speech',
      title: 'Speech Recognition',
      description: 'Advanced voice recognition with 99% accuracy',
      position: { top: '50%', left: '8%', transform: 'translateY(-50%)' },
      method: 'speech.generate()',
      code: '$ speech.recognize()',
      glowColor: 'from-green-500/30 to-purple-500/30'
    }
  ];

  return (
    <div id="features" className="relative h-screen max-h-[800px] w-full bg-black overflow-hidden pt-20">
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-black to-transparent" />
      {/* Enhanced Layered Background */}
      <div className="absolute inset-0">
        {/* Base Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        
        {/* Animated Orbital Lines */}
        <div className="absolute inset-0">
          <div className="absolute inset-[15%] border border-white/5 rounded-full animate-spin-slow" />
          <div className="absolute inset-[25%] border border-white/5 rounded-full animate-spin-slower" />
        </div>
        
        {/* Dynamic Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Center Interactive Element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Pulsing Rings */}
          <div className="absolute inset-0 -m-8 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="absolute inset-0 -m-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-lg animate-pulse delay-75" />
          
          {/* Center Button */}
          <div className="relative w-52 h-52 rounded-full 
                         bg-gradient-to-b from-white/10 to-transparent
                         backdrop-blur-sm border border-white/10
                         flex flex-col items-center justify-center
                         group cursor-pointer
                         hover:border-white/20 transition-all duration-500">
            <div className="text-center p-6">
              <h3 className="text-2xl font-light text-white/90 mb-3 group-hover:text-white">
                Try Demo
              </h3>
              <p className="text-sm text-white/50 font-mono group-hover:text-white/70">
                interactive_mode
              </p>
            </div>

            {/* Hover Glow */}
            <div className="absolute -inset-px bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-cyan-500/20 
                           rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      {features.map((feature) => (
        <div
          key={feature.id}
          className="absolute"
          style={feature.position}
        >
          <div className="w-80 p-6 
                         bg-gradient-to-b from-white/[0.05] to-transparent
                         backdrop-blur-sm rounded-xl
                         border border-white/10
                         hover:border-white/20 
                         group transition-all duration-500
                         hover:transform hover:scale-105">
            {/* Method Badge */}
            <div className="flex items-center gap-2 mb-4">
              <div className="px-3 py-1.5 bg-black/60 rounded-md border border-white/10">
                <span className="font-mono text-xs text-white/50 group-hover:text-white/70">
                  {feature.method}
                </span>
              </div>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r animate-pulse" />
            </div>

            {/* Content */}
            <h4 className="text-lg font-light text-white/90 mb-3 group-hover:text-white">
              {feature.title}
            </h4>
            <p className="text-sm text-white/50 mb-5 leading-relaxed group-hover:text-white/70">
              {feature.description}
            </p>

            {/* Terminal Command */}
            <div className="font-mono text-xs text-white/40 px-3 py-2
                           bg-black/40 rounded-md border border-white/5
                           group-hover:border-white/10 group-hover:text-white/60">
              {feature.code}
            </div>

            {/* Feature-specific Glow */}
            <div className={`absolute -inset-px bg-gradient-to-r ${feature.glowColor} 
                            rounded-xl blur opacity-0 group-hover:opacity-100 
                            transition-opacity duration-500`} />
          </div>
        </div>
      ))}

      {/* Interactive Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
          </linearGradient>
        </defs>
        {/* Add dynamic connection lines here */}
        <path d="M..." stroke="url(#lineGradient)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
}