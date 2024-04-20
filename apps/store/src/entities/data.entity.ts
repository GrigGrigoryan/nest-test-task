import { Base } from '@app/shared/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('DataEntity')
export class DataEntity extends Base {
  @Column({ nullable: false })
  data: string;
}
