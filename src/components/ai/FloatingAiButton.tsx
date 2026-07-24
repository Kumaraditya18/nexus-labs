'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import NexusAssistant from './AetherAssistant';
import { useAudioFx } from '@/context/AudioContext';

export default function FloatingAiButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cycleShowText, setCycleShowText] = useState(false);
  const [cycleRotating, setCycleRotating] = useState(true);
  const { playClick } = useAudioFx();

  // Animation cycle:
  // 1. Rotate 360deg twice (6s)
  // 2. Stop rotation, show text "Ask anything from NEXUS AI" for 2 seconds
  // 3. Hide text, resume rotation
  useEffect(() => {
    let isMounted = true;

    const runCycle = async () => {
      while (isMounted) {
        setCycleRotating(true);
        setCycleShowText(false);
        await new Promise((r) => setTimeout(r, 6000)); // 2 rotations = 6 seconds

        if (!isMounted) break;
        setCycleRotating(false);
        setCycleShowText(true);
        await new Promise((r) => setTimeout(r, 2000)); // Show text 2 seconds
      }
    };

    runCycle();

    return () => {
      isMounted = false;
    };
  }, []);

  const isRotating = isHovered ? false : cycleRotating;
  const showText = isHovered ? true : cycleShowText;

  return (
    <>
      {/* Floating AI Concierge Button at Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            playClick();
            setIsOpen(true);
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center gap-3 px-4 py-3 rounded-full bg-[#121215] border border-white/20 glass-panel-glow shadow-2xl cursor-pointer group hover:border-white/40 transition-colors"
          title="Ask anything from NEXUS AI"
        >
          {/* Animated Sparkles Icon */}
          <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-white text-black">
            <motion.div
              animate={isRotating ? { rotate: 360 } : { rotate: 0 }}
              transition={
                isRotating
                  ? { repeat: Infinity, duration: 3, ease: 'linear' }
                  : { duration: 0.3 }
              }
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          </div>

          {/* Text Label: "Ask anything from NEXUS AI" */}
          <AnimatePresence>
            {showText && (
              <motion.span
                initial={{ opacity: 0, width: 0, x: -5 }}
                animate={{ opacity: 1, width: 'auto', x: 0 }}
                exit={{ opacity: 0, width: 0, x: -5 }}
                transition={{ duration: 0.25 }}
                className="text-xs font-mono font-bold text-white whitespace-nowrap overflow-hidden tracking-wider uppercase"
              >
                Ask anything from NEXUS AI
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Concierge Assistant Drawer */}
      <NexusAssistant isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
