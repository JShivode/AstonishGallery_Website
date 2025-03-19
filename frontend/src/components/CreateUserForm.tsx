// frontend/src/components/CreateUserForm.tsx

import React, { useState } from 'react';
import axios from 'axios';
import {
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grow,
  Alert
} from '@mui/material';

interface CreateUserFormProps {
  onUserCreated: (user: any) => void;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuccess(false); // Hide success message before new request
    try {
      // Send POST request to your NestJS backend
      const response = await axios.post('http://localhost:3000/users', {
        name,
        email,
      });

      // Call the parent callback with the newly created user
      onUserCreated(response.data);

      // Clear input fields
      setName('');
      setEmail('');

      // Clear error and show success
      setError('');
      setShowSuccess(true);
    } catch (err) {
      console.error('Error creating user:', err);
      setError('Error creating user');
    }
  };

  return (
    <Paper sx={{ p: 3, mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Add New User
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />

        {/* If there's an error, show an Alert */}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Create User
        </Button>

        {/* Grow animation for the success message */}
        <Grow in={showSuccess}>
          <Box sx={{ mt: 2 }}>
            <Alert severity="success">User created successfully!</Alert>
          </Box>
        </Grow>
      </Box>
    </Paper>
  );
};

export default CreateUserForm;
