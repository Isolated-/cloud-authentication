import { Module } from '@nestjs/common';
import { AuthzService } from './authz.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [ConfigModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthzService, JwtStrategy],
  exports: [AuthzService, ConfigModule, PassportModule],
})
export class AuthzModule {}
