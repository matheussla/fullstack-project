import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Divider,
  List,
  ListItem,
  Chip,
  IconButton,
} from '@mui/material';
import {
  Comment as CommentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { ICase } from '../../interfaces';

interface RecentCasesProps {
  cases: ICase[];
  loading: boolean;
  onEdit: (caseItem: ICase) => void;
  onDelete: (caseItem: ICase) => void;
}

const RecentCases: React.FC<RecentCasesProps> = ({ cases, loading, onEdit, onDelete }) => {
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <CardHeader
        title="Recent Cases"
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      />
      <CardContent>
        {loading ? (
          <Typography>Loading cases...</Typography>
        ) : cases.length === 0 ? (
          <Typography>No cases found</Typography>
        ) : (
          <List>
            {cases.map((caseItem) => (
              <React.Fragment key={caseItem.id}>
                <ListItem
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    position: 'relative',
                    pr: 8,
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h6" component="div" sx={{ flex: 1 }}>
                      {caseItem.name}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        ml: 2,
                      }}
                    >
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={() => onEdit(caseItem)}
                        size="small"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(caseItem)}
                        size="small"
                        sx={{ color: 'error.main' }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      {caseItem.description}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
                      <Chip
                        icon={<CommentIcon />}
                        label={`${caseItem.comments.length} comments`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Created: {new Date(caseItem.createdAt).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Updated: {new Date(caseItem.updatedAt).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCases; 