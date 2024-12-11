import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResizableBox } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [size, setSize] = useState({ width: 384, height: 500 }); // Default size
  const messagesEndRef = useRef(null);
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef(null);
  const [chatPosition, setChatPosition] = useState('bottom'); // 'bottom' or 'top'
  const [showHint, setShowHint] = useState(false);
  
  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if button is in the upper half of the screen
    if (position.y < window.innerHeight / 2) {
      setChatPosition('top');
    } else {
      setChatPosition('bottom');
    }
  }, [position]);

  // Add effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setPosition({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isOpen) {  // Only show hint when chat is closed
        setShowHint(true);
        setTimeout(() => setShowHint(false), 2000); // Hide after 2s
      }
    }, 6000);

    return () => clearInterval(interval);
  }, [isOpen]);

  const generateAIResponse = async (userMessage) => {
    setIsTyping(true);
    try {
      const response = await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: "mixtral-8x7b-32768",
            messages: [
              {
                role: "system",
                content: "You are a helpful AI assistant. Provide clear, concise, and accurate responses."
              },
              {
                role: "user",
                content: userMessage
              }
            ],
            temperature: 0.7,
            max_tokens: 150,
            top_p: 1,
            stream: false
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const result = await response.json();
      console.log('API Result:', result);

      return result.choices[0]?.message?.content || "How can I help you today?";
    } catch (error) {
      console.error("Detailed error:", error);
      return "I'm here to help. What would you like to know?";
    } finally {
      setIsTyping(false);
    }
  };

  // Update the form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    
    // Get AI response
    const aiResponse = await generateAIResponse(userMessage);
    
    // Add AI response
    setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
  };

  // Add function to handle refresh
  const handleRefresh = () => {
    setMessages([]); // Clear messages
    setInput(''); // Clear input
    setIsTyping(false); // Reset typing state
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragStop = () => {
    setIsDragging(false);
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Draggable
        nodeRef={dragRef}
        bounds="parent"
        position={position}
        onStart={handleDragStart}
        onStop={(e, data) => {
          handleDragStop();
          setPosition({ x: data.x, y: data.y });
        }}
        handle=".drag-handle"
      >
        <div ref={dragRef} className="pointer-events-auto absolute">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => !isDragging && setIsOpen(!isOpen)}
            className="drag-handle relative w-14 h-14 rounded-full bg-black/95 
                     border border-white/20 flex items-center justify-center 
                     shadow-lg hover:shadow-xl transition-all duration-300
                     cursor-grab active:cursor-grabbing"
          >
            <img 
              src="/public/voice.svg" 
              alt="Vocyth"
              className="relative w-8 h-8"
            />
          </motion.button>

          <AnimatePresence>
            {showHint && !isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="absolute right-16 top-1/2 -translate-y-1/2 
                           bg-black/90 border border-white/10 rounded-lg px-3 py-1.5
                           whitespace-nowrap"
              >
                <span className="text-sm text-white/80">Vocyth here :)</span>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: chatPosition === 'bottom' ? 20 : -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: chatPosition === 'bottom' ? 20 : -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`absolute ${
                  chatPosition === 'bottom' 
                    ? 'bottom-20' 
                    : 'top-20'
                } right-0`}
              >
                <ResizableBox
                  width={size.width}
                  height={size.height}
                  minConstraints={[300, 400]}
                  maxConstraints={[600, 800]}
                  onResize={(e, { size }) => {
                    setSize({ width: size.width, height: size.height });
                  }}
                  resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
                  className="relative bg-black/95 border border-white/10 rounded-2xl 
                            shadow-2xl backdrop-blur-xl overflow-hidden"
                >
                  {/* Header with Refresh Button */}
                  <div className="absolute top-0 left-0 right-0 p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-black border border-white/10 
                                    flex items-center justify-center">
                        <img src="/public/voice.svg" alt="Vocyth" className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-white/90 font-medium">Vocyth Assistant</h3>
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                          <span className="text-xs text-white/50">Online</span>
                        </div>
                      </div>
                      <div className="ml-auto flex items-center gap-2">
                        {/* Refresh Button */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={handleRefresh}
                          className="p-2 text-white/50 hover:text-white/90 
                                   transition-colors rounded-full
                                   hover:bg-white/5"
                          title="Clear chat"
                        >
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            className="h-5 w-5"
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor"
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                            <path d="M21 3v5h-5" />
                            <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                            <path d="M3 21v-5h5" />
                          </svg>
                        </motion.button>
                        {/* Close Button */}
                        <button
                          onClick={() => setIsOpen(false)}
                          className="p-2 text-white/50 hover:text-white/90 
                                   transition-colors rounded-full
                                   hover:bg-white/5"
                          title="Close chat"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages Area with Custom Scrollbar */}
                  <div 
                    className="absolute top-[72px] bottom-[72px] left-0 right-0 overflow-y-auto p-4 
                               space-y-4 scrollbar-thin scrollbar-thumb-white/10 
                               scrollbar-track-transparent"
                  >
                    {messages.map((msg, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[80%] rounded-lg px-4 py-2 
                                     ${msg.type === 'user' 
                                       ? 'bg-black border border-white/10 text-white' 
                                       : 'bg-white/5 text-white/90'}
                                     shadow-lg backdrop-blur-sm
                                     ${msg.type === 'user' ? 'ml-4' : 'mr-4'}`}
                        >
                          {msg.text}
                        </div>
                      </motion.div>
                    ))}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-2 text-white/50 px-4"
                      >
                        <span className="animate-bounce">●</span>
                        <span className="animate-bounce delay-100">●</span>
                        <span className="animate-bounce delay-200">●</span>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 
                                border-t border-white/10 bg-black/90">
                    <form
                      onSubmit={handleSubmit}
                      className="flex gap-2"
                    >
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-black border border-white/10 rounded-lg 
                                 px-4 py-2 text-white placeholder-white/50 
                                 focus:outline-none focus:border-white/20 
                                 transition-all duration-300"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-4 py-2 bg-black border border-white/10 
                                 rounded-lg text-white hover:border-white/20 
                                 transition-all duration-300"
                      >
                        Send
                      </motion.button>
                    </form>
                  </div>

                  {/* Resize Handles Styling */}
                  <div className="absolute inset-0 pointer-events-none border border-white/5 
                                rounded-2xl opacity-0 hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize 
                                  border-r border-b border-white/10 rounded-br-2xl" />
                  </div>
                </ResizableBox>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Draggable>
    </div>
  );
} 