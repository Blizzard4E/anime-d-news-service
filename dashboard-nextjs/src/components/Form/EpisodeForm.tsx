// components/Form/AddEpisodeForm.tsx
import { useState } from 'react';
import CoolButton from '@/components/CustomButton';
import FileUpload from '@/components/UploadButton';
import { Box, Button, Alert, Snackbar } from '@mui/material';
import { useCreateEpisode } from '@/hooks/useEpisodes';

interface AddEpisodeFormProps {
  animeId: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

const EpisodeForm: React.FC<AddEpisodeFormProps> = ({ animeId, onSuccess, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    episodeNumber: '',
  });
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  const createEpisode = useCreateEpisode();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!videoFile) {
      setSnackbar({
        open: true,
        message: 'Please select a video file',
        severity: 'error',
      });
      return;
    }

    try {
      await createEpisode.mutateAsync({
        title: formData.title,
        episodeNumber: formData.episodeNumber,
        animeId,
        video: videoFile,
      });

      // Show success message
      setSnackbar({
        open: true,
        message: 'Episode added successfully!',
        severity: 'success',
      });

      // Reset form
      setFormData({ title: '', episodeNumber: '' });
      setVideoFile(null);

      // Call success callback and close dialog after a short delay
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 1000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Failed to create episode. Please try again.',
        severity: 'error',
      });
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (file: File | null) => {
    setVideoFile(file);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <CoolButton
        required
        id='filled-title'
        label='Title'
        fullWidth
        variant='filled'
        type='text'
        name='title'
        value={formData.title}
        onChange={handleTextChange}
        style={{ marginBottom: 5 }}
      />

      <CoolButton
        required
        id='filled-episode-number'
        label='Episode Number'
        fullWidth
        variant='filled'
        type='text'
        name='episodeNumber'
        value={formData.episodeNumber}
        onChange={handleTextChange}
        style={{ marginBottom: 15 }}
      />

      <Box sx={{ p: 3, border: `2px dashed lightblue`, borderRadius: '16px' }}>
        <FileUpload maxSize={500 * 1024 * 1024} accept='video/mp4' onFilesSelected={handleFileChange} />
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button variant='contained' type='submit' disabled={createEpisode.isPending}>
          {createEpisode.isPending ? 'Uploading...' : 'Upload'}
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </form>
  );
};

export default EpisodeForm;
