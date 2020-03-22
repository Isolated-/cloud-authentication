import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { InfluxService, InfluxModule, INFLUX_DB_KEY } from '@influx/influx';
import { AuthzService, AuthzModule } from '@authz/authz';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationClient } from 'auth0';

describe('Auth Controller', () => {
  let controller: AuthController;
  let authz: AuthzService;
  let client: AuthenticationClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), InfluxModule.register({}), AuthzModule],
      controllers: [AuthController],
      providers: [
        InfluxService,
        {
          provide: AuthzService,
          useValue: {
            login: (username, password) => ({
              access_token: '4VC8aSV3yom1fewakkFIm3xblSY36Kiv',
              id_token:
                'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qWTFSVVl6TVRneVJVTkROVFJGUkVRMU1UUkNNekJGTURsQk1VSTROMFUxT1RJM01qUkVSUSJ9.eyJuaWNrbmFtZSI6Im1pa2UiLCJuYW1lIjoibWlrZUBlbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMTM5YzI5Y2M4OTQyZDA5MDUwMjQ1ZjFkM2NmYjBhM2E_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZtaS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0wMy0yMlQwMjozMDo1OS4xNjZaIiwiZW1haWwiOiJtaWtlQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtY3IwZjVjdzcuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVlNzZiYzI4MGVmZTQ2MGMwZDQ3MDM4ZCIsImF1ZCI6IjVmY3o2V215U0FYUFJiM1Q4YkJxRjZDUkVnc0FTYXk1IiwiaWF0IjoxNTg0ODQ0MjU5LCJleHAiOjE1ODQ4ODAyNTl9.Mi_KOkbBFGhRc-9wl6ZUpJlkDPTqRZOe7337NVRLhbUsTQYBOtN4HG_uxMEUqXlnC80lk4jnl3qS2mRAoa3Yu_RAlXxGRGNebkKiWCEz7N4hM0WyPUhUjcaDEQ2RUVx4qFnAbVeN8-TFiY3Rfll05PlHDv30OqE6B6YcRbvhGqMojKtMFqOBmjrvJB18gfnCpqvuazhqKLb6bdv0bhwYMrAQE_x0jLBUrM1izT40frpwYG9-XRALHw2kD-TPa2tAn2nNvEUsBnnBxtKD_7KsNaH2-KgvrfrwoTiYNuXRBqQ8z95oAXgS95OAQ2EpndS7E8NJKD1Ddj70tbuffhFA0g',
              scope: 'openid profile email address phone',
              expires_in: 86400,
              token_type: 'Bearer',
            }),
          },
        },
        { provide: INFLUX_DB_KEY, useValue: {} },
      ],
    }).compile();

    authz = module.get<AuthzService>(AuthzService);
    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  test('should have method .accessToken()', () => {
    expect(controller).toHaveProperty('accessToken');
    expect(controller.accessToken).toBeInstanceOf(Function);
  });

  test('.accessToken() should return an access token (authentication success)', async () => {
    const response = {
      access_token: '4VC8aSV3yom1fewakkFIm3xblSY36Kiv',
      id_token:
        'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qWTFSVVl6TVRneVJVTkROVFJGUkVRMU1UUkNNekJGTURsQk1VSTROMFUxT1RJM01qUkVSUSJ9.eyJuaWNrbmFtZSI6Im1pa2UiLCJuYW1lIjoibWlrZUBlbWFpbC5jb20iLCJwaWN0dXJlIjoiaHR0cHM6Ly9zLmdyYXZhdGFyLmNvbS9hdmF0YXIvMTM5YzI5Y2M4OTQyZDA5MDUwMjQ1ZjFkM2NmYjBhM2E_cz00ODAmcj1wZyZkPWh0dHBzJTNBJTJGJTJGY2RuLmF1dGgwLmNvbSUyRmF2YXRhcnMlMkZtaS5wbmciLCJ1cGRhdGVkX2F0IjoiMjAyMC0wMy0yMlQwMjozMDo1OS4xNjZaIiwiZW1haWwiOiJtaWtlQGVtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiaXNzIjoiaHR0cHM6Ly9kZXYtY3IwZjVjdzcuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDVlNzZiYzI4MGVmZTQ2MGMwZDQ3MDM4ZCIsImF1ZCI6IjVmY3o2V215U0FYUFJiM1Q4YkJxRjZDUkVnc0FTYXk1IiwiaWF0IjoxNTg0ODQ0MjU5LCJleHAiOjE1ODQ4ODAyNTl9.Mi_KOkbBFGhRc-9wl6ZUpJlkDPTqRZOe7337NVRLhbUsTQYBOtN4HG_uxMEUqXlnC80lk4jnl3qS2mRAoa3Yu_RAlXxGRGNebkKiWCEz7N4hM0WyPUhUjcaDEQ2RUVx4qFnAbVeN8-TFiY3Rfll05PlHDv30OqE6B6YcRbvhGqMojKtMFqOBmjrvJB18gfnCpqvuazhqKLb6bdv0bhwYMrAQE_x0jLBUrM1izT40frpwYG9-XRALHw2kD-TPa2tAn2nNvEUsBnnBxtKD_7KsNaH2-KgvrfrwoTiYNuXRBqQ8z95oAXgS95OAQ2EpndS7E8NJKD1Ddj70tbuffhFA0g',
      scope: 'openid profile email address phone',
      expires_in: 86400,
      token_type: 'Bearer',
    };

    const creds = { email: 'test@domain.com', password: 'some.password1234' };

    const result = await controller.accessToken({
      email: creds.email,
      password: creds.password,
    });

    expect(result).toBeDefined();
    expect(result).toEqual(response);
  });
});
