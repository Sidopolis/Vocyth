import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const features = [
    {
      title: "Speech Recognition",
      icon: "🎤", // Using emoji for now, can replace with SVG
      description: "Advanced AI-powered speech recognition with 99% accuracy across multiple languages and accents.",
      metrics: [
        { label: "Accuracy", value: "99%" },
        { label: "Languages", value: "120+" },
        { label: "Latency", value: "10ms" }
      ],
      code: `const voice = await voiceAI.synthesize()`,
      gradient: "from-purple-600/20 via-transparent to-transparent"
    },
    {
      title: "Voice Synthesis",
      icon: "🔊",
      description: "Generate natural-sounding voices in real-time with customizable characteristics.",
      metrics: [
        { label: "Voices", value: "100+" },
        { label: "Quality", value: "HD" },
        { label: "Speed", value: "1ms" }
      ],
      code: `await voiceAI.generate({
  text: "Hello World",
  voice: "natural-v2",
  emotion: "friendly"
})`,
      gradient: "from-blue-600/20 via-transparent to-transparent"
    },
    {
      title: "Real-time Processing",
      icon: "⚡",
      description: "Process and transform voice inputs in milliseconds with our optimized pipeline.",
      metrics: [
        { label: "Processing", value: "45ms" },
        { label: "Streaming", value: "Yes" },
        { label: "Buffer", value: "2ms" }
      ],
      code: `const stream = voiceAI.stream({
  input: audioStream,
  model: "ultra-hd"
})`,
      gradient: "from-cyan-600/20 via-transparent to-transparent"
    }
  ];

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Enhanced Grid Pattern with Glow */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="max-w-2xl mb-20">
          {/* Tech-style Badge */}
          <div className="inline-flex items-center px-3 py-1 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
            <span className="text-xs text-white/70">System Status: Operational</span>
          </div>
          
          <h2 className="text-4xl font-light mb-8">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Advanced Voice Technology
            </span>
          </h2>
          <p className="text-white/70 text-lg leading-relaxed">
            Experience the next generation of voice synthesis with our cutting-edge features.
            Built for developers, by developers.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group relative p-8 bg-white/[0.03] backdrop-blur-xl border border-white/[0.05] rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
            >
              {/* Gradient Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Feature Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="text-white/90 text-2xl">{feature.icon}</div>
                  {/* Tech Details Badge */}
                  <div className="text-xs text-white/40 px-2 py-1 bg-white/5 rounded-full border border-white/[0.05]">
                    v2.0
                  </div>
                </div>
                
                <h3 className="text-xl text-white/90 mb-4 font-light">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">{feature.description}</p>
                
                {/* Code Preview */}
                <div className="text-xs bg-black/30 p-3 rounded-lg border border-white/[0.05] font-mono">
                  {feature.code.split('\n').map((line, i) => (
                    <div key={i} className="whitespace-pre">
                      {line.includes('const') && (
                        <>
                          <span className="text-purple-400">const</span>{' '}
                        </>
                      )}
                      {line.includes('await') && (
                        <>
                          <span className="text-cyan-400">await</span>{' '}
                        </>
                      )}
                      {line.replace('const ', '').replace('await ', '')}
                    </div>
                  ))}
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute -top-1 -right-1 w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 blur-lg group-hover:opacity-75 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Tech Stats */}
        <div className="mt-20 grid grid-cols-3 gap-8 p-8 bg-white/[0.02] rounded-2xl border border-white/[0.05]">
          <div className="text-center">
            <div className="text-2xl text-white/90 font-light mb-2">99.9%</div>
            <div className="text-sm text-white/40">Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white/90 font-light mb-2">&lt;50ms</div>
            <div className="text-sm text-white/40">Latency</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-white/90 font-light mb-2">24/7</div>
            <div className="text-sm text-white/40">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}