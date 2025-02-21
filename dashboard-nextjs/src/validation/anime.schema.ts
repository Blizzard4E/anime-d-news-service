import { z } from 'zod';

const AnimeStatus = z.enum(['ongoing', 'completed']);

export const createAnimeSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  genres: z.array(z.string().min(1), {
    required_error: 'At least one genre is required',
    invalid_type_error: 'Genres must be an array of strings',
  }),
  studio: z.string({
    required_error: 'Studio is required',
  }),
  releaseDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format. Use YYYY-MM-DD'),
  status: AnimeStatus,
});

export type CreateAnimeInput = z.infer<typeof createAnimeSchema>;
