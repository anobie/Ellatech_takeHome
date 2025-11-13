import { Product } from '../../products/entities/product.entity';
import { User } from '../../users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

export enum TransactionType {
  IN = 'IN',
  OUT = 'OUT',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int' })
  quantityChange: number; // e.g., +20 (IN) or -5 (OUT)

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  type: TransactionType;

  // Relation to Product
  @Column()
  productId: string;

  @ManyToOne(() => Product, (product) => product.transactions)
  product: Product;

  // Relation to User
  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;

  @CreateDateColumn()
  timestamp: Date;
}