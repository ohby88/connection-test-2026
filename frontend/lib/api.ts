/**
 * API client for backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  size: string;
  color: string;
  image_url: string;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface AIFittingRequest {
  user_id: string;
  dog_image_url: string;
  product_id: number;
}

export interface AIFittingResult {
  id: string;
  user_id: string;
  dog_image_url: string;
  product_id: number;
  result_image_url?: string;
  result_video_url?: string;
  status: 'processing' | 'completed' | 'failed';
  created_at: string;
}

export const api = {
  // Products
  async getProducts(params?: {
    category?: string;
    size?: string;
    limit?: number;
    offset?: number;
  }): Promise<Product[]> {
    const query = new URLSearchParams();
    if (params?.category) query.append('category', params.category);
    if (params?.size) query.append('size', params.size);
    if (params?.limit) query.append('limit', params.limit.toString());
    if (params?.offset) query.append('offset', params.offset.toString());

    const response = await fetch(`${API_URL}/api/products?${query}`);
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${API_URL}/api/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async getCategories(): Promise<string[]> {
    const response = await fetch(`${API_URL}/api/products/categories/list`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    const data = await response.json();
    return data.categories;
  },

  // AI Fitting
  async createAIFitting(request: AIFittingRequest): Promise<AIFittingResult> {
    const response = await fetch(`${API_URL}/api/ai-fitting/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) throw new Error('Failed to create AI fitting');
    return response.json();
  },

  async getAIFitting(id: string): Promise<AIFittingResult> {
    const response = await fetch(`${API_URL}/api/ai-fitting/${id}`);
    if (!response.ok) throw new Error('Failed to fetch AI fitting');
    return response.json();
  },

  async getUserFittings(userId: string): Promise<AIFittingResult[]> {
    const response = await fetch(`${API_URL}/api/ai-fitting/user/${userId}`);
    if (!response.ok) throw new Error('Failed to fetch user fittings');
    return response.json();
  },
};
