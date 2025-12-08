import { api } from '../client';
import { endpoints } from '../endpoints';
import { TopFornecedor, DashboardData } from '../../types';

export const getDashboard = async () => {
  const res = await api.get(endpoints.dashboard);
  return res.data as DashboardData;
};