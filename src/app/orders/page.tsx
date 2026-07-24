'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Search, ArrowRight, Truck, CheckCircle2, Clock, MapPin, Lock } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';
import { useAuth } from '@/context/AuthContext';

interface OrderSummary {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered';
  carrier: string;
  trackingCode: string;
  itemCount: number;
  total: number;
  mainItemName: string;
  mainItemImage: string;
}

export default function OrdersPage() {
  const { user } = useAuth();
  const { formatPrice } = useCurrency();
  const { playClick } = useAudioFx();
  const [searchQuery, setSearchQuery] = useState('');

  const sampleOrders: OrderSummary[] = [
    {
      id: 'ATH-892410',
      date: '2026-07-24',
      status: 'In Transit',
      carrier: 'DHL Express Priority',
      trackingCode: 'DHL-99481204',
      itemCount: 2,
      total: 948,
      mainItemName: 'NEXUS Pulse ANC & Keystone Keyboard',
      mainItemImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'ATH-774102',
      date: '2026-06-18',
      status: 'Delivered',
      carrier: 'FedEx Priority Global',
      trackingCode: 'FDX-88120349',
      itemCount: 1,
      total: 1299,
      mainItemName: 'NEXUS Vision 32" OLED Reference Display',
      mainItemImage: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const filteredOrders = sampleOrders.filter(
    (ord) =>
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.trackingCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.mainItemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white pt-28 md:pt-36 pb-20 px-4 md:px-8 flex items-center justify-center">
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 max-w-md text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
            <Lock className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Authentication Required</div>
            <h2 className="text-2xl font-bold text-white">Sign In to View Orders</h2>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Please sign in to your NEXUS ID to track active shipments and access logistics telemetry.
            </p>
          </div>
          <Link
            href="/login?redirect=/orders"
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
    <div className="min-h-screen bg-[#09090b] text-white pt-24 md:pt-36 pb-20">
      <div className="max-w-6xl mx-auto space-y-8 px-4 md:px-8">
        {/* Page Header */}
        <div className="space-y-3 border-b border-white/10 pb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
            <Package className="w-3.5 h-3.5 text-zinc-400" />
            <span>Order History & Telemetry</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Logistics Dashboard
          </h1>

          <p className="text-zinc-400 text-xs md:text-sm font-light max-w-xl">
            Track active shipments, view assembly step telemetry, and inspect digital invoice receipts.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Order ID, Tracking Code, or Device Name..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs font-mono focus:border-white/30 focus:outline-none shadow-lg"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 rounded-3xl glass-panel border border-white/10 space-y-3">
              <Package className="w-10 h-10 text-zinc-600 mx-auto" />
              <div className="text-sm font-bold text-white">No matching orders found</div>
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-3xl glass-card border border-white/10 space-y-6 hover:border-white/20 transition-all shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold text-white font-mono">{ord.id}</span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold font-mono bg-white/10 text-white border border-white/20">
                        {ord.status === 'Delivered' ? (
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        ) : ord.status === 'In Transit' ? (
                          <Truck className="w-3 h-3 text-blue-400" />
                        ) : (
                          <Clock className="w-3 h-3 text-zinc-400" />
                        )}
                        {ord.status}
                      </span>
                    </div>
                    <div className="text-xs font-mono text-zinc-400">Order Placed on {ord.date}</div>
                  </div>

                  <Link
                    href={`/orders/${ord.id}`}
                    onClick={playClick}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors shadow-md self-start sm:self-auto cursor-pointer"
                  >
                    <span>View Tracking Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <img
                      src={ord.mainItemImage}
                      alt={ord.mainItemName}
                      className="w-16 h-16 rounded-2xl object-cover border border-white/10 bg-zinc-900"
                    />
                    <div>
                      <h4 className="font-bold text-white text-sm md:text-base">{ord.mainItemName}</h4>
                      <div className="text-xs font-mono text-zinc-400">
                        {ord.itemCount} item{ord.itemCount > 1 ? 's' : ''} • Carrier: <span className="text-white">{ord.carrier}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 font-mono text-xs border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                    <div>
                      <div className="text-zinc-500 uppercase text-[10px]">Tracking Number</div>
                      <div className="text-white font-bold flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" /> {ord.trackingCode}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-zinc-500 uppercase text-[10px]">Total Paid</div>
                      <div className="text-lg font-bold text-white">{formatPrice(ord.total)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
