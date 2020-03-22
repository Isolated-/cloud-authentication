import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MonitorModule } from '@monitor/monitor';

@Module({
  imports: [MonitorModule, ConfigModule],
})
export class AppModule {}
