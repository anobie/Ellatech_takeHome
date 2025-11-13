import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TransactionsModule } from '../transactions/transactions.module';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, User]),
    TransactionsModule, // Import TransactionsModule to use TransactionService
    UsersModule, // Import UsersModule to use UsersService
  ],
  controllers: [ProductsController],
  providers: [ProductsService, UsersService], // Provide UsersService here
})
export class ProductsModule {}