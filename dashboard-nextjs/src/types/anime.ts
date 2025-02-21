export interface Anime {
  _id: string;
  title: string;
  description: string;
  genres: string[];
  studio: string;
  releaseDate: string;
  status: 'ongoing' | 'completed';
  posterUrl: string;
  coverUrl: string;
  logoUrl: string;
  episodes: Episode[];
  trailerUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Episode {
  _id: string;
  title: string;
  episodeNumber: string;
  videoUrl: string;
  animeId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Genre {
  _id: string;
  name: string;
}

export interface Studio {
  _id: string;
  name: string;
}

export interface CreateAnimeInput {
  title: string;
  description: string;
  genres: string[];
  studio: string;
  releaseDate: string;
  status: 'ongoing' | 'completed';
}
