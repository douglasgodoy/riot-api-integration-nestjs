import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = 'https://REGION.api.riotgames.com/lol/';
    this.apiKey = 'RGAPI-d41e30ed-78b5-4835-80b7-7d1ac54a06f0';
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  getApiKey(): string {
    return this.apiKey;
  }
}
