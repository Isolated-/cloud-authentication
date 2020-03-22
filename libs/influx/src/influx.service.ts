import { Injectable, Inject } from '@nestjs/common';
import { INFLUX_DB_KEY } from '.';
import { InfluxDB, IPoint } from 'influx';
import { InfluxModuleOptions } from './influx.interface';

export interface InfluxDataPoint extends IPoint {}

@Injectable()
export class InfluxService {
  private readonly db: InfluxDB;

  constructor(@Inject(INFLUX_DB_KEY) opts: InfluxModuleOptions) {
    this.db = new InfluxDB(opts);
  }

  async createMeasurement(data: InfluxDataPoint[]) {
    return this.db.writePoints(data);
  }

  async dropMeasurement(measurement: string, database?: string) {
    return this.db.dropMeasurement(measurement, database);
  }
}
