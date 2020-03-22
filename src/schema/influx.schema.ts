import { ISchemaOptions, FieldType } from 'influx';

export const AuthAttemptSchema: ISchemaOptions = {
  measurement: 'auth_attempt',
  tags: ['email', 'ip', 'agent', 'successful'],
  fields: {
    success: FieldType.BOOLEAN,
  },
};
