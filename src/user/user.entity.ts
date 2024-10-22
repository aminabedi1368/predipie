import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { Event } from '../event/event.entity';

export enum UserRole {
  ADMIN = 'admin',
  PARTICIPANT = 'participant',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.PARTICIPANT })
  @IsEnum(UserRole)
  role: UserRole;

  @ManyToMany(() => Event, (event) => event.participants)
  @JoinTable()
  registeredEvents: Event[];
}
