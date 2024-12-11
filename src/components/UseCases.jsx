import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PhoneIcon, CalendarIcon, ChatBubbleLeftRightIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import Vocyth from '../lib/vocyth.js';

export default function UseCases() {
  const [vocyth] = useState(new Vocyth());
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [status, setStatus] = useState('idle');
  
  // Schedule Calls State
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [scheduleText, setScheduleText] = useState('');
  
  // Voice Chat State
  const [showChatModal, setShowChatModal] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');

  // Enhanced Schedule State
  const [scheduleOptions, setScheduleOptions] = useState({
    frequency: 'once', // once, daily, weekly, monthly
    weekdays: [],
    endDate: '',
    priority: 'normal',
    notification: true,
    notificationTime: '30', // minutes before
    participants: [],
    notes: ''
  });

  // Enhanced Voice Chat State
  const [chatHistory, setChatHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [chatMode, setChatMode] = useState('conversation'); // conversation, command, assistant

  useEffect(() => {
    const loadVoices = async () => {
      try {
        await vocyth.init();
        const availableVoices = vocyth.getAvailableVoices();
        setVoices(availableVoices);
        setStatus('ready');
      } catch (err) {
        console.error('Failed to load voices:', err);
        setStatus('error');
      }
    };
    loadVoices();
  }, []);

  // Voice Testing Function
  const handleTestVoice = async () => {
    if (!selectedVoice) return;
    try {
      setStatus('speaking');
      await vocyth.synthesize({
        text: 'Hello! This is a test of the selected voice.',
        voice: selectedVoice,
        speed: 1,
        pitch: 1
      });
      setStatus('ready');
    } catch (err) {
      console.error('Voice test failed:', err);
      setStatus('error');
    }
  };

  // Schedule Functions
  const handleScheduleCall = async () => {
    if (!scheduleDate || !scheduleTime || !scheduleText) return;
    
    const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
    const now = new Date();
    
    if (scheduledDateTime <= now) {
      alert('Please select a future date and time');
      return;
    }

    try {
      setStatus('scheduling');
      // Here you would integrate with your backend
      const scheduleData = {
        date: scheduleDate,
        time: scheduleTime,
        text: scheduleText,
        voice: selectedVoice,
        options: scheduleOptions
      };

      console.log('Scheduling call:', scheduleData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Call scheduled successfully!');
      setShowScheduleModal(false);
      resetScheduleForm();
    } catch (error) {
      console.error('Scheduling failed:', error);
      alert('Failed to schedule call. Please try again.');
    } finally {
      setStatus('ready');
    }
  };

  const resetScheduleForm = () => {
    setScheduleDate('');
    setScheduleTime('');
    setScheduleText('');
    setScheduleOptions({
      frequency: 'once',
      weekdays: [],
      endDate: '',
      priority: 'normal',
      notification: true,
      notificationTime: '30',
      participants: [],
      notes: ''
    });
  };

  // Enhanced Schedule Modal UI
  const ScheduleModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl text-white">Schedule a Call</h3>
          <button 
            onClick={() => setShowScheduleModal(false)}
            className="text-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Date</label>
              <input
                type="date"
                value={scheduleDate}
                onChange={(e) => setScheduleDate(e.target.value)}
                className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm text-white/70 mb-2">Time</label>
              <input
                type="time"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
              />
            </div>
          </div>

          {/* Frequency Options */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Frequency</label>
            <select
              value={scheduleOptions.frequency}
              onChange={(e) => setScheduleOptions({
                ...scheduleOptions,
                frequency: e.target.value
              })}
              className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
            >
              <option value="once">Once</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {/* Weekday Selection - Show only for weekly frequency */}
          {scheduleOptions.frequency === 'weekly' && (
            <div>
              <label className="block text-sm text-white/70 mb-2">Repeat on</label>
              <div className="flex gap-2 flex-wrap">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                  <button
                    key={day}
                    onClick={() => {
                      const weekdays = scheduleOptions.weekdays.includes(index)
                        ? scheduleOptions.weekdays.filter(d => d !== index)
                        : [...scheduleOptions.weekdays, index];
                      setScheduleOptions({...scheduleOptions, weekdays});
                    }}
                    className={`px-3 py-1 rounded-full text-sm ${
                      scheduleOptions.weekdays.includes(index)
                        ? 'bg-purple-500/30 border-purple-500/50'
                        : 'bg-black/30 border-white/10'
                    } border`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* End Date - For recurring schedules */}
          {scheduleOptions.frequency !== 'once' && (
            <div>
              <label className="block text-sm text-white/70 mb-2">End Date (Optional)</label>
              <input
                type="date"
                value={scheduleOptions.endDate}
                onChange={(e) => setScheduleOptions({
                  ...scheduleOptions,
                  endDate: e.target.value
                })}
                className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
              />
            </div>
          )}

          {/* Message */}
          <div>
            <label className="block text-sm text-white/70 mb-2">Message</label>
            <textarea
              value={scheduleText}
              onChange={(e) => setScheduleText(e.target.value)}
              className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
              rows={3}
            />
          </div>

          {/* Additional Options */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-white/70 mb-2">Priority</label>
              <select
                value={scheduleOptions.priority}
                onChange={(e) => setScheduleOptions({
                  ...scheduleOptions,
                  priority: e.target.value
                })}
                className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={scheduleOptions.notification}
                onChange={(e) => setScheduleOptions({
                  ...scheduleOptions,
                  notification: e.target.checked
                })}
                className="rounded border-white/10 bg-black/30"
              />
              <label className="text-sm text-white/70">Send notification</label>
            </div>

            {scheduleOptions.notification && (
              <div>
                <label className="block text-sm text-white/70 mb-2">Notify before</label>
                <select
                  value={scheduleOptions.notificationTime}
                  onChange={(e) => setScheduleOptions({
                    ...scheduleOptions,
                    notificationTime: e.target.value
                  })}
                  className="w-full p-2 bg-black/30 border border-white/10 rounded-lg text-white"
                >
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="1440">1 day</option>
                </select>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleScheduleCall}
              disabled={status === 'scheduling'}
              className="flex-1 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 
                       border border-purple-500/30 rounded-lg text-white text-sm
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'scheduling' ? 'Scheduling...' : 'Schedule Call'}
            </button>
            <button
              onClick={() => setShowScheduleModal(false)}
              className="flex-1 px-4 py-2 bg-black/30 border border-white/10 
                       rounded-lg text-white text-sm hover:bg-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Enhanced Voice Chat Functions
  const startRecording = () => {
    if (!navigator.mediaDevices) {
      alert('Voice recording is not supported in your browser');
      return;
    }

    setIsRecording(true);
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
      setTranscript(transcript);
    };

    recognition.onend = () => {
      if (isRecording) {
        processVoiceInput(transcript);
      }
    };

    recognition.start();
    window.recognition = recognition;
  };

  const stopRecording = () => {
    if (window.recognition) {
      window.recognition.stop();
    }
    setIsRecording(false);
  };

  // Updated AI response generation with Groq
  const generateAIResponse = async (input) => {
    try {
      const GROQ_API_KEY = window.ENV_GROQ_API_KEY;
      if (!GROQ_API_KEY) {
        throw new Error('Groq API key not found');
      }

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-32768',  // or your preferred model
          messages: [
            {
              role: 'system',
              content: 'You are a helpful voice assistant. Keep responses concise and natural, as they will be spoken aloud.'
            },
            {
              role: 'user',
              content: input
            }
          ],
          temperature: 0.7,
          max_tokens: 150  // Keep responses relatively short for voice
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content.trim();
      
    } catch (error) {
      console.error('AI Response Error:', error);
      return "I'm sorry, I'm having trouble processing that right now. Please try again.";
    }
  };

  // Optional: Add context tracking for better conversations
  const [conversationContext, setConversationContext] = useState([]);

  // Enhanced processVoiceInput with context
  const processVoiceInput = async (input) => {
    try {
      setIsProcessing(true);
      
      // Add user message to chat and context
      const userMessage = { type: 'user', text: input };
      setChatHistory(prev => [...prev, userMessage]);
      setConversationContext(prev => [...prev, { role: 'user', content: input }]);

      // Get AI response
      const response = await generateAIResponse(input);
      
      // Add AI response to chat and context
      const aiMessage = { type: 'ai', text: response };
      setChatHistory(prev => [...prev, aiMessage]);
      setConversationContext(prev => [...prev, { role: 'assistant', content: response }]);
      
      // Speak the response if voice is selected
      if (selectedVoice) {
        await vocyth.synthesize({
          text: response,
          voice: selectedVoice,
          speed: 1,
          pitch: 1
        });
      }
    } catch (error) {
      console.error('Failed to process voice input:', error);
      setChatHistory(prev => [...prev, { 
        type: 'error', 
        text: 'Sorry, I had trouble processing that. Please try again.' 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  // Enhanced Voice Chat Modal
  const VoiceChatModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-xl w-full max-w-xl border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl text-white">Voice Chat</h3>
          <button 
            onClick={() => {
              stopRecording();
              setShowChatModal(false);
              setChatHistory([]);
            }}
            className="text-white/50 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Chat History */}
        <div className="h-[400px] overflow-y-auto mb-6 space-y-4 p-4 bg-black/20 rounded-lg">
          {chatHistory.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-purple-500/20 border-purple-500/30'
                    : message.type === 'error'
                    ? 'bg-red-500/20 border-red-500/30'
                    : 'bg-blue-500/20 border-blue-500/30'
                } border`}
              >
                <p className="text-white text-sm">{message.text}</p>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-blue-500/20 border-blue-500/30 border p-3 rounded-lg">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Voice Controls */}
        <div className="space-y-4">
          <div className="flex gap-3">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isProcessing}
              className={`flex-1 px-4 py-2 ${
                isRecording 
                  ? 'bg-red-500/20 hover:bg-red-500/30 border-red-500/30' 
                  : 'bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30'
              } border rounded-lg text-white text-sm disabled:opacity-50`}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            <select
              value={chatMode}
              onChange={(e) => setChatMode(e.target.value)}
              className="px-4 py-2 bg-black/30 border border-white/10 rounded-lg text-white text-sm"
            >
              <option value="conversation">Conversation</option>
              <option value="command">Command Mode</option>
              <option value="assistant">Assistant Mode</option>
            </select>
          </div>

          {/* Current Status */}
          <div className="text-sm text-white/50 text-center">
            {isRecording ? 'Listening...' : isProcessing ? 'Processing...' : 'Ready to listen'}
          </div>
        </div>

        {isProcessing && (
          <div className="absolute bottom-20 left-0 right-0 flex justify-center">
            <div className="bg-purple-500/20 text-white px-4 py-2 rounded-full text-sm">
              AI is thinking...
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // Updated useCases array (without API Access)
  const useCases = [
    {
      icon: <PhoneIcon className="w-6 h-6 text-purple-400" />,
      title: "Choose Voice",
      description: "Select from our range of natural-sounding voices.",
      action: (
        <div className="space-y-3">
          <select
            className="w-full p-3 bg-black/30 border border-white/10 rounded-lg 
                     text-white/80 text-sm focus:border-purple-500/50 
                     focus:ring-2 focus:ring-purple-500/20 transition-all"
            onChange={(e) => setSelectedVoice(e.target.value)}
            value={selectedVoice || ''}
          >
            <option value="">Select a voice...</option>
            {voices.map((voice, index) => (
              <option key={index} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTestVoice}
            disabled={!selectedVoice || status === 'speaking'}
            className="w-full px-4 py-3 bg-gradient-to-r from-purple-500/20 
                     to-blue-500/20 hover:from-purple-500/30 hover:to-blue-500/30
                     border border-purple-500/30 rounded-lg text-white text-sm
                     transition-all duration-300 disabled:opacity-50
                     disabled:cursor-not-allowed"
          >
            {status === 'speaking' ? 'Testing...' : 'Test Voice'}
          </motion.button>
        </div>
      )
    },
    {
      icon: <CalendarIcon className="w-6 h-6 text-emerald-400" />,
      title: "Schedule Calls",
      description: "Set up automated voice calls and reminders.",
      action: (
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowScheduleModal(true)}
          className="w-full px-4 py-3 bg-gradient-to-r from-emerald-500/20 
                   to-teal-500/20 hover:from-emerald-500/30 hover:to-teal-500/30
                   border border-emerald-500/30 rounded-lg text-white text-sm 
                   transition-all duration-300"
        >
          Schedule Now
        </motion.button>
      )
    },
    {
      icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-indigo-400" />,
      title: "Voice Chat",
      description: "Have natural conversations with AI using voice commands.",
      action: (
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowChatModal(true)}
          className="w-full px-4 py-3 bg-gradient-to-r from-blue-500/20 
                   to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30
                   border border-blue-500/30 rounded-lg text-white text-sm 
                   transition-all duration-300"
        >
          Start Chat
        </motion.button>
      )
    }
  ];

  return (
    <section className="relative bg-gradient-to-b from-[#0A0A0A] via-black to-[#0A0A0A] py-32 overflow-hidden">
      {/* Minimalist Background Elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#111111_1px,transparent_1px),linear-gradient(to_bottom,#111111_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
        
        {/* Radial gradient for depth */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-black/50 to-black opacity-40" />
        
        {/* Subtle accent lines */}
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-white/5 via-white/2 to-transparent" />
        <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-white/5 via-white/2 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mb-24"
        >
          <div className="flex flex-col gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-[2px] bg-gradient-to-r from-white/40 to-transparent" />
              <span className="text-white/60 uppercase tracking-wider text-sm font-light">
                Voice Technology
              </span>
            </motion.div>

            <h2 className="text-5xl md:text-6xl font-light tracking-tight">
              Transform Your{' '}
              <span className="bg-gradient-to-r from-white via-white/95 to-white/90 
                           bg-clip-text text-transparent block mt-2">
                Voice Experience
              </span>
            </h2>

            <p className="text-lg md:text-xl text-white/60 leading-relaxed font-light max-w-2xl">
              Explore the possibilities of our advanced voice technology through these 
              practical applications that seamlessly integrate into your workflow.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative p-6 bg-white/[0.03] backdrop-blur-xl 
                       border border-white/[0.05] rounded-2xl overflow-hidden 
                       hover:border-white/10 transition-all duration-500
                       hover:shadow-2xl hover:shadow-purple-500/10"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/[0.07] 
                           to-transparent opacity-0 group-hover:opacity-100 
                           transition-opacity duration-500" />
              
              <div className="relative space-y-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br 
                             from-purple-500/10 to-blue-500/10 
                             border border-white/[0.05] flex items-center 
                             justify-center group-hover:scale-110 
                             transition-transform duration-500">
                  {useCase.icon}
                </div>
                
                <h3 className="text-xl text-white/90 font-light">
                  {useCase.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {useCase.description}
                </p>
                
                <div className="pt-2">
                  {useCase.action}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative blur elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] opacity-20" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] opacity-20" />

      {/* Modals */}
      {showScheduleModal && <ScheduleModal />}
      {showChatModal && <VoiceChatModal />}
    </section>
  );
}