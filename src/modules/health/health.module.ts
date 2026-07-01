import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

const state = ['Disconnected', 'Connected ', 'Connecting', 'Disconnecting'];
@Injectable()
export class HealthModule implements OnModuleInit {
  private readonly logger = new Logger(HealthModule.name);

  constructor(@InjectConnection() private connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', () => {
      this.logger.log('✅ MongoDB connected');
    });
    this.connection.on('error', (err) => {
      this.logger.error('❌ Error connecting to MongoDB', err);
    });

    this.logger.log(`Current DB state: ${state[this.connection.readyState]}`);
  }
}
