// services/episode-service.ts
import { fetchWithAuth } from '@/lib/api-client';

export interface Episode {
  _id: string;
  title: string;
  episodeNumber: string;
  videoUrl: string;
  animeId: string;
  createdAt: string;
  updatedAt: string;
}

interface EpisodeResponse {
  success: boolean;
  message: string;
  data: Episode;
}

interface CreateEpisodeInput {
  title: string;
  episodeNumber: string;
  animeId: string;
  video: File;
}

export const episodeService = {
  create: async (data: CreateEpisodeInput): Promise<EpisodeResponse> => {
    const formData = new FormData();

    // Append text data
    formData.append('title', data.title);
    formData.append('episodeNumber', data.episodeNumber);
    formData.append('animeId', data.animeId);

    // Append file
    formData.append('video', data.video);

    return fetchWithAuth('/episodes', {
      method: 'POST',
      body: formData,
    });
  },

  // Add to your episodeService object
  delete: async (id: string): Promise<{ success: boolean; message: string }> => {
    return fetchWithAuth(`/episodes/${id}`, {
      method: 'DELETE',
    });
  },
};
