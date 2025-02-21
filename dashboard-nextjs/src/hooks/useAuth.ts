// hooks/useAuth.ts
import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth-service';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { username: string; email: string; password: string }) => authService.register(data),
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: response => {
      // Wait for 3 seconds before redirecting to show the success message
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    },
  });
};
