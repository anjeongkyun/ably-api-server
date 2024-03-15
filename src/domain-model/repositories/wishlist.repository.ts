import { WishList } from "@/domain-model/entities/wishlist";

export interface WishListRepository {
  getList(userId: string, cursor?: string, size?: number): Promise<WishList[]>;
  create(wishList: WishList): Promise<WishList>;
  getByName(userId: string, name: string): Promise<WishList>;
  get(id?: string): Promise<WishList>;
  delete(id: string): Promise<void>;
  update(wishList: WishList): Promise<void>;
  getByProductId(userId: string, productId: string): Promise<WishList>;
}
