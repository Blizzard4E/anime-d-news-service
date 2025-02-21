import { Box, Typography } from '@mui/material';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {videoUrl ? (
        <ReactPlayer url={videoUrl} controls width='100%' height='100%' style={{ maxHeight: '100vh', maxWidth: '100vw' }} />
      ) : (
        <Typography>No trailer available</Typography>
      )}
    </Box>
  );
};

export default VideoPlayer;
