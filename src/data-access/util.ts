import mongoose, { SortOrder } from "mongoose";

export const objectId = (s: string) => new mongoose.Types.ObjectId(s);

export enum Order {
  ASC = "ASC",
  DESC = "DESC",
}

export const toMongoOrder = (order: Order): SortOrder => {
  switch (order) {
    case Order.ASC:
      return 1;
    case Order.DESC:
      return -1;
  }
};
