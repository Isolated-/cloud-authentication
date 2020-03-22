import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { AuthenticationClient } from 'auth0';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthzService {
  private readonly client: AuthenticationClient;

  constructor(config: ConfigService) {
    this.client = new AuthenticationClient({
      clientId: config.get<string>('AUTH_CLIENT_ID'),
      clientSecret: config.get<string>('AUTH_CLIENT_SECRET'),
      domain: config.get<string>('AUTH0_DOMAIN'),
    });
  }

  async login(username: string, password: string) {
    return this.client
      .passwordGrant({
        username,
        password,
        realm: 'Username-Password-Authentication',
      })
      .catch(error => {
        const errorMessage = JSON.parse(error.message).error_description;
        if (error.name === 'invalid_grant') {
          throw new UnauthorizedException(errorMessage);
        }

        throw new HttpException(errorMessage, error.statusCode);
      });
  }
}
