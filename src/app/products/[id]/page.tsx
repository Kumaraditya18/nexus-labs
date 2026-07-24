'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, Heart, ShoppingBag, ArrowLeft, Sparkles } from 'lucide-react';
import Footer from '@/components/navigation/Footer';
import SimilarProducts from '@/components/products/SimilarProducts';
import { PRODUCTS } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

interface ProductDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  const [selectedMaterialId, setSelectedMaterialId] = useState(product.materials[0]?.id || 'default');
  const [showAiReviewSummary, setShowAiReviewSummary] = useState(false);

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();

  const isLiked = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36">
      <div className="max-w-7xl mx-auto space-y-12 px-4 md:px-8 pb-20">
        {/* Back Link */}
        <Link
          href="/products"
          onClick={playClick}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ecosystem Catalog</span>
        </Link>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 h-[500px] rounded-3xl glass-panel border border-white/10 relative overflow-hidden shadow-2xl bg-zinc-900 group">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-zinc-300 font-mono text-[10px] uppercase border border-white/10">
              Studio Photography Showcase
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-white/10 text-zinc-300 border border-white/20 uppercase">
                  {product.category}
                </span>
                <button
                  onClick={() => {
                    playClick();
                    toggleWishlist(product.id);
                  }}
                  className={`p-2.5 rounded-full border transition-colors cursor-pointer ${
                    isLiked ? 'bg-white text-black border-white' : 'glass-panel text-zinc-400 hover:text-white'
                  }`}
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                {product.name}
              </h1>
              <p className="text-zinc-300 text-sm leading-relaxed">{product.description}</p>
            </div>

            {product.materials.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                  Select Finish Material
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map((mat) => {
                    const active = mat.id === selectedMaterialId;
                    return (
                      <button
                        key={mat.id}
                        onClick={() => {
                          playClick();
                          setSelectedMaterialId(mat.id);
                        }}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                          active
                            ? 'bg-white text-black font-bold border-white shadow-lg'
                            : 'glass-card text-zinc-300 border-white/10'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: mat.colorHex }} />
                        <span>{mat.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase">Unit Price</div>
                  <div className="text-3xl font-bold font-mono text-white">
                    {formatPrice(product.price)}
                  </div>
                </div>
                <div className="text-xs font-mono text-zinc-300 font-bold px-3 py-1 rounded-full bg-white/10 border border-white/20">
                  {product.stockStatus}
                </div>
              </div>

              <button
                onClick={() => {
                  playSuccess();
                  addToCart(product, selectedMaterialId, 1);
                }}
                className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-sm tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add {product.name} to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* Engineering Specifications Matrix */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6">
          <h3 className="text-xl font-bold font-mono text-white uppercase tracking-wider">
            Engineering Specifications
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="p-4 rounded-2xl glass-card border border-white/5 space-y-1">
                <div className="text-xs font-mono text-zinc-400 font-bold">{key}</div>
                <div className="text-sm font-semibold text-white">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Similar Products Recommendation */}
        <SimilarProducts currentProductId={product.id} category={product.category} />

        {/* Reviews List */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <span>Verified Buyer Reviews ({product.reviewsCount})</span>
                <span className="text-zinc-300 text-sm font-mono flex items-center gap-1">
                  <Star className="w-4 h-4 fill-white text-white" /> {product.rating} / 5.0
                </span>
              </h3>
            </div>

            <button
              onClick={() => setShowAiReviewSummary(!showAiReviewSummary)}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono uppercase hover:bg-white/20 transition-colors cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-zinc-300" />
              <span>{showAiReviewSummary ? 'Hide AI Review Summary' : 'Summarize Reviews with AI'}</span>
            </button>
          </div>

          {showAiReviewSummary && (
            <div className="p-5 rounded-2xl glass-panel-glow border border-white/20 text-xs font-mono text-zinc-300 space-y-2">
              <div className="font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-zinc-300" /> AI Review Synthesis ({product.reviewsCount} customer opinions)
              </div>
              <p className="leading-relaxed">
                Customers consistently praise the zero-latency spatial audio, industrial unibody build, and exceptional comfort during multi-hour listening sessions. 98% of buyers recommend this device.
              </p>
            </div>
          )}

          <div className="space-y-4">
            {product.reviews.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl glass-card border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={rev.avatar} alt={rev.author} className="w-9 h-9 rounded-full object-cover border border-white/20" />
                    <div>
                      <div className="font-bold text-white text-xs flex items-center gap-2">
                        <span>{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/20">
                            Verified Buyer
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-zinc-400 font-mono">{rev.date}</div>
                    </div>
                  </div>

                  <div className="flex gap-1 text-white text-xs">
                    {Array.from({ length: rev.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-white" />
                    ))}
                  </div>
                </div>

                <div className="font-bold text-white text-xs">{rev.title}</div>
                <p className="text-xs text-zinc-300 leading-relaxed">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Official Footer */}
      <Footer />
    </div>
  );
}
