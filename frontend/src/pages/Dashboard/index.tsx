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
  Snackbar,
  Alert,
} from '@mui/material';
import { Person as PersonIcon, Add as AddIcon } from '@mui/icons-material';
import Navbar from '../../components/Navbar';
import RecentCases from '../../components/RecentCases';
import CaseDialog from '../../components/CaseDialog';
import DeleteConfirmationDialog from '../../components/DeleteConfirmationDialog';
import { caseService } from '../../services/api';
import { ICase } from '../../interfaces';

interface User {
  id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [cases, setCases] = useState<ICase[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<ICase | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [caseToDelete, setCaseToDelete] = useState<ICase | null>(null);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const fetchCases = async () => {
    try {
      const casesData = await caseService.listCases();
      setCases(casesData);
    } catch (error) {
      console.error('Error fetching cases:', error);
      showSnackbar('Error fetching cases', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleCreateCase = async (caseData: Partial<ICase>) => {
    try {
      await caseService.createCase(caseData as Omit<ICase, 'id' | 'createdAt' | 'updatedAt'>);
      await fetchCases();
      showSnackbar('Case created successfully', 'success');
    } catch (error) {
      console.error('Error creating case:', error);
      showSnackbar('Error creating case', 'error');
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
      await caseService.deleteCase(caseToDelete.id);
      await fetchCases();
      showSnackbar('Case deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting case:', error);
      showSnackbar('Error deleting case', 'error');
    } finally {
      setDeleteDialogOpen(false);
      setCaseToDelete(null);
    }
  };

  const handleUpdateCase = async (caseData: Partial<ICase>) => {
    if (!selectedCase) return;
    try {
      await caseService.updateCase(selectedCase.id, caseData);
      await fetchCases();
      showSnackbar('Case updated successfully', 'success');
    } catch (error) {
      console.error('Error updating case:', error);
      showSnackbar('Error updating case', 'error');
    }
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
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
                { title: 'Total Cases', value: cases.length },
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
              >
                Create Case
              </Button>
            </Box>
            <RecentCases
              cases={cases}
              loading={loading}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
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
      />

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => {
          setDeleteDialogOpen(false);
          setCaseToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title={caseToDelete?.name || ''}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard; 