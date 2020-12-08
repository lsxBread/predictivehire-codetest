import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByUserName(username: string): Promise<User> {
    return this.userModel
      .findOne({
        username,
      })
      .exec();
  }
}
