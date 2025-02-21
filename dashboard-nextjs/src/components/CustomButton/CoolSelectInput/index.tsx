import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Select, { SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: '100%',
  marginBottom: 5,
  '& .MuiInputLabel-root': {
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    },
  },
}));

const StyledSelect = styled((props: SelectProps) => <Select variant='filled' disableUnderline {...props} />)(({ theme }) => ({
  overflow: 'hidden',
  borderRadius: 4,
  backgroundColor: 'transparent',
  border: '1px solid',
  borderColor: theme.palette.mode === 'light' ? '#E0E3E7' : '#2D3843',
  transition: theme.transitions.create(['border-color', 'background-color', 'box-shadow']),
  '&:hover': {
    backgroundColor: 'transparent',
  },
  '&.Mui-focused': {
    backgroundColor: 'transparent',
    boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
    borderColor: theme.palette.primary.main,
  },
  '&.Mui-error': {
    borderColor: theme.palette.error.main,
    '&.Mui-focused': {
      boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 2px`,
    },
  },
  '& .MuiSelect-icon': {
    color: theme.palette.mode === 'light' ? '#6B7280' : '#9CA3AF',
  },
  '&.MuiFilledInput-root': {
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    '&.Mui-focused': {
      backgroundColor: 'transparent',
    },
  },
}));

export interface CoolSelectProps extends Omit<SelectProps, 'variant'> {
  label: string;
  options: { value: string | number; label: string }[];
  error?: boolean;
  helperText?: string;
}

const CoolSelect = React.forwardRef<HTMLSelectElement, CoolSelectProps>(
  ({ label, options, required, error, helperText, ...props }, ref) => {
    return (
      <StyledFormControl variant='filled' error={error}>
        <InputLabel required={required}>{label}</InputLabel>
        <StyledSelect label={label} ref={ref} {...props}>
          {options.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </StyledSelect>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </StyledFormControl>
    );
  },
);

CoolSelect.displayName = 'CoolSelect';

export default CoolSelect;
