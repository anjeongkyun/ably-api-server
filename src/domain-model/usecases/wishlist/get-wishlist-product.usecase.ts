import { GetWishListProductsQuery } from "@/contracts/queries/wishlist/get-wishlist-product-query";
import { GetWishListProductsQueryResponse } from "@/contracts/queries/wishlist/get-wishlist-product-query-response";
import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";
import { ProductRepository } from "../../repositories/product.repository";

export class GetWishListProductsUseCase {
  private wishListRepository: WishListRepository;
  private productRepository: ProductRepository;

  constructor(
    wishListRepository: WishListRepository,
    productRepository: ProductRepository
  ) {
    this.wishListRepository = wishListRepository;
    this.productRepository = productRepository;
  }

  async process(
    query: GetWishListProductsQuery
  ): Promise<GetWishListProductsQueryResponse> {
    return await this.wishListRepository
      .get(query.wishListId)
      .then((wishList) => wishList.productIds)
      .then((ids) =>
        this.productRepository.getList(ids, query.cursor, query.size)
      )
      .then((products) => {
        return {
          data: products.map((p) => {
            return {
              id: p.id,
              name: p.name,
              thumbnail: p.thumbnail,
              price: p.price,
            };
          }),
          nextCursor:
            products.length > 0 ? products[products.length - 1].id : "",
        };
      })
      .catch((err) => {
        throw err;
      });
  }
}
