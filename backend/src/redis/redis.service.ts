import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService {
  private readonly logger = new Logger(RedisService.name);
  private client: Redis;

  constructor(private configService: ConfigService) {
    this.client = new Redis(this.configService.get<string>('REDIS_URL') || 'redis://localhost:6379');
    this.checkConnection();
  }

  private async checkConnection() {
    try {
      await this.client.ping(); // Simple ping command to check connection
      this.logger.log('Redis connection successful');
    } catch (error: any) {
      this.logger.error('Redis connection failed', error.message || 'An unknown error occurred during connection');
    }
  }

  async set(key: string, value: string, expiry: number): Promise<void> {
    try {
      await this.client.set(key, value, 'EX', expiry); // 'EX' sets the expiry in seconds
    } catch (error: any) {
      this.logger.error(`Failed to set key ${key}`, error.message || 'An unknown error occurred during setting value');
      throw error;
    }
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error: any) {
      this.logger.error(`Failed to get key ${key}`, error.message || 'An unknown error occurred during fetching value');
      throw error;
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error: any) {
      this.logger.error(`Failed to delete key ${key}`, error.message || 'An unknown error occurred during deletion');
      throw error;
    }
  }
}
