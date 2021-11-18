import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from './baseEntity.entity';
import { Server } from '../server/entities/server.entity';
import { User } from '../user/entities/user.entity';

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
}
