import { Injectable, NotFoundException } from '@nestjs/common';
import { loadJsonData } from '../utils/load-json';

@Injectable()
export class AlbumsService {
  private albums: any[];
  private images: any[];

  constructor() {
    // Load albums from albums.json and images from photos.json (adjust filename if needed)
    this.albums = loadJsonData('albums.json');
    this.images = loadJsonData('photos.json');
  }

  async getAllAlbums(): Promise<any[]> {
    return this.albums;
  }

  async createAlbum(createAlbumData: any): Promise<any> {
    const newId = this.albums.length > 0 ? Math.max(...this.albums.map(a => a.id)) + 1 : 1;
    const newAlbum = { id: newId, ...createAlbumData };
    this.albums.push(newAlbum);
    return newAlbum;
  }

  async getAlbum(id: string): Promise<any> {
    const album = this.albums.find(album => String(album.id) === id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async updateAlbum(id: string, updateAlbumData: any): Promise<any> {
    const index = this.albums.findIndex(album => String(album.id) === id);
    if (index === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    this.albums[index] = { ...this.albums[index], ...updateAlbumData };
    return this.albums[index];
  }

  async deleteAlbum(id: string): Promise<any> {
    const index = this.albums.findIndex(album => String(album.id) === id);
    if (index === -1) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    const deletedAlbum = this.albums.splice(index, 1)[0];
    return { message: `Album with ID ${id} deleted successfully`, deletedAlbum };
  }

  async getAlbumImages(albumId: string): Promise<any[]> {
    // Return images where albumId matches
    return this.images.filter(image => String(image.albumId) === albumId);
  }
}
