import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsEnum,
  IsObject,
  ValidateNested,
} from 'class-validator';

enum IndividualPosition {
  Top = 'TOP',
  Jungle = 'JUNGLE',
  Mid = 'MID',
  Bottom = 'BOTTOM',
  Support = 'SUPPORT',
}

enum Role {
  None = 'NONE',
  Solo = 'SOLO',
  Duo = 'DUO',
}

class ChallengesDTO {
  @Expose()
  @IsNumber()
  kda: number;
}

export class ParticipantDTO {
  @Expose()
  @IsNumber()
  assists: number;

  @Expose()
  @IsObject()
  @ValidateNested({ each: true })
  @Type(() => ChallengesDTO)
  challenges: ChallengesDTO;

  @Expose()
  @IsNumber()
  champLevel: number;

  @Expose()
  @IsNumber()
  championId: number;

  @IsString()
  championName: string;

  @Expose()
  @IsNumber()
  deaths: number;

  @Expose()
  @IsEnum(IndividualPosition)
  individualPosition: IndividualPosition;

  @Expose()
  @IsNumber()
  kills: number;

  @Expose()
  @IsString()
  lane: string;

  @Expose()
  @IsString()
  puuid: string;

  @Expose()
  @IsString()
  riotIdName: string;

  @Expose()
  @IsString()
  riotIdTagline: string;
  @Expose()
  @IsEnum(Role)
  role: Role;

  @Expose()
  @IsNumber()
  spell1Casts: number;

  @Expose()
  @IsNumber()
  spell2Casts: number;

  @Expose()
  @IsNumber()
  spell3Casts: number;

  @Expose()
  @IsNumber()
  spell4Casts: number;

  @Expose()
  @IsString()
  summonerId: string;

  @Expose()
  @IsNumber()
  summonerLevel: number;

  @Expose()
  @IsString()
  summonerName: string;

  @Expose()
  @IsBoolean()
  win: boolean;
}

export class ParticipantsResponse {
  @IsNotEmpty()
  participants: ParticipantDTO[];
}

@Exclude()
export class ParticipantsResponseDTO {
  @Expose()
  participants: ParticipantDTO[];

  constructor(partial: Partial<ParticipantsResponseDTO>) {
    Object.assign(this, partial);
  }
}

export class GetMatchDetailsByMatchIdDto {
  @IsString()
  @IsNotEmpty()
  matchId: string;

  @IsString()
  @IsNotEmpty()
  region: string;
}
