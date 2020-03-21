import { Injectable } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { response } from 'express';

export interface ResponseTime {
  method: string;
  path: string;
  seconds: number;
}

@Injectable()
export class MonitorService {
  constructor(
    @InjectMetric('http_request_duration_seconds')
    private httpRequestDuration: Histogram<string>,
  ) {}

  async exposeResponseTime(time: ResponseTime) {
    this.httpRequestDuration
      .labels(time.method, time.path)
      .observe(time.seconds);
  }
}
