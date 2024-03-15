import mongoose, { model, Schema } from "mongoose";

export interface ProductDocument {
  _id?: mongoose.Types.ObjectId;
  name: string;
  thumbnail: string;
  price: number;
}

export const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
});

export const productDataModel = model<ProductDocument>(
  "products",
  productSchema,
  "products"
);
