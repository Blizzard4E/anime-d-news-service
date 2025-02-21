'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        },
        body: {
          fontFamily: '"Plus Jakarta Sans", sans-serif',
        },
      },
    },
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", sans-serif',
  },
});

export default theme;
