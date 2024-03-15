import { UsecaseContext } from "@/api/contexts";
import { WishListController } from "@/api/controllers/wishlist.controller";
import authMiddleware from "@/api/middlewares/auth.middleware";
import { Route } from "@/api/routes/route";
import { Router } from "express";

export class WishListRoute implements Route {
  router: Router = Router();
  private controller: WishListController;
  constructor(usecaseContext: UsecaseContext) {
    this.controller = new WishListController(usecaseContext);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/wish-lists/commands/create-wish-list",
      authMiddleware,
      this.controller.createWishList
    );
    this.router.post(
      "/wish-lists/commands/delete-wish-list",
      authMiddleware,
      this.controller.deleteWishList
    );
    this.router.post(
      "/wish-lists/queries/get-wish-lists",
      authMiddleware,
      this.controller.getWishLists
    );
    this.router.post(
      "/wish-lists/queries/get-wish-list-products",
      authMiddleware,
      this.controller.getWishListProducts
    );
    this.router.post(
      "/wish-lists/commands/add-wish-list-product",
      authMiddleware,
      this.controller.addWishListProduct
    );
    this.router.post(
      "/wish-lists/commands/remove-wish-list-product",
      authMiddleware,
      this.controller.removeWishListProduct
    );
  }
}
