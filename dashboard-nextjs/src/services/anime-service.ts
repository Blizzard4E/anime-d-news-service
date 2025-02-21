// services/anime-service.ts
import { fetchWithAuth } from '@/lib/api-client';
import { CreateAnimeInput, Anime } from '@/types/anime';

interface AnimeResponse {
  success: boolean;
  message: string;
  data: Anime;
}

interface AnimesResponse {
  success: boolean;
  message: string;
  data: Anime[];
}

export const animeService = {
  getAll: async (): Promise<AnimesResponse> => {
    return fetchWithAuth('/anime');
  },

  getById: async (id: string): Promise<AnimeResponse> => {
    return fetchWithAuth(`/anime/${id}`);
  },

  create: async (
    data: CreateAnimeInput,
    files: {
      poster?: File;
      cover?: File;
      logo?: File;
      trailer?: File;
    },
  ): Promise<AnimeResponse> => {
    const formData = new FormData();

    // Append basic data
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'genres') {
        formData.append('genres', JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    });

    // Append files with validation
    if (!files.poster || !files.cover || !files.logo || !files.trailer) {
      throw new Error('All files (poster, cover, logo, and trailer) are required');
    }

    formData.append('poster', files.poster);
    formData.append('cover', files.cover);
    formData.append('logo', files.logo);
    formData.append('trailer', files.trailer);

    // Now use your local API route instead of the backend directly
    return fetchWithAuth('/anime', {
      method: 'POST',
      body: formData,
    });
  },

  update: async (
    id: string,
    data: Partial<CreateAnimeInput>,
    files?: {
      poster?: File;
      cover?: File;
      logo?: File;
      trailer?: File;
    },
  ): Promise<AnimeResponse> => {
    const formData = new FormData();

    // Append data if it exists
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        if (key === 'genres' && Array.isArray(value)) {
          formData.append('genres', JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Append files if they exist
    if (files) {
      if (files.poster) formData.append('poster', files.poster);
      if (files.cover) formData.append('cover', files.cover);
      if (files.logo) formData.append('logo', files.logo);
      if (files.trailer) formData.append('trailer', files.trailer);
    }

    return fetchWithAuth(`/anime/${id}`, {
      method: 'PUT',
      body: formData,
    });
  },

  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return fetchWithAuth(`/anime/${id}`, {
      method: 'DELETE',
    });
  },
};
