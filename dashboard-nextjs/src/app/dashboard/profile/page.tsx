'use client';
import { Box, Typography, Paper, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Image from 'next/image';
import Grid from '@mui/material/Grid2';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Update the type definition to match NextAuth session
interface ProfileInfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProfileInfoItem = ({ icon, label, value }: ProfileInfoItemProps) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
    <Box
      sx={{
        backgroundColor: 'rgba(255, 140, 0, 0.1)',
        borderRadius: '50%',
        p: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {icon}
    </Box>
    <Box>
      <Typography variant='body2' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body1' fontWeight='medium'>
        {value}
      </Typography>
    </Box>
  </Box>
);

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/auth/login');
  };

  // Show loading state while checking session
  if (status === 'loading') {
    return (
      <Box display='flex' justifyContent='center' alignItems='center' minHeight='80vh'>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  // Don't render profile if no session
  if (!session?.user) {
    return null;
  }

  return (
    <Box>
      {/* Header with Logout Button */}
      <Box
        sx={{
          mb: 4,
          borderRadius: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Box>
          <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
            Profile Page
          </Typography>
          <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>
            Your Information
          </Typography>
        </Box>
        <Button
          variant='outlined'
          color='error'
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            textTransform: 'none',
            px: 3,
            py: 1,
            '&:hover': {
              backgroundColor: 'error.main',
              color: 'white',
            },
          }}>
          Logout
        </Button>
      </Box>

      {/* Profile Content */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        }}>
        <Grid container spacing={4}>
          {/* Profile Image Section */}
          <Grid size={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 2,
              }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                  border: '4px solid white',
                }}>
                <Image src='/assets/images/logo.png' alt='Profile' fill style={{ objectFit: 'contain' }} />
              </Box>
              <Typography
                variant='h4'
                sx={{
                  fontWeight: 'bold',
                  background: 'linear-gradient(45deg, #FF1F8F 30%, #FF8C00 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                {session.user.username}
              </Typography>
            </Box>
          </Grid>

          {/* Profile Info Section */}
          <Grid size={8}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                pl: { xs: 0, md: 4 },
              }}>
              {session.user.email && (
                <ProfileInfoItem
                  icon={<EmailIcon sx={{ color: '#FF8C00' }} />}
                  label='Email Address'
                  value={session.user.email}
                />
              )}
              <ProfileInfoItem icon={<PersonIcon sx={{ color: '#FF8C00' }} />} label='Username' value={session.user.username} />
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProfilePage;
