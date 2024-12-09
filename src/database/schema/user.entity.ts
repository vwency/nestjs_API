import { Optional } from '@nestjs/common';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';


@Entity('users')
export class Users {
  @PrimaryGeneratedColumn("uuid")
  user_id: uuidv4; 

  @Column({type: 'varchar', nullable: true })
  username: string;

  @Column("varchar")
  hash: string;

  @Column({type: 'varchar', nullable: true })
  email: string;

  @Column({type: 'varchar', nullable: true })
  hashedRt: string;
}
