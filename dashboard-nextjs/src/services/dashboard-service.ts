// services/dashboard-service.ts
import { fetchWithAuth } from '@/lib/api-client';

interface DashboardStats {
  totals: {
    anime: number;
    episodes: number;
    users: number;
  };
  recent: {
    anime: {
      _id: string;
      title: string;
      posterUrl: string;
      status: string;
    }[];
  };
}

interface DashboardResponse {
  success: boolean;
  data: DashboardStats;
}

export const dashboardService = {
  getStats: async (): Promise<DashboardResponse> => {
    return fetchWithAuth('/dashboard');
  },
};
