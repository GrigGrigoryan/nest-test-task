import { Module } from '@nestjs/common';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';
import { ConfigModule } from '@nestjs/config';
import appConfig from '@app/shared/config/app.config';
import databaseConfig from '@app/shared/config/database.config';
import rabbitmqConfig from '@app/shared/config/rabbitmq.config';
import { PostgresDBModule, SharedModule } from '@app/shared';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataEntity } from './entities/data.entity';
import { FsModule } from '@app/shared/modules/fs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, appConfig, rabbitmqConfig],
      envFilePath: './.env',
    }),
    SharedModule,
    PostgresDBModule,
    FsModule,
    SharedModule.registerRmq(
      'MAILER_SERVICE',
      process.env.RABBITMQ_MAILER_QUEUE,
    ),
    TypeOrmModule.forFeature([DataEntity]),
  ],
  controllers: [StoreController],
  providers: [
    StoreService,
    {
      provide: 'StoreServiceInterface',
      useClass: StoreService,
    },
  ],
})
export class StoreModule {}
