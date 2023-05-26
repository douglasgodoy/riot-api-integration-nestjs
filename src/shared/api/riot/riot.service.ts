import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { ConfigService } from 'src/shared/config/config.service';
import { PlayerResponseDto } from './riotDto';

@Injectable()
export class RiotService {
  constructor(private readonly configService: ConfigService) {}

  async getPlayerByName(
    name: string,
    region: string,
  ): Promise<PlayerResponseDto> {
    const baseUrl = this.configService.getBaseUrl().replace('REGION', region);
    const url = `${baseUrl}summoner/v4/summoners/by-name/${name}`;

    try {
      const response = await axios.get(url, {
        headers: {
          'X-Riot-Token': this.configService.getApiKey(),
        },
      });

      const dto = plainToClass(PlayerResponseDto, response.data);
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error('Validation failed');
      }

      return response.data;
    } catch (error) {
      throw new Error('Failed to get player by name');
    }
  }
}
