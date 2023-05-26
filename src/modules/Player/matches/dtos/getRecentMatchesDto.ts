import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class GetRecentMatchesDto {
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  page = 1;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  size = 1;

  @IsOptional()
  queueId?: string;

  @IsString()
  @IsNotEmpty()
  region: string;

  @IsString()
  @IsNotEmpty()
  puuid: string;
}
