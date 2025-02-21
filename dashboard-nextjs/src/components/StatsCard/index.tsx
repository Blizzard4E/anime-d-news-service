import { Box, Typography, Paper } from '@mui/material';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  gradient: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, gradient }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      borderRadius: 4,
      background: gradient,
      transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
      },
    }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <Box>
        <Typography
          variant='h4'
          sx={{
            fontWeight: 'bold',
            color: 'white',
            mb: 1,
          }}>
          {value}
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: 'rgba(255, 255, 255, 0.8)',
            fontWeight: 'medium',
          }}>
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {icon}
      </Box>
    </Box>
  </Paper>
);

export default StatsCard;
