import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { User, UserSchema } from './schema/user.schema';
import { RegisterController, RegisterService } from './features/register';
import { LoginController, LoginService } from './features/login';
import { JWT_SECRET } from '../../config/envs';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),

    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RegisterController, LoginController],
  providers: [RegisterService, LoginService],
})
export class AuthModule {}
