// src/users/users.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
//import { CreateUserDto, UpdateUserDto } from './dto'; // (Optional) Data Transfer Objects

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // GET /users - List all users with the number of albums
  @Get()
  async getAllUsers() {
    return this.usersService.getAllUsersWithAlbumCount();
  }

  // POST /users - Add a new user
  @Post()
  async createUser(@Body() createUserData: any) {
    return this.usersService.createUser(createUserData);
  }

  // PUT /users/:id - Update a user
  @Put(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserData: any) {
    return this.usersService.updateUser(id, updateUserData);
  }

  // DELETE /users/:id - Delete a user
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  // GET /users/:id/albums - Retrieve albums for a specific user
  @Get(':id/albums')
  async getUserAlbums(@Param('id') id: string) {
    return this.usersService.getUserAlbums(id);
  }
}
