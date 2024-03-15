import { ProductDocument } from "@/data-access/models/product.model";
import { Product } from "@/domain-model/entities/product";

export class ProductDataMapper {
  toEntity(document: ProductDocument): Product {
    return new Product(
      document.name,
      document.thumbnail,
      document.price,
      document._id?.toString()
    );
  }
}
