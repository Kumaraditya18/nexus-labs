'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export interface PersonaSetup {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  recommendedProductIds: string[];
  discountPercent: number;
}

const PERSONAS: PersonaSetup[] = [
  {
    id: 'developer',
    title: 'Software Engineer',
    subtitle: 'High throughput coding, dual 4K monitors, magnetic hall switches & long battery life.',
    icon: 'Code',
    recommendedProductIds: ['book-pro', 'vision-monitor', 'glyph-keyboard', 'drift-mouse'],
    discountPercent: 15
  },
  {
    id: 'designer',
    title: 'UI/UX & 3D Artist',
    subtitle: 'Color precision QD-OLED display, tandem OLED creator tablet, reference spatial headphones.',
    icon: 'Palette',
    recommendedProductIds: ['vision-monitor', 'slate-tablet', 'horizon-overear', 'magmat-desk'],
    discountPercent: 15
  },
  {
    id: 'music-producer',
    title: 'Music Producer & Audio Engineer',
    subtitle: '50mm Planar magnetic reference headphones, 11.1.4 Atmos soundbar & flux dock.',
    icon: 'Music',
    recommendedProductIds: ['horizon-overear', 'apex-speakers', 'flux-dock', 'pulse-anc'],
    discountPercent: 20
  },
  {
    id: 'executive',
    title: 'Executive & Traveller',
    subtitle: 'Ultra-light bio-metric smart ring, titanium watch, transparent phone & noise cancelling earbuds.',
    icon: 'Briefcase',
    recommendedProductIds: ['chrono-ring', 'chrono-watch', 'phone-one', 'pulse-anc'],
    discountPercent: 15
  }
];

export default function AIWorkspaceBuilder() {
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>('developer');
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();

  const currentPersona = PERSONAS.find((p) => p.id === selectedPersonaId) || PERSONAS[0];

  const recommendedProducts = currentPersona.recommendedProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const rawSubtotal = recommendedProducts.reduce((acc, p) => acc + p.price, 0);
  const bundleDiscount = rawSubtotal * (currentPersona.discountPercent / 100);
  const bundleTotal = rawSubtotal - bundleDiscount;

  const handleAddBundleToCart = () => {
    playSuccess();
    recommendedProducts.forEach((p) => {
      addToCart(p);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
          <span>AI Algorithmic Curator</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          NEXUS AI Workspace Builder
        </h1>

        <p className="text-zinc-400 text-sm font-light">
          Select your professional discipline. Our AI neural engine automatically calculates optimal acoustic, computing, and ergonomic synergy.
        </p>
      </div>

      {/* Persona Selection Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PERSONAS.map((persona) => {
          const active = persona.id === selectedPersonaId;
          return (
            <motion.div
              key={persona.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                playClick();
                setSelectedPersonaId(persona.id);
              }}
              className={`p-6 rounded-2xl glass-card cursor-pointer border transition-all space-y-3 ${
                active
                  ? 'border-white bg-white/10 shadow-lg'
                  : 'border-white/10 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-200 font-bold uppercase tracking-wider">
                  {persona.title}
                </span>
                {active && (
                  <div className="w-5 h-5 rounded-full bg-white text-black flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </div>
              <p className="text-xs text-zinc-400 leading-snug">{persona.subtitle}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Recommended Ecosystem Bundle Display */}
      <div className="p-8 rounded-3xl glass-panel-glow border border-white/10 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Recommended Setup</span>
            <h2 className="text-2xl font-bold text-white">{currentPersona.title} Architecture</h2>
          </div>
          <div className="text-right">
            <div className="text-xs font-mono text-zinc-500 line-through">{formatPrice(rawSubtotal)}</div>
            <div className="text-3xl font-bold text-white font-mono">
              {formatPrice(bundleTotal)}{' '}
              <span className="text-xs font-mono text-zinc-300 font-semibold px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                Save {currentPersona.discountPercent}% Bundle
              </span>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((prod) => (
            <div key={prod.id} className="p-4 rounded-2xl glass-card border border-white/10 space-y-3">
              <div className="w-full h-32 rounded-xl overflow-hidden bg-zinc-900 border border-white/5 shadow-lg">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">{prod.name}</h4>
                <div className="text-xs text-zinc-400">{prod.category}</div>
                <div className="text-xs font-mono text-white font-bold mt-1">{formatPrice(prod.price)}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Complete Setup Button */}
        <div className="pt-4 flex justify-end">
          <button
            onClick={handleAddBundleToCart}
            className="w-full md:w-auto px-8 py-4 rounded-2xl bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg"
          >
            <span>Add Complete {currentPersona.title} Workspace Setup ({formatPrice(bundleTotal)})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
