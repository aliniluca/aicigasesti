import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Database connected successfully.');
    } catch (error: any) {
      this.logger.error('Database connection failed:', error.message || 'An unknown error occurred during connection');
      throw error; // Re-throw to let the application handle it
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('Database disconnected successfully.');
    } catch (error: any) {
      this.logger.error('Database disconnection failed:', error.message || 'An unknown error occurred during disconnection');
      throw error; // Re-throw to let the application handle it
    }
  }
}
