import { NestFactory } from '@nestjs/core';
import { StoreModule } from './store.module';
import { ConfigService } from '@nestjs/config';
import { SharedService } from '@app/shared';

async function bootstrap() {
  const app = await NestFactory.create(StoreModule);
  const configService = app.get(ConfigService);
  const sharedService = app.get(SharedService);

  const queue = configService.get('rabbitmq.storeQueue');

  app.connectMicroservice(sharedService.getRmqOptions(queue));

  await app.startAllMicroservices();
}

bootstrap();
