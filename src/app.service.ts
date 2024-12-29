import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AppService {
  private onlineUserCount: number;

  constructor() {
    this.generateRandomUserCount();
  }

  @Cron('*/30 * * * * *')
  generateRandomUserCount() {
    this.onlineUserCount = Math.floor(Math.random() * (46 - 22 + 1)) + 22;
  }

  getHello(): string {
    return 'Hello World!';
  }

  getOnlineUserCount(): number {
    return this.onlineUserCount;
  }
}
