'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '@/data/products';

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
    return [];
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
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) => item.product.id === product.id && item.selectedMaterialId === matId
      );
      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx].quantity += quantity;
        return nextCart;
      }
      return [...prevCart, { product, quantity, selectedMaterialId: matId }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedMaterialId: string) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.product.id === productId && item.selectedMaterialId === selectedMaterialId)
      )
    );
  };

  const updateQuantity = (productId: string, selectedMaterialId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedMaterialId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId && item.selectedMaterialId === selectedMaterialId
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nexus_cart');
    }
  };

  const applyCoupon = (code: string): boolean => {
    if (code.trim().toUpperCase() === 'NEXUS10') {
      setAppliedCoupon('NEXUS10');
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = appliedCoupon === 'NEXUS10' ? subtotal * 0.10 : 0;
  const total = Math.max(0, subtotal - discountAmount);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
