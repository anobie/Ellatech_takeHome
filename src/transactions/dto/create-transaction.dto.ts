import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
} from 'class-validator';
import { TransactionType } from '../entities/transaction.entity';

// This DTO is used internally by the service
export class CreateTransactionDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  quantityChange: number;

  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: TransactionType;
}