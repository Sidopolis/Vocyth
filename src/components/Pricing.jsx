import React from 'react';
import { motion } from 'framer-motion';

export default function Pricing() {
  const tiers = [
    {
      name: 'Developer',
      price: '149',
      description: 'Perfect for individual developers and small projects',
      features: [
        '100k API calls/month',
        'Basic voice models',
        'REST API access',
        'Documentation',
        'Community support'
      ],
      badge: 'Most Popular',
      gradient: 'from-white/[0.08] via-white/[0.03] to-transparent'
    },
    {
      name: 'Pro',
      price: '499',
      description: 'For growing teams and applications',
      features: [
        '1M API calls/month',
        'Advanced voice models',
        'WebSocket support',
        'Priority support',
        'Custom voices'
      ],
      badge: 'Recommended',
      gradient: 'from-white/[0.12] via-white/[0.04] to-transparent'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For large-scale deployments',
      features: [
        'Unlimited API calls',
        'Custom model training',
        'Dedicated support',
        'SLA guarantee',
        'On-premise option'
      ],
      badge: 'Custom',
      gradient: 'from-white/[0.08] via-white/[0.03] to-transparent'
    }
  ];

  return (
    <section id="pricing" className="relative bg-black py-32 overflow-hidden pt-20">
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
            <span className="text-sm text-white/70">Pricing</span>
          </div>
          
          <h2 className="text-5xl font-light mb-6">
            <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
              Choose Your Plan
            </span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Start with our flexible pricing options. Upgrade or downgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div 
              key={tier.name}
              className={`relative p-8 rounded-2xl backdrop-blur-sm
                         border border-white/10 
                         hover:border-white/20 group
                         transition-all duration-500
                         bg-gradient-to-b ${tier.gradient}
                         ${index === 1 ? 'md:-translate-y-4' : ''}`}
            >
              {/* Popular Badge */}
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-1.5 rounded-full 
                                bg-white/10 backdrop-blur-sm
                                border border-white/20">
                    <span className="text-xs font-light text-white/90">{tier.badge}</span>
                  </div>
                </div>
              )}

              {/* Tier Info */}
              <div className="mb-8">
                <h3 className="text-xl font-light text-white/90 mb-4">{tier.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-lg text-white/50">₹</span>
                  <span className="text-4xl font-light text-white">{tier.price}</span>
                  <span className="text-white/50">/month</span>
                </div>
                <p className="text-sm text-white/50">{tier.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 group">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />
                    <span className="text-sm text-white/70">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className="w-full px-6 py-3 
                                bg-gradient-to-r from-white/10 via-white/[0.15] to-white/10
                                hover:from-white/[0.15] hover:via-white/20 hover:to-white/[0.15]
                                border border-white/10 hover:border-white/20
                                rounded-lg text-white/90 hover:text-white
                                transition-all duration-300
                                backdrop-blur-sm">
                Get Started
              </button>

              {/* Hover Glow Effect */}
              <div className="absolute -inset-[1px] bg-gradient-to-r from-white/0 via-white/10 to-white/0 
                            opacity-0 group-hover:opacity-100 rounded-2xl blur-xl transition-opacity duration-500" />
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 flex justify-center items-center gap-8 text-white/40">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
            <span className="text-sm">30-day money back</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
            <span className="text-sm">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/40" />
            <span className="text-sm">Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}