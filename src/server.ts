import validateEnv from "./domain-model/utils/validate-env";
import App from "@/api/app";
import { HealthRoute } from "@/api/routes/health.route";
import { usecaseContext } from "@/api/contexts";
import { UserRoute } from "@/api/routes/user.route";
import { WishListRoute } from "@/api/routes/wishlist.route";
import { ProductRoute } from "@/api/routes/product.route";

validateEnv();

const app = new App([
  new HealthRoute(),
  new UserRoute(usecaseContext),
  new WishListRoute(usecaseContext),
  new ProductRoute(usecaseContext),
]);

app.listen();
