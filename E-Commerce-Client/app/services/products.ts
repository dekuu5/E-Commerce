import api from './api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  brand?: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  createdAt: string;
  updatedAt: string;
  ratingsAverage?: number;
  ratingsQuantity?: number;
  features?: string[];
  inStock?: boolean;
  sizeGuide?: string;
}

export interface ProductsResponse {
  status: string;
  results: number;
  data: {
    products: Product[];
  };
}

export interface ProductResponse {
  status: string;
  data: {
    product: Product;
  };
}

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  category?: string;
  subcategory?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  colors?: string[];
  sizes?: string[];
}

const ProductService = {
  // Get all products with optional filtering
  getProducts: async (params: ProductQueryParams = {}): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>('/products', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get a single product by ID
  getProductById: async (id: string): Promise<ProductResponse> => {
    try {
      const response = await api.get<ProductResponse>(`/products/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get a single product - this is used in the product detail page
  getProduct: async (id: string): Promise<Product> => {
    try {
      const response = await api.get<ProductResponse>(`/products/${id}`);
      return response.data.data.product;
    } catch (error) {
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string, params: ProductQueryParams = {}): Promise<ProductsResponse> => {
    try {
      const queryParams = { ...params, category: categoryId };
      const response = await api.get<ProductsResponse>('/products', { params: queryParams });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get featured products
  getFeaturedProducts: async (limit: number = 6): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>('/products/featured', { params: { limit } });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get new arrivals
  getNewArrivals: async (limit: number = 8): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>('/products', {
        params: { sort: '-createdAt', limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Get sale products
  getSaleProducts: async (limit: number = 8): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>('/products', {
        params: { discount: { $gt: 0 }, limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search products
  searchProducts: async (query: string, params: ProductQueryParams = {}): Promise<ProductsResponse> => {
    try {
      const queryParams = { ...params, search: query };
      const response = await api.get<ProductsResponse>('/products/search', { params: queryParams });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // Get related products
  getRelatedProducts: async (productId: string, limit: number = 4): Promise<ProductsResponse> => {
    try {
      const response = await api.get<ProductsResponse>(`/products/${productId}/related`, {
        params: { limit }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ProductService; 