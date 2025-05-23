import api from './api';
import type { Product } from './products';

export interface CartItem {
  product: string | Product; // Product ID or full product object
  quantity: number;
  color?: string;
  size?: string;
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  totalPrice: number;
  totalItems: number;
  createdAt: string;
  updatedAt: string;
}

export interface CartResponse {
  status: string;
  data: {
    cart: Cart;
  };
}

const CartService = {
  // Get the current user's cart
  getCart: async (): Promise<CartResponse> => {
    try {
      const response = await api.get<CartResponse>('/cart');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add an item to the cart
  addToCart: async (productId: string, quantity: number, color?: string, size?: string): Promise<CartResponse> => {
    try {
      const response = await api.post<CartResponse>('/cart', {
        productId,
        quantity,
        color,
        size
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Update cart item quantity
  updateCartItem: async (itemId: string, quantity: number): Promise<CartResponse> => {
    try {
      const response = await api.patch<CartResponse>(`/cart/items/${itemId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove an item from the cart
  removeFromCart: async (itemId: string): Promise<CartResponse> => {
    try {
      const response = await api.delete<CartResponse>(`/cart/items/${itemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Clear the cart
  clearCart: async (): Promise<{ status: string }> => {
    try {
      const response = await api.delete<{ status: string }>('/cart');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Apply a coupon to the cart
  applyCoupon: async (couponCode: string): Promise<CartResponse> => {
    try {
      const response = await api.post<CartResponse>('/cart/coupon', { code: couponCode });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Remove a coupon from the cart
  removeCoupon: async (): Promise<CartResponse> => {
    try {
      const response = await api.delete<CartResponse>('/cart/coupon');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default CartService; 