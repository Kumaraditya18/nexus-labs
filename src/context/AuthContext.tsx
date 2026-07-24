'use client';

import React, { createContext, useContext, useState } from 'react';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  tier: 'Standard' | 'Pro' | 'NEXUS Black Member';
  role: 'admin' | 'user';
  passkeysEnabled: boolean;
  memberSince: string;
}

interface AuthContextType {
  user: UserProfile | null;
  login: (email: string, name?: string, serverRole?: string) => void;
  logout: () => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('nexus_user');
        if (saved) {
          const parsed = JSON.parse(saved);
          // Force primary owner kumaraditya1814@gmail.com to admin role
          if (parsed?.email?.toLowerCase() === 'kumaraditya1814@gmail.com') {
            parsed.role = 'admin';
            parsed.tier = 'NEXUS Black Member';
          }
          return parsed;
        }
      } catch {
        // ignore
      }
    }
    return null;
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = (email: string, name = 'NEXUS Member', serverRole?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail === 'kumaraditya1814@gmail.com' || serverRole === 'admin';

    const newUser: UserProfile = {
      id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
      name: name || (cleanEmail === 'kumaraditya1814@gmail.com' ? 'Kumar Aditya' : cleanEmail.split('@')[0]),
      email: cleanEmail,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      tier: isAdmin ? 'NEXUS Black Member' : 'Pro',
      role: isAdmin ? 'admin' : 'user',
      passkeysEnabled: true,
      memberSince: '2026'
    };

    setUser(newUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('nexus_user', JSON.stringify(newUser));
      document.cookie = `nexus_auth_token=${newUser.id}; path=/; max-age=86400; SameSite=Lax`;
      document.cookie = `nexus_user_role=${newUser.role}; path=/; max-age=86400; SameSite=Lax`;
    }
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nexus_user');
      document.cookie = 'nexus_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie = 'nexus_user_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthModalOpen, setIsAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
