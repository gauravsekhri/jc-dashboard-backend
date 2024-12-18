import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: false },
  },
  {
    timestamps: true,
  },
);

export interface Product extends mongoose.Document {
  id: Number;
  productId: String;
  name: String;
  description: String;
  price: Number;
  category: String;
}
