'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Globe,
  BarChart2,
  Sparkles,
  Sliders,
  Layers,
  LogOut,
  Package
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { useCurrency, Currency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

interface NavbarProps {
  onOpenSearch?: () => void;
}

export default function Navbar({ onOpenSearch }: NavbarProps) {
  const { cart, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, logout } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const { playClick } = useAudioFx();

  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'JPY'];
  const isAdminUser = user?.role === 'admin' || user?.email?.toLowerCase() === 'kumaraditya1814@gmail.com';
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        {/* Brand Emblem Logo */}
        <Link href="/" onClick={playClick} className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shadow-xl group-hover:scale-105 transition-transform tracking-tighter">
            NX
          </div>
          <div className="flex flex-col">
            <span className="text-base font-black tracking-tight text-white uppercase font-sans">
              NEXUS LABS
            </span>
            <span className="text-[9px] font-mono text-zinc-400 tracking-widest uppercase">
              Quantum Hardware Architecture
            </span>
          </div>
        </Link>

        {/* Primary Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 text-xs font-mono tracking-wider uppercase text-zinc-400">
          <Link href="/products" onClick={playClick} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
            <Layers className="w-3.5 h-3.5 text-zinc-400" />
            <span>Ecosystem</span>
          </Link>

          <Link href="/workspace-builder" onClick={playClick} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
            <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
            <span>AI Workspace</span>
          </Link>

          <Link href="/compare" onClick={playClick} className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer">
            <Sliders className="w-3.5 h-3.5 text-zinc-400" />
            <span>Compare</span>
          </Link>

          {/* Admin Dashboard Link for Primary Admin */}
          {isAdminUser && (
            <Link href="/admin" onClick={playClick} className="px-3.5 py-1.5 rounded-full bg-white text-black font-bold flex items-center gap-1.5 cursor-pointer shadow-md">
              <BarChart2 className="w-3.5 h-3.5 text-black" />
              <span>Admin Center</span>
            </Link>
          )}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Natural Language Search Trigger */}
          <button
            onClick={() => {
              playClick();
              onOpenSearch?.();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-white/20 text-zinc-400 hover:text-white text-xs font-mono transition-all cursor-pointer"
            title="Search Products with AI (Cmd + K)"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search...</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-zinc-400 hover:text-white transition-all cursor-pointer"
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

          {/* Saved Wishlist Link */}
          <Link
            href="/wishlist"
            onClick={playClick}
            className="p-2.5 rounded-full glass-panel border border-white/10 hover:border-white/30 text-zinc-400 hover:text-white transition-colors relative cursor-pointer"
            title="Wishlist"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black font-mono text-[9px] font-bold flex items-center justify-center shadow-md">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger */}
          <button
            onClick={() => {
              playClick();
              setIsCartOpen(true);
            }}
            className="p-2.5 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors relative cursor-pointer shadow-lg"
            title="View Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-black text-white font-mono text-[9px] font-bold flex items-center justify-center">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* User Account / Admin Account Dropdown */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel border border-white/10 hover:border-white/30 transition-all cursor-pointer"
              >
                <img src={user.avatar} alt={user.name} className="w-6 h-6 rounded-full object-cover border border-white/20" />
                <span className="text-xs font-mono text-white font-bold hidden sm:inline">{user.name.split(' ')[0]}</span>
              </button>

              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 py-2 rounded-2xl glass-panel border border-white/10 shadow-2xl z-50 space-y-1 font-mono text-xs overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-white/10">
                      <div className="font-bold text-white truncate">{user.name}</div>
                      <div className="text-[10px] text-zinc-400 truncate">{user.email}</div>
                    </div>

                    <Link
                      href="/account"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Account Profile</span>
                    </Link>

                    <Link
                      href="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-zinc-300 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      <Package className="w-3.5 h-3.5 text-zinc-400" />
                      <span>Track Orders</span>
                    </Link>

                    {isAdminUser && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-white font-bold hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <BarChart2 className="w-3.5 h-3.5 text-white" />
                        <span>Admin Dashboard</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer border-t border-white/10"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={playClick}
              className="px-4 py-2 rounded-full glass-panel border border-white/10 hover:border-white/30 text-xs font-mono text-white transition-all cursor-pointer"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
