'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20 px-4 md:px-8 flex items-center justify-center">
      <div className="p-8 md:p-12 rounded-3xl glass-panel border border-white/10 text-center space-y-6 max-w-lg shadow-2xl">
        <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Error 404 — Route Not Found</div>
          <h1 className="text-3xl font-bold text-white">Device Route Missing</h1>
          <p className="text-xs text-zinc-400 font-mono leading-relaxed">
            The telemetry endpoint or device specification you requested does not exist in the NEXUS registry.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-lg cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Storefront</span>
        </Link>
      </div>
    </div>
  );
}
