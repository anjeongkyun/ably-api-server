import mongoose, { model, Schema } from "mongoose";

export interface WishListDocument {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  name: string;
  createdDateTime: Date;
  deleted: boolean;

  productIds?: string[];
}

export const wishListSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  name: { type: String, required: true },
  productIds: { type: [String], required: false },
  createdDateTime: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

export const wishListDataModel = model<WishListDocument>(
  "wish_lists",
  wishListSchema,
  "wish_lists"
);
