import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  /**
   * Creates a transaction.
   * Can be called with a specific EntityManager if inside a DB transaction.
   */
  async create(
    createTransactionDto: CreateTransactionDto,
    manager?: EntityManager,
  ): Promise<Transaction> {
    const repo = manager
      ? manager.getRepository(Transaction)
      : this.transactionsRepository;

    const transaction = repo.create(createTransactionDto);
    return repo.save(transaction);
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionsRepository.find({
      relations: ['product', 'user'], // Include product and user details
    });
  }
}