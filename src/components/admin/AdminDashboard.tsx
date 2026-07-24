'use client';

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Package,
  Users,
  AlertTriangle,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  UserPlus,
  Shield,
  Search,
  Plus
} from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

interface UserRecord {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  tier: string;
  created_at: string;
}

export default function AdminDashboard() {
  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();
  const [forecastHorizon, setForecastHorizon] = useState<'30d' | '60d' | '90d'>('30d');
  
  const [usersList, setUsersList] = useState<UserRecord[]>([
    { id: 'usr_admin_kumar', email: 'kumaraditya1814@gmail.com', name: 'Kumar Aditya', role: 'admin', tier: 'NEXUS Black Member', created_at: '2026-07-24' },
    { id: 'usr_demo1', email: 'elena.rostova@nexuslabs.tech', name: 'Elena Rostova', role: 'user', tier: 'Pro', created_at: '2026-07-24' },
    { id: 'usr_demo2', email: 'julian.vance@nexuslabs.tech', name: 'Julian Vance', role: 'user', tier: 'Standard', created_at: '2026-07-24' }
  ]);
  
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminName, setNewAdminName] = useState('');
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (data.users && data.users.length > 0) {
          setUsersList(data.users);
        }
      })
      .catch((err) => console.warn('Failed to fetch admin users:', err));
  }, []);

  const toggleUserRole = async (user: UserRecord) => {
    playClick();
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    setUpdatingUserId(user.id);

    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, role: newRole })
      });
      playSuccess();
    } catch {
      // ignore
    }

    setUsersList((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, role: newRole } : u))
    );
    setUpdatingUserId(null);
  };

  const handlePromoteNewEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) return;

    playClick();
    const cleanEmail = newAdminEmail.trim().toLowerCase();
    const displayName = newAdminName.trim() || cleanEmail.split('@')[0];
    const newId = `usr_${Math.floor(1000 + Math.random() * 9000)}`;

    const newUser: UserRecord = {
      id: newId,
      email: cleanEmail,
      name: displayName,
      role: 'admin',
      tier: 'NEXUS Black Member',
      created_at: new Date().toISOString()
    };

    try {
      await fetch('/api/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: newId, role: 'admin' })
      });
    } catch {
      // ignore
    }

    setUsersList((prev) => [newUser, ...prev.filter((u) => u.email.toLowerCase() !== cleanEmail)]);
    playSuccess();
    setNewAdminEmail('');
    setNewAdminName('');
  };

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
            <span>Primary Owner: kumaraditya1814@gmail.com</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            Executive Command Center
          </h1>
          <p className="text-xs md:text-sm text-zinc-400 font-light leading-relaxed">
            Real-time telemetry, predictive demand ML analytics, and role-based admin user management.
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
            <span>Registered Accounts</span>
            <Users className="w-4 h-4 text-white" />
          </div>
          <div className="text-3xl font-bold font-mono text-white">{usersList.length}</div>
          <div className="text-[10px] font-mono text-zinc-400">Primary Admin Active</div>
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

      {/* 👑 PROMINENT PERMANENT USER ROLE MANAGEMENT SECTION */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-mono text-[10px] uppercase font-bold">
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Role Delegation Control</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              User Access & Admin Promotion System
            </h2>
            <p className="text-xs text-zinc-400 font-mono">
              Promote any registered account to administrator or revoke admin privileges instantly.
            </p>
          </div>
        </div>

        {/* Quick Add / Promote Email Bar */}
        <form onSubmit={handlePromoteNewEmail} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex-1 w-full relative">
            <input
              type="email"
              required
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              placeholder="Enter user email to promote (e.g. user@nexuslabs.tech)..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-white/30"
            />
          </div>
          <div className="w-full sm:w-48 relative">
            <input
              type="text"
              value={newAdminName}
              onChange={(e) => setNewAdminName(e.target.value)}
              placeholder="Full Name (optional)"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 font-mono text-xs focus:outline-none focus:border-white/30"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Make Admin</span>
          </button>
        </form>

        {/* Registered Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-zinc-400 uppercase">
                <th className="py-3.5 px-4">User</th>
                <th className="py-3.5 px-4">Email Address</th>
                <th className="py-3.5 px-4">Current Role</th>
                <th className="py-3.5 px-4">Membership Tier</th>
                <th className="py-3.5 px-4 text-right">Admin Role Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {usersList.map((usr) => (
                <tr key={usr.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-white/10 text-white flex items-center justify-center font-bold text-[10px]">
                      {usr.name[0]}
                    </div>
                    <span>{usr.name}</span>
                  </td>
                  <td className="py-4 px-4 text-zinc-300 font-mono">{usr.email}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${
                        usr.role === 'admin'
                          ? 'bg-white text-black border-white'
                          : 'bg-white/5 text-zinc-400 border-white/10'
                      }`}
                    >
                      {usr.role === 'admin' ? <ShieldCheck className="w-3 h-3 text-black" /> : <UserCheck className="w-3 h-3 text-zinc-400" />}
                      {usr.role}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-zinc-400">{usr.tier}</td>
                  <td className="py-4 px-4 text-right">
                    {usr.email.toLowerCase() === 'kumaraditya1814@gmail.com' ? (
                      <span className="text-[10px] text-zinc-500 font-mono uppercase italic font-bold">Primary Owner</span>
                    ) : (
                      <button
                        onClick={() => toggleUserRole(usr)}
                        disabled={updatingUserId === usr.id}
                        className={`px-4 py-2 rounded-xl text-xs font-mono uppercase transition-all cursor-pointer shadow-md ${
                          usr.role === 'admin'
                            ? 'glass-panel border border-red-500/30 text-red-400 hover:bg-red-500/10'
                            : 'bg-white text-black font-bold hover:bg-zinc-200'
                        }`}
                      >
                        {updatingUserId === usr.id
                          ? 'Updating...'
                          : usr.role === 'admin'
                          ? 'Revoke Admin'
                          : 'Promote to Admin'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
