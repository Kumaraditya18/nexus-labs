'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, Layers, Sliders, Zap, ArrowRight, Cpu, Activity } from 'lucide-react';
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

  const materialsList = [
    { id: 'titanium', name: 'Aerospace Grade 5 Titanium', desc: '4x strength-to-weight ratio of standard steel.', color: '#94a3b8' },
    { id: 'beryllium', name: 'Electrostatic Beryllium', desc: 'Sub-micron acoustic membrane with zero breakup distortion.', color: '#e2e8f0' },
    { id: 'carbon', name: 'Woven Carbon Fiber', desc: 'Ultra-rigid dampening chassis eliminating acoustic resonance.', color: '#1e293b' },
    { id: 'sapphire', name: 'Sapphire Crystal Glass', desc: '9 Mohs hardness transparent touch surface.', color: '#ffffff' }
  ];

  const stageTitles = ['Acoustics', 'Assembly', 'Materials', 'Spectrum', 'Customizer', 'Ecosystem'];

  return (
    <section ref={containerRef} className="relative min-h-[500vh] bg-[#09090b]">
      <motion.div
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-zinc-950/80 to-[#09090b]"
        style={{ opacity: bgOpacity }}
      />

      {/* Sticky Fullscreen Stage Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        {/* Side Indicator Pill */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col gap-3 glass-panel p-3 rounded-full border border-white/10">
          {[1, 2, 3, 4, 5, 6].map((stage, idx) => (
            <button
              key={stage}
              onClick={() => setActiveStage(stage)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                activeStage === stage ? 'bg-white scale-125' : 'bg-white/20 hover:bg-white/50'
              }`}
              title={stageTitles[idx]}
            />
          ))}
        </div>

        {/* STAGE 1: ACOUSTIC ARCHITECTURE */}
        {activeStage === 1 && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
          >
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                <span>Iconic Acoustic Architecture</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                NEXUS <span className="text-gradient-subtle">Pulse ANC</span>
              </h2>
              <p className="text-zinc-300 text-lg font-light leading-relaxed">
                Sculpted from translucent sapphire polycarbonate and electrostatic beryllium drivers. Delivering reference spatial audio that adapts to your ear canal in real time.
              </p>
              <div className="flex items-center gap-4 pt-4">
                <button
                  onClick={() => {
                    playSuccess();
                    addToCart(heroProduct);
                  }}
                  className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center gap-2 cursor-pointer shadow-xl"
                >
                  <span>Pre-Order {formatPrice(heroProduct.price)}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <motion.div
              style={{
                scale: productScale,
                rotateX: productRotateX,
                rotateY: productRotateY,
                y: productY
              }}
              className="h-[450px] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 relative bg-zinc-900 shadow-2xl group"
            >
              <img src={heroProduct.image} alt={heroProduct.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-white/10 uppercase">
                Kinetic Frame Telemetry
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* STAGE 2: PRECISION ASSEMBLY */}
        {activeStage === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-12"
          >
            <motion.div
              style={{ scale: productScale, rotateY: productRotateY }}
              className="h-[450px] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 relative bg-zinc-900 shadow-2xl"
            >
              <img src={heroProduct.image} alt={heroProduct.name} className="w-full h-full object-cover" />
            </motion.div>

            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
                <Layers className="w-3.5 h-3.5 text-zinc-400" />
                <span>Precision Assembly Matrix</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
                Sub-Millimeter <span className="text-gradient-subtle">Precision Engine</span>
              </h2>
              <p className="text-zinc-300 text-base font-light">
                Micro-engineered layers display the A1 Neural DSP processing unit, dual neodymium ring magnet geometry, and electrostatic beryllium membrane assembly.
              </p>
              <div className="grid grid-cols-2 gap-4 font-mono text-xs text-zinc-300 pt-2">
                <div className="p-3.5 rounded-2xl glass-card">
                  <div className="text-white font-bold text-lg">48,000 Hz</div>
                  <div>Neural Sampling Rate</div>
                </div>
                <div className="p-3.5 rounded-2xl glass-card">
                  <div className="text-white font-bold text-lg">-48 dB</div>
                  <div>Active Noise Cancellation</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STAGE 3: MATERIAL SCIENCE */}
        {activeStage === 3 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-5xl mx-auto px-6 text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span>Tactile Material Science</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Pure <span className="text-gradient-subtle">Material Mastery</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {materialsList.map((m) => (
                <div
                  key={m.id}
                  onClick={() => setSelectedMaterial(m.id)}
                  className={`p-6 rounded-2xl glass-card text-left cursor-pointer transition-all border ${
                    selectedMaterial === m.id ? 'border-white bg-white/10' : 'border-white/10'
                  }`}
                >
                  <div className="w-8 h-8 rounded-full mb-4 border border-white/20" style={{ backgroundColor: m.color }} />
                  <h4 className="font-bold text-white text-sm mb-1">{m.name}</h4>
                  <p className="text-xs text-zinc-400 leading-snug">{m.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STAGE 4: WAVE SPECTRUM */}
        {activeStage === 4 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-4xl mx-auto px-6 text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
              <Activity className="w-3.5 h-3.5 text-zinc-400" />
              <span>Acoustic Wave Spectrum</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              Infinite <span className="text-gradient-subtle">Acoustic Clarity</span>
            </h2>

            <div className="p-8 rounded-3xl glass-panel border border-white/10 flex items-end justify-center gap-3 h-48 shadow-2xl">
              {audioFrequency.map((h, i) => (
                <div
                  key={i}
                  className="w-4 rounded-full bg-gradient-to-t from-zinc-600 to-white transition-all duration-150"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            <div className="flex justify-center gap-8 font-mono text-xs text-zinc-400">
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
            className="w-full max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12"
          >
            <div className="space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
                <Zap className="w-3.5 h-3.5 text-zinc-400" />
                <span>Custom Hardware Configurator</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                Craft Your <span className="text-gradient-subtle">Specification</span>
              </h2>
              <p className="text-zinc-300 text-sm">
                Select custom finish and optional laser engraving for personalized acoustic ownership.
              </p>
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono text-zinc-400 uppercase">Available Finishes</div>
                <div className="flex gap-3">
                  {heroProduct.materials.map((mat) => (
                    <button
                      key={mat.id}
                      onClick={() => playClick()}
                      className="px-4 py-2 rounded-xl glass-card border border-white/10 hover:border-white/30 text-xs text-white flex items-center gap-2 cursor-pointer"
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
                className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
              >
                Add Configured Device to Cart ({formatPrice(heroProduct.price)})
              </button>
            </div>

            <motion.div
              style={{ scale: productScale }}
              className="h-[380px] w-full rounded-3xl overflow-hidden glass-panel border border-white/10 bg-zinc-900 shadow-2xl"
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
            className="w-full max-w-6xl mx-auto px-6 text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>Unified Hardware Ecosystem</span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
              One Unified <span className="text-gradient-subtle">Design System</span>
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {PRODUCTS.slice(0, 4).map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.id}`}
                  onClick={playClick}
                  className="p-5 rounded-2xl glass-card text-left space-y-3 border border-white/10 hover:border-white/30 transition-all group cursor-pointer"
                >
                  <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                  <h4 className="font-bold text-white text-sm group-hover:text-zinc-300 transition-colors">{prod.name}</h4>
                  <div className="text-xs font-mono text-zinc-300 font-bold">{formatPrice(prod.price)}</div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
