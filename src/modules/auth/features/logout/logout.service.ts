import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import type { LogoutResponse } from './interfaces/logoutResponse';

@Injectable()
export class LogoutService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async execute(userId: string): Promise<LogoutResponse> {
    await this.userModel.findByIdAndUpdate(userId, { refreshToken: null });
    return { success: true };
  }
}
