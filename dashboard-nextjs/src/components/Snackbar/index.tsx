import { Alert, Snackbar as MuiSnackbar } from '@mui/material';

interface SnackbarProps {
  open: boolean;
  message: string;
  severity: 'success' | 'error' | 'info' | 'warning';
  onClose: () => void;
}

const Snackbar = ({ open, message, severity, onClose }: SnackbarProps) => {
  return (
    <MuiSnackbar open={open} autoHideDuration={6000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert onClose={onClose} severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </MuiSnackbar>
  );
};

export default Snackbar;
