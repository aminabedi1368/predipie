import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../user/user.entity';
import { IsNotEmpty, IsDate, Min } from 'class-validator';

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  description: string;

  @Column()
  @IsDate()
  startTime: Date;

  @Column()
  @IsDate()
  endTime: Date;

  @Column({ default: 0 })
  @Min(1)
  capacity: number;

  @ManyToOne(() => User, (user) => user.registeredEvents)
  organizer: User;

  @ManyToMany(() => User, (user) => user.registeredEvents)
  @JoinTable()
  participants: User[];

}

