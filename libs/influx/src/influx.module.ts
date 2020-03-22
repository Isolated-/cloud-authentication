import { Module, Global, Options, DynamicModule } from '@nestjs/common';
import { InfluxService } from './influx.service';
import { InfluxDB, ISingleHostConfig, IClusterConfig } from 'influx';
import { INFLUX_DB_KEY } from '.';
import { InfluxModuleAsyncOptions } from './influx.interface';

@Global()
@Module({})
export class InfluxModule {
  static register(opts: ISingleHostConfig | IClusterConfig) {
    return {
      module: InfluxModule,
      providers: [
        {
          provide: INFLUX_DB_KEY,
          useValue: opts,
        },
        InfluxService,
      ],
      exports: [InfluxService],
    };
  }

  static registerAsync(opts: InfluxModuleAsyncOptions): DynamicModule {
    return {
      module: InfluxModule,
      providers: [
        {
          provide: INFLUX_DB_KEY,
          useFactory: opts.useFactory,
          inject: opts.inject || [],
        },
        InfluxService,
      ],
      imports: opts.imports,
      exports: [InfluxService],
    };
  }
}
