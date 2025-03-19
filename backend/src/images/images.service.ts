import { Injectable, NotFoundException } from '@nestjs/common';
import { loadJsonData } from '../utils/load-json';

@Injectable()
export class ImagesService {
  private images: any[];

  constructor() {
    // Load images data from photos.json (or images.json if that’s your filename)
    this.images = loadJsonData('photos.json');
  }

  async getAllImages(): Promise<any[]> {
    return this.images;
  }

  async createImage(createImageData: any): Promise<any> {
    const newId = this.images.length > 0 ? Math.max(...this.images.map(i => i.id)) + 1 : 1;
    const newImage = { id: newId, ...createImageData };
    this.images.push(newImage);
    return newImage;
  }

  async getImage(id: string): Promise<any> {
    const image = this.images.find(img => String(img.id) === id);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async updateImage(id: string, updateImageData: any): Promise<any> {
    const index = this.images.findIndex(img => String(img.id) === id);
    if (index === -1) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    this.images[index] = { ...this.images[index], ...updateImageData };
    return this.images[index];
  }

  async deleteImage(id: string): Promise<any> {
    const index = this.images.findIndex(img => String(img.id) === id);
    if (index === -1) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    const deletedImage = this.images.splice(index, 1)[0];
    return { message: `Image with ID ${id} deleted successfully`, deletedImage };
  }
}
