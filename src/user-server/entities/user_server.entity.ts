import { Item } from 'src/items/entities/item.entity';
import { UserServerItem } from 'src/user-server-item/entities/user-server-item.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../entities/baseEntity.entity';
import { Server } from '../../server/entities/server.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_server')
export class UserServer extends BaseEntity {
  @Column()
  coins: number;

  @ManyToOne(() => User, (user) => user.userServer, { nullable: false })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Server, (server) => server.userServer, { nullable: false })
  @JoinColumn()
  server: Server;
  @OneToMany(
    () => UserServerItem,
    (userServeritem) => userServeritem.userServer,
  )
  userServerItem: UserServerItem[];
}
