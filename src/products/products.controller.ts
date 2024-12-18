import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('api/products')
export class ProductsController {
  constructor(private readonly ProductService: ProductsService) {}

  @Post('/')
  async addProduct(@Body() payload: any) {
    return await this.ProductService.createProduct(payload);
  }

  @Get('/')
  async allProducts() {
    return await this.ProductService.getAllProducts();
  }

  @Get('/:id')
  async productById(@Param('id') id: string) {
    return await this.ProductService.getOneProduct(id);
  }

  @Put('/:id')
  async productUpdate(@Param('id') id: string, @Body() payload: any) {
    return await this.ProductService.updateProduct(id, payload);
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    return await this.ProductService.deleteProduct(id);
  }
}
