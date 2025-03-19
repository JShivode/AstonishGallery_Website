// src/pages/GalleryPage.tsx
import React, { useState } from 'react';
import UserList from '../components/UserList';
import AlbumGallery from '../components/AlbumGallery';
import ImageCarousel from '../components/ImageCarousel';
import { Container, Typography } from '@mui/material';

const GalleryPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedAlbum, setSelectedAlbum] = useState<any>(null);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        AstonishGallery
      </Typography>
      <UserList onUserSelect={(user) => {
        setSelectedUser(user);
        setSelectedAlbum(null); // Reset album selection when user changes
      }} />
      {selectedUser && (
        <>
          <Typography variant="h5" gutterBottom>
            Albums for {selectedUser.name}
          </Typography>
          <AlbumGallery 
            userId={selectedUser.id} 
            onAlbumSelect={(album) => setSelectedAlbum(album)} 
          />
        </>
      )}
      {selectedAlbum && (
        <>
          <Typography variant="h5" gutterBottom>
            Images in {selectedAlbum.title}
          </Typography>
          <ImageCarousel albumId={selectedAlbum.id} />
        </>
      )}
    </Container>
  );
};

export default GalleryPage;
