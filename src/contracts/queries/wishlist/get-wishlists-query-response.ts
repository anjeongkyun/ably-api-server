export interface GetWishListsQueryResponse {
  data: WishListContract[];
  nextCursor: string;
}

interface WishListContract {
  id: string;
  userId: string;
  productIds?: string[];
  name: string;
  createdDateTime: Date;
}
