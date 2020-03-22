import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 6,
        jwksUri: `https://${config.get<string>(
          'AUTH0_DOMAIN',
        )}.well-known/jwks.json`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: `https://${config.get<string>('AUTH0_AUDIENCE')}`,
      issuer: `${config.get<string>('AUTH0_DOMAIN')}`,
      algorithms: ['RS256'],
    });
  }

  validate(payload: any) {
    return payload;
  }
}
