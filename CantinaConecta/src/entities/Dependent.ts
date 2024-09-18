import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Transaction } from './Transaction';

@Entity('dependents')
export class Dependent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: string;

  @Column()
  registration: string;

  @Column()
  lanches: string;

  @Column()
  valorGasto: string;

  @OneToMany(() => Transaction, transaction => transaction.dependent)
  transactions: Transaction[];
}