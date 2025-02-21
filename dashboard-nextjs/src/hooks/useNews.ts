// hooks/useNews.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { newsService, CreateNewsInput, UpdateNewsInput } from '@/services/news-service';

export const useNews = () => {
  return useQuery({
    queryKey: ['news'],
    queryFn: newsService.getAll,
  });
};

export const useNewsById = (id: string) => {
  return useQuery({
    queryKey: ['news', id],
    queryFn: () => newsService.getById(id),
    enabled: !!id,
  });
};

export const useCreateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNewsInput) => newsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useUpdateNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateNewsInput }) => newsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};

export const useDeleteNews = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => newsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
};
