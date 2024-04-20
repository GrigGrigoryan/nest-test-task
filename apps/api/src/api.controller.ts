import { Body, Controller, Inject, Post } from '@nestjs/common';
import { SaveDatabaseDto } from './dto/save-database.dto';
import { SaveFileDto } from './dto/save-file.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiService } from './api.service';

@ApiTags('Gateway')
@Controller({
  path: 'gateway',
})
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Post('save-db')
  async saveDatabase(@Body() saveInDatabase: SaveDatabaseDto) {
    return this.apiService.sendStoreMessage('save-db', saveInDatabase);
  }

  @Post('save-file')
  async saveFile(@Body() saveInFile: SaveFileDto) {
    return this.apiService.sendStoreMessage('save-file', saveInFile);
  }
}
