import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MonitorService, MonitorInterceptor } from '@monitor/monitor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const service = app.get<MonitorService>(MonitorService);
  app.useGlobalInterceptors(new MonitorInterceptor(service));

  await app.listen(3000);
}
bootstrap();
