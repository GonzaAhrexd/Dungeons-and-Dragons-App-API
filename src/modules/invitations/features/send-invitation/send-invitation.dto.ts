import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsString } from 'class-validator';

export class SendInvitationDto {
  @ApiProperty()
  @IsMongoId()
  campaignId!: string;
  @ApiProperty()
  @IsString()
  username!: string;
}
