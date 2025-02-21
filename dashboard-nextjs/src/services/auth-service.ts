import { fetchWithoutAuth } from '@/lib/api-client';

// services/auth-service.ts
interface RegisterInput {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  message: string;
}

export const authService = {
  register: async (data: RegisterInput): Promise<RegisterResponse> => {
    return fetchWithoutAuth('/register', {
      // Changed from /auth/register
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  },
};
