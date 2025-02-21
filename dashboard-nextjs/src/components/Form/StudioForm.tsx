// components/Form/StudioForm.tsx
import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import CoolButton from '@/components/CustomButton';
import Snackbar from '@/components/Snackbar';
import { useCreateStudio, useUpdateStudio } from '@/hooks/useStudios';
import { Studio } from '@/services/studio-service';

interface IFormInput {
  title: string;
}

interface AlertState {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
}

interface StudioFormProps {
  handleToggleDialog: () => void;
  initialData?: Studio;
  mode: 'add' | 'edit';
}

const StudioForm: React.FC<StudioFormProps> = ({ handleToggleDialog, initialData, mode }) => {
  const [formData, setFormData] = useState<IFormInput>({ title: '' });
  const [alert, setAlert] = useState<AlertState>({
    open: false,
    message: '',
    severity: 'success',
  });

  const createStudioMutation = useCreateStudio();
  const updateStudioMutation = useUpdateStudio();

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setFormData({ title: initialData.title });
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

    if (!formData.title.trim()) {
      showAlert('Studio name is required', 'error');
      return;
    }

    if (mode === 'add') {
      createStudioMutation.mutate(
        { title: formData.title.trim() },
        {
          onSuccess: () => {
            showAlert('Studio created successfully!', 'success');
            setFormData({ title: '' });
            handleToggleDialog();
          },
          onError: error => {
            showAlert(error instanceof Error ? error.message : 'Failed to create studio', 'error');
          },
        },
      );
    } else if (mode === 'edit' && initialData?._id) {
      updateStudioMutation.mutate(
        {
          id: initialData._id,
          data: { title: formData.title.trim() },
        },
        {
          onSuccess: () => {
            showAlert('Studio updated successfully!', 'success');
            setFormData({ title: '' });
            handleToggleDialog();
          },
          onError: error => {
            showAlert(error instanceof Error ? error.message : 'Failed to update studio', 'error');
          },
        },
      );
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isPending = mode === 'add' ? createStudioMutation.isPending : updateStudioMutation.isPending;
  const error = mode === 'add' ? createStudioMutation.error : updateStudioMutation.error;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <CoolButton
        required
        id='filled-studio-name'
        label='Studio Title'
        fullWidth
        variant='filled'
        type='text'
        name='title'
        value={formData.title}
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

export default StudioForm;
