import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MonitorModule } from '@monitor/monitor';
import { AuthzModule } from '@authz/authz';
import { AuthModule } from './auth/auth.module';
import { InfluxModule } from '@influx/influx';
import { AuthAttemptSchema } from './schema/influx.schema';

@Module({
  imports: [
    InfluxModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        host: config.get<string>('METRICS_HOST'),
        database: config.get<string>('METRICS_DATABASE'),
        username: config.get<string>('METRICS_USER'),
        password: config.get<string>('METRICS_PASSWORD'),
        schema: [AuthAttemptSchema],
      }),
      inject: [ConfigService],
    }),
    MonitorModule,
    ConfigModule.forRoot(),
    AuthzModule,
    AuthModule,
  ],
})
export class AppModule {}
