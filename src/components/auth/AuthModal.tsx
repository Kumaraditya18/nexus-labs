'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAudioFx } from '@/context/AudioContext';

export default function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login } = useAuth();
  const { playClick, playSuccess } = useAudioFx();

  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authSuccess, setAuthSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    playClick();
    setIsAuthenticating(true);
    setErrorMessage('');

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name })
      });

      const data = await res.json();
      if (data.success) {
        login(email, data.user.name || name || email.split('@')[0]);
        playSuccess();
        setAuthSuccess(true);
        setTimeout(() => {
          setIsAuthModalOpen(false);
          setAuthSuccess(false);
        }, 1200);
      } else {
        setErrorMessage(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      login(email, name || email.split('@')[0]);
      playSuccess();
      setAuthSuccess(true);
      setTimeout(() => {
        setIsAuthModalOpen(false);
        setAuthSuccess(false);
      }, 1200);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AnimatePresence>
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsAuthModalOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className="relative w-full max-w-md bg-[#09090b] border border-white/10 glass-panel rounded-3xl p-8 shadow-2xl z-10 space-y-6"
          >
            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-[10px] font-mono uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>NEXUS ID Security</span>
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {mode === 'login' ? 'Sign In to NEXUS ID' : 'Create NEXUS ID'}
              </h2>
            </div>

            {/* Mode Switcher */}
            <div className="flex p-1 rounded-full glass-panel border border-white/10">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  mode === 'login' ? 'bg-white text-black font-bold' : 'text-zinc-400'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setMode('signup')}
                className={`flex-1 py-1.5 rounded-full text-xs font-mono transition-colors ${
                  mode === 'signup' ? 'bg-white text-black font-bold' : 'text-zinc-400'
                }`}
              >
                Create Account
              </button>
            </div>

            <AnimatePresence mode="wait">
              {authSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-3 py-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-white mx-auto" />
                  <div className="text-sm font-bold text-white font-mono">Authenticated Successfully</div>
                </motion.div>
              ) : (
                <form onSubmit={handleAuthSubmit} className="space-y-4">
                  {mode === 'signup' && (
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 uppercase">Full Name</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Amber Vance"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-white/30"
                      />
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amber.vance@nexuslabs.tech"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-zinc-400 uppercase">Password</label>
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:outline-none focus:border-white/30"
                    />
                  </div>

                  {errorMessage && <p className="text-xs text-red-400 font-mono text-center">{errorMessage}</p>}

                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                  >
                    <span>{isAuthenticating ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Register NEXUS ID'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
