// hooks/useDashboard.ts
import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/services/dashboard-service';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: dashboardService.getStats,
  });
};
