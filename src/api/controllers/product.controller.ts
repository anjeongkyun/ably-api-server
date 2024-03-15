import { UsecaseContext } from "@/api/contexts";
import { GetProductsUseCase } from "@/domain-model/usecases/product/get-products.usecase";
import { NextFunction, Request, Response } from "express";

export class ProductController {
  private getProductsUseCase: GetProductsUseCase;

  constructor(usecaseContext: UsecaseContext) {
    this.getProductsUseCase = usecaseContext.getProductsUseCase;
  }

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    this.getProductsUseCase
      .process()
      .then((result) => res.status(200).json({ data: result }));
  };
}
