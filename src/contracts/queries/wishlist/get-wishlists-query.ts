export interface GetWishListsQuery {
  userId: string;
  cursor?: string;
  size: number;
}
