import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MonitorModule } from '@monitor/monitor';
import { AuthzModule } from '@authz/authz';

@Module({
  imports: [MonitorModule, ConfigModule, AuthzModule],
})
export class AppModule {}
