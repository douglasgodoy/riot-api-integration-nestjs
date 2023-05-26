import { Controller, Get, Query } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { MatchService } from '../services/match.service';
import { GetRecentMatchesDto } from '../dtos/getRecentMatchesDto';
import { RiotService } from 'src/shared/api/riot/riot.service';

@Controller('matches')
export class MatchController {
  constructor(
    private readonly matchService: MatchService,
    private readonly riotService: RiotService,
  ) {}

  @Get(':playerId')
  async getRecentMatches(@Query() query: GetRecentMatchesDto) {
    const dto = plainToClass(GetRecentMatchesDto, { ...query });

    const errors = await validate(dto);

    if (errors.length > 0) {
      throw new Error('Validation failed');
    }

    const matchesIds = await this.matchService.getRecentMatchesByPuuid(dto);

    const promises = matchesIds.map(async (id: string) => {
      const response = await this.matchService.getMatchDetailsByMatchId(
        id,
        dto.region,
      );
      return response;
    });

    return await Promise.all(promises);
  }
}
