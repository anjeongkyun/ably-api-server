import { UserRepositoryImpl } from "@/data-access/repositories/user.repository";
import { TokenGenerator } from "@/domain-model/generator/token-generator";
import { UserRepository } from "@/domain-model/repositories/user.repository";
import { SignInUseCase } from "@/domain-model/usecases/user/sign-in.usecase";
import { SignUpUseCase } from "@/domain-model/usecases/user/sign-up.usecase";
import { JwtTokenGenerator } from "@/infra/jwt/JwtTokenGenerator";
import { GetWishListsUseCase } from "@/domain-model/usecases/wishlist/get-wishlists.usecase";
import { CreateWishListUseCase } from "@/domain-model/usecases/wishlist/create-wishlist.usecase";
import { DeleteWishListUseCase } from "@/domain-model/usecases/wishlist/delete-wishlist.usecase";
import { WishListRepository } from "@/domain-model/repositories/wishlist.repository";
import { WishListRepositoryImpl } from "@/data-access/repositories/wishlist.repository";
import { GetWishListProductsUseCase } from "../../domain-model/usecases/wishlist/get-wishlist-product.usecase";
import { ProductRepository } from "../../domain-model/repositories/product.repository";
import { ProductRepositoryImpl } from "@/data-access/repositories/product.repository";
import { AddWishListProductUseCase } from "@/domain-model/usecases/wishlist/add-wishlist-product.usecase";
import { RemoveWishListProductUseCase } from "@/domain-model/usecases/wishlist/remove-wishlist-product.usecase";
import { GetProductsUseCase } from "@/domain-model/usecases/product/get-products.usecase";

class RepositoryContext {
  userRepository: UserRepository;
  wishListRepository: WishListRepository;
  productRepository: ProductRepository;
  constructor() {
    this.userRepository = new UserRepositoryImpl();
    this.wishListRepository = new WishListRepositoryImpl();
    this.productRepository = new ProductRepositoryImpl();
  }
}

export class GeneratorContext {
  tokenGenerator: TokenGenerator;
  constructor() {
    this.tokenGenerator = new JwtTokenGenerator();
  }
}

export class UsecaseContext {
  signUpUseCase: SignUpUseCase;
  signInUseCase: SignInUseCase;
  getWishListsUseCase: GetWishListsUseCase;
  createWishListUseCase: CreateWishListUseCase;
  deleteWishListUseCase: DeleteWishListUseCase;
  getWishListProductsUseCase: GetWishListProductsUseCase;
  addWishListProductUseCase: AddWishListProductUseCase;
  removeWishListProductUseCase: RemoveWishListProductUseCase;
  getProductsUseCase: GetProductsUseCase;
  constructor(
    repositoryContext: RepositoryContext,
    generatorContext: GeneratorContext
  ) {
    this.signUpUseCase = new SignUpUseCase(repositoryContext.userRepository);
    this.signInUseCase = new SignInUseCase(
      repositoryContext.userRepository,
      generatorContext.tokenGenerator
    );
    this.getWishListsUseCase = new GetWishListsUseCase(
      repositoryContext.wishListRepository
    );
    this.createWishListUseCase = new CreateWishListUseCase(
      repositoryContext.wishListRepository
    );
    this.deleteWishListUseCase = new DeleteWishListUseCase(
      repositoryContext.wishListRepository
    );
    this.getWishListProductsUseCase = new GetWishListProductsUseCase(
      repositoryContext.wishListRepository,
      repositoryContext.productRepository
    );
    this.addWishListProductUseCase = new AddWishListProductUseCase(
      repositoryContext.wishListRepository
    );
    this.removeWishListProductUseCase = new RemoveWishListProductUseCase(
      repositoryContext.wishListRepository
    );
    this.getProductsUseCase = new GetProductsUseCase(
      repositoryContext.productRepository
    );
  }
}

export const usecaseContext: UsecaseContext = new UsecaseContext(
  new RepositoryContext(),
  new GeneratorContext()
);
