import { Controller, Get } from '@nestjs/common';
import { MailerService } from './mailer.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Mailer')
@Controller({
  path: 'mailer',
})
export class MailerController {
  constructor(
    private readonly mailerService: MailerService,
    private sharedService: SharedService,
  ) {}

  @EventPattern({ cmd: 'db-mail' })
  async sendDatabaseMail(@Ctx() context: RmqContext, @Payload() payload: any) {
    this.sharedService.acknowledgeMessage(context);
    return { message: 'mail sent' };
  }

  @EventPattern({ cmd: 'file-mail' })
  async sendFileDatabase(@Ctx() context: RmqContext, @Payload() payload: any) {
    this.sharedService.acknowledgeMessage(context);
    return { message: 'mail sent' };
  }
}
