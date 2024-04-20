import { Module } from '@nestjs/common';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/shared/config/app.config';
import databaseConfig from '@app/shared/config/database.config';
import rabbitmqConfig from '@app/shared/config/rabbitmq.config';
import { SharedModule } from '@app/shared';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, rabbitmqConfig],
      envFilePath: './.env',
    }),
    SharedModule.registerRmq('STORE_SERVICE', process.env.RABBITMQ_STORE_QUEUE),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
