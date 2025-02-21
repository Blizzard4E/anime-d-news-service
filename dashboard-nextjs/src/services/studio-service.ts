import { fetchWithAuth } from '@/lib/api-client';

export interface Studio {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
  [key: string]: string | number | undefined;
}

export interface CreateStudioInput {
  title: string;
}

export interface UpdateStudioInput {
  title: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const studioService = {
  create: async (data: CreateStudioInput): Promise<ApiResponse<Studio>> => {
    return fetchWithAuth('/studios', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async (): Promise<ApiResponse<Studio[]>> => {
    return fetchWithAuth('/studios', {
      method: 'GET',
    });
  },

  getById: async (id: string): Promise<ApiResponse<Studio>> => {
    return fetchWithAuth(`/studios/${id}`, {
      method: 'GET',
    });
  },

  update: async (id: string, data: UpdateStudioInput): Promise<ApiResponse<Studio>> => {
    return fetchWithAuth(`/studios/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return fetchWithAuth(`/studios/${id}`, {
      method: 'DELETE',
    });
  },
};
