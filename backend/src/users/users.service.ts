// src/users/users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Album, AlbumDocument } from '../schemas/album.schema';
//import { CreateUserDto, UpdateUserDto } from './dto'; // (Optional) Data Transfer Objects

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Album.name) private albumModel: Model<AlbumDocument>,
  ) {}

  async getAllUsersWithAlbumCount() {
    // 1) Fetch all users
    const users = await this.userModel.find().exec();

    // 2) For each user, count the number of albums
    //    (Alternatively, you can use an aggregation pipeline)
    const usersWithAlbumCount = await Promise.all(
      users.map(async (user) => {
        const albumCount = await this.albumModel.countDocuments({ userId: user._id });
        return { ...user.toObject(), albumCount };
      }),
    );

    return usersWithAlbumCount;
  }

  async createUser(createUserData: any) {
    const newUser = new this.userModel(createUserData);
    return newUser.save();
  }

  async updateUser(id: string, updateUserData: any) {
    const updatedUser = await this.userModel.findByIdAndUpdate(id, updateUserData, { new: true });
    if (!updatedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return updatedUser;
  }

  async deleteUser(id: string) {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return { message: `User with ID ${id} deleted successfully` };
  }

  async getUserAlbums(userId: string) {
    // Optionally validate that user exists
    // const user = await this.userModel.findById(userId);
    // if (!user) throw new NotFoundException(`User with ID ${userId} not found`);

    return this.albumModel.find({ userId }).exec();
  }
}
