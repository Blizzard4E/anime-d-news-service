import Image from 'next/image';
import { useState } from 'react';
import Grid from '@mui/material/Grid2';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  Stack,
  Typography,
  Paper,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  DialogContent,
} from '@mui/material';
import EpisodeListTable from '../Table/Variants/EpisodeListTable';
import EpisodeForm from '../Form/EpisodeForm';
import CloseIcon from '@mui/icons-material/Close';
import CameraOutdoorIcon from '@mui/icons-material/CameraOutdoor';
import VideoPlayer from '../VideoPlayer';
import { Episode } from '@/types/anime';
import { useAnime } from '@/hooks/useAnimes';

// Define anime prop type
interface AnimeDetailProps {
  anime?: {
    _id: string;
    title?: string;
    description?: string;
    posterUrl?: string;
    coverUrl?: string;
    logoUrl?: string;
    trailerUrl?: string;
    genres?: { _id: string; title: string }[];
    studio?: { title?: string };
    releaseDate?: string;
    status?: string;
    episodes?: Episode[];
  };
}

const AnimeDetail: React.FC<AnimeDetailProps> = ({ anime }) => {
  const [openAddEpisodeDialog, setOpenAddEpisodeDialog] = useState(false);

  // Fallback values to prevent errors
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
  const title = anime?.title?.trim() || 'Unknown Title';
  const description = anime?.description?.trim() || 'No description available';
  const logoUrl = anime?.logoUrl ? `${BASE_URL}/${anime.logoUrl.replace(/\\/g, '/')}` : '/assets/images/logo.png';
  const releaseDate = anime?.releaseDate ? new Date(anime.releaseDate).getFullYear().toString() : 'Unknown Year';
  const trailerUrl = anime?.trailerUrl ? `${BASE_URL}/${anime.trailerUrl.replace(/\\/g, '/')}` : '';
  const genres = Array.isArray(anime?.genres) ? anime.genres : [];
  const studio = anime?.studio?.title?.trim() || 'Unknown Studio';
  const animeId = anime?._id || '';

  // Use the query to get real-time data
  const { data: animeData } = useAnime(animeId);

  // Use the live data for episodes
  const episodes = animeData?.data?.episodes || [];

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          mb: 3,
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        }}>
        <Grid container spacing={4}>
          {/* Image section */}
          <Grid size={3}>
            <Typography
              variant='h4'
              fontWeight='bold'
              sx={{
                mb: 2,
                background: 'rgba(255, 140, 0,1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}>
              {title}
            </Typography>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '400px',
                borderRadius: 4,
                marginBottom: '1rem',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': { transform: 'scale(1.02)' },
              }}>
              <Image src={logoUrl} alt={title} fill style={{ objectFit: 'cover' }} priority />
            </Box>

            {/* Quick Info */}
            <Stack spacing={0.5} sx={{ mb: 3 }}>
              <Stack direction='row' alignItems='center' spacing={1}>
                <StarRateRoundedIcon sx={{ color: '#FFD700' }} />
                <Typography variant='h6' fontWeight='medium'>
                  9.8
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={1}>
                <CameraOutdoorIcon sx={{ color: 'text.secondary' }} />
                <Typography variant='h6' fontWeight='medium'>
                  {studio}
                </Typography>
              </Stack>
              <Stack direction='row' alignItems='center' spacing={1}>
                <CalendarTodayIcon sx={{ color: 'text.secondary' }} />
                <Typography variant='h6'>{releaseDate}</Typography>
              </Stack>
              <Stack direction='row' spacing={0.2} flexWrap='wrap' gap={0.2}>
                {genres.length > 0 ? (
                  genres.map(genre => (
                    <Chip
                      key={genre._id}
                      label={genre.title}
                      sx={{
                        borderRadius: 2,
                        background: 'rgba(255, 140, 0,1)',
                        color: 'white',
                        fontWeight: 'medium',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        },
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))
                ) : (
                  <Typography variant='body2'>No genres available</Typography>
                )}
              </Stack>
            </Stack>
          </Grid>

          {/* Video & Info Section */}
          <Grid size={9}>
            {/* Video Player */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                background: 'inherit',
              }}>
              {trailerUrl ? <VideoPlayer videoUrl={trailerUrl} /> : <Typography>No trailer available</Typography>}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Content Sections */}
      <Stack spacing={2}>
        {/* Description Section */}
        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Accordion
            defaultExpanded
            elevation={0}
            sx={{ '&:before': { display: 'none' }, background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)' }}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />} sx={{ px: 3, py: 2 }}>
              <Typography variant='h6' fontWeight='bold'>
                Description
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 3, pb: 3 }}>
              <Typography variant='body1' color='text.secondary' lineHeight={1.8}>
                {description}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Paper>

        {/* Episodes Section */}
        <Paper elevation={0} sx={{ borderRadius: 4, overflow: 'hidden' }}>
          <Accordion
            defaultExpanded
            elevation={0}
            sx={{ '&:before': { display: 'none' }, background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)' }}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />} sx={{ px: 3, py: 2 }}>
              <Typography variant='h6' fontWeight='bold'>
                Episodes
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0 }}>
              <Divider />
              <Box className='flex justify-start items-center mt-2'>
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => setOpenAddEpisodeDialog(true)}
                  sx={{
                    borderRadius: '16px',
                    fontWeight: 'bold',
                    letterSpacing: 1,
                    background: 'rgb(25,118,210,0.9)',
                    transition: 'all 0.2s',
                    '&:hover': { background: 'rgb(25,118,210,1)', color: 'white', letterSpacing: 3 },
                  }}>
                  Add New Episode
                </Button>
              </Box>

              {/* Add Episode Dialog */}
              <Dialog fullWidth maxWidth='md' open={openAddEpisodeDialog} onClose={() => setOpenAddEpisodeDialog(false)}>
                <DialogTitle>
                  <Box display='flex' justifyContent='space-between' alignItems='center'>
                    <Typography variant='h6'>Add New Episode</Typography>
                    <IconButton onClick={() => setOpenAddEpisodeDialog(false)}>
                      <CloseIcon />
                    </IconButton>
                  </Box>
                </DialogTitle>
                <DialogContent>
                  <EpisodeForm
                    animeId={anime?._id || ''}
                    onSuccess={() => {
                      setOpenAddEpisodeDialog(false);
                    }}
                    onClose={() => setOpenAddEpisodeDialog(false)}
                  />
                </DialogContent>
              </Dialog>

              {/* Episode List */}
              <Box>
                <Box>
                  <EpisodeListTable episodes={episodes} />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Paper>
      </Stack>
    </Box>
  );
};

export default AnimeDetail;
