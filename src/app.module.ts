import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { CampaignsModule } from './modules/campaigns/campaigns.module';
import { CharactersModule } from './modules/characters/characters.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JWT_SECRET, MONGODB_URI } from './config/envs';
import { HealthModule } from './modules/health/health.module';
import { JwtAuthGuard } from './modules/campaigns/features/shared/campaign-auth.guard';
import { InvitationsModule } from './modules/invitations/invitations.module';
@Module({
  imports: [
    MongooseModule.forRoot(MONGODB_URI),
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
    AuthModule,
    CampaignsModule,
    CharactersModule,
    InvitationsModule,
  ],
  providers: [HealthModule, JwtAuthGuard],
})
export class AppModule {}
