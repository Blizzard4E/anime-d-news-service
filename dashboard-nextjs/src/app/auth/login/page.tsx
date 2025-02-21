'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import theme from '@/theme';
import CoolButton from '@/components/CustomButton';
import { StyledFormControl, StyledInputLabel, StyledFilledInput } from '@/components/CustomButton/CoolInputFill';
import { InputAdornment, IconButton, Button, Box, Divider, Typography, Alert, Collapse } from '@mui/material';

interface IFormInput {
  username: string;
  password: string;
}

type FormErrors = {
  username?: string;
  password?: string;
  general?: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<IFormInput>({ username: '', password: '' }); // Changed from email
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleClickShowPassword = () => setShowPassword(prev => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validateForm()) return;

    setIsPending(true);
    try {
      const result = await signIn('credentials', {
        username: formData.username,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setErrors({ general: 'Invalid username or password' });
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (error) {
      console.error(error);
      setErrors({ general: 'An unexpected error occurred' });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className='h-screen w-full bg-[rgb(238,242,246)] flex justify-center items-center'>
      <div className='w-full max-w-md px-4'>
        <form className='bg-white p-8 rounded-lg shadow-sm' onSubmit={handleSubmit} noValidate>
          <Box className='mb-4 text-center'>
            <Typography variant='h4' style={{ color: theme.palette.primary.main }} className='font-bold'>
              Anime Dz Ball
            </Typography>
          </Box>

          <Box className='mt-6 mb-6'>
            <Typography variant='h6' className='text-center font-semibold'>
              Login
            </Typography>
            <Typography variant='body2' className='text-center text-gray-600'>
              Enter your credentials to continue
            </Typography>
          </Box>

          <Collapse in={!!errors.general}>
            <Alert severity='error' className='mb-4'>
              {errors.general}
            </Alert>
          </Collapse>

          <CoolButton
            required
            id='filled-username'
            label='Username'
            fullWidth
            variant='filled'
            type='text'
            name='username'
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <div style={{ marginBottom: '0.5rem' }}></div>
          <StyledFormControl variant='filled' fullWidth error={!!errors.password} required className='mb-2'>
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
          {errors.password && (
            <Typography color='error' variant='caption' className='mt-1'>
              {errors.password}
            </Typography>
          )}

          <Box className='mt-2 text-end'>
            <Link
              href='/auth/forgot-password'
              className='no-underline hover:underline'
              style={{ color: theme.palette.primary.main }}>
              Forgot Password?
            </Link>
          </Box>

          <Button fullWidth variant='contained' type='submit' className='mt-4' disabled={isPending}>
            {isPending ? 'Logging in...' : 'Login'}
          </Button>

          <Divider sx={{ margin: '1rem 0' }} />

          <Box className='mt-2 text-center'>
            <Link href='/auth/register' className='text-gray-800 no-underline hover:underline font-medium text-sm'>
              Don&apos;t have an account? Sign up!
            </Link>
          </Box>
        </form>
      </div>
    </main>
  );
}
