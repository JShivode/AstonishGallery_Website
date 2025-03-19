// src/images/images.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from '../schemas/image.schema';
//import { CreateImageDto, UpdateImageDto } from './dto';

@Injectable()
export class ImagesService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async getAllImages() {
    return this.imageModel.find().exec();
  }

  async createImage(createImageData: any) {
    const newImage = new this.imageModel(createImageData);
    return newImage.save();
  }

  async getImage(id: string) {
    const image = await this.imageModel.findById(id);
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return image;
  }

  async updateImage(id: string, updateImageData: any) {
    const updatedImage = await this.imageModel.findByIdAndUpdate(id, updateImageData, { new: true });
    if (!updatedImage) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return updatedImage;
  }

  async deleteImage(id: string) {
    const result = await this.imageModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Image with ID ${id} not found`);
    }
    return { message: `Image with ID ${id} deleted successfully` };
  }
}
