'use client';

import React from 'react';
import AIWorkspaceBuilder from '@/components/ai/AIWorkspaceBuilder';
import Footer from '@/components/navigation/Footer';

export default function WorkspaceBuilderPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-28">
      <div className="pb-16">
        <AIWorkspaceBuilder />
      </div>
      <Footer />
    </div>
  );
}
