import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";
import { WishList } from "@/domain-model/entities/wishlist";
import { WishListDataMapper } from "@/data-access/mappers/wishlist.data.mapper";
import { wishListDataModel } from "@/data-access/models/wishlist.model";
import { NotFoundException } from "@/domain-model/exceptions/not-found-exception";
import { Order, objectId, toMongoOrder } from "@/data-access/util";

export class WishListRepositoryImpl implements WishListRepository {
  private mapper: WishListDataMapper = new WishListDataMapper();
  getList(userId: string, cursor?: string, size?: number): Promise<WishList[]> {
    const userIdFilter = { userId: objectId(userId) };
    const cursorFilter = cursor && { _id: { $lt: objectId(cursor) } };
    const idFilter =
      userIdFilter && cursorFilter
        ? { $and: [userIdFilter, cursorFilter] }
        : userIdFilter || cursorFilter;
    const queryClause = {
      ...idFilter,
      deleted: false,
    };

    return wishListDataModel
      .find(queryClause)
      .sort({ _id: toMongoOrder(Order.DESC) })
      .limit(size)
      .exec()
      .then((documents) => documents.map(this.mapper.toEntity));
  }

  create(wishList: WishList): Promise<WishList> {
    return wishListDataModel
      .create(this.mapper.toDocument(wishList))
      .then(this.mapper.toEntity);
  }

  get(id: string): Promise<WishList> {
    const queryClause = {
      _id: objectId(id),
    };
    return wishListDataModel
      .findOne(queryClause)
      .exec()
      .then((document) => {
        if (!document) {
          throw new NotFoundException(`${id} is not exist`);
        }
        return this.mapper.toEntity(document);
      });
  }

  getByName(userId: string, name: string): Promise<WishList> {
    const queryClause = {
      userId: userId,
      name: name,
      deleted: false,
    };
    return wishListDataModel
      .findOne(queryClause)
      .exec()
      .then((document) => {
        if (!document) {
          throw new NotFoundException(`${name} is not exist`);
        }
        return this.mapper.toEntity(document);
      });
  }

  delete(id: string): Promise<void> {
    return wishListDataModel
      .updateOne({ _id: objectId(id) }, { $set: { deleted: true } })
      .exec()
      .then((document) => {
        if (!document.acknowledged) {
          throw new NotFoundException(`${id} is not found`);
        }
      });
  }

  update(wishList: WishList): Promise<void> {
    return wishListDataModel
      .updateOne(
        {
          _id: objectId(wishList.id),
        },
        this.mapper.toDocument(wishList)
      )
      .exec()
      .then((document) => {
        if (!document.acknowledged) {
          throw new NotFoundException(`${wishList.id} is not exist`);
        }
        return;
      });
  }

  getByProductId(userId: string, productId: string): Promise<WishList> {
    return wishListDataModel
      .findOne({ $and: [{ userId: userId, productIds: { $in: productId } }] })
      .exec()
      .then((document) => {
        if (!document) {
          throw new NotFoundException(`${productId} of wishlist is not exist`);
        }
        return this.mapper.toEntity(document);
      });
  }
}
