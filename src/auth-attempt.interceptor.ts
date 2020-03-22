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
import { Request } from 'express';

@Injectable()
export class AuthAttemptInterceptor implements NestInterceptor {
  constructor(private readonly service: InfluxService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();

    const { email, ip, agent } = this._disectRequest(req);

    return next.handle().pipe(
      tap(
        () => this.measure({ email, ip, agent, success: true }),
        error => {
          this.measure({ email, ip, agent, success: false });
          throw new UnauthorizedException(error.message);
        },
      ),
    );
  }

  private async measure({ email, ip, agent, success }) {
    const data = {
      measurement: 'auth_attempt',
      tags: { email, ip, agent, successful: success ? 'yes' : 'no' },
      fields: {
        success,
      },
    };

    this.service.createMeasurement([data]);
  }

  private _disectRequest(request: Request) {
    return {
      ip: request.connection.remoteAddress,
      email: request.body
        ? request.body.email || request.body.username
        : 'not present',
      agent: request.headers['user-agent'],
      status: request.statusCode,
    };
  }
}
