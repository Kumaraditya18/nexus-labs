'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Heart, Share2, Bell, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { PRODUCTS, Product } from '@/data/products';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();
  const [priceAlerts, setPriceAlerts] = useState<Record<string, boolean>>({});

  const favoritedProducts = wishlist
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const handleShare = () => {
    playClick();
    navigator.clipboard.writeText(window.location.href);
    alert('Public wishlist link copied to clipboard!');
  };

  const toggleAlert = (id: string) => {
    playClick();
    setPriceAlerts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20">
      <div className="max-w-6xl mx-auto space-y-8 px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest mb-2">
              <Heart className="w-3.5 h-3.5 text-zinc-400" />
              <span>Curated Collections</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Your Saved Ecosystem
            </h1>
          </div>

          {favoritedProducts.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Share Collection</span>
              </button>
              <button
                onClick={clearWishlist}
                className="px-4 py-2 rounded-full glass-panel border border-red-500/30 text-xs font-mono text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Grid */}
        {favoritedProducts.length === 0 ? (
          <div className="text-center py-24 rounded-3xl glass-panel border border-white/10 space-y-4 max-w-lg mx-auto">
            <Heart className="w-12 h-12 text-zinc-600 mx-auto animate-pulse" />
            <h3 className="text-lg font-bold text-white">No items saved yet</h3>
            <p className="text-xs text-zinc-400 font-mono">
              Explore the NEXUS ecosystem and click the heart icon on any device to curate your setup.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors cursor-pointer"
            >
              <span>Browse Ecosystem</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritedProducts.map((product) => (
              <div
                key={product.id}
                className="p-6 rounded-3xl glass-card border border-white/10 space-y-4 flex flex-col justify-between group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="w-full h-44 rounded-2xl overflow-hidden relative bg-zinc-900 border border-white/5 shadow-lg">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:text-red-400 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div>
                    <div className="text-xs font-mono text-zinc-400">{product.category}</div>
                    <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">{product.description}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-white font-bold text-base">{formatPrice(product.price)}</span>
                    <button
                      onClick={() => toggleAlert(product.id)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] transition-colors cursor-pointer ${
                        priceAlerts[product.id]
                          ? 'bg-white text-black font-bold'
                          : 'bg-white/5 text-zinc-400 hover:text-white'
                      }`}
                    >
                      <Bell className="w-3 h-3" />
                      <span>{priceAlerts[product.id] ? 'Alert Set' : 'Price Alert'}</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      playSuccess();
                      addToCart(product);
                    }}
                    className="w-full py-3 rounded-xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
