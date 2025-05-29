import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  CircularProgress,
  Typography,
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ICase } from '../../interfaces';

interface CaseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (caseData: Partial<ICase>) => Promise<void>;
  caseData?: ICase;
  isEdit?: boolean;
  isLoading?: boolean;
}

const CaseDialog: React.FC<CaseDialogProps> = ({
  open,
  onClose,
  onSave,
  caseData,
  isEdit = false,
  isLoading = false,
}) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [comments, setComments] = useState<string[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (isEdit && caseData) {
      setName(caseData.name);
      setDescription(caseData.description);
      setComments(caseData.comments || []);
    } else {
      setName('');
      setDescription('');
      setComments([]);
      setNewComment('');
    }
  }, [isEdit, caseData, open]);

  const handleSave = async () => {
    if (!name.trim()) {
      return;
    }
    await onSave({ name, description, comments });
    onClose();
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  const handleRemoveComment = (index: number) => {
    setComments(comments.filter((_, i) => i !== index));
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleAddComment();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{isEdit ? 'Edit Case' : 'Create New Case'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
          required
          error={!name.trim()}
          helperText={!name.trim() ? 'Name is required' : ''}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
          placeholder="Enter case description..."
        />
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Comments
          </Typography>
          <TextField
            label="Add Comment"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            placeholder="Type a comment and press Enter..."
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleAddComment} color="primary" disabled={isLoading}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          {comments.length > 0 && (
            <List sx={{ mt: 2 }}>
              {comments.map((comment, index) => (
                <ListItem
                  key={index}
                  sx={{
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    mb: 1,
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <ListItemText primary={comment} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveComment(index)}
                      disabled={isLoading}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          color="primary"
          disabled={isLoading || !name.trim()}
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isEdit ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CaseDialog; 