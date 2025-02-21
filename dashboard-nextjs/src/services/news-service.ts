// services/news-service.ts
import { fetchWithAuth } from '@/lib/api-client';

export interface Author {
  id: string;
  username: string;
  email: string;
}

export interface Comment {
  id: string;
  news: string;
  author: Author;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  cover_image: string;
  author: Author;
  created_at: string;
  updated_at: string;
  likes_count?: number;
  comments?: Comment[];
  is_liked?: boolean;
}

export interface CreateNewsInput {
  title: string;
  content: string;
  cover_image: File;
}

export interface UpdateNewsInput {
  title?: string;
  content?: string;
  cover_image?: File;
}

export const newsService = {
  getAll: async (): Promise<NewsItem[]> => {
    return fetchWithAuth('news/');
  },

  getById: async (id: string): Promise<NewsItem> => {
    return fetchWithAuth(`news/${id}/`);
  },

  create: async (data: CreateNewsInput): Promise<NewsItem> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);
    if (data.cover_image) {
      formData.append('cover_image', data.cover_image);
    }

    return fetchWithAuth('news/', {
      method: 'POST',
      body: formData,
    });
  },

  update: async (id: string, data: UpdateNewsInput): Promise<NewsItem> => {
    const formData = new FormData();
    if (data.title) formData.append('title', data.title);
    if (data.content) formData.append('content', data.content);
    if (data.cover_image) formData.append('cover_image', data.cover_image);

    return fetchWithAuth(`news/${id}/`, {
      method: 'PATCH',
      body: formData,
    });
  },

  delete: async (id: string): Promise<void> => {
    await fetchWithAuth(`news/${id}/`, {
      method: 'DELETE',
    });
  },
};
