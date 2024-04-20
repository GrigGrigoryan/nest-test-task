import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class StoreService {
  constructor(@Inject('MAILER_SERVICE') private mailerService: ClientProxy) {}

  sendMailEvent(cmd: string, data: any): any {
    return this.mailerService.send({ cmd }, data);
  }
}
