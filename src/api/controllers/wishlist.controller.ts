import { UsecaseContext } from "@/api/contexts";
import { CreateWishListCommand } from "@/contracts/commands/wishlist/create-wishlist-command";
import { DeleteWishListCommand } from "@/contracts/commands/wishlist/delete-wishlist-command";
import { GetWishListProductsQuery } from "@/contracts/queries/wishlist/get-wishlist-product-query";
import { GetWishListsQuery } from "@/contracts/queries/wishlist/get-wishlists-query";
import { HttpException } from "@/domain-model/exceptions/HttpException";
import { InvalidRequestException } from "@/domain-model/exceptions/invalid-request-exception";
import { NotFoundException } from "@/domain-model/exceptions/not-found-exception";
import { CreateWishListUseCase } from "@/domain-model/usecases/wishlist/create-wishlist.usecase";
import { DeleteWishListUseCase } from "@/domain-model/usecases/wishlist/delete-wishlist.usecase";
import { GetWishListsUseCase } from "@/domain-model/usecases/wishlist/get-wishlists.usecase";
import { NextFunction, Response } from "express";
import { GetWishListProductsUseCase } from "../../domain-model/usecases/wishlist/get-wishlist-product.usecase";
import { AddWishListProductUseCase } from "@/domain-model/usecases/wishlist/add-wishlist-product.usecase";
import { AddWishListProductCommand } from "@/contracts/commands/wishlist/add-wishlist-product-command";
import { RemoveWishListProductCommand } from "@/contracts/commands/wishlist/remove-wishlist-product-command";
import { RemoveWishListProductUseCase } from "@/domain-model/usecases/wishlist/remove-wishlist-product.usecase";
import { RequestWithUser } from "@/api/middlewares/auth.middleware";

export class WishListController {
  private createWishListUseCase: CreateWishListUseCase;
  private deleteWishListUseCase: DeleteWishListUseCase;
  private getWishListsUseCase: GetWishListsUseCase;
  private getWishListProductsUseCase: GetWishListProductsUseCase;
  private addWishListProductUseCase: AddWishListProductUseCase;
  private removeWishListProductUseCase: RemoveWishListProductUseCase;

  constructor(usecaseContext: UsecaseContext) {
    this.createWishListUseCase = usecaseContext.createWishListUseCase;
    this.deleteWishListUseCase = usecaseContext.deleteWishListUseCase;
    this.getWishListsUseCase = usecaseContext.getWishListsUseCase;
    this.getWishListProductsUseCase = usecaseContext.getWishListProductsUseCase;
    this.addWishListProductUseCase = usecaseContext.addWishListProductUseCase;
    this.removeWishListProductUseCase =
      usecaseContext.removeWishListProductUseCase;
  }

  createWishList = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const command: CreateWishListCommand = {
      userId: req.user.id,
      ...req.body,
    };
    this.createWishListUseCase
      .execute(command)
      .then(() => res.status(200).json({}))
      .catch((err) => {
        console.error(err);
        if (err instanceof InvalidRequestException) {
          next(new HttpException(err.status, err.message));
          return;
        }
        next(err);
      });
  };

  deleteWishList = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const command: DeleteWishListCommand = req.body;
    this.deleteWishListUseCase
      .execute(command)
      .then(() => res.status(200).json({}))
      .catch((err) => {
        console.error(err);
        if (err instanceof NotFoundException) {
          next(new HttpException(err.status, err.message));
          return;
        }
        next(err);
      });
  };

  getWishLists = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const query: GetWishListsQuery = { userId: req.user.id, ...req.body };
    this.getWishListsUseCase
      .process(query)
      .then((result) => res.status(200).json(result));
  };

  getWishListProducts = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const query: GetWishListProductsQuery = req.body;
    this.getWishListProductsUseCase
      .process(query)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.error(err);
        if (err instanceof NotFoundException) {
          next(new HttpException(err.status, err.message));
          return;
        }
        next(err);
      });
  };

  addWishListProduct = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const command: AddWishListProductCommand = {
      userId: req.user.id,
      ...req.body,
    };
    this.addWishListProductUseCase
      .execute(command)
      .then(() => res.status(200).json({}))
      .catch((err) => {
        console.error(err);
        if (err instanceof InvalidRequestException) {
          next(new HttpException(err.status, err.message));
          return;
        }
        next(err);
      });
  };

  removeWishListProduct = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) => {
    const command: RemoveWishListProductCommand = {
      userId: req.user.id,
      ...req.body,
    };
    this.removeWishListProductUseCase
      .execute(command)
      .then(() => res.status(200).json({}))
      .catch((err) => {
        console.error(err);
        if (err instanceof InvalidRequestException) {
          next(new HttpException(err.status, err.message));
          return;
        }
        next(err);
      });
  };
}
