import api from './api';
import { Product } from './products';

export interface OrderItem {
  product: string | Product;
  quantity: number;
  price: number;
  color?: string;
  size?: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  orderStatus: 'processing' | 'shipped' | 'delivered' | 'cancelled';
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  status: string;
  results: number;
  data: {
    orders: Order[];
  };
}

export interface OrderResponse {
  status: string;
  data: {
    order: Order;
  };
}

export interface CreateOrderData {
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  couponCode?: string;
}

const OrderService = {
  // Get all orders for the current user
  getOrders: async (): Promise<OrdersResponse> => {
    try {
      const response = await api.get<OrdersResponse>('/orders');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a single order by ID
  getOrderById: async (orderId: string): Promise<OrderResponse> => {
    try {
      const response = await api.get<OrderResponse>(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Create a new order
  createOrder: async (orderData: CreateOrderData): Promise<OrderResponse> => {
    try {
      const response = await api.post<OrderResponse>('/orders', orderData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cancel an order
  cancelOrder: async (orderId: string): Promise<OrderResponse> => {
    try {
      const response = await api.patch<OrderResponse>(`/orders/${orderId}/cancel`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get order history (with pagination)
  getOrderHistory: async (page: number = 1, limit: number = 10): Promise<OrdersResponse> => {
    try {
      const response = await api.get<OrdersResponse>('/orders', {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Create payment intent (for Stripe)
  createPaymentIntent: async (orderId: string): Promise<{ clientSecret: string }> => {
    try {
      const response = await api.post<{ clientSecret: string }>(`/orders/${orderId}/payment-intent`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default OrderService; 