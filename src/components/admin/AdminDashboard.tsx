'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';

export default function AdminDashboard() {
  const { formatPrice } = useCurrency();
  const [forecastHorizon, setForecastHorizon] = useState<'30d' | '60d' | '90d'>('30d');

  const recentOrders = [
    { id: 'ATH-9982', customer: 'Julian Vance', product: 'NEXUS Horizon Over-Ear', price: 599, status: 'Processing', date: 'Just now' },
    { id: 'ATH-9981', customer: 'Elena Rostova', product: 'NEXUS Pulse ANC', price: 349, status: 'Dispatched', date: '12m ago' },
    { id: 'ATH-9980', customer: 'Marcus Vance', product: 'NEXUS Halo Ring', price: 299, status: 'Delivered', date: '45m ago' },
    { id: 'ATH-9979', customer: 'Liam Chen', product: 'NEXUS Vision 32" OLED', price: 1299, status: 'Dispatched', date: '2h ago' }
  ];

  const aiInsights = {
    '30d': 'AI Forecast Insight: NEXUS Pulse ANC demand surged 42% in North America. Recommended Action: Reallocate 2,000 units from European hub to prevent stock-out before Q3 launch event.',
    '60d': 'AI Forecast Insight: Titanium supply chain lead times extending by 6 days. Recommended Action: Lock in Grade 5 Titanium ingot futures contract before end of month.',
    '90d': 'AI Forecast Insight: Vision OLED 32" projected gross margins expanding to 64.2% due to panel yield optimizations.'
  };

  return (
    <div className="space-y-10">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-8 rounded-3xl glass-panel border border-white/10 shadow-2xl">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-zinc-300 font-mono text-xs uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
            <span>NEXUS Command Center</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Executive Telemetry & Analytics
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            Real-time inventory levels, sub-assembly logistics telemetry, and predictive demand analytics.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right font-mono text-xs">
            <div className="text-zinc-500 uppercase tracking-widest text-[10px]">Database Status</div>
            <div className="text-emerald-400 font-bold flex items-center gap-1.5 justify-end mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PostgreSQL Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 font-mono text-xs uppercase font-bold">
            <span>Gross Revenue</span>
            <DollarSign className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{formatPrice(1284900)}</div>
          <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
            <ArrowUpRight className="w-3 h-3" /> +18.4% vs last quarter
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 font-mono text-xs uppercase font-bold">
            <span>Units Dispatched</span>
            <Package className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">4,812</div>
          <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1 font-bold">
            <ArrowUpRight className="w-3 h-3" /> 99.4% On-time dispatch rate
          </div>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 font-mono text-xs uppercase font-bold">
            <span>Passkey Members</span>
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">12,940</div>
          <div className="text-[10px] font-mono text-zinc-400">82% Verified Pro Tier</div>
        </div>

        <div className="p-6 rounded-3xl glass-card border border-white/10 space-y-3">
          <div className="flex items-center justify-between text-zinc-400 font-mono text-xs uppercase font-bold">
            <span>Stock Risk Alerts</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">2 Devices</div>
          <div className="text-[10px] font-mono text-amber-400 font-bold">Pulse ANC, Keystone</div>
        </div>
      </div>

      {/* Predictive ML Forecast Box */}
      <div className="p-8 rounded-3xl glass-panel-glow border border-white/20 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white text-black shadow-lg">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">Predictive Inventory Demand Engine</h3>
              <div className="text-xs text-zinc-400 font-mono">Neural ML forecasting model powered by checkout telemetry</div>
            </div>
          </div>

          <div className="flex gap-2">
            {(['30d', '60d', '90d'] as const).map((h) => (
              <button
                key={h}
                onClick={() => setForecastHorizon(h)}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                  forecastHorizon === h ? 'bg-white text-black font-bold shadow-md' : 'glass-panel text-zinc-400 hover:text-white'
                }`}
              >
                {h} Horizon
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-zinc-300 leading-relaxed">
          {aiInsights[forecastHorizon]}
        </div>
      </div>

      {/* Orders Table */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-2xl">
        <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono">
          Recent Executive Orders
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Hardware Device</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-white">{ord.id}</td>
                  <td className="py-4 px-4 text-zinc-300">{ord.customer}</td>
                  <td className="py-4 px-4 text-zinc-200">{ord.product}</td>
                  <td className="py-4 px-4 font-bold text-white">{formatPrice(ord.price)}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase bg-white/10 text-white border border-white/20 font-bold">
                      {ord.status === 'Delivered' ? <CheckCircle2 className="w-3 h-3 text-emerald-400" /> : <Clock className="w-3 h-3 text-zinc-400" />}
                      {ord.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-zinc-500">{ord.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
