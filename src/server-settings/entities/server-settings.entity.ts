import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../entities/baseEntity.entity';
import { Server } from '../../server/entities/server.entity';

@Entity('server_settings')
export class ServerSettings extends BaseEntity {
  @Column({ nullable: true })
  embedColor: string;

  @Column({ nullable: true })
  prefix: string;

  @Column({ nullable: true })
  supportCategoryId: string;

  @Column({ nullable: true })
  warningRoleId: string;

  @Column({ nullable: true })
  adminRoleId: string;

  @Column({ nullable: true })
  guestRoleId: string;

  @Column({ nullable: true })
  everyoneRoleId: string;

  @Column({ nullable: true })
  suggestionChannelId: string;

  @Column({ nullable: true })
  welcomeChannelId: string;

  @OneToOne(() => Server, (server) => server.serverSettings, {
    nullable: false,
  })
  server: Server;
}
