'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment, Button, Box, Typography, Divider, Alert, Snackbar } from '@mui/material';
import theme from '@/theme';
import CoolButton from '@/components/CustomButton';
import { StyledFormControl, StyledInputLabel, StyledFilledInput } from '@/components/CustomButton/CoolInputFill';
import { useRegister } from '@/hooks/useAuth';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<IFormInput>({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [showPassword, setShowPassword] = useState(false);
  const register = useRegister();

  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string | null } = {};
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        await register.mutateAsync(formData);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          submit: 'Registration failed. Please try again.',
        }));
      }
    }
  };

  return (
    <main className='h-[100vh] w-full bg-[rgb(238,242,246)] flex justify-center items-center'>
      <div className='w-full max-w-md px-4'>
        <form className='bg-white p-8 rounded-[6px]' onSubmit={handleSubmit}>
          <Box className='mb-4 text-center'>
            <p className={`text-[1.5rem] font-bold text-[${theme.palette.primary.main}]`}>Anime D Vers</p>
          </Box>
          <Box className='mt-6 mb-6'>
            <Typography variant='h6' className='text-center font-semibold'>
              Hi, Welcome!
            </Typography>
            <Typography variant='body2' className='text-center'>
              Fill in your details to sign up
            </Typography>
          </Box>

          {errors.submit && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {errors.submit}
            </Alert>
          )}

          <CoolButton
            required
            label='Username'
            id='filled-username'
            fullWidth
            variant='filled'
            name='username'
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            style={{ marginBottom: 5 }}
          />
          <CoolButton
            required
            id='filled-email'
            label='Email'
            fullWidth
            variant='filled'
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            style={{ marginBottom: 5 }}
          />
          <StyledFormControl variant='filled' fullWidth error={!!errors.password} required>
            <StyledInputLabel htmlFor='filled-adornment-password'>Password</StyledInputLabel>
            <StyledFilledInput
              id='filled-adornment-password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formData.password}
              onChange={handleChange}
              disableUnderline
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='toggle password visibility'
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge='end'>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </StyledFormControl>
          {errors.password && <Typography className='text-red-500'>{errors.password}</Typography>}

          <Button type='submit' variant='contained' fullWidth style={{ marginTop: 5 }} disabled={register.isPending}>
            {register.isPending ? 'Registering...' : 'Register'}
          </Button>

          <Divider sx={{ margin: '1rem 0 1rem 0' }} />
          <Box className='mt-2 text-center'>
            <Typography variant='body2'>
              Already got an account?&nbsp;
              <Link href={'/auth/login'} className={`text-[${theme.palette.primary.main}]`}>
                Login!
              </Link>
            </Typography>
          </Box>
        </form>
      </div>

      <Snackbar
        open={register.isSuccess}
        autoHideDuration={3000}
        onClose={() => {}}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity='success'>User created successfully! Redirecting to login...</Alert>
      </Snackbar>
    </main>
  );
}
