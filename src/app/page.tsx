'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, Sliders, ShoppingBag, ChevronRight } from 'lucide-react';
import Footer from '@/components/navigation/Footer';
import ScrollStorytelling from '@/components/storytelling/ScrollStorytelling';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export default function HomePage() {
  const router = useRouter();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { playSuccess, playClick } = useAudioFx();
  const [activeMaterialTab, setActiveMaterialTab] = useState<'titanium' | 'beryllium' | 'carbon' | 'sapphire'>('titanium');

  const pressQuotes = [
    { source: 'WIRED', quote: 'NEXUS has accomplished what legacy audio giants took decades to master.' },
    { source: 'The Verge', quote: 'The Pulse ANC looks and sounds like it was transported straight from 2035.' },
    { source: 'MKBHD', quote: 'Unbelievable build quality. The titanium and beryllium combination is unmatched.' }
  ];

  const materialDetails = {
    titanium: {
      name: 'Aerospace Grade 5 Titanium',
      desc: 'Forged under 4,000 tons of hydraulic pressure. High strength-to-weight ratio ensuring extreme structural durability.',
      image: 'https://images.unsplash.com/photo-1535223289827-42f1e9919769?auto=format&fit=crop&w=800&q=80'
    },
    beryllium: {
      name: 'Electrostatic Beryllium Foil',
      desc: '4x stiffer than titanium and 2.5x lighter than aluminum, eliminating high-frequency phase distortion.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
    },
    carbon: {
      name: 'Woven Carbon Fiber Chassis',
      desc: 'High-modulus carbon fiber weave dampening structural micro-vibrations for absolute acoustic isolation.',
      image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
    },
    sapphire: {
      name: 'Sapphire Crystal Touch Surface',
      desc: '9 Mohs hardness scratch-resistant transparent optical glass supporting pressure-sensitive gesture control.',
      image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80'
    }
  };

  return (
    <main className="min-h-screen bg-[#09090b] text-white">
      {/* 1. GTA VI STYLE KINETIC SCROLL STORYTELLING HERO */}
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="pt-0"
      >
        <ScrollStorytelling />
      </motion.div>

      {/* 2. PRESS RECOGNITION TICKER */}
      <section className="border-y border-white/10 bg-white/[0.02] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pressQuotes.map((pq, i) => (
            <div key={i} className="space-y-2 text-left">
              <div className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-widest">{pq.source}</div>
              <p className="text-xs text-zinc-300 italic leading-relaxed">&ldquo;{pq.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ECOSYSTEM PRODUCT SHOWCASE GRID */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>Hardware Ecosystem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
              Featured <span className="text-gradient-subtle">Reference Devices</span>
            </h2>
          </div>

          <Link
            href="/products"
            onClick={playClick}
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider cursor-pointer"
          >
            <span>View All 14 Devices</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.slice(0, 6).map((product) => (
            <div
              key={product.id}
              onClick={() => {
                playClick();
                router.push(`/products/${product.id}`);
              }}
              className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col justify-between space-y-6 group hover:border-white/20 transition-all cursor-pointer"
            >
              <div className="space-y-4">
                <div className="w-full h-64 rounded-2xl overflow-hidden relative bg-zinc-900 border border-white/10 shadow-xl">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* High Contrast Category Overlay Tag */}
                  <div className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full bg-[#09090b]/90 border border-white/20 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-lg backdrop-blur-md">
                    {product.category}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center justify-between">
                    <span>{product.name}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">{product.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Price</div>
                  <div className="text-lg font-black font-mono text-white">{formatPrice(product.price)}</div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playSuccess();
                    addToCart(product);
                  }}
                  className="px-5 py-3 rounded-2xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MATERIAL SCIENCE GALLERY */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/10 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
            <Sliders className="w-3.5 h-3.5 text-zinc-400" />
            <span>Tactile Material Science</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter">
            Pure <span className="text-gradient-subtle">Material Mastery</span>
          </h2>
        </div>

        {/* Material Selector Tabs */}
        <div className="flex justify-center gap-2.5 flex-wrap">
          {(['titanium', 'beryllium', 'carbon', 'sapphire'] as const).map((matKey) => (
            <button
              key={matKey}
              onClick={() => {
                playClick();
                setActiveMaterialTab(matKey);
              }}
              className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all border cursor-pointer ${
                activeMaterialTab === matKey
                  ? 'bg-white text-black font-bold border-white shadow-lg'
                  : 'glass-panel text-zinc-400 border-white/10 hover:border-white/20'
              }`}
            >
              {matKey}
            </button>
          ))}
        </div>

        {/* Selected Material Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 rounded-3xl glass-panel border border-white/10">
          <div className="space-y-4">
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Material Specification</span>
            <h3 className="text-2xl font-bold text-white">{materialDetails[activeMaterialTab].name}</h3>
            <p className="text-zinc-300 text-sm leading-relaxed">{materialDetails[activeMaterialTab].desc}</p>
          </div>

          <div className="h-64 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-xl">
            <img
              src={materialDetails[activeMaterialTab].image}
              alt={materialDetails[activeMaterialTab].name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. LUXURY FOOTER */}
      <Footer />
    </main>
  );
}
