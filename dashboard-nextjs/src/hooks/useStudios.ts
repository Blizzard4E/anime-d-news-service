// hooks/useStudios.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { studioService, CreateStudioInput, UpdateStudioInput } from '@/services/studio-service';

export const useStudios = () => {
  return useQuery({
    queryKey: ['studios'],
    queryFn: studioService.getAll,
  });
};

export const useCreateStudio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStudioInput) => studioService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studios'] });
    },
  });
};

export const useUpdateStudio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateStudioInput }) => studioService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studios'] });
    },
  });
};

export const useDeleteStudio = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studioService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studios'] });
    },
  });
};
