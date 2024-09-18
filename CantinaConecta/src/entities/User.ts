import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  loginCode: string;

  @Column()
  name: string;

  @OneToMany(() => Transaction, transaction => transaction.user)
  transactions: Transaction[];
}