import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { AdjustProductDto } from './dto/adjust-product.dto';
import { TransactionsService } from '../transactions/transactions.service';
import { TransactionType } from '../transactions/entities/transaction.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager, // Use EntityManager for transactions
    private transactionsService: TransactionsService,
    private usersService: UsersService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const productRepo = this.entityManager.getRepository(Product);
    const product = productRepo.create(createProductDto);
    return productRepo.save(product);
  }

  async getStatus(productId: string): Promise<Product> {
    const productRepo = this.entityManager.getRepository(Product);
    const product = await productRepo.findOneBy({ id: productId });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async adjust(adjustProductDto: AdjustProductDto): Promise<Product> {
    const { productId, userId, quantityChange } = adjustProductDto;

    // Use a database transaction to ensure atomicity
    return this.entityManager.transaction(async (manager) => {
      const productRepo = manager.getRepository(Product);

      // 1. Find and lock the product row
      const product = await productRepo.findOne({
        where: { id: productId },
        lock: { mode: 'pessimistic_write' }, // Lock row for update
      });

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      // 2. Find the user
      const user = await this.usersService.findOne(userId);
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // 3. Check stock
      const newQuantity = product.quantity + quantityChange;
      if (newQuantity < 0) {
        throw new BadRequestException('Insufficient stock');
      }

      // 4. Update product quantity
      product.quantity = newQuantity;
      const updatedProduct = await productRepo.save(product);

      // 5. Record the transaction
      const transactionType =
        quantityChange > 0 ? TransactionType.IN : TransactionType.OUT;

      await this.transactionsService.create(
        {
          productId,
          userId,
          quantityChange,
          type: transactionType,
        },
        manager, // Pass the transaction manager
      );

      return updatedProduct;
    });
  }
}