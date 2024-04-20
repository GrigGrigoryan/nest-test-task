import { Module } from '@nestjs/common';
import { FsService } from '@app/shared/services/fs.service';

@Module({
  providers: [FsService],
  exports: [FsService], // Export the service so other modules can use it
})
export class FsModule {}
