// hooks/useAnimes.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { animeService } from '@/services/anime-service';
import { CreateAnimeInput } from '@/types/anime';

export const useAnimes = () => {
  return useQuery({
    queryKey: ['animes'],
    queryFn: animeService.getAll,
  });
};

export const useAnime = (id: string | undefined) => {
  return useQuery({
    queryKey: ['animes', id],
    queryFn: () => (id ? animeService.getById(id) : Promise.reject('No ID provided')),
    enabled: !!id,
  });
};

export const useCreateAnime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      data,
      files,
    }: {
      data: CreateAnimeInput;
      files: {
        poster: File;
        cover: File;
        logo: File;
        trailer: File;
      };
    }) => animeService.create(data, files),
    onSuccess: response => {
      queryClient.invalidateQueries({ queryKey: ['animes'] });
      // Optionally add the new anime to the cache
      queryClient.setQueryData(['animes', response.data._id], response);
    },
  });
};

export const useUpdateAnime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
      files,
    }: {
      id: string;
      data: Partial<CreateAnimeInput>;
      files?: {
        poster?: File;
        cover?: File;
        logo?: File;
        trailer?: File;
      };
    }) => animeService.update(id, data, files),
    onSuccess: (response, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['animes'] });
      queryClient.setQueryData(['animes', id], response);
    },
  });
};

export const useDeleteAnime = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => animeService.delete(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['animes'] });
      queryClient.removeQueries({ queryKey: ['animes', id] });
    },
  });
};
