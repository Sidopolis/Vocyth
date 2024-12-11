import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

export default function FAQ() {
  const [userQuestion, setUserQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const faqs = [
    {
      id: 'faq-1',
      question: 'How does Vocyth voice synthesis work?',
      answer: 'Our AI uses advanced neural networks to generate natural-sounding voices. Simply send text through our API, and receive high-quality audio in milliseconds.',
      code: 'const audio = await vocyth.synthesize(text)'
    },
    {
      id: 'faq-2',
      question: 'What about data privacy?',
      answer: 'We prioritize your data security. All transmissions are encrypted, and we offer data deletion options.',
      code: 'vocyth.privacy({ encryption: "AES-256" })'
    },
    {
      id: 'faq-3',
      question: 'How can I customize voices?',
      answer: 'Vocyth offers extensive voice customization options including pitch, speed, and emotion control.',
      code: 'vocyth.customize({ pitch: 1.2, emotion: "happy" })'
    }
  ];

  const getWorkInProgressResponse = () => {
    const responses = [
      "Hey there! 👋 Our AI is currently in development mode - we're teaching it all sorts of cool things! Check back soon?",
      "Exciting times! 🚀 We're fine-tuning our AI assistant. Meanwhile, you can explore our documentation for quick answers!",
      "Our AI is getting smarter every day! 🧠 We're in beta right now, but feel free to check out our features section above.",
      "Thanks for your interest! 💫 While our AI is learning the ropes, you can reach out to our team at martialwarlock70@gmail.com",
      "We're brewing something special! ✨ Our AI is currently in training. Meanwhile, why not check out our ₹149/month Developer plan?",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;

    // Add user question to chat
    const newMessage = { type: 'user', content: userQuestion };
    setChatHistory(prev => [...prev, newMessage]);
    setIsTyping(true);
    setUserQuestion('');

    // Simulate typing delay for more natural feel
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Add AI response
    setChatHistory(prev => [...prev, {
      type: 'assistant',
      content: getWorkInProgressResponse(),
    }]);
    
    setIsTyping(false);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory]);

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_65%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          {/* FAQ Section */}
          <div>
            <div className="text-center md:text-left mb-12">
              <h2 className="text-4xl font-light mb-6">
                <span className="bg-gradient-to-r from-white via-white/90 to-white/80 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq) => (
                <div key={faq.id} className="group relative p-6 rounded-2xl backdrop-blur-sm
                                           border border-white/10 hover:border-white/20
                                           transition-all duration-300
                                           bg-gradient-to-r from-white/[0.05] to-transparent">
                  <h3 className="text-lg text-white/90 mb-3">{faq.question}</h3>
                  <p className="text-white/50 text-sm mb-4">{faq.answer}</p>
                  <code className="block text-sm bg-black/30 p-3 rounded-lg font-mono text-white/40">
                    {faq.code}
                  </code>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive AI Assistant */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="p-6 rounded-2xl backdrop-blur-sm border border-white/10 
                            bg-gradient-to-b from-white/[0.05] to-transparent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white/70 text-sm">AI Assistant Online</span>
                </div>

                {/* Chat History */}
                <div className="h-[400px] overflow-y-auto mb-4 space-y-4">
                  {chatHistory.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[80%] p-3 rounded-xl ${
                        message.type === 'user' 
                          ? 'bg-white/10 text-white/90' 
                          : 'bg-white/[0.05] text-white/80'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 text-white/50 p-3">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce delay-100">●</span>
                      <span className="animate-bounce delay-200">●</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Question Input */}
                <form onSubmit={handleQuestionSubmit} className="relative">
                  <input
                    type="text"
                    value={userQuestion}
                    onChange={(e) => setUserQuestion(e.target.value)}
                    placeholder="Ask anything about Vocyth..."
                    className="w-full bg-black/40 rounded-lg px-4 py-3 
                             text-white/90 placeholder-white/30
                             border border-white/10 focus:border-white/20
                             outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2
                             text-white/50 hover:text-white/90 transition-colors"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Product Status */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white/90 font-light mb-6">System Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-sm text-white/50">API: Operational</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-sm text-white/50">Latency: 45ms</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-sm text-white/50">Uptime: 99.99%</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white/90 font-light mb-6">Product</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                  Documentation
                </a>
              </li>
              {/* Add more links */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white/90 font-light mb-6">Company</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                  About
                </a>
              </li>
              {/* Add more links */}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white/90 font-light mb-6">Stay Updated</h3>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <input 
                type="email"
                placeholder="Enter your email"
                className="w-full bg-black/40 rounded-lg px-4 py-2 
                         text-sm text-white/90 placeholder-white/30
                         border border-white/10 focus:border-white/20
                         outline-none transition-colors"
              />
              <button className="w-full mt-3 px-4 py-2 rounded-lg
                               bg-white/10 hover:bg-white/15
                               text-sm text-white/90
                               transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-white/30">
              © 2024 VoiceAI. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-white/50 hover:text-white/70 transition-colors">
                Terms
              </a>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="text-sm text-white/50">All systems normal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}