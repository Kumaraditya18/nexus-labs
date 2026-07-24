'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  Search,
  Globe,
  Menu,
  X,
  Cpu,
  BarChart2,
  Sliders,
  User,
  LogIn
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useCurrency, Currency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { currency, setCurrency } = useCurrency();
  const { playClick } = useAudioFx();
  const { user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY'];

  return (
    <>
      {/* Top Gradient Fade Overlay */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#09090b] via-[#09090b]/90 to-transparent pointer-events-none z-30" />

      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4">
        <nav className="max-w-7xl mx-auto rounded-full bg-[#121215]/95 border border-white/10 px-6 py-3 flex items-center justify-between shadow-2xl backdrop-blur-2xl">
          {/* Brand Logo */}
          <Link
            href="/"
            onClick={playClick}
            className="flex items-center gap-3 group"
          >
            <div className="w-7 h-7 rounded-xl bg-white text-black flex items-center justify-center font-bold text-xs group-hover:scale-105 transition-transform tracking-tighter">
              NX
            </div>
            <span className="text-lg font-bold tracking-tight text-white uppercase group-hover:text-zinc-300 transition-colors">
              NEXUS LABS
            </span>
          </Link>

          {/* Navigation Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-widest uppercase text-zinc-400">
            <Link href="/products" onClick={playClick} className="hover:text-white transition-colors cursor-pointer">
              Ecosystem
            </Link>
            <Link href="/workspace-builder" onClick={playClick} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
              <Cpu className="w-3.5 h-3.5 text-zinc-400" />
              <span>AI Workspace</span>
            </Link>
            <Link href="/compare" onClick={playClick} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
              <Sliders className="w-3.5 h-3.5 text-zinc-400" />
              <span>Compare</span>
            </Link>
            <Link href="/orders" onClick={playClick} className="hover:text-white transition-colors cursor-pointer">
              Track Order
            </Link>

            {/* Admin Route Hidden Without Admin Login */}
            {user?.role === 'admin' && (
              <Link href="/admin" onClick={playClick} className="hover:text-white transition-colors flex items-center gap-1 text-white font-bold cursor-pointer">
                <BarChart2 className="w-3.5 h-3.5 text-white" />
                <span>Admin</span>
              </Link>
            )}
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {/* Natural Language Search Trigger */}
            <button
              onClick={() => {
                playClick();
                onOpenSearch?.();
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white text-xs font-mono transition-all cursor-pointer"
              title="Search Products with AI (Cmd + K)"
            >
              <Search className="w-3.5 h-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Search...</span>
            </button>

            {/* Currency Switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span>{currency}</span>
              </button>
              <AnimatePresence>
                {currencyDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-24 py-1 rounded-xl glass-panel border border-white/10 shadow-2xl z-50 overflow-hidden"
                  >
                    {currencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c);
                          setCurrencyDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs font-mono transition-colors cursor-pointer ${
                          currency === c ? 'text-white bg-white/10 font-bold' : 'text-zinc-400 hover:bg-white/5'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Login / User Account Navbar Button */}
            {user ? (
              <Link
                href="/account"
                onClick={playClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-xs font-mono hover:bg-white/20 transition-colors cursor-pointer"
                title="Profile"
              >
                <User className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={playClick}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 text-xs font-mono transition-colors cursor-pointer"
                title="Sign In to NEXUS ID"
              >
                <LogIn className="w-3.5 h-3.5 text-white" />
                <span>Sign In</span>
              </Link>
            )}

            {/* Wishlist Link */}
            <Link
              href="/wishlist"
              onClick={playClick}
              className="relative p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black text-[9px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Floating Cart Drawer Trigger */}
            <button
              onClick={() => {
                playClick();
                setIsCartOpen(true);
              }}
              className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-black font-semibold text-xs transition-all hover:bg-zinc-200 cursor-pointer shadow-md"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline font-mono">Cart</span>
              {totalItemsCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-black text-white text-[9px] font-mono flex items-center justify-center font-bold">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-400 hover:text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </nav>
      </header>
    </>
  );
}
