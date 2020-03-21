import { Module } from '@nestjs/common';
import { MonitorService } from './monitor.service';
import {
  makeHistogramProvider,
  PrometheusModule,
} from '@willsoto/nestjs-prometheus';

@Module({
  imports: [PrometheusModule.register()],
  providers: [
    MonitorService,
    makeHistogramProvider({
      name: 'http_request_duration_seconds',
      help: 'Duration of HTTP requests in seconds',
      labelNames: ['route', 'method'],
      buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500],
    }),
  ],
  exports: [PrometheusModule, MonitorService],
})
export class MonitorModule {}
