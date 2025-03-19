// frontend/src/components/CreateAlbumForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

interface CreateAlbumFormProps {
  userId: number;
  onAlbumCreated: (album: any) => void;
}

const CreateAlbumForm: React.FC<CreateAlbumFormProps> = ({ userId, onAlbumCreated }) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a POST request to create a new album
      const response = await axios.post('http://localhost:3000/albums', { title, userId });
      onAlbumCreated(response.data);
      setTitle('');
      setError('');
    } catch (err) {
      console.error('Error creating album:', err);
      setError('Error creating album');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <Typography variant="h6">Add New Album</Typography>
      <TextField 
        label="Album Title" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        fullWidth 
        margin="normal" 
        required 
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Create Album
      </Button>
    </Box>
  );
};

export default CreateAlbumForm;
