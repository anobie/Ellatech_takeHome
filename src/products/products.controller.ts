import {
  Controller,
  Post,
  Body,
  Put,
  Get,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { AdjustProductDto } from './dto/adjust-product.dto';
import { Product } from './entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Put('/adjust')
  @HttpCode(HttpStatus.OK)
  adjust(@Body() adjustProductDto: AdjustProductDto): Promise<Product> {
    return this.productsService.adjust(adjustProductDto);
  }

  @Get('/status/:productId')
  @HttpCode(HttpStatus.OK)
  getStatus(
    @Param('productId', ParseUUIDPipe) productId: string,
  ): Promise<Product> {
    return this.productsService.getStatus(productId);
  }
}