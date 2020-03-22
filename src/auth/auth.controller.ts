import {
  Controller,
  Get,
  Body,
  Post,
  UseInterceptors,
  UnauthorizedException,
  BadGatewayException,
} from '@nestjs/common';
import { AuthzService } from '@authz/authz';
import { AuthAttemptInterceptor } from '../auth-attempt.interceptor';

@Controller('oauth2')
export class AuthController {
  constructor(private readonly auth: AuthzService) {}

  @Post('token')
  @UseInterceptors(AuthAttemptInterceptor)
  async accessToken(@Body() body) {
    return this.auth.login(body.email, body.password);
  }
}
