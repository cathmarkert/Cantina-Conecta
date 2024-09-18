import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Dependent } from './Dependent';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dependentId: number;

    @Column('text', { array: true })
    comidas: string[];

    @Column('text', { array: true })
    bebidas: string[];

    @Column()
    time: string;

    @ManyToOne(() => Dependent, dependent => dependent.orders)
    dependent: Dependent;
}