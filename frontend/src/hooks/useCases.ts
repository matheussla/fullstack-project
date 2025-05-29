import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { caseService } from '../services/api';
import { ICase } from '../interfaces';
import { IPaginationResponse } from '../interfaces';

export const useCases = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<IPaginationResponse<ICase>>({
    queryKey: ['cases', page, limit],
    queryFn: () => caseService.listCases(page, limit),
    staleTime: 1000 * 60 * 5, 
  });

  const createCaseMutation = useMutation({
    mutationFn: (caseData: Omit<ICase, 'id' | 'createdAt' | 'updatedAt'>) =>
      caseService.createCase(caseData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });

  const updateCaseMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ICase> }) =>
      caseService.updateCase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });

  const deleteCaseMutation = useMutation({
    mutationFn: (id: string) => caseService.deleteCase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cases'] });
    },
  });

  return {
    cases: data?.data ?? [],
    pagination: data
      ? {
          page: data.currentPage,
          limit: data.limit,
          total: data.total,
          totalPages: data.totalPages,
        }
      : {
          page: 1,
          limit: 10,
          total: 0,
          totalPages: 0,
        },
    isLoading,
    error,
    createCase: createCaseMutation.mutateAsync,
    updateCase: updateCaseMutation.mutateAsync,
    deleteCase: deleteCaseMutation.mutateAsync,
    isCreating: createCaseMutation.isPending,
    isUpdating: updateCaseMutation.isPending,
    isDeleting: deleteCaseMutation.isPending,
  };
}; 