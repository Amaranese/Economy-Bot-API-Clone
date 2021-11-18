import { BaseEntity } from 'src/entities/baseEntity.entity';
import { Store } from 'src/store/entities/store.entity';
import { UserServerItem } from 'src/user-server-item/entities/user-server-item.entity';
import { UserServer } from 'src/user-server/entities/user_server.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Item extends BaseEntity {
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  description: string;
  @Column()
  message: string;
  @Column()
  type: 'no role' | 'role';
  @ManyToOne(() => Store, (store) => store.items)
  @JoinColumn()
  store: Store;
  @OneToMany(
    () => UserServerItem,
    (userServeritem) => userServeritem.userServer,
  )
  userServerItem: UserServerItem[];
}
