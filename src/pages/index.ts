import { createRoutesView } from "atomic-router-react";
import { ProductsRoute } from "./products";
import { ProductRoute } from "./product";
import { LoginRoute } from "./login";

export const Pages = createRoutesView({
  routes: [ProductsRoute, ProductRoute, LoginRoute],
});
