'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAudioFx } from '@/context/AudioContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { playSuccess } = useAudioFx();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playSuccess();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="border-t border-white/10 bg-[#09090b] pt-20 pb-12 px-6 max-w-7xl mx-auto text-zinc-400 text-xs font-mono space-y-16">
      {/* Top Grid: Newsletter Registry + Global Support Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/10 pb-16">
        {/* Left Column: Brand Identity & Private Drop Registry */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs shadow-xl tracking-tighter">
              NX
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white uppercase">NEXUS LABS</span>
              <span className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase">Quantum Hardware Architecture</span>
            </div>
          </div>

          <p className="text-zinc-400 text-sm font-sans font-light leading-relaxed max-w-md">
            Pioneering electrostatic beryllium acoustic membranes and unibody titanium computing platforms. Join the private drop registry for priority hardware allocations.
          </p>

          {/* Newsletter Registry */}
          <div className="max-w-md space-y-2">
            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-mono text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Priority Allocation Registered. Welcome to NEXUS Registry.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email for private drop registry..."
                  className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono text-xs"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-xl bg-white text-black font-semibold uppercase hover:bg-zinc-200 transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Global Flagship Concierge Telemetry */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-xs font-mono uppercase tracking-widest text-white font-bold">
            Global Flagship Concierge & Technical Support
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-300 font-mono">
            <div className="space-y-2 p-4 rounded-2xl glass-card border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold">
                <MapPin className="w-4 h-4 text-zinc-400" />
                <span>Flagship Design Lab</span>
              </div>
              <p className="text-zinc-400 leading-relaxed">
                100 Silicon Way, Suite 400<br />
                San Francisco, CA 94107
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl glass-card border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold">
                <Phone className="w-4 h-4 text-zinc-400" />
                <span>Direct Support Line</span>
              </div>
              <p className="text-zinc-400">
                +1 (800) 555-NEXUS<br />
                <span className="text-[10px] text-zinc-500">24/7 Priority Support</span>
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl glass-card border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold">
                <Mail className="w-4 h-4 text-zinc-400" />
                <span>Concierge Email</span>
              </div>
              <p className="text-zinc-400">
                concierge@nexuslabs.tech<br />
                press@nexuslabs.tech
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl glass-card border border-white/5">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck className="w-4 h-4 text-zinc-400" />
                <span>Compliance & Warranty</span>
              </div>
              <p className="text-zinc-400">
                ISO 9001 Certified<br />
                2-Year Global Warranty
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Links */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-zinc-500">
        <div>© 2026 NEXUS LABS Technologies Inc. Quantum Hardware Architecture.</div>

        <div className="flex flex-wrap gap-6 uppercase tracking-wider">
          <Link href="/products" className="hover:text-white transition-colors cursor-pointer">Products</Link>
          <Link href="/workspace-builder" className="hover:text-white transition-colors cursor-pointer">AI Workspace</Link>
          <Link href="/compare" className="hover:text-white transition-colors cursor-pointer">Compare</Link>
          <Link href="/account" className="hover:text-white transition-colors cursor-pointer">Account</Link>
          <Link href="/login" className="hover:text-white transition-colors cursor-pointer">Sign In</Link>
        </div>
      </div>
    </footer>
  );
}
