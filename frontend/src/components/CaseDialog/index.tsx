import React, { useState } from 'react';
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
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { ICase } from '../../interfaces';

interface CaseDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (caseData: Partial<ICase>) => Promise<void>;
  caseData?: ICase;
  isEdit?: boolean;
}

const CaseDialog: React.FC<CaseDialogProps> = ({ open, onClose, onSave, caseData, isEdit = false }) => {
  const [name, setName] = useState(caseData?.name || '');
  const [description, setDescription] = useState(caseData?.description || '');
  const [comments, setComments] = useState<string[]>(caseData?.comments || []);
  const [newComment, setNewComment] = useState('');

  const handleSave = async () => {
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
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Add Comment"
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleAddComment} color="primary">
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
          {comments.length > 0 && (
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemText primary={comment} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleRemoveComment(index)}
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
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          {isEdit ? 'Save' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CaseDialog; 