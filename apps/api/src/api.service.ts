import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ApiService {
  constructor(@Inject('STORE_SERVICE') private storeService: ClientProxy) {}

  sendStoreMessage(cmd: string, data: any): any {
    return this.storeService.send({ cmd }, data);
  }
}
