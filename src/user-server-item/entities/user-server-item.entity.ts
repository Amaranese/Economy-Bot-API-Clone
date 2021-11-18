import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Item } from 'src/items/entities/item.entity';
import { UserServer } from 'src/user-server/entities/user_server.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class UserServerItem extends BaseEntity {
  @ManyToOne(() => UserServer, (userServer) => userServer.userServerItem)
  userServer: UserServer;
  @ManyToOne(() => Item, (item) => item.userServerItem)
  item: Item;

  @Column()
  quantity: number;
}
