import React, { JSX } from 'react';
import CoolTextInput from '@/components/CustomButton';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Box } from '@mui/material';

type ConfirmationDialogProps = {
  title: JSX.Element | string;
  message: JSX.Element | string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  confirmPassword?: string;
  setConfirmPassword?: (value: string) => void;
  withPassword?: boolean;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title,
  message,
  open,
  onClose,
  onConfirm,
  isLoading,
  confirmPassword,
  setConfirmPassword,
  withPassword = false,
}) => {
  return isLoading ? (
    <Box className='h-full w-full flex justify-center items-center bg-[rgba(0,0,0,0.5)]'>
      <CircularProgress />
    </Box>
  ) : (
    <Dialog maxWidth='md' fullWidth open={open} onClose={onClose}>
      <DialogTitle component='div'>{title}</DialogTitle>
      <DialogContent>
        <Box sx={{ marginBottom: '1rem' }}>{message}</Box>
        {withPassword && (
          <CoolTextInput
            required
            id='filled-password'
            label='Confirm Password to Update'
            variant='filled'
            fullWidth
            type='password'
            name='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword?.(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={{ textTransform: 'capitalize' }}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant='contained' sx={{ textTransform: 'capitalize' }}>
          Confirm Update Status
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
