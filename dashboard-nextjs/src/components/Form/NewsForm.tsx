'use client';
import { useState } from 'react';
import { Box, Button, Typography, Snackbar, Alert } from '@mui/material';
import CoolButton from '@/components/CustomButton';
import FileUpload from '@/components/UploadButton';
import RichTextEditor from '../RichTextEditor';
import { useCreateNews } from '@/hooks/useNews';

const NewsForm = ({ onClose }: { onClose: () => void }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const createNews = useCreateNews();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !coverFile) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      formData.append('cover_image', coverFile);

      console.log('Submitting form data:', {
        title,
        content,
        coverFile: coverFile.name,
      });

      await createNews.mutateAsync({
        title,
        content,
        cover_image: coverFile,
      });

      setSuccessMessage('News created successfully!');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      console.error('Error creating news:', err);
      setError(err instanceof Error ? err.message : 'Failed to create news');
    }
  };

  const handleContentChange = (newContent: string) => {
    setContent(newContent);
  };

  const handleFileChange = (file: File | null) => {
    console.log('File selected:', file);
    setCoverFile(file);
    setError(null);
  };

  const isSubmitting = createNews.isPending;

  return (
    <Box component='form' onSubmit={handleSubmit} className='max-w-3xl mx-auto p-6'>
      <Typography variant='h4' className='mb-6'>
        Add News
      </Typography>

      {error && (
        <Alert severity='error' className='mb-4'>
          {error}
        </Alert>
      )}

      <CoolButton
        required
        label='Title'
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        variant='filled'
        type='text'
        className='mb-4'
      />

      <Box className='mb-4'>
        <Typography variant='body1' className='mb-2'>
          Cover Image
        </Typography>
        <Box className='p-4 border-2 border-dashed rounded-xl' sx={{ borderColor: coverFile ? 'success.main' : 'grey.300' }}>
          <FileUpload maxSize={5 * 1024 * 1024} accept='image/jpeg,image/png' onFilesSelected={handleFileChange} />
          {coverFile && (
            <Typography variant='caption' className='mt-2 block'>
              Selected file: {coverFile.name}
            </Typography>
          )}
        </Box>
      </Box>

      <Box className='mb-4'>
        <Typography variant='body1' className='mb-2'>
          News Content
        </Typography>
        <RichTextEditor value={content} onChange={handleContentChange} />
      </Box>

      <Box className='flex justify-end gap-4 mt-8'>
        <Button variant='outlined' onClick={onClose} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button variant='contained' type='submit' disabled={isSubmitting || !title || !content || !coverFile}>
          {isSubmitting ? 'Creating...' : 'Create News'}
        </Button>
      </Box>

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity='success'>{successMessage}</Alert>
      </Snackbar>
    </Box>
  );
};

export default NewsForm;
