import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import CartService from '../services/cart';
import type { Cart, CartItem } from '../services/cart';
import { useAuth } from './AuthContext';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  addToCart: (productId: string, quantity: number, color?: string, size?: string) => Promise<void>;
  updateCartItem: (itemId: string, quantity: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  clearCart: () => Promise<void>;
  applyCoupon: (couponCode: string) => Promise<void>;
  removeCoupon: () => Promise<void>;
  clearError: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // When auth state changes, fetch cart
  useEffect(() => {
    if (isAuthenticated) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [isAuthenticated]);

  const fetchCart = async () => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await CartService.getCart();
      setCart(response.data.cart);
    } catch (err: any) {
      console.error('Error fetching cart:', err);
      setError(err.response?.data?.message || 'Failed to fetch cart.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId: string, quantity: number, color?: string, size?: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await CartService.addToCart(productId, quantity, color, size);
      setCart(response.data.cart);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to add item to cart.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: string, quantity: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await CartService.updateCartItem(itemId, quantity);
      setCart(response.data.cart);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to update cart item.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await CartService.removeFromCart(itemId);
      setCart(response.data.cart);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove item from cart.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      setError(null);
      await CartService.clearCart();
      setCart(null);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to clear cart.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = async (couponCode: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await CartService.applyCoupon(couponCode);
      setCart(response.data.cart);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to apply coupon.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await CartService.removeCoupon();
      setCart(response.data.cart);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to remove coupon.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    cart,
    loading,
    error,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    applyCoupon,
    removeCoupon,
    clearError,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext; 