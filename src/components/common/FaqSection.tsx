'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useAudioFx } from '@/context/AudioContext';

export interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'What makes electrostatic beryllium drivers superior to titanium or aluminum?',
    a: 'Beryllium has 4x the stiffness of titanium and 2.5x the speed of sound propagation compared to aluminum. This eliminates high-frequency breakup distortion and delivers zero-phase acoustic transient response across the entire 10Hz–45kHz spectrum.'
  },
  {
    q: 'How does the NEXUS 2-Year Global Hardware Warranty operate?',
    a: 'Every NEXUS reference device includes a 2-year international hardware warranty covering internal component failure, battery performance degradation beyond 80%, and acoustic driver calibration. Complimentary global courier pick-up is included.'
  },
  {
    q: 'What are the estimated delivery timeframes for global express shipping?',
    a: 'All orders are dispatched via DHL Express Priority or FedEx Priority Global within 24 hours of sub-assembly inspection. North American and European deliveries arrive within 2–3 business days.'
  },
  {
    q: 'How does the AI Workspace Curator calculate hardware bundle discounts?',
    a: 'Our algorithmic curator analyzes component synergy across computing, monitors, mechanical keyboards, and reference audio. When assembling a complete persona workspace, an automated 15% to 20% bundle discount is applied at checkout.'
  },
  {
    q: 'What is the return policy for unboxed or configured devices?',
    a: 'We offer a 30-day risk-free trial on all NEXUS products. If you are not completely satisfied with your hardware, return the device in original packaging for a 100% full refund with complimentary return shipping.'
  }
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const { playClick } = useAudioFx();

  const toggleFaq = (idx: number) => {
    playClick();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-24 px-4 md:px-8 max-w-5xl mx-auto space-y-10 border-t border-white/10">
      {/* Header Block Matching Site Standards */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
          <HelpCircle className="w-3.5 h-3.5 text-zinc-400" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
          Everything You Need to Know
        </h2>
        <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
          Common queries regarding electrostatic audio engineering, global warranty telemetry, shipping, and returns.
        </p>
      </div>

      {/* Accordion Cards Stack */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-3xl border transition-all overflow-hidden ${
                isOpen
                  ? 'glass-panel border-white/30 shadow-2xl'
                  : 'glass-card border-white/10 hover:border-white/20'
              }`}
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-6 font-bold text-white text-base md:text-lg cursor-pointer transition-colors"
              >
                <span className="tracking-tight">{faq.q}</span>
                <div className={`p-2 rounded-full border transition-all shrink-0 ${
                  isOpen ? 'bg-white text-black border-white' : 'bg-white/5 border-white/10 text-zinc-400'
                }`}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-6 pb-6 text-sm text-zinc-300 font-light leading-relaxed border-t border-white/10 pt-4"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
