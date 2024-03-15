import { Product } from "@/domain-model/entities/product";

export interface ProductRepository {
  getList(ids?: string[], cursor?: string, size?: number): Promise<Product[]>;
}
