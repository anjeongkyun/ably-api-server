import { DeleteWishListCommand } from "@/contracts/commands/wishlist/delete-wishlist-command";
import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";

export class DeleteWishListUseCase {
  private wishListRepository: WishListRepository;

  constructor(wishListRepository: WishListRepository) {
    this.wishListRepository = wishListRepository;
  }

  async execute(command: DeleteWishListCommand): Promise<void> {
    return await this.wishListRepository.delete(command.wishListId);
  }
}
