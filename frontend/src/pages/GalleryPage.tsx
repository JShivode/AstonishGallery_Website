// src/pages/GalleryPage.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Divider } from '@mui/material';

// Existing components
import UserList from '../components/UserList';
import AlbumGallery from '../components/AlbumGallery';
import ImageCarousel from '../components/ImageCarousel';

// The forms you created
import CreateUserForm from '../components/CreateUserForm';
import CreateAlbumForm from '../components/CreateAlbumForm';
import CreateImageForm from '../components/CreateImageForm';

const GalleryPage: React.FC = () => {
  // State for users, selectedUser, albums, selectedAlbum, etc.
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);
  const [albums, setAlbums] = useState<any[]>([]);

  // Fetch all users on initial mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Handler: user creation
  const handleUserCreated = (newUser: any) => {
    // Update local users array
    setUsers((prev) => [...prev, newUser]);
  };

  // Handler: user selection
  const handleUserSelect = (user: any) => {
    setSelectedUser(user);
    setSelectedAlbum(null); // reset album selection
    fetchAlbumsForUser(user.id);
  };

  // Fetch albums for the selected user
  const fetchAlbumsForUser = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}/albums`);
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  // Handler: album creation
  const handleAlbumCreated = (newAlbum: any) => {
    // Update local albums array
    setAlbums((prev) => [...prev, newAlbum]);
  };

  // Handler: album selection
  const handleAlbumSelect = (album: any) => {
    setSelectedAlbum(album);
  };

  // Handler: image creation (optional if you want to refresh images or just log)
  const handleImageCreated = (newImage: any) => {
    console.log('New image created:', newImage);
    // Optionally refresh images or handle them in state
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AstonishGallery
      </Typography>

      {/* 1) CreateUserForm for adding new users */}
      <CreateUserForm onUserCreated={handleUserCreated} />

      <Divider sx={{ marginY: 2 }} />

      {/* 2) Display user list with local state */}
      <UserList 
        users={users} 
        onUserSelect={handleUserSelect} 
      />

      {/* If a user is selected, show album section + create album form */}
      {selectedUser && (
        <>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h5" gutterBottom>
            Albums for {selectedUser.name}
          </Typography>

          <CreateAlbumForm 
            userId={selectedUser.id} 
            onAlbumCreated={handleAlbumCreated} 
          />

          {/* 
            Option A: If your AlbumGallery fetches albums itself, 
            just pass userId. If you want to use local 'albums' state, 
            pass it in as a prop and remove fetch logic from AlbumGallery. 
          */}
          <AlbumGallery 
            userId={selectedUser.id} 
            onAlbumSelect={handleAlbumSelect} 
          />
        </>
      )}

      {/* If an album is selected, show images + create image form */}
      {selectedAlbum && (
        <>
          <Divider sx={{ marginY: 2 }} />
          <Typography variant="h5" gutterBottom>
            Images in {selectedAlbum.title}
          </Typography>

          <CreateImageForm 
            albumId={selectedAlbum.id} 
            onImageCreated={handleImageCreated} 
          />

          <ImageCarousel albumId={selectedAlbum.id} />
        </>
      )}
    </Container>
  );
};

export default GalleryPage;
