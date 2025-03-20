// frontend/src/pages/GalleryPage.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, Typography, Divider, Fade } from '@mui/material';

import CreateUserForm from '../components/CreateUserForm';
import UserList from '../components/UserList';
import CreateAlbumForm from '../components/CreateAlbumForm';
import AlbumGallery from '../components/AlbumGallery';
import CreateImageForm from '../components/CreateImageForm';
import ImageCarousel from '../components/ImageCarousel';

const GalleryPage: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    // Fetch users from backend on mount
    axios.get('http://localhost:3000/users')
      .then(response => setUsers(response.data))
      .catch(err => console.error(err));
  }, []);

  const handleUserCreated = (newUser: any) => {
    setUsers(prev => [...prev, newUser]);
  };

  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setSelectedAlbum(null);
    axios.get(`http://localhost:3000/users/${user.id}/albums`)
      .then(response => setAlbums(response.data))
      .catch(err => console.error(err));
  };

  const handleAlbumCreated = (newAlbum: any) => {
    setAlbums(prev => [...prev, newAlbum]);
  };

  const handleAlbumSelect = (album: any) => {
    setSelectedAlbum(album);
  };

  const handleImageCreated = (newImage: any) => {
    console.log('Image created:', newImage);
    // Optionally update carousel state if maintained here
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          AstonishGallery
        </Typography>
        {/* Create a new user */}
        <CreateUserForm onUserCreated={handleUserCreated} />
      </Paper>

      <Paper sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
        <UserList users={users} onUserSelect={handleUserSelect} />
      </Paper>

      {selectedUser && (
        <Fade in={Boolean(selectedUser)}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              Albums for {selectedUser.name}
            </Typography>
            <CreateAlbumForm userId={selectedUser.id} onAlbumCreated={handleAlbumCreated} />
            <AlbumGallery userId={selectedUser.id} onAlbumSelect={handleAlbumSelect} />
          </Paper>
        </Fade>
      )}

      {selectedAlbum && (
        <Fade in={Boolean(selectedAlbum)}>
          <Paper sx={{ p: 3, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
              Images in {selectedAlbum.title}
            </Typography>
            <CreateImageForm albumId={selectedAlbum.id} onImageCreated={handleImageCreated} />
            <ImageCarousel albumId={selectedAlbum.id} />
          </Paper>
        </Fade>
      )}
    </Container>
  );
};

export default GalleryPage;
