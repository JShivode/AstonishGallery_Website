// src/images/images.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ImagesService } from './images.service';
//import { CreateImageDto, UpdateImageDto } from './dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  // GET /images - (Optional) List all images
  @Get()
  async getAllImages() {
    return this.imagesService.getAllImages();
  }

  // POST /images - Create a new image
  @Post()
  async createImage(@Body() createImageData: any) {
    return this.imagesService.createImage(createImageData);
  }

  // GET /images/:id - Retrieve a specific image
  @Get(':id')
  async getImage(@Param('id') id: string) {
    return this.imagesService.getImage(id);
  }

  // PUT /images/:id - Update a specific image
  @Put(':id')
  async updateImage(@Param('id') id: string, @Body() updateImageData: any) {
    return this.imagesService.updateImage(id, updateImageData);
  }

  // DELETE /images/:id - Delete a specific image
  @Delete(':id')
  async deleteImage(@Param('id') id: string) {
    return this.imagesService.deleteImage(id);
  }
}
