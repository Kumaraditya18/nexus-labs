'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Package, Truck, CheckCircle2, Download, ArrowLeft, Clock, ShieldCheck } from 'lucide-react';
import { MOCK_ORDERS } from '@/app/orders/page';
import { useCurrency } from '@/context/CurrencyContext';
import { useAudioFx } from '@/context/AudioContext';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function OrderDetailPage({ params }: OrderDetailPageProps) {
  const resolvedParams = use(params);
  const order = MOCK_ORDERS.find((o) => o.id === resolvedParams.id) || MOCK_ORDERS[0];

  if (!order) {
    notFound();
  }

  const [activeTab, setActiveTab] = useState<'timeline' | 'invoice'>('timeline');
  const { formatPrice } = useCurrency();
  const { playClick } = useAudioFx();

  return (
    <div className="min-h-screen bg-[#09090b] text-white pt-36 pb-20 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link
          href="/orders"
          onClick={playClick}
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Orders</span>
        </Link>

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-mono uppercase tracking-widest mb-2">
              <Package className="w-3.5 h-3.5 text-zinc-400" />
              <span>Real-Time Shipment Telemetry</span>
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Order #{order.id}
            </h1>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                playClick();
                setActiveTab('timeline');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-colors ${
                activeTab === 'timeline' ? 'bg-white text-black font-bold' : 'glass-panel text-zinc-400 hover:text-white'
              }`}
            >
              Tracking Timeline
            </button>
            <button
              onClick={() => {
                playClick();
                setActiveTab('invoice');
              }}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-colors ${
                activeTab === 'invoice' ? 'bg-white text-black font-bold' : 'glass-panel text-zinc-400 hover:text-white'
              }`}
            >
              Digital Invoice
            </button>
          </div>
        </div>

        {activeTab === 'timeline' ? (
          <div className="space-y-6">
            {/* Delivery Status Overview Card */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-mono text-zinc-400 uppercase">Carrier Status</div>
                  <div className="text-2xl font-bold text-white flex items-center gap-2 mt-1">
                    <Truck className="w-5 h-5 text-white" />
                    <span>{order.status}</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-1">
                    Carrier: <span className="text-white">{order.carrier}</span> ({order.trackingCode})
                  </div>
                </div>

                <div className="text-left md:text-right">
                  <div className="text-xs font-mono text-zinc-400">Estimated Delivery</div>
                  <div className="text-lg font-bold text-white mt-1">{order.estimatedDelivery}</div>
                  <div className="text-xs font-mono text-zinc-300 font-bold mt-1">Total: {formatPrice(order.total)}</div>
                </div>
              </div>
            </div>

            {/* Interactive Step Timeline */}
            <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-8 shadow-xl">
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-400" />
                <span>Assembly & Dispatch History</span>
              </h3>

              <div className="relative border-l border-white/20 pl-8 space-y-8 ml-4">
                {order.timeline.map((step, i) => (
                  <div key={i} className="relative">
                    <div
                      className={`absolute -left-[37px] top-0.5 w-4 h-4 rounded-full border flex items-center justify-center ${
                        step.completed
                          ? 'bg-white border-white text-black'
                          : 'bg-zinc-900 border-white/30 text-zinc-600'
                      }`}
                    >
                      {step.completed && <CheckCircle2 className="w-3 h-3 stroke-[3]" />}
                    </div>

                    <div>
                      <h4 className={`text-sm font-semibold ${step.completed ? 'text-white' : 'text-zinc-500'}`}>
                        {step.title}
                      </h4>
                      <p className="text-xs font-mono text-zinc-400 mt-0.5">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Items Included */}
            <div className="p-6 rounded-3xl glass-panel border border-white/10 space-y-4">
              <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold">Items in this Package</h4>
              <div className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl glass-card border border-white/5">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-white/10" />
                      <div>
                        <div className="text-xs font-bold text-white">{item.name}</div>
                        <div className="text-[10px] font-mono text-zinc-400">Qty: {item.qty}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono font-bold text-white">
                      {formatPrice(item.price * item.qty)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* DIGITAL INVOICE VIEW */
          <div className="p-8 rounded-3xl glass-panel border border-white/10 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-white/10 pb-6">
              <div>
                <h2 className="text-xl font-bold text-white">NEXUS Digital Receipt — {order.id}</h2>
                <p className="text-xs text-zinc-400 font-mono">Tax ID: US-981240182 | Date: {order.date}</p>
              </div>
              <button
                onClick={() => alert(`Downloading PDF Invoice for ${order.id}...`)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs uppercase hover:bg-zinc-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-white">{item.name} (x{item.qty})</span>
                  <span className="text-white font-bold">{formatPrice(item.price * item.qty)}</span>
                </div>
              ))}

              <div className="pt-4 border-t border-white/10 space-y-2 text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(order.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span>FREE</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold text-white">
                  <span>Total Paid</span>
                  <span className="text-white">{formatPrice(order.total)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-center text-[10px] font-mono text-zinc-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
              <span>Verified Electronic Digital Signature</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
