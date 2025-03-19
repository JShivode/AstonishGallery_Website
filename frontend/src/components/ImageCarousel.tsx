// src/components/ImageCarousel.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface Image {
  id: number;
  albumId: number;
  imageUrl: string;
}

interface ImageCarouselProps {
  albumId: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ albumId }) => {
  const [images, setImages] = useState<Image[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios.get<Image[]>(`http://localhost:3000/albums/${albumId}/images`)
      .then(response => {
        setImages(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching images', error);
        setLoading(false);
      });
  }, [albumId]);

  if (loading) {
    return <Typography>Loading images...</Typography>;
  }

  if (!images.length) {
    return <Typography>No images found for this album.</Typography>;
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <Box position="relative" textAlign="center" width="100%" maxWidth={600} margin="auto">
      <img 
        src={images[currentIndex].imageUrl} 
        alt={`Image ${currentIndex + 1}`} 
        style={{ width: '100%', borderRadius: 8 }}
      />
      <IconButton 
        onClick={prevImage} 
        style={{ position: 'absolute', top: '50%', left: 0, transform: 'translateY(-50%)' }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton 
        onClick={nextImage} 
        style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
      <Typography variant="caption" display="block" marginTop={1}>
        {currentIndex + 1} / {images.length}
      </Typography>
    </Box>
  );
};

export default ImageCarousel;
