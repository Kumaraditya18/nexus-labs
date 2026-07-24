'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sliders, Sparkles, Check, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export default function AIComparisonEngine() {
  const { formatPrice } = useCurrency();
  const { playClick } = useAudioFx();

  const [prodAId, setProdAId] = useState<string>('pulse-anc');
  const [prodBId, setProdBId] = useState<string>('horizon-overear');
  const [aiVerdict, setAiVerdict] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const prodA = PRODUCTS.find((p) => p.id === prodAId) || PRODUCTS[0];
  const prodB = PRODUCTS.find((p) => p.id === prodBId) || PRODUCTS[1];

  const handleGenerateVerdict = () => {
    playClick();
    setIsAnalyzing(true);
    setAiVerdict(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      setAiVerdict(
        `AI Specification Analysis: The ${prodA.name} excels in acoustic portability with -48dB Neural ANC 3.0, making it ideal for high-frequency travel. In contrast, the ${prodB.name} offers open-back acoustic soundstages for studio mastering. Select ${prodA.name} for active noise cancellation or ${prodB.name} for uncompressed reference fidelity.`
      );
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-10">
      {/* Title */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
          <Sliders className="w-3.5 h-3.5 text-zinc-400" />
          <span>Spec Comparison Matrix</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
          Compare NEXUS Devices
        </h1>
        <p className="text-zinc-400 text-sm font-light leading-relaxed">
          Side-by-side engineering comparison evaluated by our Neural AI Telemetry Engine.
        </p>
      </div>

      {/* Selectors Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-3xl glass-panel border border-white/10 shadow-xl">
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 uppercase">Device A</label>
          <select
            value={prodAId}
            onChange={(e) => setProdAId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white/30 cursor-pointer"
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400 uppercase">Device B</label>
          <select
            value={prodBId}
            onChange={(e) => setProdBId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-mono text-xs focus:outline-none focus:border-white/30 cursor-pointer"
          >
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.id} className="bg-zinc-900 text-white">
                {p.name} ({p.category})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Device A */}
        <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-6">
          <div className="w-full h-52 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-xl">
            <img src={prodA.image} alt={prodA.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-zinc-400 uppercase">{prodA.category}</div>
            <h3 className="text-2xl font-bold text-white">{prodA.name}</h3>
            <div className="text-xl font-bold font-mono text-white pt-1">{formatPrice(prodA.price)}</div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
            {Object.entries(prodA.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between p-2.5 rounded-lg bg-white/5">
                <span className="text-zinc-400">{k}</span>
                <span className="text-white font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Device B */}
        <div className="p-8 rounded-3xl glass-card border border-white/10 space-y-6">
          <div className="w-full h-52 rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shadow-xl">
            <img src={prodB.image} alt={prodB.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-1">
            <div className="text-xs font-mono text-zinc-400 uppercase">{prodB.category}</div>
            <h3 className="text-2xl font-bold text-white">{prodB.name}</h3>
            <div className="text-xl font-bold font-mono text-white pt-1">{formatPrice(prodB.price)}</div>
          </div>

          <div className="space-y-3 pt-4 border-t border-white/10 font-mono text-xs">
            {Object.entries(prodB.specs).map(([k, v]) => (
              <div key={k} className="flex justify-between p-2.5 rounded-lg bg-white/5">
                <span className="text-zinc-400">{k}</span>
                <span className="text-white font-bold">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Telemetry Verdict Button & Summary */}
      <div className="text-center space-y-6 pt-4">
        <button
          onClick={handleGenerateVerdict}
          disabled={isAnalyzing}
          className="px-8 py-4 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all inline-flex items-center gap-2 cursor-pointer shadow-xl"
        >
          <Sparkles className="w-4 h-4" />
          <span>{isAnalyzing ? 'Evaluating Telemetry...' : 'Generate AI Verdict'}</span>
        </button>

        {aiVerdict && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl glass-panel-glow border border-white/20 max-w-3xl mx-auto text-left space-y-2 font-mono text-xs text-zinc-300"
          >
            <div className="font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>NEXUS AI Telemetry Synthesis</span>
            </div>
            <p className="leading-relaxed">{aiVerdict}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
