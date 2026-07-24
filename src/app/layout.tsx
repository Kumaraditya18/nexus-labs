import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { AudioFxProvider, AudioProvider } from '@/context/AudioContext';
import { AuthProvider } from '@/context/AuthContext';

import Navbar from '@/components/navigation/Navbar';
import CartDrawer from '@/components/cart/CartDrawer';
import FloatingAiButton from '@/components/ai/FloatingAiButton';

export const metadata: Metadata = {
  title: 'NEXUS LABS — Quantum Hardware Architecture',
  description: 'NEXUS LABS is a consumer technology hardware brand blending luxury aesthetics, aerospace titanium engineering, electrostatic beryllium audio, and spatial computing.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>NEXUS LABS — Quantum Hardware Architecture</title>
        <meta
          name="description"
          content="NEXUS LABS is a consumer technology hardware brand blending luxury aesthetics, aerospace titanium engineering, electrostatic beryllium audio, and spatial computing."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="antialiased bg-[#09090b] text-white selection:bg-white/20 selection:text-white">
        <AuthProvider>
          <CurrencyProvider>
            <AudioProvider>
              <CartProvider>
                <WishlistProvider>
                  {/* Navbar Header */}
                  <Navbar />

                  {/* Page Content */}
                  <div className="relative z-10">{children}</div>

                  {/* Cart Drawer */}
                  <CartDrawer />

                  {/* Floating AI Concierge Button */}
                  <FloatingAiButton />
                </WishlistProvider>
              </CartProvider>
            </AudioProvider>
          </CurrencyProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
