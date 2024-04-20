import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
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
    SharedModule,
    SharedModule.registerRmq(
      'MAILER_SERVICE',
      process.env.RABBITMQ_MAILER_QUEUE,
    ),
  ],
  controllers: [MailerController],
  providers: [MailerService],
})
export class MailerModule {}
