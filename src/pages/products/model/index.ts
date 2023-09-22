import { getAllProductsQuery } from "@/entities/product";
import { routes } from "@/shared/routing";
import { sample } from "effector";

export const route = routes.products;

sample({
  clock: route.opened,
  target: getAllProductsQuery.start,
});

getAllProductsQuery.finished.success.watch(console.log);
