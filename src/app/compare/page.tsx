'use client';

import React from 'react';
import AIComparisonEngine from '@/components/ai/AIComparisonEngine';
import Footer from '@/components/navigation/Footer';

export default function ComparePage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-28">
      <div className="pb-16">
        <AIComparisonEngine />
      </div>
      <Footer />
    </div>
  );
}
