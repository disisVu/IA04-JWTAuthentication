import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// Provides methods to interact with MongoDB collection
import { Model } from 'mongoose';
// UserDocument extends Document which includes methods like save(), exec()
import { User, UserDocument } from '~/users/schemas/user.schema';

// @Injectable decorator marks UsersService as a provider
@Injectable()
export class UsersService {
  // @InjectModel decorator injects "Mongoose model for User schema" into service
  // userModel: injected instance of Mongoose Model class corresponds to User schema
  // + performs database operations (create, find, update, delete) on <users> collection with this model
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // Create a new User
  // Partial: to use only a subset of User props
  async create(user: Partial<User>): Promise<User> {
    const newUser = new this.userModel(user);
    return newUser.save(); // save() is asynchronous, returns a promise
  }

  // Find a User by email
  // + can check whether an email is already in use
  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }
}
