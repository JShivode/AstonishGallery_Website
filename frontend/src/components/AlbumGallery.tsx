// src/components/AlbumGallery.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

interface Album {
  id: number;
  title: string;
  userId: number;
}

interface AlbumGalleryProps {
  userId: number;
  onAlbumSelect: (album: Album) => void;
}

const AlbumGallery: React.FC<AlbumGalleryProps> = ({ userId, onAlbumSelect }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Fetch albums for the selected user
    axios.get<Album[]>(`http://localhost:3000/users/${userId}/albums`)
      .then(response => {
        setAlbums(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching albums', error);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return <Typography>Loading albums...</Typography>;
  }

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Albums
      </Typography>
      <Grid container spacing={2}>
        {albums.map(album => (
          <Grid item xs={12} sm={6} md={4} key={album.id}>
            <Card onClick={() => onAlbumSelect(album)} style={{ cursor: 'pointer' }}>
              {/* For simplicity, we'll use a placeholder image.
                  In a complete implementation, fetch the first image from the album */}
              <CardMedia
                component="img"
                height="140"
                image="https://picsum.photos/200/140" // Replace with actual cover image URL if available
                alt={album.title}
              />
              <CardContent>
                <Typography variant="subtitle1">{album.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default AlbumGallery;
