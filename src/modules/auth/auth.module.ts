import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './schema/user.schema';
import { RegisterController, RegisterService } from './features/register';
import { LoginController, LoginService } from './features/login';
import { RefreshController, RefreshService } from './features/refresh';
import { JWT_ACCESS_SECRET } from '../../config/envs';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.register({
      secret: JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RegisterController, LoginController, RefreshController],
  providers: [RegisterService, LoginService, RefreshService],
})
export class AuthModule {}
