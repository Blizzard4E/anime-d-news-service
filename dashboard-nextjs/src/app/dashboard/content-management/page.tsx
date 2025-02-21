'use client';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Paper, Stack, Typography } from '@mui/material';
import NewsListTable from '@/components/Table/Variants/NewsListTable';
import NewsForm from '@/components/Form/NewsForm';

const ContentManagementPage = () => {
  const [openNewsDialog, setOpenNewsDialog] = useState(false);

  const handleToggleNewsDialog = () => {
    setOpenNewsDialog(prev => !prev);
  };

  return (
    <Box>
      <Typography variant='h2' sx={{ fontWeight: 'bold' }}>
        News Management
      </Typography>
      <Typography variant='h6' sx={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.6)' }}>
        Manage all your news content
      </Typography>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 50%)',
        }}>
        <Stack direction='row' spacing={2}>
          <Button
            variant='contained'
            color='success'
            startIcon={<AddCircleOutlineOutlinedIcon />}
            onClick={() => handleToggleNewsDialog()}
            sx={{
              borderRadius: '16px',
              fontWeight: 'bold',
              letterSpacing: 1,
              transition: 'all 0.2s',
              '&:hover': {
                background: 'rgb(25,118,210,1)',
                color: 'white',
                letterSpacing: 3,
              },
            }}>
            Add News
          </Button>
        </Stack>
      </Paper>
      <div className='w-full overflow-hidden'>
        {/* Your table component with full width */}
        <div className='w-full'>
          <NewsListTable />
        </div>
      </div>
      <Dialog fullWidth maxWidth='md' open={openNewsDialog} onClose={handleToggleNewsDialog}>
        <DialogTitle>
          <Box display='flex' justifyContent='space-between' alignItems='center'>
            <Typography variant='h6'>Add New Anime Content</Typography>
            <IconButton onClick={() => handleToggleNewsDialog()}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <NewsForm onClose={handleToggleNewsDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ContentManagementPage;
