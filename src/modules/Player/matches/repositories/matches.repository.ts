import { ConfigService } from 'src/shared/config/config.service';
import { HttpService } from 'src/shared/infra/http/http.service';
import { GetRecentMatchesDto } from '../dtos/getRecentMatchesDto';
import { Injectable } from '@nestjs/common';
import {
  GetMatchDetailsByMatchIdDto,
  ParticipantDTO,
} from '../dtos/getMatchDetailDto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class MatchRepository {
  baseUrl: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async getRecentMatchesByPuuid(dto: GetRecentMatchesDto) {
    this.baseUrl = this.configService
      .getBaseUrl()
      .replace('REGION', dto.region);

    const url = `${this.baseUrl}match/v5/matches/by-puuid/${dto.puuid}/ids`;

    const params = {
      count: dto.page * dto.size,
      start: (dto.page - 1) * dto.size,
      queue: dto.queueId,
    };

    !params.queue && delete params.queue;

    const response = await this.httpService.get(
      url,
      {
        'X-Riot-Token': this.configService.getApiKey(),
      },
      params,
    );

    return response;
  }

  async getMatchDetailsByMatchId(dto: GetMatchDetailsByMatchIdDto) {
    const baseUrl = this.configService
      .getBaseUrl()
      .replace('REGION', dto.region);
    const url = `${baseUrl}match/v5/matches/${dto.matchId}`;

    const response = await this.httpService.get(url, {
      'X-Riot-Token': this.configService.getApiKey(),
    });

    return response.info.participants.map((data) => {
      return plainToClass(ParticipantDTO, data, {
        excludeExtraneousValues: true,
      });
    });
  }
}
