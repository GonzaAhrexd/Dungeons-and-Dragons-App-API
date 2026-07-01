import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { RegisterDto } from './register.dto';
@Injectable()
export class RegisterService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(dto: RegisterDto) {
    try {
      const user = await this.userModel.create(dto);
      const { ...result } = user.toObject();
      return result;
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }
}
