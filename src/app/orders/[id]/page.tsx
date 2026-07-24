'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { Package, Truck, CheckCircle2, Download, ArrowLeft, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';
import { useAuth } from '@/context/AuthContext';

export interface DetailedOrder {
  id: string;
  date: string;
  status: 'Processing' | 'In Transit' | 'Delivered';
  carrier: string;
  trackingCode: string;
  estimatedDelivery: string;
  shippingAddress: string;
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
}

export const MOCK_ORDERS: Record<string, DetailedOrder> = {
  'ATH-892410': {
    id: 'ATH-892410',
    date: '2026-07-24',
    status: 'In Transit',
    carrier: 'DHL Express Priority',
    trackingCode: 'DHL-99481204',
    estimatedDelivery: 'July 26, 2026',
    shippingAddress: '100 Silicon Way, Suite 400, San Francisco, CA 94107',
    total: 948,
    items: [
      {
        id: 'pulse-anc',
        name: 'NEXUS Pulse ANC Earbuds',
        quantity: 1,
        price: 349,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'keystone-mechanical',
        name: 'NEXUS Keystone Titanium Keyboard',
        quantity: 1,
        price: 599,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
      }
    ]
  },
  'ATH-774102': {
    id: 'ATH-774102',
    date: '2026-06-18',
    status: 'Delivered',
    carrier: 'FedEx Priority Global',
    trackingCode: 'FDX-88120349',
    estimatedDelivery: 'June 20, 2026',
    shippingAddress: '100 Silicon Way, Suite 400, San Francisco, CA 94107',
    total: 1299,
    items: [
      {
        id: 'vision-oled-32',
        name: 'NEXUS Vision 32" OLED Reference Display',
        quantity: 1,
        price: 1299,
        image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80'
      }
    ]
  }
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;
  const order = MOCK_ORDERS[orderId] || MOCK_ORDERS['ATH-892410'];

  const { formatPrice } = useCurrency();
  const { playClick, playSuccess } = useAudioFx();
  const { user } = useAuth();

  const handleDownloadInvoice = () => {
    playSuccess();
    alert(`Downloading official NEXUS tax invoice receipt for order ${order.id} (PDF)...`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#09090b] text-white pt-28 md:pt-36 pb-20 px-4 md:px-8 flex items-center justify-center">
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 max-w-md text-center shadow-2xl">
          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center mx-auto shadow-xl">
            <Package className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <div className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Authentication Required</div>
            <h2 className="text-2xl font-bold text-white">Sign In to View Order Details</h2>
            <p className="text-xs text-zinc-400 font-mono leading-relaxed">
              Please sign in to your NEXUS ID to inspect step-by-step tracking telemetry and invoice receipts.
            </p>
          </div>
          <Link
            href="/login?redirect=/orders"
            onClick={playClick}
            className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors cursor-pointer shadow-lg"
          >
            <span>Sign In to NEXUS ID</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    );
  }

  const timelineSteps = [
    { title: 'Sub-Assembly Complete', date: order.date, status: 'completed' },
    { title: 'Acoustic Driver Calibration', date: order.date, status: 'completed' },
    { title: 'Dispatched via Carrier', date: order.date, status: 'completed' },
    { title: 'In Transit to Hub', date: 'Jul 25, 2026', status: order.status === 'Delivered' ? 'completed' : 'current' },
    { title: 'Final Courier Delivery', date: order.estimatedDelivery, status: order.status === 'Delivered' ? 'completed' : 'pending' }
  ];

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-24 md:pt-36 pb-20">
      <div className="max-w-5xl mx-auto space-y-8 px-4 md:px-8">
        {/* Top Back Button */}
        <Link
          href="/orders"
          onClick={playClick}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {/* Order Header */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-2xl md:text-3xl font-bold font-mono text-white">{order.id}</span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase bg-white/10 text-white border border-white/20">
                {order.status === 'Delivered' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Truck className="w-4 h-4 text-blue-400 animate-pulse" />
                )}
                {order.status}
              </span>
            </div>
            <div className="text-xs font-mono text-zinc-400">
              Placed on {order.date} • Carrier: <span className="text-white font-bold">{order.carrier}</span> ({order.trackingCode})
            </div>
          </div>

          <button
            onClick={handleDownloadInvoice}
            className="px-5 py-3 rounded-2xl bg-white text-black font-semibold text-xs uppercase hover:bg-zinc-200 transition-colors flex items-center gap-2 cursor-pointer shadow-md self-start md:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download Invoice PDF</span>
          </button>
        </div>

        {/* Timeline Progress Section */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-2xl">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono border-b border-white/10 pb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-zinc-400" /> Logistics Assembly & Transport Timeline
          </h3>

          <div className="relative pl-6 space-y-6 border-l-2 border-white/10">
            {timelineSteps.map((stg, i) => (
              <div key={i} className="relative group">
                <div
                  className={`absolute -left-[31px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                    stg.status === 'completed'
                      ? 'bg-white border-white shadow-lg'
                      : stg.status === 'current'
                      ? 'bg-blue-400 border-blue-400 animate-ping'
                      : 'bg-zinc-800 border-zinc-600'
                  }`}
                />
                <div className="space-y-0.5">
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <span>{stg.title}</span>
                    {stg.status === 'completed' && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <div className="text-xs font-mono text-zinc-400">{stg.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Items Grid */}
        <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-2xl">
          <h3 className="text-sm font-bold text-white tracking-wider uppercase font-mono border-b border-white/10 pb-3">
            Hardware Device Manifest ({order.items.length} items)
          </h3>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 p-4 rounded-2xl glass-card border border-white/5">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                  <div>
                    <h4 className="font-bold text-white text-base">{item.name}</h4>
                    <div className="text-xs font-mono text-zinc-400">Qty: {item.quantity} • Unit Price: {formatPrice(item.price)}</div>
                  </div>
                </div>

                <div className="font-mono text-white font-bold text-base">
                  {formatPrice(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-zinc-400">
              <MapPin className="w-4 h-4 text-zinc-400" />
              <span>Destination: <strong className="text-white">{order.shippingAddress}</strong></span>
            </div>
            <div className="text-right text-base font-bold text-white">
              Total Order Value: <span className="text-white">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
