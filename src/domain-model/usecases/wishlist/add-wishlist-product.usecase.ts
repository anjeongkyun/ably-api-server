import { AddWishListProductCommand } from "@/contracts/commands/wishlist/add-wishlist-product-command";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";
import { NotFoundException } from "@/domain-model/exceptions/not-found-exception";
import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";

export class AddWishListProductUseCase {
  private wishListRepository: WishListRepository;

  constructor(wishListRepository: WishListRepository) {
    this.wishListRepository = wishListRepository;
  }

  async execute(command: AddWishListProductCommand): Promise<void> {
    await this.wishListRepository
      .getByProductId(command.userId, command.productId)
      .then((wishList) => {
        if (wishList) {
          throw new InvalidRequestException(
            400,
            "productId of command already exists in wishLists"
          );
        }
      })
      .catch((err) => {
        if (err instanceof NotFoundException) {
          return;
        }
        throw err;
      });
    const updatingWishList = await this.wishListRepository.get(
      command.wishListId
    );

    return await this.wishListRepository.update(
      updatingWishList.addProduct(command.productId)
    );
  }
}
