import { GetWishListsQuery } from "@/contracts/queries/wishlist/get-wishlists-query";
import { GetWishListsQueryResponse } from "@/contracts/queries/wishlist/get-wishlists-query-response";
import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";

export class GetWishListsUseCase {
  private wishListRepository: WishListRepository;

  constructor(wishListRepository: WishListRepository) {
    this.wishListRepository = wishListRepository;
  }

  async process(query: GetWishListsQuery): Promise<GetWishListsQueryResponse> {
    return this.wishListRepository
      .getList(query.userId, query.cursor, query.size)
      .then((wishLists) => {
        return {
          data: wishLists.map((wishList) => {
            return {
              id: wishList.id!!,
              userId: wishList.userId,
              productIds: wishList.productIds,
              name: wishList.name,
              createdDateTime: wishList.createdDateTime,
            };
          }),
          nextCursor:
            wishLists.length > 0 ? wishLists[wishLists.length - 1].id : "",
        };
      });
  }
}
