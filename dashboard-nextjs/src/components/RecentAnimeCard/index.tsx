import { Box, Typography } from '@mui/material';
import Image from 'next/image';

interface ImageCardProps {
  title: string;
  posterUrl: string;
}

const RecentAnimeCard: React.FC<ImageCardProps> = ({ title, posterUrl }) => {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
  const imageUrl = posterUrl ? `${BASE_URL}/${posterUrl.replace(/\\/g, '/')}` : '/assets/images/poster.png';

  return (
    <Box
      sx={{
        '&:hover': {
          '& .image-container': {
            transform: 'translateY(-8px)',
            boxShadow: 6,
          },
          '& .title': {
            color: 'primary.main',
          },
        },
      }}>
      <Box
        className='image-container'
        sx={{
          position: 'relative',
          width: '100%',
          height: '300px',
          borderRadius: 4,
          overflow: 'hidden',
          boxShadow: 3,
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        }}>
        <Image src={imageUrl} alt={title} fill style={{ objectFit: 'cover' }} />
      </Box>
      <Typography
        className='title'
        variant='h6'
        sx={{
          mt: 1.5,
          fontWeight: 'bold',
          textAlign: 'left',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          transition: 'color 0.3s ease-in-out',
        }}>
        {title}
      </Typography>
    </Box>
  );
};

export default RecentAnimeCard;
