import { ISchemaOptions, FieldType } from 'influx';

export const AuthAttemptSchema: ISchemaOptions = {
  measurement: 'auth_attempt',
  tags: ['email', 'ip'],
  fields: {
    success: FieldType.INTEGER,
  },
};
