'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertOctagon, ArrowLeft, RefreshCw } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Runtime Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20 px-4 md:px-8 flex items-center justify-center">
      <div className="p-8 md:p-12 rounded-3xl glass-panel border border-white/10 text-center space-y-6 max-w-lg shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
          <AlertOctagon className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Hardware Telemetry Interrupted</div>
          <h1 className="text-3xl font-bold text-white">An unexpected error occurred</h1>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed">
            {error.message || 'Our system detected an anomaly. The telemetry log has been recorded.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 py-3.5 rounded-2xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Retry Operation</span>
          </button>
          <Link
            href="/"
            className="flex-1 py-3.5 rounded-2xl glass-panel border border-white/10 text-xs font-mono text-white hover:border-white/30 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
