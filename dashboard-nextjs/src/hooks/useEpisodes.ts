// hooks/useEpisodes.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { episodeService } from '@/services/episode-service';

// hooks/useEpisodes.ts
export const useCreateEpisode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string; episodeNumber: string; animeId: string; video: File }) => episodeService.create(data),
    onSuccess: (response, variables) => {
      // Invalidate both the specific anime query and the general animes list
      queryClient.invalidateQueries({ queryKey: ['animes'] });
      queryClient.invalidateQueries({ queryKey: ['animes', variables.animeId] });
      // Force a refetch
      queryClient.refetchQueries({ queryKey: ['animes', variables.animeId] });
    },
  });
};

export const useDeleteEpisode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => episodeService.delete(id),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (_, variables) => {
      // Invalidate and refetch queries
      queryClient.invalidateQueries({ queryKey: ['animes'] });
    },
  });
};
