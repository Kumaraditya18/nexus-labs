'use client';

import React, { createContext, useContext, useState } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInUSD: number) => string;
}

const RATES: Record<Currency, { rate: number; symbol: string; decimals: number }> = {
  USD: { rate: 1.0, symbol: '$', decimals: 0 },
  EUR: { rate: 0.92, symbol: '€', decimals: 0 },
  GBP: { rate: 0.78, symbol: '£', decimals: 0 },
  JPY: { rate: 155.0, symbol: '¥', decimals: 0 }
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const formatPrice = (priceInUSD: number) => {
    const config = RATES[currency];
    const converted = priceInUSD * config.rate;
    if (currency === 'JPY') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${converted.toFixed(config.decimals).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
