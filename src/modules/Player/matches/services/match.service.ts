import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/shared/config/config.service';
import { HttpService } from 'src/shared/infra/http/http.service';
import { ParticipantsResponse } from '../dtos/getMatchDetailDto';
import { MatchRepository } from '../repositories/matches.repository';

@Injectable()
export class MatchService {
  constructor(private readonly matchRepository: MatchRepository) {}

  async getRecentMatchesByPuuid(dto: {
    region: string;
    puuid: string;
    page: number;
    size: number;
    queueId?: string;
  }): Promise<Array<string>> {
    const response = await this.matchRepository.getRecentMatchesByPuuid(dto);

    return response;
  }

  async getMatchDetailsByMatchId(
    matchId: string,
    region: string,
  ): Promise<ParticipantsResponse> {
    try {
      const response = await this.matchRepository.getMatchDetailsByMatchId({
        matchId,
        region,
      });

      return response;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to get match details');
    }
  }
}
