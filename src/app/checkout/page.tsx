'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Lock, ArrowRight, CheckCircle2, Mail, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export default function CheckoutPage() {
  const { cart, total, clearCart, discountAmount, subtotal } = useCart();
  const { formatPrice } = useCurrency();
  const { playSuccess, playClick } = useAudioFx();

  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    email: 'amber.vance@nexuslabs.tech',
    firstName: 'Amber',
    lastName: 'Vance',
    address: '100 Silicon Way, Suite 400',
    city: 'San Francisco',
    state: 'CA',
    zip: '94107',
    cardNumber: '4242 4242 4242 4242',
    expDate: '12/28',
    cvv: '888'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState('');

  const fillStripeTestCard = () => {
    playClick();
    setFormData((prev) => ({
      ...prev,
      cardNumber: '4242 4242 4242 4242',
      expDate: '12/28',
      cvv: '888'
    }));
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const newOrderId = `ATH-${Math.floor(100000 + Math.random() * 900000)}`;
      setPlacedOrderId(newOrderId);
      setStep('success');
      playSuccess();

      confetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#a1a1aa', '#71717a']
      });

      clearCart();
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          {step === 'details' ? (
            <motion.div
              key="checkout-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
                    <Lock className="w-3.5 h-3.5 text-zinc-400" />
                    <span>256-Bit Encrypted Express Checkout</span>
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-white">
                    Complete Your Order
                  </h1>
                </div>

                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                      <Mail className="w-4 h-4 text-zinc-400" /> 1. Contact Information
                    </h3>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Email Address for Digital Invoice"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                    />
                  </div>

                  <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                    <h3 className="text-sm font-bold font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-zinc-400" /> 2. Shipping Address
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder="First Name"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        placeholder="Last Name"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street Address"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                    />
                    <div className="grid grid-cols-3 gap-3">
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="City"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        placeholder="State"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                        placeholder="Zip Code"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold font-mono text-zinc-300 uppercase tracking-wider flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-zinc-400" /> 3. Payment Method (Stripe)
                      </h3>
                      <button
                        type="button"
                        onClick={fillStripeTestCard}
                        className="text-[10px] font-mono px-2.5 py-1 rounded bg-white/10 hover:bg-white/20 text-zinc-300 transition-colors cursor-pointer"
                      >
                        Auto-Fill Test Card
                      </button>
                    </div>

                    <input
                      type="text"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                      placeholder="Card Number"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        required
                        value={formData.expDate}
                        onChange={(e) => setFormData({ ...formData, expDate: e.target.value })}
                        placeholder="MM/YY"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        value={formData.cvv}
                        onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                        placeholder="CVV"
                        className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isProcessing || cart.length === 0}
                    className="w-full py-5 rounded-2xl bg-white text-black font-semibold text-sm tracking-wider uppercase hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2 font-mono">
                        Authorizing Stripe Token...
                      </span>
                    ) : (
                      <>
                        <span>Pay {formatPrice(total)} & Authorize Delivery</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Right Column */}
              <div className="lg:col-span-5 space-y-6">
                <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-6 sticky top-36">
                  <h3 className="text-base font-bold text-white tracking-wide border-b border-white/10 pb-3">
                    Order Summary ({cart.length} items)
                  </h3>

                  <div className="max-h-64 overflow-y-auto space-y-3">
                    {cart.map((item) => (
                      <div key={`${item.product.id}-${item.selectedMaterialId}`} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.product.image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                          <div>
                            <div className="font-bold text-white">{item.product.name}</div>
                            <div className="text-zinc-400 font-mono">Qty: {item.quantity}</div>
                          </div>
                        </div>
                        <div className="font-mono text-white font-bold">
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-white/10 space-y-2 text-xs font-mono text-zinc-300">
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
                      <span>Express Global Shipping</span>
                      <span>FREE</span>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between text-base font-bold text-white">
                      <span>Total Due</span>
                      <span className="text-white">{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="order-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center space-y-6 py-12"
            >
              <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Order Confirmed</div>
                <h1 className="text-4xl font-bold text-white">Thank You for Choosing NEXUS</h1>
                <p className="text-zinc-400 text-sm font-mono">Order ID: <span className="text-white font-bold">{placedOrderId}</span></p>
              </div>

              <div className="p-6 rounded-3xl glass-panel border border-white/10 text-left text-xs font-mono space-y-2 text-zinc-300">
                <div className="flex justify-between">
                  <span>Shipping Address:</span>
                  <span className="text-white">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmation Email:</span>
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>Carrier:</span>
                  <span className="text-white font-bold">DHL Express Priority (2-3 Business Days)</span>
                </div>
              </div>

              <div className="pt-4 flex gap-4 justify-center">
                <Link
                  href="/orders"
                  className="px-6 py-3 rounded-full bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
                >
                  Track Order Timeline
                </Link>
                <Link
                  href="/products"
                  className="px-6 py-3 rounded-full glass-panel border border-white/10 text-xs font-mono text-white hover:border-white/30 transition-colors cursor-pointer"
                >
                  Return to Ecosystem
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
