import { WishListDocument } from "@/data-access/models/wishlist.model";
import { objectId } from "@/data-access/util";
import { WishList } from "@/domain-model/entities/wishlist";
import { optional } from "@/domain-model/utils/util";

export class WishListDataMapper {
  toEntity(document: WishListDocument): WishList {
    return new WishList(
      document.userId.toString(),
      document.name,
      document.createdDateTime,
      document.deleted,
      document.productIds,
      document._id?.toString()
    );
  }

  toDocument(entity: WishList): WishListDocument {
    return {
      userId: optional(entity.userId, (it) => objectId(it)),
      name: entity.name,
      createdDateTime: entity.createdDateTime,
      deleted: entity.deleted,
      productIds: entity.productIds,
    };
  }
}
