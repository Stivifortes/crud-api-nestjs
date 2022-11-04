import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(user: User): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async getUsers(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async getUserById(userId): Promise<User> {
    return await this.userModel.findById(userId).exec();
  }

  async updateUser(userId, user: User): Promise<User> {
    return await this.userModel.findByIdAndUpdate(userId, user, { new: true });
  }

  async deleteUser(userId: User): Promise<any> {
    return await this.userModel.findByIdAndRemove(userId);
  }
}
