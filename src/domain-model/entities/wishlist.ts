import { CreateWishListCommand } from "@/contracts/commands/wishlist/create-wishlist-command";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";

export class WishList {
  id?: string;
  userId: string;
  productIds?: string[];
  name: string;
  createdDateTime: Date;
  deleted: boolean;

  constructor(
    userId: string,
    name: string,
    createdDateTime: Date,
    deleted: boolean,
    productIds?: string[],
    id?: string
  ) {
    this.userId = userId;
    this.name = name;
    this.createdDateTime = createdDateTime;
    this.deleted = deleted;
    this.productIds = productIds;
    this.id = id;
  }

  static create(command: CreateWishListCommand) {
    return new WishList(command.userId, command.name, new Date(), false);
  }

  addProduct(productId: string): WishList {
    if (!this.productIds) {
      this.productIds = [];
    }
    this.productIds.push(productId);
    return this;
  }

  removeProduct(productId: string): WishList {
    if (!this.productIds.includes(productId)) {
      throw new InvalidRequestException(400, "productId not found in wishList");
    }
    this.productIds = this.productIds.filter((id) => id !== productId);
    return this;
  }
}
