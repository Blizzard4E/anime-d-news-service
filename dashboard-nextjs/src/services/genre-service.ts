// services/genre-service.ts
import { fetchWithAuth } from '@/lib/api-client';

export interface Genre {
  _id: string;
  title: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: string | undefined;
}

export interface CreateGenreInput {
  title: string;
}

export interface UpdateGenreInput {
  title: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const genreService = {
  create: async (data: CreateGenreInput): Promise<ApiResponse<Genre>> => {
    return fetchWithAuth('/genres', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  getAll: async (): Promise<ApiResponse<Genre[]>> => {
    return fetchWithAuth('/genres', {
      method: 'GET',
    });
  },

  getById: async (id: string): Promise<ApiResponse<Genre>> => {
    return fetchWithAuth(`/genres/${id}`, {
      method: 'GET',
    });
  },

  update: async (id: string, data: UpdateGenreInput): Promise<ApiResponse<Genre>> => {
    return fetchWithAuth(`/genres/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  delete: async (id: string): Promise<ApiResponse<void>> => {
    return fetchWithAuth(`/genres/${id}`, {
      method: 'DELETE',
    });
  },
};
