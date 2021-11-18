import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/baseEntity.entity';
import { UserServer } from '../../user-server/entities/user_server.entity';

@Entity('user')
export class User extends BaseEntity {
  @Column()
  discordId: string;
  @Column()
  discordTag: string;
  @OneToMany(() => UserServer, (us) => us.user)
  userServer: UserServer[];
}
