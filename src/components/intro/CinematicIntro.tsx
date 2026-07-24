'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, ArrowRight } from 'lucide-react';
import { useAudioFx } from '@/context/AudioContext';

interface CinematicIntroProps {
  onComplete: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState<'black' | 'light' | 'logo' | 'complete'>('black');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { playSynthChord, soundEnabled, setSoundEnabled } = useAudioFx();

  useEffect(() => {
    // Stage progression timelines
    const t1 = setTimeout(() => setStage('light'), 800);
    const t2 = setTimeout(() => {
      setStage('logo');
      playSynthChord();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Interactive Cursor Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles: { x: number; y: number; vx: number; vy: number; radius: number; alpha: number }[] = [];
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Particle attraction to cursor
        const dx = mousePos.x - p.x;
        const dy = mousePos.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          p.x += (dx / dist) * 0.6;
          p.y += (dy / dist) * 0.6;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 240, 255, ${p.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00f0ff';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [mousePos]);

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleEnter = () => {
    playSynthChord();
    setStage('complete');
    setTimeout(() => {
      onComplete();
    }, 800);
  };

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          className="fixed inset-0 z-50 bg-[#030712] flex flex-col items-center justify-center overflow-hidden cursor-crosshair"
        >
          {/* Interactive Particle Canvas */}
          <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

          {/* Dynamic Light Aura following cursor */}
          <div
            className="absolute rounded-full pointer-events-none transition-transform duration-300 ease-out animate-pulse-glow"
            style={{
              width: 500,
              height: 500,
              left: mousePos.x - 250,
              top: mousePos.y - 250,
              background: 'radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(168,85,247,0.08) 50%, transparent 70%)'
            }}
          />

          {/* Glowing Light Beam Formation */}
          {stage !== 'black' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute w-96 h-96 rounded-full bg-cyan-500/20 blur-[100px] pointer-events-none"
            />
          )}

          {/* Brand Logo & Tagline reveal */}
          {stage === 'logo' && (
            <div className="relative z-10 flex flex-col items-center text-center px-4">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-widest uppercase mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Interactive Launch Platform</span>
                </div>

                <h1 className="text-7xl md:text-9xl font-black tracking-tighter text-gradient-cyan uppercase">
                  NEXUS LABS
                </h1>

                <p className="text-lg md:text-2xl text-slate-300 font-light tracking-wide max-w-xl mx-auto">
                  Engineered Beyond Reality.
                </p>

                <div className="pt-8">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleEnter}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-semibold text-sm tracking-wider uppercase transition-all shadow-[0_0_40px_rgba(0,240,255,0.4)] hover:shadow-[0_0_60px_rgba(0,240,255,0.8)]"
                  >
                    <span>Enter Experience</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Top Audio & Skip Controls */}
          <div className="absolute top-8 right-8 z-20 flex items-center gap-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-3 rounded-full glass-panel text-slate-400 hover:text-white transition-colors"
              title="Toggle Audio Feedback"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
            </button>

            <button
              onClick={handleEnter}
              className="px-4 py-2 rounded-full glass-panel text-xs font-mono text-slate-300 hover:text-white uppercase tracking-widest transition-colors"
            >
              Skip Intro
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
