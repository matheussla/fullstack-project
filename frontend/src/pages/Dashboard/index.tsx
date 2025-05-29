import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  Pagination,
} from '@mui/material';
import { Person as PersonIcon, Add as AddIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import Navbar from '../../components/Navbar';
import RecentCases from '../../components/RecentCases';
import CaseDialog from '../../components/CaseDialog';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { useCases } from '../../hooks/useCases';
import { ICase, IUser } from '../../interfaces';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ICase | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<ICase | null>(null);
  const [page, setPage] = useState(1);

  const {
    cases,
    pagination,
    isLoading,
    error,
    createCase,
    updateCase,
    deleteCase,
    isCreating,
    isUpdating,
    isDeleting,
  } = useCases(page, 10);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleCreateCase = async (caseData: Partial<ICase>) => {
    try {
      await createCase(caseData as Omit<ICase, 'id' | 'createdAt' | 'updatedAt'>);
      toast.success('Case created successfully');
    } catch (error) {
      console.error('Error creating case:', error);
      toast.error('Error creating case');
    }
  };

  const handleEdit = (caseItem: ICase) => {
    setSelectedCase(caseItem);
    setDialogOpen(true);
  };

  const handleDelete = (caseItem: ICase) => {
    setCaseToDelete(caseItem);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!caseToDelete) return;
    try {
      await deleteCase(caseToDelete.id);
      toast.success('Case deleted successfully');
    } catch (error) {
      console.error('Error deleting case:', error);
      toast.error('Error deleting case');
    } finally {
      setDeleteDialogOpen(false);
      setCaseToDelete(null);
    }
  };

  const handleUpdateCase = async (caseData: Partial<ICase>) => {
    if (!selectedCase) return;
    try {
      await updateCase({ id: selectedCase.id, data: caseData });
      toast.success('Case updated successfully');
    } catch (error) {
      console.error('Error updating case:', error);
      toast.error('Error updating case');
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
            <Card
              sx={{
                bgcolor: 'background.paper',
                borderRadius: 2,
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <CardContent sx={{ textAlign: 'center', py: 4 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    mx: 'auto',
                    mb: 2,
                    bgcolor: 'primary.main',
                  }}
                >
                  <PersonIcon sx={{ fontSize: 60 }} />
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ gridColumn: { xs: 'span 12', md: 'span 8' } }}>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 3 }}>
              {[
                { title: 'Total Cases', value: pagination.total },
                { title: 'Total Comments', value: cases.reduce((acc, curr) => acc + curr.comments.length, 0) },
                { title: 'Recent Cases', value: cases.filter(c => {
                  const oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  return new Date(c.createdAt) > oneWeekAgo;
                }).length },
              ].map((stat) => (
                <Box key={stat.title} sx={{ gridColumn: { xs: 'span 12', md: 'span 4' } }}>
                  <Card
                    sx={{
                      bgcolor: 'background.paper',
                      borderRadius: 2,
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      height: '100%',
                    }}
                  >
                    <CardContent>
                      <Typography variant="h4" sx={{ mb: 1 }}>
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.title}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Box>
          </Box>

          <Box sx={{ gridColumn: 'span 12' }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                sx={{
                  borderRadius: 2,
                  textTransform: 'none',
                  px: 3,
                }}
                onClick={() => {
                  setSelectedCase(null);
                  setDialogOpen(true);
                }}
                disabled={isCreating}
              >
                Create Case
              </Button>
            </Box>
            <RecentCases
              cases={cases}
              loading={isLoading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
            {!isLoading && pagination.totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                  count={pagination.totalPages}
                  page={pagination.page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                />
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      <CaseDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setSelectedCase(null);
        }}
        onSave={selectedCase ? handleUpdateCase : handleCreateCase}
        caseData={selectedCase || undefined}
        isEdit={!!selectedCase}
        isLoading={isCreating || isUpdating}
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCaseToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={caseToDelete?.name || ''}
        isLoading={isDeleting}
      />
    </Box>
  );
};

export default Dashboard; 