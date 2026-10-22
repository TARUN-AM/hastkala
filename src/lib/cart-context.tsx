import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '../types/database';
import { calculateOrderFinancials, OrderFinancials } from '../utils/order-calculations';
import { db } from './db';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  financials: OrderFinancials;
  addItem: (product: Product, quantity?: number) => { success: boolean; message?: string };
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => { success: boolean; message?: string };
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_STORAGE_KEY = 'hastkala_cart_items_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem('craft_here_cart_items_v1');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    // Re-verify against live database stock
    const liveProduct = db.getProductById(product.id) || product;
    const isMadeToOrder =
      liveProduct.stock_quantity <= 0 &&
      ((liveProduct.lead_time_days ?? 0) > 0 ||
        liveProduct.tags?.some((t) => t.toLowerCase().includes('made-to-order')));

    if (liveProduct.stock_quantity <= 0 && !isMadeToOrder) {
      return { success: false, message: `"${liveProduct.title}" is out of stock in the artisan's studio.` };
    }

    const maxAllowed = isMadeToOrder ? 5 : liveProduct.stock_quantity;
    const existingIndex = items.findIndex((i) => i.product.id === product.id);
    const currentQty = existingIndex > -1 ? items[existingIndex].quantity : 0;
    const targetQty = currentQty + quantity;

    if (targetQty > maxAllowed) {
      return {
        success: false,
        message: isMadeToOrder
          ? `Made-to-order limit reached (max ${maxAllowed} per order).`
          : `Only ${liveProduct.stock_quantity} available in artisan inventory.`,
      };
    }

    if (existingIndex > -1) {
      const next = [...items];
      next[existingIndex] = {
        ...next[existingIndex],
        quantity: targetQty,
      };
      setItems(next);
    } else {
      setItems([...items, { product: liveProduct, quantity }]);
    }

    return { success: true };
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return { success: true };
    }

    const liveProduct = db.getProductById(productId);
    if (!liveProduct) {
      removeItem(productId);
      return { success: false, message: 'Item is no longer listed' };
    }

    if (quantity > liveProduct.stock_quantity) {
      return {
        success: false,
        message: `Cannot exceed ${liveProduct.stock_quantity} available items`,
      };
    }

    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );

    return { success: true };
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearCart = () => {
    setItems([]);
  };

  const financials = calculateOrderFinancials(
    items.map((i) => ({ price: i.product.price, quantity: i.quantity }))
  );

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        financials,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
