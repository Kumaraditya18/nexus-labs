'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Search, ChevronRight } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

export const MOCK_ORDERS = [
  {
    id: 'ATH-892410',
    date: 'July 24, 2026',
    status: 'In Transit',
    estimatedDelivery: 'July 26, 2026',
    carrier: 'DHL Express Priority',
    trackingCode: 'DHL-9941829410',
    items: [
      { name: 'NEXUS Pulse ANC (Obsidian Black)', price: 349, qty: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80' },
      { name: 'NEXUS Halo Ring (Titanium)', price: 299, qty: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80' }
    ],
    total: 648,
    timeline: [
      { title: 'Order Verified & Authorized', date: 'Jul 24, 09:12 AM', completed: true },
      { title: 'Sub-Millimeter Assembly', date: 'Jul 24, 11:45 AM', completed: true },
      { title: 'Acoustic Chamber Inspection', date: 'Jul 24, 02:30 PM', completed: true },
      { title: 'Dispatched via DHL Express', date: 'Jul 24, 05:00 PM', completed: true },
      { title: 'Out for Regional Delivery', date: 'Est. Jul 26', completed: false }
    ]
  },
  {
    id: 'ATH-771842',
    date: 'June 18, 2026',
    status: 'Delivered',
    estimatedDelivery: 'June 20, 2026',
    carrier: 'FedEx Priority Global',
    trackingCode: 'FDX-8821941019',
    items: [
      { name: 'NEXUS Book Pro 16 (Natural Titanium)', price: 2499, qty: 1, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=300&q=80' }
    ],
    total: 2499,
    timeline: [
      { title: 'Order Verified & Authorized', date: 'Jun 18, 08:00 AM', completed: true },
      { title: 'Sub-Millimeter Assembly', date: 'Jun 18, 10:15 AM', completed: true },
      { title: 'Dispatched via FedEx', date: 'Jun 18, 04:00 PM', completed: true },
      { title: 'Delivered & Signed', date: 'Jun 20, 01:15 PM', completed: true }
    ]
  }
];

export default function OrdersPage() {
  const { formatPrice } = useCurrency();
  const { playClick } = useAudioFx();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = MOCK_ORDERS.filter((o) =>
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    o.items.some((i) => i.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header Title Banner */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest">
            <Package className="w-3.5 h-3.5 text-zinc-400" />
            <span>Order History Telemetry</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            Your Orders
          </h1>
          <p className="text-zinc-400 text-sm font-light leading-relaxed">
            Select any order to view full logistics tracking timeline, carrier status, and digital invoice receipt.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-xl">
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders by ID (e.g. ATH-892410) or item..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 font-mono cursor-text shadow-xl"
          />
        </div>

        {/* Master Orders List Grid */}
        <div className="space-y-4">
          <div className="text-xs font-mono text-zinc-400 uppercase tracking-wider font-bold px-1">
            All Placed Orders ({filteredOrders.length})
          </div>

          {filteredOrders.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 text-zinc-500 font-mono text-xs">
              No orders matched your search query.
            </div>
          ) : (
            filteredOrders.map((ord) => (
              <Link
                key={ord.id}
                href={`/orders/${ord.id}`}
                onClick={playClick}
                className="p-6 rounded-3xl glass-card border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-white/30 transition-all cursor-pointer group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold font-mono text-white group-hover:text-zinc-200 transition-colors">
                      {ord.id}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-3 py-1 rounded-full border uppercase ${
                        ord.status === 'In Transit'
                          ? 'bg-white/10 text-white border-white/30'
                          : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-zinc-400">
                    Placed on <span className="text-zinc-200">{ord.date}</span> • Carrier: <span className="text-zinc-200">{ord.carrier}</span>
                  </div>

                  {/* Item Thumbnails Preview */}
                  <div className="flex items-center gap-2 pt-1">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 pr-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-xl object-cover border border-white/10"
                        />
                        <span className="text-xs text-zinc-300 font-medium hidden sm:inline">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between md:flex-col md:items-end gap-2 shrink-0 border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                  <div className="text-xs font-mono text-zinc-500 uppercase">Total Amount</div>
                  <div className="text-xl font-bold font-mono text-white">{formatPrice(ord.total)}</div>
                  <div className="flex items-center gap-1 text-xs font-mono text-zinc-300 group-hover:text-white mt-1">
                    <span>View Tracking Page</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
