'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Sparkles, Lock } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';
import { useAuth } from '@/context/AuthContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    total,
    appliedCoupon,
    applyCoupon,
    removeCoupon
  } = useCart();

  const { user } = useAuth();
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState(false);
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();

  const freeShippingThreshold = 500;
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    const success = applyCoupon(couponCode);
    if (success) {
      playSuccess();
      setCouponError(false);
      setCouponCode('');
    } else {
      setCouponError(true);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#09090b] border-l border-white/10 glass-panel shadow-2xl flex flex-col justify-between"
            >
              {/* Drawer Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-white" />
                  <h2 className="text-lg font-bold text-white tracking-tight">Your Cart</h2>
                  {user && cart.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px]">
                      {cart.reduce((a, b) => a + b.quantity, 0)} items
                    </span>
                  )}
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Content */}
              {!user ? (
                /* AUTHENTICATION REQUIRED STATE */
                <div className="p-8 text-center space-y-6 my-auto">
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
                    <Lock className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Authentication Required</div>
                    <h3 className="text-2xl font-bold text-white">Sign In to View Cart</h3>
                    <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                      Please sign in to your NEXUS ID to manage your active hardware cart and proceed to express checkout.
                    </p>
                  </div>
                  <Link
                    href="/login?redirect=/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                  >
                    <span>Sign In to NEXUS ID</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : cart.length === 0 ? (
                /* EMPTY CART STATE */
                <div className="p-8 text-center space-y-4 my-auto">
                  <ShoppingBag className="w-12 h-12 text-zinc-600 mx-auto animate-pulse" />
                  <h3 className="text-lg font-bold text-white">Your Cart is Empty</h3>
                  <p className="text-xs text-zinc-400 font-mono max-w-xs mx-auto">
                    Explore reference devices from our ecosystem and add them to your cart.
                  </p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-full glass-panel border border-white/10 text-xs font-mono text-white hover:border-white/30 transition-colors cursor-pointer"
                  >
                    Browse Hardware
                  </button>
                </div>
              ) : (
                /* ACTIVE CART LIST */
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Free Shipping Progress Indicator */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                    <div className="flex justify-between text-xs font-mono text-zinc-300">
                      <span>
                        {subtotal >= freeShippingThreshold ? (
                          <span className="text-white font-bold flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Free Global Express Shipping Unlocked!
                          </span>
                        ) : (
                          `Add ${formatPrice(freeShippingThreshold - subtotal)} more for Free Shipping`
                        )}
                      </span>
                      <span>{Math.round(shippingProgress)}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        style={{ width: `${shippingProgress}%` }}
                        className="h-full bg-white transition-all duration-300"
                      />
                    </div>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={`${item.product.id}-${item.selectedMaterialId}`}
                      className="p-4 rounded-2xl glass-card border border-white/10 flex gap-4 items-center justify-between group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                          <h4 className="font-bold text-white text-sm line-clamp-1">{item.product.name}</h4>
                          <div className="text-xs font-mono text-zinc-400 font-bold">
                            {formatPrice(item.product.price)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        {/* Quantity Buttons */}
                        <div className="flex items-center rounded-xl bg-white/5 border border-white/10 p-1">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedMaterialId, item.quantity - 1)}
                            className="p-1 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2.5 font-mono text-xs font-bold text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.selectedMaterialId, item.quantity + 1)}
                            className="p-1 hover:bg-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedMaterialId)}
                          className="p-2 text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Drawer Footer (Summary & Checkout) */}
              {user && cart.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4 bg-[#09090b]/80">
                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-3.5 h-3.5 text-zinc-500 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo Code (NEXUS10)"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none uppercase"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl glass-panel border border-white/10 text-xs font-mono text-white hover:border-white/30 transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>

                  {couponError && (
                    <p className="text-[10px] text-red-400 font-mono">Invalid promo code. Try &ldquo;NEXUS10&rdquo;</p>
                  )}

                  {appliedCoupon && (
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-400 bg-emerald-500/10 p-2 rounded-xl border border-emerald-500/20">
                      <span>Promo Coupon Applied ({appliedCoupon})</span>
                      <button onClick={removeCoupon} className="hover:underline text-[10px]">Remove</button>
                    </div>
                  )}

                  {/* Summary Totals */}
                  <div className="space-y-2 text-xs font-mono text-zinc-300">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-white font-bold">
                        <span>Discount</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Global Express Shipping</span>
                      <span>{subtotal >= freeShippingThreshold ? 'FREE' : formatPrice(25)}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                      <span>Total Due</span>
                      <span className="text-white text-base">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Express Checkout Trigger */}
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  >
                    <span>Proceed to Express Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
