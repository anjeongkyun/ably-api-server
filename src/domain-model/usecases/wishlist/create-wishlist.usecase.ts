import { CreateWishListCommand } from "@/contracts/commands/wishlist/create-wishlist-command";
import { WishList } from "@/domain-model/entities/wishlist";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";
import { NotFoundException } from "@/domain-model/exceptions/not-found-exception";
import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";

export class CreateWishListUseCase {
  private wishListRepository: WishListRepository;

  constructor(wishListRepository: WishListRepository) {
    this.wishListRepository = wishListRepository;
  }

  async execute(command: CreateWishListCommand): Promise<WishList> {
    await this.wishListRepository
      .getByName(command.userId, command.name)
      .then((wishList) => {
        if (wishList) {
          throw new InvalidRequestException(
            400,
            "name of wishList already exists"
          );
        }
      })
      .catch((err) => {
        if (err instanceof NotFoundException) {
          return;
        }
        throw err;
      });
    return await this.wishListRepository.create(WishList.create(command));
  }
}
