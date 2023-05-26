import { Module } from '@nestjs/common';
import { ConfigService } from 'src/shared/config/config.service';
import { HttpService } from 'src/shared/infra/http/http.service';
import { MatchController } from './controllers/match.controller';
import { MatchService } from './services/match.service';
import { RiotService } from 'src/shared/api/riot/riot.service';
import { MatchRepository } from './repositories/matches.repository';

@Module({
  providers: [
    ConfigService,
    HttpService,
    MatchService,
    RiotService,
    MatchRepository,
  ],
  controllers: [MatchController],
})
export class MatchModule {}
