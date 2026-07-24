'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, User, RefreshCw, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

interface NexusAssistantProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProductIds?: string[];
  timestamp: string;
}

export default function NexusAssistant({ isOpen, onClose }: NexusAssistantProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Greetings. I am the NEXUS AI Concierge. Ask me anything about our beryllium drivers, titanium architecture, order telemetry, or custom workspace matching.',
      recommendedProductIds: ['pulse-anc', 'vision-oled-32'],
      timestamp: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    playClick();
    const userMsgText = input.trim();
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = "NEXUS reference devices feature sub-millimeter titanium engineering and electrostatic beryllium acoustic membranes for zero-distortion performance.";
      let recs: string[] | undefined = undefined;

      const lower = userMsgText.toLowerCase();

      if (lower.includes('headphone') || lower.includes('audio') || lower.includes('anc') || lower.includes('sound')) {
        replyText = "For spatial audio mastery, I strongly recommend the NEXUS Pulse ANC. It features 11mm Electrostatic Beryllium drivers and -48dB Neural Noise Cancellation 3.0.";
        recs = ['pulse-anc', 'horizon-overear'];
      } else if (lower.includes('monitor') || lower.includes('display') || lower.includes('screen') || lower.includes('vision')) {
        replyText = "Our flagship display is the NEXUS Vision 32\" 4K OLED, engineered with a 240Hz refresh rate, 0.03ms response time, and 99.3% DCI-P3 color accuracy.";
        recs = ['vision-oled-32'];
      } else if (lower.includes('keyboard') || lower.includes('key') || lower.includes('type')) {
        replyText = "The NEXUS Keystone Mechanical Keyboard is CNC-machined from Grade 5 titanium, housing hot-swappable hall-effect magnetic switches.";
        recs = ['keystone-mechanical'];
      } else if (lower.includes('laptop') || lower.includes('book') || lower.includes('computer')) {
        replyText = "The NEXUS Book Pro 16 is powered by the M4 Max chip in a natural titanium unibody, delivering 128GB unified memory for heavy rendering.";
        recs = ['book-pro-16'];
      } else if (lower.includes('ship') || lower.includes('track') || lower.includes('order') || lower.includes('delivery')) {
        replyText = "All NEXUS orders are dispatched via DHL Express Priority or FedEx Priority Global within 24 hours of assembly verification.";
      }

      setIsTyping(false);
      playSuccess();
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: replyText,
          recommendedProductIds: recs,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-[#09090b] border-l border-white/10 glass-panel shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">NEXUS AI Concierge</h3>
                  <div className="text-[10px] font-mono text-zinc-400">Quantum Telemetry Online</div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.sender === 'ai' && (
                    <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center shrink-0 mt-1">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div className={`space-y-3 max-w-[80%] ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    <div
                      className={`p-3.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-white text-black font-semibold'
                          : 'glass-card border border-white/10 text-zinc-200'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {msg.recommendedProductIds && msg.recommendedProductIds.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">
                          Recommended Hardware:
                        </div>
                        {msg.recommendedProductIds.map((pid) => {
                          const prod = PRODUCTS.find((p) => p.id === pid);
                          if (!prod) return null;
                          return (
                            <div
                              key={prod.id}
                              className="p-2.5 rounded-xl glass-panel border border-white/10 flex items-center justify-between gap-3 text-left"
                            >
                              <div className="flex items-center gap-2">
                                <img src={prod.image} alt={prod.name} className="w-8 h-8 rounded-lg object-cover border border-white/10" />
                                <div>
                                  <div className="font-bold text-white text-[11px]">{prod.name}</div>
                                  <div className="text-[9px] text-zinc-400">{formatPrice(prod.price)}</div>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  playSuccess();
                                  addToCart(prod);
                                }}
                                className="p-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 transition-colors"
                                title="Add to Cart"
                              >
                                <ShoppingBag className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    <div className="text-[9px] text-zinc-500">{msg.timestamp}</div>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center shrink-0 mt-1">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3 items-center text-zinc-400">
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-zinc-400" />
                    <span>Analyzing hardware parameters...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-4 border-t border-white/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about beryllium drivers, monitors..."
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-white/30"
              />
              <button
                type="submit"
                className="p-3 rounded-xl bg-white text-black hover:bg-zinc-200 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
