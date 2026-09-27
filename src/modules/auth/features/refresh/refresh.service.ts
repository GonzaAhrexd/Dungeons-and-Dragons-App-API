import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../../schema/user.schema';
import { RefreshDto } from './refresh.dto';
import { JWT_REFRESH_SECRET } from '../../../../config/envs';
import { RefreshResponse } from './interfaces/refreshResponse';

type RefreshPayload = { sub: string; username: string };

@Injectable()
export class RefreshService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async execute(dto: RefreshDto): Promise<RefreshResponse> {
    let decoded: RefreshPayload;
    try {
      decoded = this.jwtService.verify<RefreshPayload>(dto.refresh_token, {
        secret: JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.userModel.findById(decoded.sub);
    if (
      !user?.refreshToken ||
      !(await bcrypt.compare(dto.refresh_token, user.refreshToken))
    ) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const payload = { sub: user.id, username: user.username };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.jwtService.sign(payload, {
      secret: JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    user.refreshToken = await bcrypt.hash(refresh_token, 10);
    await user.save();

    return { access_token, refresh_token };
  }
}
