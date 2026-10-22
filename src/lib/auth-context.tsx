import React, { createContext, useContext, useEffect, useState } from 'react';
import { Profile, UserRole } from '../types/database';
import { db } from './db';
import { SEED_PROFILES } from './seed-data';

interface AuthContextType {
  user: Profile | null;
  role: UserRole;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { email: string; full_name: string; role: UserRole; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchPersona: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

const AUTH_USER_KEY = 'hastkala_active_user_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<Profile | null>(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = localStorage.getItem(AUTH_USER_KEY) || localStorage.getItem('craft_here_active_user_v1');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.email === 'string') {
          parsed.email = parsed.email.replace('@craft-here.dev', '@hastkala.dev');
        }
        return parsed;
      }
      // Default to customer for immediate pleasant experience
      return SEED_PROFILES[0];
    } catch {
      return SEED_PROFILES[0];
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [user]);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      const found = db.getProfileByEmail(email);
      if (!found) {
        setIsLoading(false);
        return { success: false, error: 'No account found with this email. Please register.' };
      }
      setUser(found);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Login failed' };
    }
  };

  const register = async (data: { email: string; full_name: string; role: UserRole; phone?: string }) => {
    setIsLoading(true);
    try {
      const existing = db.getProfileByEmail(data.email);
      if (existing) {
        setIsLoading(false);
        return { success: false, error: 'An account with this email address already exists' };
      }
      const newProfile = db.createProfile(data);
      setUser(newProfile);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
  };

  // Helper for evaluation: 1-click switch between Customer, Artisan, Admin
  const switchPersona = (targetRole: UserRole) => {
    const profile = SEED_PROFILES.find((p) => p.role === targetRole);
    if (profile) {
      setUser(profile);
    }
  };

  const role = user ? user.role : 'customer';

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        register,
        logout,
        switchPersona,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
