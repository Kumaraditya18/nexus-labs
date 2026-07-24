'use client';

import React from 'react';
import AdminDashboard from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <AdminDashboard />
      </div>
    </div>
  );
}
