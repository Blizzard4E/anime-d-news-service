import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import CoolButton from '@/components/CustomButton';
import Snackbar from '@/components/Snackbar';
import { useCreateGenre, useUpdateGenre } from '@/hooks/useGenres';
import { Genre } from '@/services/genre-service';

interface IFormInput {
  name: string;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface GenreFormProps {
  handleToggleDialog: () => void;
  initialData?: Genre;
  mode: 'add' | 'edit';
}

const GenreForm: React.FC<GenreFormProps> = ({ handleToggleDialog, initialData, mode }) => {
  const [formData, setFormData] = useState<IFormInput>({ name: '' });
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const createGenreMutation = useCreateGenre();
  const updateGenreMutation = useUpdateGenre();

  // Set initial form data when editing
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({ name: initialData.title });
    }
  }, [mode, initialData]);

  const handleCloseAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  const showAlert = (message: string, severity: AlertState['severity']) => {
    setAlert({
      open: true,
      message,
      severity,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showAlert('Genre name is required', 'error');
      return;
    }

    if (mode === 'add') {
      createGenreMutation.mutate(
        { title: formData.name.trim() },
        {
          onSuccess: () => {
            showAlert('Genre created successfully!', 'success');
            setFormData({ name: '' });
            handleToggleDialog();
          },
          onError: error => {
            showAlert(error instanceof Error ? error.message : 'Failed to create genre', 'error');
          },
        },
      );
    } else if (mode === 'edit' && initialData?._id) {
      updateGenreMutation.mutate(
        {
          id: initialData._id,
          data: { title: formData.name.trim() },
        },
        {
          onSuccess: () => {
            showAlert('Genre updated successfully!', 'success');
            setFormData({ name: '' });
            handleToggleDialog();
          },
          onError: error => {
            showAlert(error instanceof Error ? error.message : 'Failed to update genre', 'error');
          },
        },
      );
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isPending = mode === 'add' ? createGenreMutation.isPending : updateGenreMutation.isPending;
  const error = mode === 'add' ? createGenreMutation.error : updateGenreMutation.error;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <CoolButton
        required
        id='filled-genre-name'
        label='Genre Name'
        fullWidth
        variant='filled'
        type='text'
        name='name'
        value={formData.name}
        onChange={handleTextChange}
        error={!!error}
        helperText={error?.message}
        style={{ marginBottom: 5 }}
        disabled={isPending}
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button type='submit' variant='contained' color='primary' disabled={isPending}>
          {isPending ? `${mode === 'add' ? 'Adding' : 'Updating'}...` : mode === 'add' ? 'Add' : 'Update'}
        </Button>
      </Box>
      <Snackbar open={alert.open} message={alert.message} severity={alert.severity} onClose={handleCloseAlert} />
    </form>
  );
};

export default GenreForm;
