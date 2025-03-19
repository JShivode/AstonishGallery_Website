// src/albums/albums.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Album, AlbumDocument } from '../schemas/album.schema';
import { Image, ImageDocument } from '../schemas/image.schema';
//import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async getAllAlbums() {
    return this.albumModel.find().exec();
  }

  async createAlbum(createAlbumDto: CreateAlbumDto) {
    const newAlbum = new this.albumModel(createAlbumDto);
    return newAlbum.save();
  }

  async getAlbum(id: string) {
    const album = await this.albumModel.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return album;
  }

  async updateAlbum(id: string, updateAlbumDto: UpdateAlbumDto) {
    const updatedAlbum = await this.albumModel.findByIdAndUpdate(id, updateAlbumDto, { new: true });
    if (!updatedAlbum) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return updatedAlbum;
  }

  async deleteAlbum(id: string) {
    const result = await this.albumModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`Album with ID ${id} not found`);
    }
    return { message: `Album with ID ${id} deleted successfully` };
  }

  async getAlbumImages(albumId: string) {
    return this.imageModel.find({ albumId }).exec();
  }
}
