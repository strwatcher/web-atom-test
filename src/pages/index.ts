import { createRoutesView } from "atomic-router-react";
import { ProductsRoute } from "./products";
import { ProductRoute } from "./product";

export const Pages = createRoutesView({
  routes: [ProductsRoute, ProductRoute],
});
