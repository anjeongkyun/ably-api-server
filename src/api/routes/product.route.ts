import { UsecaseContext } from "@/api/contexts";
import { ProductController } from "@/api/controllers/product.controller";
import { Route } from "@/api/routes/route";
import { Router } from "express";

export class ProductRoute implements Route {
  router: Router = Router();
  private controller: ProductController;
  constructor(usecaseContext: UsecaseContext) {
    this.controller = new ProductController(usecaseContext);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/products/queries/get-products",
      this.controller.getProducts
    );
  }
}
