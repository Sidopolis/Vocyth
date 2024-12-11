import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import Spline from '@splinetool/react-spline';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Product Manager at TechCorp',
    quote: 'The voice AI has transformed our customer service. Response times are down 70% and satisfaction is up.',
  },
  {
    id: 2,
    name: 'David Chen',
    role: 'CTO at InnovateLabs',
    quote: 'Integration was seamless. The API is well-documented and the voice quality is exceptional.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Developer at StartupX',
    quote: "Best voice synthesis API I've used. The customization options are incredible.",
  }
];

export default function Testimonials() {
  return (
    <section className="relative bg-transparent py-32 overflow-hidden">
      {/* Spline Background - Adjusted for better visibility */}
      <div className="absolute inset-0 -z-10">
        <Spline 
          scene="https://prod.spline.design/3l-dVVRI111HPYKm/scene.splinecode"
          style={{
            width: '100%',
            height: '130%',
            opacity: 2 // Ensure full opacity
          }}
        />
        {/* Lighter overlay for better scene visibility */}
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 z-10">
        <div className="max-w-2xl mx-auto text-center mb-20">
          {/* Online Status Badge */}
          <div className="inline-flex items-center px-3 py-1.5 mb-6 bg-black/50 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
            <span className="text-xs text-white/70 font-mono">live_feedback.stream()</span>
          </div>

          <h2 className="text-4xl font-light mb-6">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Developer Testimonials
            </span>
          </h2>
          <p className="text-white/70 text-lg">
            Real feedback from developers building with our API
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative p-6 bg-black/30 backdrop-blur-sm 
                         border border-white/[0.05] rounded-2xl overflow-hidden 
                         hover:border-white/10 transition-all duration-300"
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                  <div className="w-2 h-2 rounded-full bg-white/20" />
                </div>
                <div className="text-xs text-white/30 font-mono">feedback.json</div>
              </div>

              {/* Code-style Quote */}
              <div className="mb-8 font-mono text-sm">
                <span className="text-white/50">const</span>{' '}
                <span className="text-white/70">feedback</span>{' '}
                <span className="text-white/50">=</span>{' '}
                <span className="text-white/90">"{testimonial.quote}"</span>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10" />
                <div>
                  <div className="text-white/90 font-medium">{testimonial.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-white/50 text-sm">{testimonial.role}</span>
                    <span className="px-2 py-0.5 text-xs text-white/30 bg-black/50 rounded-full border border-white/10">
                      verified_dev
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Terminal Stats */}
        <div className="mt-20">
          <div className="font-mono text-sm text-white/40 mb-4">$ stats --show-global</div>
          <div className="grid grid-cols-3 gap-8">
            <div className="p-4 bg-black/30 rounded-lg border border-white/10">
              <div className="text-2xl text-white/90 font-light mb-1">10k+</div>
              <div className="text-sm text-white/40 font-mono">active_devs</div>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-white/10">
              <div className="text-2xl text-white/90 font-light mb-1">1M+</div>
              <div className="text-sm text-white/40 font-mono">api_calls</div>
            </div>
            <div className="p-4 bg-black/30 rounded-lg border border-white/10">
              <div className="text-2xl text-white/90 font-light mb-1">4.9/5</div>
              <div className="text-sm text-white/40 font-mono">avg_rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}