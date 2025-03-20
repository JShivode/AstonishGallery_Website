// frontend/src/components/AlbumGallery.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';

interface AlbumGalleryProps {
  userId: number;
  onAlbumSelect: (album: any) => void;
}

const AlbumGallery: React.FC<AlbumGalleryProps> = ({ userId, onAlbumSelect }) => {
  const [albums, setAlbums] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${userId}/albums`)
      .then(response => setAlbums(response.data))
      .catch(err => console.error(err));
  }, [userId]);

  return (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {albums.map(album => (
        <Grid item xs={12} sm={6} md={4} key={album.id}>
          <Card
            sx={{
              transition: 'transform var(--transition-duration) ease',
              ':hover': {
                transform: 'scale(1.02)',
                boxShadow: 4,
              },
            }}
            onClick={() => onAlbumSelect(album)}
          >
            <CardMedia
              component="img"
              height="140"
              image="https://picsum.photos/200/140" // Replace with actual cover if available
              alt={album.title}
            />
            <CardContent>
              <Typography variant="subtitle1">
                {album.title}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AlbumGallery;
