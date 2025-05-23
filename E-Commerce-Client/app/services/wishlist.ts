import api from './api';
import type{ Product } from './products';

export interface Wishlist {
  _id: string;
  user: string;
  products: string[] | Product[];
  createdAt: string;
  updatedAt: string;
}

export interface WishlistResponse {
  status: string;
  data: {
    wishlist: Wishlist;
  };
}

const WishlistService = {
  // Get the user's wishlist
  getWishlist: async (): Promise<WishlistResponse> => {
    try {
      const response = await api.get<WishlistResponse>('/wishlist');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Add a product to the wishlist
  addToWishlist: async (productId: string): Promise<WishlistResponse> => {
    try {
      const response = await api.post<WishlistResponse>('/wishlist', { productId });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Remove a product from the wishlist
  removeFromWishlist: async (productId: string): Promise<WishlistResponse> => {
    try {
      const response = await api.delete<WishlistResponse>(`/wishlist/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Check if a product is in the wishlist
  isInWishlist: async (productId: string): Promise<boolean> => {
    try {
      const response = await api.get<{ inWishlist: boolean }>(`/wishlist/check/${productId}`);
      return response.data.inWishlist;
    } catch (error) {
      throw error;
    }
  },
  
  // Clear the wishlist
  clearWishlist: async (): Promise<{ status: string }> => {
    try {
      const response = await api.delete<{ status: string }>('/wishlist');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Move all items from wishlist to cart
  moveAllToCart: async (): Promise<{ status: string }> => {
    try {
      const response = await api.post<{ status: string }>('/wishlist/move-to-cart');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default WishlistService; 