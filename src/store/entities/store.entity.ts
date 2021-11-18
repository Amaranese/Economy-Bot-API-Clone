import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Item } from 'src/items/entities/item.entity';
import { Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Server } from '../../server/entities/server.entity';

@Entity()
export class Store extends BaseEntity {
  @OneToOne(() => Server, (server) => server.store)
  @JoinColumn()
  server: Server;
  @OneToMany(() => Item, (item) => item.store)
  items: Item[];
}
