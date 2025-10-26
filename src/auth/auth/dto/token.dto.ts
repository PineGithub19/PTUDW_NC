import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetTokenDto {
  @ApiProperty({ description: 'The client ID for authentication.' })
  @IsString()
  client_id: string;

  @ApiProperty({ description: 'The client secret for authentication.' })
  @IsString()
  client_secret: string;
}
