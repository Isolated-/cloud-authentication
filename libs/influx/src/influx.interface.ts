import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ISingleHostConfig, IClusterConfig } from 'influx';

export type InfluxModuleOptions = ISingleHostConfig | IClusterConfig;

export interface InfluxModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useFactory: (...args: any[]) => InfluxModuleOptions;
  inject: any[];
}
