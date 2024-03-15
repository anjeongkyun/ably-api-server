import { UsecaseContext } from "@/api/contexts";
import { UserController } from "@/api/controllers/user.controller";
import { Route } from "@/api/routes/route";
import { Router } from "express";

export class UserRoute implements Route {
  router: Router = Router();
  private controller: UserController;
  constructor(usecaseContext: UsecaseContext) {
    this.controller = new UserController(usecaseContext);
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/uesrs/commands/sign-up", this.controller.signUp);
    this.router.post("/uesrs/commands/sign-in", this.controller.signIn);
  }
}
