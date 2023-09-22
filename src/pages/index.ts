import { createRoutesView } from "atomic-router-react";
import { ProductsRoute } from "./products";

export const Pages = createRoutesView({
  routes: [ProductsRoute],
});
