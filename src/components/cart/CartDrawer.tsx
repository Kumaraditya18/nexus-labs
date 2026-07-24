'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Tag, Sparkles } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

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
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="absolute inset-y-0 right-0 max-w-full flex pl-10"
          >
            <div className="w-screen max-w-md bg-[#09090b] border-l border-white/10 glass-panel flex flex-col shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-white tracking-wide">Your Cart</h2>
                    <p className="text-xs text-zinc-400 font-mono">{cart.length} unique items</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Progress Indicator */}
              <div className="px-6 py-3 bg-white/5 border-b border-white/5 space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-white font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" /> Free Express Global Shipping Unlocked!
                      </span>
                    ) : (
                      `Add ${formatPrice(freeShippingThreshold - subtotal)} for Free Express Shipping`
                    )}
                  </span>
                  <span className="text-zinc-400">{Math.round(shippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-500"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-4 text-zinc-500">
                    <ShoppingBag className="w-12 h-12 mx-auto text-zinc-600 animate-bounce" />
                    <p className="font-mono text-sm">Your shopping bag is currently empty.</p>
                  </div>
                ) : (
                  cart.map((item) => {
                    const material = item.product.materials.find((m) => m.id === item.selectedMaterialId);
                    return (
                      <div
                        key={`${item.product.id}-${item.selectedMaterialId}`}
                        className="p-4 rounded-2xl glass-card border border-white/10 flex items-center justify-between gap-4"
                      >
                        <div className="flex items-center gap-4">
                          <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0 shadow-lg" />

                          <div>
                            <h4 className="text-sm font-bold text-white">{item.product.name}</h4>
                            {material && (
                              <div className="text-xs text-zinc-400 font-mono flex items-center gap-1 mt-0.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full border border-white/30"
                                  style={{ backgroundColor: material.colorHex }}
                                />
                                <span>{material.name}</span>
                              </div>
                            )}
                            <div className="text-xs font-mono text-white font-bold mt-1">
                              {formatPrice(item.product.price)}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end gap-2">
                          <button
                            onClick={() => removeFromCart(item.product.id, item.selectedMaterialId)}
                            className="text-zinc-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                          <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedMaterialId, -1)}
                              className="text-zinc-400 hover:text-white"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-mono font-bold text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.selectedMaterialId, 1)}
                              className="text-zinc-400 hover:text-white"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Coupon Code Section */}
              {cart.length > 0 && (
                <div className="px-6 py-3 border-t border-white/10 bg-white/5">
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/10 border border-white/20 text-white text-xs font-mono">
                      <div className="flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-zinc-300" />
                        <span>Coupon {appliedCoupon} applied</span>
                      </div>
                      <button onClick={removeCoupon} className="text-zinc-400 hover:text-white">
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Coupon code (e.g. NEXUS10)"
                        className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition-colors"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {couponError && (
                    <p className="text-[10px] text-red-400 font-mono mt-1">Invalid promo code. Try NEXUS10 or LAUNCH2026.</p>
                  )}
                </div>
              )}

              {/* Summary & Checkout Footer */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-white/10 glass-panel space-y-4">
                  <div className="space-y-1.5 text-xs font-mono text-zinc-300">
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
                      <span>Shipping</span>
                      <span>{subtotal >= freeShippingThreshold ? 'FREE' : formatPrice(25)}</span>
                    </div>
                    <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold text-white">
                      <span>Total</span>
                      <span className="text-white font-mono">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={() => {
                      playClick();
                      setIsCartOpen(false);
                    }}
                    className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all shadow-lg"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
