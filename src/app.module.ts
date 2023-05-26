import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MatchModule } from './modules/Player/matches/matches.module';

@Module({
  imports: [MatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
