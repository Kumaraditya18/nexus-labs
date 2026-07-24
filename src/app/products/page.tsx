'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import Footer from '@/components/navigation/Footer';
import FaqSection from '@/components/common/FaqSection';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export default function ProductsPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 md:pt-36">
      <div className="max-w-7xl mx-auto space-y-12 px-4 md:px-8 pb-24">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>The Complete Ecosystem</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
            Engineered Beyond Reality
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed">
            Explore NEXUS reference devices forged from aerospace titanium, electrostatic beryllium, and quantum dot OLED arrays.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex justify-center gap-2.5 flex-wrap">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setSelectedCategory(cat);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all border cursor-pointer ${
                  active
                    ? 'bg-white text-black font-bold border-white shadow-lg'
                    : 'glass-panel text-zinc-400 border-white/10 hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const isLiked = wishlist.includes(product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  playClick();
                  router.push(`/products/${product.id}`);
                }}
                className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col justify-between space-y-6 relative group cursor-pointer"
              >
                {/* High-Contrast Flagship Tag */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-[#09090b]/90 border border-white/30 text-white font-mono text-[10px] uppercase font-bold tracking-widest shadow-xl backdrop-blur-md">
                    {product.badge}
                  </div>
                )}

                {/* Like Heart Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    playClick();
                    toggleWishlist(product.id);
                  }}
                  className={`absolute top-4 right-4 z-20 p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                    isLiked
                      ? 'bg-white text-black border-white shadow-lg'
                      : 'bg-[#09090b]/80 text-zinc-400 border-white/15 hover:text-white hover:border-white/40'
                  }`}
                  title="Wishlist"
                >
                  <Heart className="w-4 h-4" />
                </button>

                {/* Card Image Container with High-Contrast Category Tag */}
                <div className="w-full h-64 rounded-2xl overflow-hidden relative bg-zinc-900 shadow-xl group-hover:scale-[1.02] transition-transform border border-white/10">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                  
                  {/* Category Tag Overlay */}
                  <div className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full bg-[#09090b]/90 border border-white/20 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-lg backdrop-blur-md">
                    {product.category}
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-zinc-200 transition-colors flex items-center justify-between">
                    <span>{product.name}</span>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                  </h3>
                  <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Price</div>
                    <div className="text-xl font-bold font-mono text-white">
                      {formatPrice(product.price)}
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playSuccess();
                      addToCart(product);
                    }}
                    className="px-5 py-3 rounded-2xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <FaqSection />

      {/* Official Footer */}
      <Footer />
    </div>
  );
}
