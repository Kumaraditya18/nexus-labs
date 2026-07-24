'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, Activity, Cpu } from 'lucide-react';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export default function ScrollStorytelling() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const productScale = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [0.85, 1.15, 0.95, 1.1, 1]);
  const productRotateX = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [15, -10, 8, -5, 0]);
  const productRotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-20, 15, -10, 12, 0]);
  const productY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], ['0%', '-5%', '3%', '-2%', '0%']);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.4]);

  const [activeStage, setActiveStage] = useState(1);
  const [selectedMaterial, setSelectedMaterial] = useState('obsidian');
  const [audioFrequency, setAudioFrequency] = useState<number[]>([20, 45, 80, 60, 95, 70, 85, 40, 60, 90, 100, 75]);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { playSuccess, playClick } = useAudioFx();

  const heroProduct = PRODUCTS[0]; // Pulse ANC

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollProgress = -rect.top / (rect.height - window.innerHeight);

      if (scrollProgress < 0.16) setActiveStage(1);
      else if (scrollProgress < 0.33) setActiveStage(2);
      else if (scrollProgress < 0.50) setActiveStage(3);
      else if (scrollProgress < 0.67) setActiveStage(4);
      else if (scrollProgress < 0.84) setActiveStage(5);
      else setActiveStage(6);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (activeStage !== 4) return;
    const interval = setInterval(() => {
      setAudioFrequency(
        Array.from({ length: 16 }, () => Math.floor(Math.random() * 85) + 15)
      );
    }, 120);
    return () => clearInterval(interval);
  }, [activeStage]);

  return (
    <section ref={containerRef} className="relative h-[450vh] bg-[#09090b]">
      {/* Sticky Viewport Stage Container with Minimal Top Padding */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-4 md:px-8 pt-8 md:pt-16">
        
        {/* Dynamic Background Glow Layer */}
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 bg-radial-gradient pointer-events-none"
        />

        {/* STAGE 1: HERO OVERVIEW */}
        {activeStage === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto text-center space-y-3 sm:space-y-6 z-20"
          >
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase">
              NEXUS <span className="text-gradient-subtle">Pulse ANC</span>
            </h1>

            <p className="text-zinc-300 text-xs sm:text-sm md:text-base font-light max-w-2xl mx-auto leading-relaxed">
              Electrostatic beryllium driver wireless audio. Forged aerospace titanium housing. Ultra-low latency spatial telemetry.
            </p>

            {/* Kinetic 3D Product Stage */}
            <motion.div
              style={{
                scale: productScale,
                rotateX: productRotateX,
                rotateY: productRotateY,
                y: productY
              }}
              className="relative mx-auto h-[240px] sm:h-[320px] md:h-[400px] w-full max-w-2xl rounded-3xl overflow-hidden glass-panel border border-white/15 bg-zinc-900/90 shadow-2xl p-4 flex items-center justify-center"
            >
              <img
                src={heroProduct.image}
                alt={heroProduct.name}
                className="w-full h-full object-cover rounded-2xl shadow-2xl"
              />
            </motion.div>

            <div className="pt-2 flex justify-center gap-4">
              <Link
                href={`/products/${heroProduct.id}`}
                onClick={playClick}
                className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
              >
                Inspect Device Spec
              </Link>
            </div>
          </motion.div>
        )}

        {/* STAGE 2: PRECISION ASSEMBLY */}
        {activeStage === 2 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12"
          >
            <div className="space-y-4 md:space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">
                4,000-Ton <span className="text-gradient-subtle">Forged Titanium</span>
              </h2>

              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">
                Each casing is milled from a single block of Grade 5 Aerospace Titanium. Micro-polished to 0.01 micron tolerances for zero acoustic resonance.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 rounded-xl glass-panel border border-white/10">
                  <div className="text-zinc-500 uppercase text-[9px]">Tensile Strength</div>
                  <div className="text-white font-bold text-sm">950 MPa</div>
                </div>
                <div className="p-3 rounded-xl glass-panel border border-white/10">
                  <div className="text-zinc-500 uppercase text-[9px]">Chassis Density</div>
                  <div className="text-white font-bold text-sm">4.43 g/cm³</div>
                </div>
              </div>
            </div>

            <motion.div
              style={{ scale: productScale }}
              className="h-[240px] sm:h-[320px] md:h-[380px] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 bg-zinc-900 shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80"
                alt="Precision Assembly"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 3: TACTILE MATERIAL SCIENCE */}
        {activeStage === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto px-4 md:px-6 text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter">
              Tactile <span className="text-gradient-subtle">Finish Engineering</span>
            </h2>

            <div className="flex justify-center gap-2 sm:gap-4 flex-wrap">
              {['obsidian', 'titanium', 'sapphire'].map((mat) => (
                <button
                  key={mat}
                  onClick={() => {
                    playClick();
                    setSelectedMaterial(mat);
                  }}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer ${
                    selectedMaterial === mat
                      ? 'bg-white text-black font-bold shadow-lg'
                      : 'glass-panel text-zinc-400 border border-white/10 hover:border-white/30'
                  }`}
                >
                  {mat} Finish
                </button>
              ))}
            </div>

            <div className="h-[220px] sm:h-[300px] md:h-[360px] w-full max-w-2xl mx-auto rounded-3xl overflow-hidden glass-panel border border-white/15 bg-zinc-900 shadow-2xl p-2">
              <img
                src={
                  selectedMaterial === 'obsidian'
                    ? 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=80'
                    : selectedMaterial === 'titanium'
                    ? 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=1000&q=80'
                    : 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1000&q=80'
                }
                alt={selectedMaterial}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </motion.div>
        )}

        {/* STAGE 4: ACOUSTIC WAVE SPECTRUM */}
        {activeStage === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto px-4 md:px-6 text-center space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">
              10Hz – 45kHz <span className="text-gradient-subtle">Zero Distortion</span>
            </h2>

            {/* Live Audio Frequency Visualizer */}
            <div className="flex justify-center items-end gap-1.5 md:gap-2 h-24 sm:h-28 p-4 rounded-2xl glass-panel border border-white/10">
              {audioFrequency.map((val, idx) => (
                <div
                  key={idx}
                  style={{ height: `${val}%` }}
                  className="w-3 sm:w-4 bg-white/80 rounded-t transition-all duration-150 shadow-md"
                />
              ))}
            </div>

            <div className="flex justify-center gap-4 sm:gap-8 font-mono text-[10px] sm:text-xs text-zinc-400">
              <div>Sub-Bass: <span className="text-white font-bold">10Hz - 60Hz</span></div>
              <div>Midrange: <span className="text-white font-bold">500Hz - 4kHz</span></div>
              <div>Treble: <span className="text-white font-bold">4kHz - 45kHz</span></div>
            </div>
          </motion.div>
        )}

        {/* STAGE 5: CONFIGURATOR */}
        {activeStage === 5 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12"
          >
            <div className="space-y-4 sm:space-y-6 text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">
                Craft Your <span className="text-gradient-subtle">Specification</span>
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm">
                Select custom finish and optional laser engraving for personalized acoustic ownership.
              </p>
              <div className="space-y-2 pt-1">
                <div className="text-[10px] sm:text-xs font-mono text-zinc-400 uppercase">Available Finishes</div>
                <div className="flex flex-wrap gap-2">
                  {heroProduct.materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => playClick()}
                      className="px-3.5 py-1.5 rounded-xl glass-card border border-white/10 hover:border-white/30 text-xs text-white flex items-center gap-2 cursor-pointer"
                    >
                      <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: mat.colorHex }} />
                      <span>{mat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => {
                  playSuccess();
                  addToCart(heroProduct);
                }}
                className="w-full py-3.5 rounded-2xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
              >
                Add Configured Device ({formatPrice(heroProduct.price)})
              </button>
            </div>

            <motion.div
              style={{ scale: productScale }}
              className="h-[220px] sm:h-[300px] md:h-[380px] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 bg-zinc-900 shadow-2xl"
            >
              <img src={heroProduct.image} alt={heroProduct.name} className="w-full h-full object-cover" />
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 6: UNIFIED ECOSYSTEM */}
        {activeStage === 6 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-6xl mx-auto px-4 md:px-6 text-center space-y-6 md:space-y-8"
          >
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter">
              One Unified <span className="text-gradient-subtle">Design System</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {PRODUCTS.slice(0, 4).map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.id}`}
                  onClick={playClick}
                  className="p-4 sm:p-5 rounded-2xl glass-card text-left space-y-2 sm:space-y-3 border border-white/10 hover:border-white/30 transition-all group cursor-pointer"
                >
                  <img src={prod.image} alt={prod.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl object-cover border border-white/10" />
                  <h4 className="font-bold text-white text-xs sm:text-sm group-hover:text-zinc-300 transition-colors line-clamp-1">{prod.name}</h4>
                  <div className="text-[10px] sm:text-xs font-mono text-zinc-300 font-bold">{formatPrice(prod.price)}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
