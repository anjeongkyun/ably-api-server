import { ProductRepository } from "@/domain-model/repositories/product.repository";
import { Product } from "@/domain-model/entities/product";
import { ProductDataMapper } from "@/data-access/mappers/product.data.mapper";
import { Order, objectId, toMongoOrder } from "@/data-access/util";
import { productDataModel } from "@/data-access/models/product.model";

export class ProductRepositoryImpl implements ProductRepository {
  private mapper: ProductDataMapper = new ProductDataMapper();
  getList(ids?: string[], cursor?: string, size?: number): Promise<Product[]> {
    const idsFilter = ids && { _id: { $in: ids.map((id) => objectId(id)) } };
    const cursorFilter = cursor && { _id: { $lt: objectId(cursor) } };
    const idFilter =
      idsFilter && cursorFilter
        ? { $and: [idsFilter, cursorFilter] }
        : idsFilter || cursorFilter;
    const queryClause = {
      ...idFilter,
    };

    return productDataModel
      .find(queryClause)
      .sort({ _id: toMongoOrder(Order.DESC) })
      .limit(size)
      .exec()
      .then((documents) => documents.map(this.mapper.toEntity));
  }
}
