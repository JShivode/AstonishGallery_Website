// frontend/src/components/CreateImageForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Typography } from '@mui/material';

interface CreateImageFormProps {
  albumId: number;
  onImageCreated: (image: any) => void;
}

const CreateImageForm: React.FC<CreateImageFormProps> = ({ albumId, onImageCreated }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Send a POST request to create a new image
      const response = await axios.post('http://localhost:3000/images', { albumId, imageUrl });
      onImageCreated(response.data);
      setImageUrl('');
      setError('');
    } catch (err) {
      console.error('Error creating image:', err);
      setError('Error creating image');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ marginTop: 2 }}>
      <Typography variant="h6">Add New Image</Typography>
      <TextField 
        label="Image URL" 
        value={imageUrl} 
        onChange={(e) => setImageUrl(e.target.value)} 
        fullWidth 
        margin="normal" 
        required 
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button type="submit" variant="contained" color="primary">
        Create Image
      </Button>
    </Box>
  );
};

export default CreateImageForm;
