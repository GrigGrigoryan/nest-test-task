import { Controller, Get } from '@nestjs/common';
import { StoreService } from './store.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SharedService } from '@app/shared';
import { ApiTags } from '@nestjs/swagger';
import { DataEntity } from './entities/data.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SaveDatabaseDto } from './dto/save-database.dto';
import { FsService } from '@app/shared/services/fs.service';
import { SaveFileDto } from './dto/save-file.dto';

@ApiTags('Store')
@Controller({
  path: 'store',
})
export class StoreController {
  constructor(
    private storeService: StoreService,
    private sharedService: SharedService,
    private fsService: FsService,
    @InjectRepository(DataEntity)
    private readonly dataRepository: Repository<DataEntity>,
  ) {}

  @MessagePattern({ cmd: 'save-db' })
  async saveDatabaseConsume(
    @Ctx() context: RmqContext,
    @Payload() payload: SaveDatabaseDto,
  ) {
    this.sharedService.acknowledgeMessage(context);

    await this.dataRepository.create(payload).save();

    return this.storeService.sendMailEvent('db-mail', {});
  }

  @MessagePattern({ cmd: 'save-file' })
  async saveFileConsume(
    @Ctx() context: RmqContext,
    @Payload() payload: SaveFileDto,
  ) {
    this.sharedService.acknowledgeMessage(context);

    this.fsService.appendText(payload.data);
    return this.storeService.sendMailEvent('file-mail', {});
  }
}
