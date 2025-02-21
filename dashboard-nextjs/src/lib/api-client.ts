// lib/api-client.ts
'use server';

import { OPTIONS } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const session = await getServerSession(OPTIONS);

  const headersRecord: Record<string, string> = {
    ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json' }),
    ...(session?.access && { Authorization: `Bearer ${session.access}` }),
    ...(options.headers as Record<string, string>),
  };

  Object.keys(headersRecord).forEach(key => {
    if (headersRecord[key] === undefined || headersRecord[key] === null) {
      delete headersRecord[key];
    }
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000';
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${normalizedEndpoint}`;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers: headersRecord,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    // If DELETE request and status is 204, return void
    if (options.method === 'DELETE' && response.status === 204) {
      return;
    }

    // For other requests, try to parse JSON
    return response.json().catch(() => ({}));
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function fetchWithoutAuth(endpoint: string, options: RequestInit = {}) {
  const headersRecord: Record<string, string> = {
    ...(!(options.body instanceof FormData) && { 'Content-Type': 'application/json' }),
    ...(options.headers as Record<string, string>),
  };

  Object.keys(headersRecord).forEach(key => {
    if (headersRecord[key] === undefined || headersRecord[key] === null) {
      delete headersRecord[key];
    }
  });

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'; // Changed port
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = `${baseUrl}${normalizedEndpoint}`;

  try {
    const response = await fetch(fullUrl, {
      ...options,
      headers: headersRecord,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `Request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
