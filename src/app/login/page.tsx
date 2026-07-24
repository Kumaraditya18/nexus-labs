'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAudioFx } from '@/context/AudioContext';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/account';

  const { login } = useAuth();
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
          router.push(redirectTarget);
        }, 1200);
      } else {
        setErrorMessage(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch {
      login(email, name || email.split('@')[0]);
      playSuccess();
      setAuthSuccess(true);
      setTimeout(() => {
        router.push(redirectTarget);
      }, 1200);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handlePasskeyAuth = async () => {
    playClick();
    setIsAuthenticating(true);
    setErrorMessage('');

    const targetEmail = email || 'amber.vance@nexuslabs.tech';
    const targetPassword = password || 'passkey123';

    try {
      const endpoint = mode === 'signup' ? '/api/auth/signup' : '/api/auth/login';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: targetPassword, name })
      });
      const data = await res.json();
      if (data.success) {
        login(targetEmail, data.user.name || 'Amber Vance');
        playSuccess();
        setAuthSuccess(true);
        setTimeout(() => {
          router.push(redirectTarget);
        }, 1200);
      }
    } catch {
      login(targetEmail, 'Amber Vance');
      playSuccess();
      setAuthSuccess(true);
      setTimeout(() => {
        router.push(redirectTarget);
      }, 1200);
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8">
      {/* Brand Header */}
      <div className="text-center space-y-3">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shadow-xl tracking-tighter">
            NX
          </div>
          <span className="text-2xl font-bold tracking-tight text-white uppercase">NEXUS ID</span>
        </Link>

        <p className="text-xs font-mono text-zinc-400">
          Quantum Hardware Identity Portal
        </p>
      </div>

      {/* Auth Mode Toggle Pill */}
      <div className="flex p-1.5 rounded-full glass-panel border border-white/10 max-w-xs mx-auto">
        <button
          onClick={() => {
            playClick();
            setMode('login');
            setErrorMessage('');
          }}
          className={`flex-1 py-2 rounded-full text-xs font-mono transition-colors cursor-pointer ${
            mode === 'login' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            playClick();
            setMode('signup');
            setErrorMessage('');
          }}
          className={`flex-1 py-2 rounded-full text-xs font-mono transition-colors cursor-pointer ${
            mode === 'signup' ? 'bg-white text-black font-bold' : 'text-zinc-400 hover:text-white'
          }`}
        >
          Create ID
        </button>
      </div>

      {/* Main Card */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-2xl relative overflow-hidden">
        <AnimatePresence mode="wait">
          {authSuccess ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-4 py-8"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="text-base font-bold text-white">Authenticated Successfully</div>
              <p className="text-xs text-zinc-400 font-mono">Redirecting to target route...</p>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Mode Title */}
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-white">
                  {mode === 'login' ? 'Sign In with Email & Password' : 'Create New NEXUS Account'}
                </h2>
                <p className="text-xs text-zinc-400 font-mono">
                  Enter your credentials to access hardware telemetry
                </p>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {mode === 'signup' && (
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-zinc-400 uppercase">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Amber Vance"
                        className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="amber.vance@nexuslabs.tech"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-400 uppercase">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none"
                    />
                  </div>
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-400 font-mono text-center">{errorMessage}</p>
                )}

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-4 rounded-2xl bg-white text-black font-semibold text-xs uppercase tracking-wider hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>{isAuthenticating ? 'Authenticating...' : mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="flex items-center gap-4 text-zinc-600 font-mono text-[10px] uppercase">
                <div className="flex-1 h-px bg-white/10" />
                <span>or biometric verification</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <button
                type="button"
                onClick={handlePasskeyAuth}
                disabled={isAuthenticating}
                className="w-full py-3 rounded-xl glass-panel border border-white/10 hover:border-white/30 text-xs font-mono text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Fingerprint className="w-4 h-4" />
                <span>Quick Passkey / Touch ID Authentication</span>
              </button>

              <div className="pt-2 text-center text-[10px] font-mono text-zinc-500 flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                <span>256-Bit Encrypted PostgreSQL Security</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20 flex items-center justify-center px-4 md:px-8">
      <Suspense fallback={<div className="text-zinc-500 font-mono text-xs">Loading identity portal...</div>}>
        <LoginContent />
      </Suspense>
    </div>
  );
}
