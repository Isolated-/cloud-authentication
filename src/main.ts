import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MonitorService, MonitorInterceptor } from '@monitor/monitor';

import * as helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get<MonitorService>(MonitorService);
  app.useGlobalInterceptors(new MonitorInterceptor(service));

  // security + compression + rate limit middleware
  app.use(helmet());
  app.use(csurf());
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 5, // one request per second
    }),
  );

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
