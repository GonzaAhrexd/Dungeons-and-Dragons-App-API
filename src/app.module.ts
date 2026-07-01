import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CharactersModule } from './modules/characters/characters.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGODB_URI } from './config/envs';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    AuthModule,
    CampaignsModule,
    CharactersModule,
  ],
  providers: [HealthModule],
})
export class AppModule {}
