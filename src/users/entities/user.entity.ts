import { Transaction } from '../../transactions/entities/transaction.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  // A user can be associated with many transactions
  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}