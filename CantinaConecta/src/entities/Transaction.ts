import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, TableInheritance } from 'typeorm';
import { Dependent } from './Dependent';
import { User } from './User';

@Entity('transactions')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // 'user' or 'dependent'

  @Column()
  description: string;

  @Column()
  amount: string;

  @Column()
  date: string;

  @ManyToOne(() => Dependent, dependent => dependent.transactions, { nullable: true })
  @JoinColumn({ name: 'dependent_id' })
  dependent?: Dependent;

  @ManyToOne(() => User, user => user.transactions, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;
}