'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

interface AIProductSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AIProductSearchModal({ isOpen, onClose }: AIProductSearchModalProps) {
  const [query, setQuery] = useState('');
  const { formatPrice } = useCurrency();
  const { playClick } = useAudioFx();

  const filteredProducts: Product[] = !query.trim()
    ? PRODUCTS.slice(0, 5)
    : PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      );

  // Handle ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Spotlight Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#09090b] border border-white/10 glass-panel rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col"
          >
            {/* Input Bar */}
            <div className="p-4 border-b border-white/10 flex items-center gap-3">
              <Search className="w-5 h-5 text-zinc-400 shrink-0 ml-2" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products by name, category, or spec..."
                className="flex-1 bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none font-mono"
              />
              <span className="text-[10px] font-mono px-2 py-1 rounded bg-white/5 border border-white/10 text-zinc-400">
                ESC to close
              </span>
              <button
                onClick={onClose}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-4 space-y-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest px-3 py-1">
                {query ? `Search Results (${filteredProducts.length})` : 'Popular Devices'}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-xs font-mono text-zinc-500">
                  No matching devices found in ecosystem database.
                </div>
              ) : (
                filteredProducts.map((prod) => (
                  <Link
                    key={prod.id}
                    href={`/products/${prod.id}`}
                    onClick={() => {
                      playClick();
                      onClose();
                    }}
                    className="p-3 rounded-2xl glass-card border border-white/5 hover:border-white/20 flex items-center justify-between gap-4 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                      <div>
                        <div className="font-bold text-white text-xs group-hover:text-zinc-200 transition-colors">
                          {prod.name}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">{prod.category}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-white">{formatPrice(prod.price)}</span>
                      <span className="p-2 rounded-xl bg-white/5 text-zinc-400 group-hover:text-white transition-colors">
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
