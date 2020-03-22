import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { ConfigModule } from '@nestjs/config';
import { AuthzModule } from '@authz/authz';

@Module({
  imports: [ConfigModule, AuthzModule],
  controllers: [AuthController],
})
export class AuthModule {}
