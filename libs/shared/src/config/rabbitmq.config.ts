import { registerAs } from '@nestjs/config';
import { RabbitMQConfig } from './config.type';
import validateConfig from '../utils/validate-config';
import { IsString } from 'class-validator';

class EnvironmentVariablesValidator {
  @IsString()
  RABBITMQ_DEFAULT_USER: string;

  @IsString()
  RABBITMQ_DEFAULT_PASS: string;

  @IsString()
  RABBITMQ_USER: string;

  @IsString()
  RABBITMQ_PASS: string;

  @IsString()
  RABBITMQ_HOST: string;

  @IsString()
  RABBITMQ_STORE_QUEUE: string;

  @IsString()
  RABBITMQ_MAILER_QUEUE: string;
}

export default registerAs<RabbitMQConfig>('rabbitmq', () => {
  validateConfig(process.env, EnvironmentVariablesValidator);

  return {
    defaultUser: process.env.RABBITMQ_DEFAULT_USER,
    defaultPassword: process.env.RABBITMQ_DEFAULT_PASS,
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASS,
    host: process.env.RABBITMQ_HOST,
    storeQueue: process.env.RABBITMQ_STORE_QUEUE,
    mailerQueue: process.env.RABBITMQ_MAILER_QUEUE,
  };
});
