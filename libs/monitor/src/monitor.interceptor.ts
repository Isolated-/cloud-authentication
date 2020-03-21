import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MonitorService } from './monitor.service';

@Injectable()
export class MonitorInterceptor implements NestInterceptor {
  constructor(private readonly service: MonitorService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { method, route } = context.switchToHttp().getRequest();

    const start = Date.now();

    return next.handle().pipe(
      tap(() => {
        const seconds = (Date.now() - start) / 1000;

        this.service.exposeResponseTime({ method, path: route.path, seconds });
      }),
    );
  }
}
