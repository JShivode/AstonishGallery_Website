import { Injectable, NotFoundException } from '@nestjs/common';
import { loadJsonData } from '../utils/load-json';

@Injectable()
export class UsersService {
  private users: any[];
  private albums: any[];

  constructor() {
    // Load data from JSON files
    this.users = loadJsonData('users.json');
    this.albums = loadJsonData('albums.json');
  }

  async getAllUsersWithAlbumCount(): Promise<any[]> {
    // For each user, count the number of albums based on user.id matching album.userId
    return this.users.map(user => {
      const albumCount = this.albums.filter(album => String(album.userId) === String(user.id)).length;
      return { ...user, albumCount };
    });
  }

  async createUser(createUserData: any): Promise<any> {
    // Assign a new id: max existing id + 1 (or 1 if empty)
    const newId = this.users.length > 0 ? Math.max(...this.users.map(u => u.id)) + 1 : 1;
    const newUser = { id: newId, ...createUserData };
    this.users.push(newUser);
    // Optionally, write back to file here if persistence is desired.
    return newUser;
  }

  async updateUser(id: string, updateUserData: any): Promise<any> {
    const index = this.users.findIndex(user => String(user.id) === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    this.users[index] = { ...this.users[index], ...updateUserData };
    return this.users[index];
  }

  async deleteUser(id: string): Promise<any> {
    const index = this.users.findIndex(user => String(user.id) === id);
    if (index === -1) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    const deletedUser = this.users.splice(index, 1)[0];
    return { message: `User with ID ${id} deleted successfully`, deletedUser };
  }

  async getUserAlbums(userId: string): Promise<any[]> {
    // Filter albums whose userId matches the given userId
    return this.albums.filter(album => String(album.userId) === userId);
  }
}
