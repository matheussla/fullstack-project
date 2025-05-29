import axios from 'axios';
import { ICase, ILoginCredentials, ILoginResponse } from '../interfaces';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  login: async (credentials: ILoginCredentials): Promise<ILoginResponse> => {
    const { data } = await api.post<ILoginResponse>('/auth/login', credentials);
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  },
};

export const caseService = {
  listCases: async (): Promise<ICase[]> => {
    const { data } = await api.get<ICase[]>('/cases');
    return data;
  },

  createCase: async (caseData: Omit<ICase, 'id' | 'createdAt' | 'updatedAt'>): Promise<ICase> => {
    const { data } = await api.post<ICase>('/cases', caseData);
    return data;
  },

  deleteCase: async (id: string): Promise<void> => {
    await api.delete(`/cases/${id}`);
  },

  updateCase: async (id: string, caseData: Partial<ICase>): Promise<ICase> => {
    const { data } = await api.put<ICase>(`/cases/${id}`, caseData);
    return data;
  },
};

export default api; 