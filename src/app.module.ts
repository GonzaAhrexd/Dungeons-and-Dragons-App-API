import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CharactersModule } from './modules/characters/characters.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_SECRET, MONGODB_URI } from './config/envs';
import { HealthModule } from './modules/health/health.module';
import { JwtAuthGuard } from './modules/campaigns/features/shared/campaign-auth.guard';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    AuthModule,
    CampaignsModule,
    CharactersModule,
  ],
  providers: [HealthModule, JwtAuthGuard],
})
export class AppModule {}
