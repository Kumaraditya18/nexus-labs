'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';
import { User, LogOut, Package, ShieldCheck, ArrowRight, Key } from 'lucide-react';

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { playClick } = useAudioFx();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20 px-4 md:px-8 flex items-center justify-center">
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 max-w-md text-center">
          <ShieldCheck className="w-12 h-12 text-zinc-500 mx-auto" />
          <h2 className="text-2xl font-bold text-white">Authentication Required</h2>
          <p className="text-xs text-zinc-400 font-mono">
            Please sign in to access your NEXUS Passkey profile and active orders.
          </p>
          <Link
            href="/login"
            onClick={playClick}
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
          >
            <span>Sign In to NEXUS ID</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* User Card */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-5">
            <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover border border-white/20 shadow-xl" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/10 text-zinc-300 border border-white/20 uppercase">
                  {user.tier}
                </span>
              </div>
              <div className="text-xs font-mono text-zinc-400">{user.email}</div>
              <div className="text-[10px] font-mono text-zinc-500">Member Since {user.memberSince} • Passkeys Active</div>
            </div>
          </div>

          <div className="flex gap-3">
            {user.role === 'admin' && (
              <Link
                href="/admin"
                onClick={playClick}
                className="px-4 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors cursor-pointer shadow-md"
              >
                Admin Command Center
              </Link>
            )}

            <button
              onClick={() => {
                playClick();
                logout();
              }}
              className="px-4 py-2.5 rounded-xl glass-panel border border-red-500/30 text-red-400 hover:bg-red-500/10 text-xs font-mono transition-colors cursor-pointer flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/orders"
            onClick={playClick}
            className="p-6 rounded-3xl glass-card border border-white/10 space-y-3 hover:border-white/30 transition-all cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Package className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-zinc-200 flex items-center justify-between">
              <span>Orders & Logistics Telemetry</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-zinc-400 font-mono">
              Track live DHL/FedEx shipments, view assembly steps, and download digital invoices.
            </p>
          </Link>

          <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
              <Key className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Passkey Security Telemetry</h3>
            <p className="text-xs text-zinc-400 font-mono">
              FIDO2 Touch ID & WebAuthn biometric security active for your NEXUS ID.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
