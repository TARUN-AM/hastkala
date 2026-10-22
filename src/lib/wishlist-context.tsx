import React, { createContext, useContext, useEffect, useState } from 'react';

interface WishlistContextType {
  wishlistIds: string[];
  toggleWishlist: (productId: string) => boolean;
  isInWishlist: (productId: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

const WISHLIST_STORAGE_KEY = 'hastkala_wishlist_v1';

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY) || localStorage.getItem('craft_here_wishlist_v1');
      return stored ? JSON.parse(stored) : ['prod-1', 'prod-2'];
    } catch {
      return ['prod-1', 'prod-2'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to store wishlist:', e);
    }
  }, [wishlistIds]);

  const toggleWishlist = (productId: string) => {
    const exists = wishlistIds.includes(productId);
    if (exists) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      return false;
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      return true;
    }
  };

  const isInWishlist = (productId: string) => wishlistIds.includes(productId);

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        toggleWishlist,
        isInWishlist,
        wishlistCount: wishlistIds.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
