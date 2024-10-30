import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TaskStatus } from '../utils/taskStatus.utils';
import { User } from 'src/auth/entities/auth.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'varchar',
    default: TaskStatus.PENDING,
  })
  status: string;

  @Column({
    type: 'date',
    // Maybe we should be able to create a task without a completion date (?
    nullable: true,
  })
  completionDate: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'date', default: () => Date.now() })
  createdAt: Date;
}
