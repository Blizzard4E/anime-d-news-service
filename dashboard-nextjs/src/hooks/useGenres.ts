// hooks/useGenres.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { genreService, CreateGenreInput, UpdateGenreInput } from '@/services/genre-service';

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: genreService.getAll,
  });
};

export const useCreateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGenreInput) => genreService.create(data),
    onSuccess: () => {
      // Invalidate and refetch genres after a successful creation
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
};

// Add other mutations as needed
export const useUpdateGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGenreInput }) => genreService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
};

export const useDeleteGenre = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => genreService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['genres'] });
    },
  });
};
