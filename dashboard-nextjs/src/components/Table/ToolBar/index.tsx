import { styled } from '@mui/system';
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { alpha, Theme } from '@mui/material/styles';

const CustomQuickFilter = styled(props => <GridToolbarQuickFilter {...props} placeholder='Search' />)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: '16px',
  width: '100%',
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
  transition: (theme as Theme).transitions.create(['border-color', 'background-color', 'box-shadow']),
  padding: '0.2rem !important',
  '&.MuiFormControl-root': {
    paddingBottom: '0.2rem !important',
  },
  '& .MuiInputBase-root': {
    '&:before': {
      borderBottom: 'none',
    },
    '&:after': {
      borderBottom: 'none',
    },
    '&:hover:not(.Mui-disabled):before': {
      borderBottom: 'none',
    },
  },
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem !important',
    color: theme.palette.primary.main,
  },
  '& .MuiInputBase-input': {
    fontSize: '1.2rem !important',
  },
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&.Mui-focused': {
    backgroundColor: 'transparent',
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
}));

const Toolbar: React.FC = () => (
  <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <CustomQuickFilter />
  </GridToolbarContainer>
);

export default Toolbar;
