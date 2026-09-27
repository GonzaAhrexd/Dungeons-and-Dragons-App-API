import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from '../../schema/user.schema';
import { RegisterDto } from './register.dto';
import type { MongoServerErrorLike } from '../../../../interfaces/Errors';
import { JwtService } from '@nestjs/jwt';
import type { RegisterResponse } from './interfaces/registerResponse';
import { JWT_REFRESH_SECRET } from '../../../../config/envs';

@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async execute(dto: RegisterDto): Promise<RegisterResponse> {
    try {
      const user = await this.userModel.create(dto);

      const payload = { sub: user.id, username: user.username };
      const access_token = this.jwtService.sign(payload);
      const refresh_token = this.jwtService.sign(payload, {
        secret: JWT_REFRESH_SECRET,
        expiresIn: '7d',
      });

      user.refreshToken = await bcrypt.hash(refresh_token, 10);
      await user.save();

      const { username, _id } = user.toObject();
      return { id: _id.toString(), access_token, refresh_token, username };
    } catch (error: unknown) {
      const mongoError = error as MongoServerErrorLike;
      if (mongoError.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }
}
