import { IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AdjustProductDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string; // ID of the user performing the adjustment

  @IsInt()
  @IsNotEmpty()
  quantityChange: number; // Can be positive (add) or negative (remove)
}