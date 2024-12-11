import React, { Suspense, useState } from 'react';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleWaitlistSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setMessage('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    setMessage('🎉 Thanks for joining! We\'ll notify you when we launch.');
    setEmail('');
    setIsSubmitting(false);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* Spline Background */}
      <div className="absolute inset-0 w-full h-full scale-105 translate-y-[-2%]">
        <Suspense fallback={<div className="w-full h-full bg-black" />}>
          <Spline 
            scene="https://prod.spline.design/cO3ogYNCMyoDjKDh/scene.splinecode"
            className="w-full h-full"
            style={{
              transform: 'scale(0.90)',
              transformOrigin: 'center center',
            }}
          />
        </Suspense>
      </div>

      {/* Content Container */}
      <div className="relative z-10 pointer-events-none">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-32">
          <div className="max-w-3xl">
            {/* Introducing Badge */}
            <div className="inline-flex items-center px-4 py-2 mb-8 rounded-full 
                          bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sm text-white/70">✨ Introducing Vocyth 1.0</span>
            </div>

            {/* Main Heading */}
            <h1 className="space-y-2">
              <span className="block text-7xl font-light tracking-tight text-white">
                The next
              </span>
              <span className="block text-7xl font-light tracking-tight 
                             text-transparent bg-clip-text 
                             bg-gradient-to-r from-white via-white to-white/90">
                era of voice
              </span>
              <span className="block text-7xl font-light tracking-tight text-white">
                synthesis
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 text-xl text-white/80 max-w-xl leading-relaxed">
              Create ultra-realistic voices and natural conversations with
              our advanced AI. Experience the future of voice technology.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-1 mt-10">
              {[
                { value: '99.9%', label: 'Accuracy' },
                { value: '150+', label: 'Voices' },
                { value: '50M+', label: 'Daily API Calls' }
              ].map((stat, index) => (
                <div key={index}>
                  <div className="text-3xl font-light text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Section with Waitlist */}
            <div className="flex flex-col items-start gap-6 mt-12 pointer-events-auto">
              {/* Waitlist Form */}
              <form onSubmit={handleWaitlistSubmit} className="flex items-center max-w-md relative">
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  className="px-4 py-3 rounded-l-lg bg-white/5 border border-white/10
                           text-white placeholder-white/40 outline-none
                           focus:border-white/20 transition-colors w-64
                           disabled:opacity-50"
                  required
                />
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-r-lg 
                           bg-white/10 hover:bg-white/15
                           border border-l-0 border-white/10 hover:border-white/20
                           text-white hover:text-white
                           transition-all duration-300
                           disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="inline-block animate-spin mr-2">⟳</span>
                      Joining...
                    </>
                  ) : (
                    'Join Waitlist'
                  )}
                </button>
              </form>

              {/* Status Messages */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-center text-white/70"
                >
                  {message}
                </motion.div>
              )}

              {/* Rest of the content */}
              <button className="px-2 py-1 rounded-lg
                             text-white/80 hover:text-white
                             flex items-center gap-2
                             transition-colors duration-300">
                View Documentation
                <span className="text-lg">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black to-transparent" />

      {/* Waitlist Section */}
      <div id="waitlist" className="max-w-2xl mx-auto mt-16 px-6">
        <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-sm">
          <h3 className="text-2xl text-white/90 mb-4">Join the Waitlist</h3>
          <p className="text-white/60 mb-6">
            Be the first to experience Vocyth's revolutionary voice AI technology.
          </p>

          <form onSubmit={handleWaitlistSubmit} className="space-y-4">
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg
                         bg-black/40 border border-white/10
                         text-white placeholder-white/30
                         focus:border-white/20 outline-none"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="absolute right-2 top-1/2 -translate-y-1/2
                         px-4 py-1.5 rounded-lg
                         bg-gradient-to-r from-purple-500/80 to-blue-500/80
                         text-white text-sm
                         hover:from-purple-500 hover:to-blue-500
                         transition-all duration-300
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin">◌</span>
                    Joining...
                  </span>
                ) : (
                  'Join Waitlist'
                )}
              </button>
            </div>
          </form>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-white/70"
            >
              {message}
            </motion.div>
          )}

          <div className="mt-6 flex items-center justify-center gap-6 text-white/40 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
              <span>Early access</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
              <span>Priority support</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}