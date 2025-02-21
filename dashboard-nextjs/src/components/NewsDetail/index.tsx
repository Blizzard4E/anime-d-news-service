import { Box, Typography, Avatar, Divider } from '@mui/material';
import { format } from 'date-fns';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import { NewsItem } from '@/services/news-service';
import Image from 'next/image';

interface NewsDetailProps {
  news: NewsItem;
}

const NewsDetail = ({ news }: NewsDetailProps) => {
  console.log(news);

  // Safely get the avatar letter
  const getAvatarLetter = (username?: string) => {
    if (!username) return '?';
    return username.charAt(0).toUpperCase();
  };

  if (!news) {
    return (
      <Box className='p-4'>
        <Typography>No news content available.</Typography>
      </Box>
    );
  }

  return (
    <Box className='max-w-4xl mx-auto'>
      {/* Cover Image */}
      {news.cover_image && (
        <Box className='relative w-full h-[400px] mb-6'>
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
            <Image
              src={`${process.env.NEXT_PUBLIC_API_URL}${news.cover_image}`}
              alt={news.title || 'News cover image'}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        </Box>
      )}

      {/* Title and Meta Info */}
      <Box className='mb-6'>
        <Typography variant='h4' className='mb-8'>
          {news.title}
        </Typography>
        <Box className='flex items-center gap-4 text-gray-600'>
          <Box className='flex items-center gap-2'>
            <p>by</p>
            <Typography variant='body2'>{news.author?.username || 'Anonymous'}</Typography>
          </Box>
          {news.created_at && <Typography variant='body2'>{format(new Date(news.created_at), 'MMM dd, yyyy HH:mm')}</Typography>}
          <Box className='flex items-center gap-1'>
            <ThumbUpOutlinedIcon className='w-4 h-4' />
            <Typography variant='body2'>{news?.likes_count ?? 0}</Typography>
          </Box>
        </Box>
      </Box>

      <Divider className='my-6' />

      {/* Content */}
      {news.content && (
        <Box className='prose max-w-none mb-8'>
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </Box>
      )}

      <Divider className='my-6' />

      {/* Comments Section */}
      <Box>
        <Typography variant='h6' className='mb-4'>
          Comments ({news.comments?.length ?? 0})
        </Typography>

        {/* Comments List */}
        <Box className='space-y-4'>
          {news.comments?.map(comment => (
            <Box key={comment.id} className='bg-gray-50 p-4 rounded-lg'>
              <Box className='flex items-center gap-2 mb-2'>
                <Avatar className='w-6 h-6'>{getAvatarLetter(comment.author?.username)}</Avatar>
                <Typography variant='subtitle2'>{comment.author?.username || 'Anonymous'}</Typography>
                {comment.created_at && (
                  <Typography variant='caption' color='textSecondary'>
                    {format(new Date(comment.created_at), 'MMM dd, yyyy HH:mm')}
                  </Typography>
                )}
              </Box>
              <Typography variant='body2'>{comment.content}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NewsDetail;
