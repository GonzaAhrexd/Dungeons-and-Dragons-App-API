import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../schema/user.schema';
import { RegisterDto } from './register.dto';
import type { MongoServerErrorLike } from '../../../../interfaces/Errors';
import { JwtService } from '@nestjs/jwt';
import type { RegisterResponse } from './interfaces/registerResponse';
@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async execute(dto: RegisterDto): Promise<RegisterResponse> {
    try {
      const user = await this.userModel.create(dto);
      const token = this.jwtService.sign({
        sub: user.id,
        username: user.username,
      });
      const { username } = user.toObject();
      return { token, username };
    } catch (error: unknown) {
      const mongoError = error as MongoServerErrorLike;
      if (mongoError.code === 11000) {
        throw new ConflictException('Username already exists');
      }
      throw error;
    }
  }
}
