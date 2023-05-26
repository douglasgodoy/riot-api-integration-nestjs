import { IsNotEmpty, IsString } from 'class-validator';

export class PlayerResponseDto {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  puuid: string;

  @IsNotEmpty()
  @IsString()
  accountId: string;
}
