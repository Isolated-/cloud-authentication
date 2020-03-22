import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { InfluxService } from '@influx/influx';

@Injectable()
export class AuthAttemptInterceptor implements NestInterceptor {
  constructor(private readonly service: InfluxService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    // TODO: add collection of lat/lng using IP
    const ip = req.connection.remoteAddress;
    let email = undefined;

    // TODO: handle client authentication
    if (req.body && req.body.username) {
      email = req.body.username;
    }

    let data = {
      measurement: 'login_attempt',
      tags: { email, ip },
      fields: {},
    };

    let success = false;

    return next.handle().pipe(
      tap(() => {
        success = true;
        data.fields = { success };
        this.service.createMeasurement([data]);
      }),
      catchError(error => {
        success = false;
        data.fields = { success };
        this.service.createMeasurement([data]);

        throw new UnauthorizedException(error.message);
      }),
    );
  }
}
