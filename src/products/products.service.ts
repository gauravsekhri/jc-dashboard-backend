import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';
import ApiResponse from 'src/utils/ApiResponse';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}

  async getAllProducts() {
    const products = await this.productModel
      .find({})
      .sort({ createdAt: -1 })
      .exec();
    return new ApiResponse(true, 200, 'Products found', products);
  }

  async getOneProduct(productId) {
    const productData = await this.productModel.findOne({ productId }).exec();

    if (productData) {
      return new ApiResponse(true, 200, 'Products found', productData);
    } else {
      return new ApiResponse(false, 200, 'Product not found', null);
    }
  }

  async createProduct(payload) {
    const productId = 'pId-' + uuidv4();

    await new this.productModel({
      ...payload,
      productId,
    }).save();

    return new ApiResponse(true, 200, 'Product added successfully', null);
  }

  async updateProduct(productId, payload) {
    console.log(productId, payload);
    const product: any = await this.productModel.findOne({ productId }).exec();

    if (product) {
      const result = await this.productModel.updateOne(
        { productId },
        {
          $set: {
            name: payload?.name ?? '',
            description: payload?.description ?? '',
            price: payload?.price ?? '',
            category: payload?.category ?? '',
          },
        },
      );

      return new ApiResponse(
        true,
        200,
        'Product updated successfully!',
        result,
      );
    } else {
      return new ApiResponse(false, 200, 'Product not found!', null);
    }
  }

  async deleteProduct(productId) {
    await this.productModel.deleteOne({ productId }).exec();
    return new ApiResponse(true, 200, 'Product deleted', null);
  }
}
