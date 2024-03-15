import { Product } from "@/domain-model/entities/product";
import { ProductRepository } from "@/domain-model/repositories/product.repository";

export class GetProductsUseCase {
  private productRepository: ProductRepository;

  constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  async process(): Promise<Product[]> {
    return this.productRepository.getList();
  }
}
