'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PRODUCTS } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedMaterialId: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, selectedMaterialId?: string, quantity?: number) => void;
  removeFromCart: (productId: string, selectedMaterialId: string) => void;
  updateQuantity: (productId: string, selectedMaterialId: string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  discountAmount: number;
  total: number;
  appliedCoupon: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  totalItemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_cart');
        if (saved) return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedMaterialId: PRODUCTS[0].materials[0]?.id || 'default'
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product: Product, selectedMaterialId?: string, quantity = 1) => {
    const matId = selectedMaterialId || product.materials[0]?.id || 'default';
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedMaterialId === matId
      );
      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedMaterialId: matId }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedMaterialId: string) => {
    setCart((prev) =>
      prev.filter((item) => !(item.product.id === productId && item.selectedMaterialId === selectedMaterialId))
    );
  };

  const updateQuantity = (productId: string, selectedMaterialId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedMaterialId === selectedMaterialId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NEXUS10' || clean === 'LAUNCH2026' || clean === 'VIP20') {
      setAppliedCoupon(clean);
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  let discountRate = 0;
  if (appliedCoupon === 'NEXUS10') discountRate = 0.10;
  else if (appliedCoupon === 'LAUNCH2026') discountRate = 0.15;
  else if (appliedCoupon === 'VIP20') discountRate = 0.20;

  const discountAmount = subtotal * discountRate;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        discountAmount,
        total,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        totalItemsCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
