import { getAllProductsQuery } from "@/shared/api/products";
import { routes } from "@/shared/routing";
import { RouteParamsAndQuery, chainRoute } from "atomic-router";
import { createEvent, sample } from "effector";

const beforeOpen = createEvent<RouteParamsAndQuery<{}>>();
const openOn = getAllProductsQuery.finished.success;
const cancelOn = getAllProductsQuery.finished.failure;

sample({
  clock: beforeOpen,
  target: getAllProductsQuery.start,
});

export const route = chainRoute({
  route: routes.products,
  beforeOpen,
  openOn,
  cancelOn,
});
