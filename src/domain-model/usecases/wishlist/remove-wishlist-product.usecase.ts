import { RemoveWishListProductCommand } from "@/contracts/commands/wishlist/remove-wishlist-product-command";
import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";

export class RemoveWishListProductUseCase {
  private wishListRepository: WishListRepository;

  constructor(wishListRepository: WishListRepository) {
    this.wishListRepository = wishListRepository;
  }

  async execute(command: RemoveWishListProductCommand): Promise<void> {
    const removingWishList = await this.wishListRepository.get(
      command.wishListId
    );
    return await this.wishListRepository.update(
      removingWishList.removeProduct(command.productId)
    );
  }
}
