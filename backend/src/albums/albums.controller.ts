// src/albums/albums.controller.ts
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AlbumsService } from './albums.service';
//import { CreateAlbumDto, UpdateAlbumDto } from './dto';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  // GET /albums - (Optional) List all albums
  @Get()
  async getAllAlbums() {
    return this.albumsService.getAllAlbums();
  }

  // POST /albums - Create a new album
  @Post()
  async createAlbum(@Body() createAlbumData: any) {
    return this.albumsService.createAlbum(createAlbumData);
  }

  // GET /albums/:id - Retrieve a specific album
  @Get(':id')
  async getAlbum(@Param('id') id: string) {
    return this.albumsService.getAlbum(id);
  }

  // PUT /albums/:id - Update a specific album
  @Put(':id')
  async updateAlbum(@Param('id') id: string, @Body() updateAlbumData: any) {
    return this.albumsService.updateAlbum(id, updateAlbumData);
  }

  // DELETE /albums/:id - Delete a specific album
  @Delete(':id')
  async deleteAlbum(@Param('id') id: string) {
    return this.albumsService.deleteAlbum(id);
  }

  // GET /albums/:id/images - Retrieve images for a specific album
  @Get(':id/images')
  async getAlbumImages(@Param('id') id: string) {
    return this.albumsService.getAlbumImages(id);
  }
}
