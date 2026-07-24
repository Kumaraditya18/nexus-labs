'use client';

import React from 'react';
import Link from 'next/link';
import { PRODUCTS } from '@/data/products';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface SimilarProductsProps {
  currentProductId: string;
  category: string;
}

export default function SimilarProducts({ currentProductId, category }: SimilarProductsProps) {
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();
  const { addToCart } = useCart();

  const similar = PRODUCTS.filter((p) => p.id !== currentProductId && (p.category === category || true)).slice(0, 3);

  return (
    <div className="space-y-6 pt-12 border-t border-white/10">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest font-bold">Recommended Hardware</div>
          <h3 className="text-2xl font-bold text-white">Similar Reference Devices</h3>
        </div>

        <Link
          href="/products"
          onClick={playClick}
          className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1 uppercase tracking-wider cursor-pointer font-bold"
        >
          <span>View All</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {similar.map((prod) => (
          <Link
            key={prod.id}
            href={`/products/${prod.id}`}
            onClick={playClick}
            className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col justify-between space-y-4 group hover:border-white/30 transition-all cursor-pointer"
          >
            <div className="space-y-3">
              <div className="w-full h-48 rounded-2xl overflow-hidden relative bg-zinc-900 border border-white/10 shadow-lg">
                <img src={prod.image} alt={prod.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute bottom-3 left-3 z-20 px-3 py-1 rounded-full bg-[#09090b]/90 border border-white/20 text-white font-mono text-[10px] uppercase font-bold tracking-wider shadow-lg backdrop-blur-md">
                  {prod.category}
                </div>
              </div>
              <div>
                <h4 className="font-bold text-white text-base group-hover:text-zinc-200 transition-colors flex items-center justify-between">
                  <span>{prod.name}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
                </h4>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <div className="text-sm font-bold font-mono text-white">{formatPrice(prod.price)}</div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  playSuccess();
                  addToCart(prod);
                }}
                className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
