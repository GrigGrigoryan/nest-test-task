import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { TypeOrmConfigService } from '@app/shared/services/typeorm-config.service';
import { InternalServerError } from '@app/shared/errors/InternalServerError';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new InternalServerError('Invalid options passed');
        }
        return await new DataSource(options).initialize();
      },
    }),
  ],
})
export class PostgresDBModule {}
