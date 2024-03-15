export interface GetWishListProductsQueryResponse {
  data: WishListProductContract[];
  nextCursor: string;
}

interface WishListProductContract {
  id?: string;
  name: string;
  thumbnail: string;
  price: number;
}
