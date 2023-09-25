import { createHistoryRouter, createRoute } from "atomic-router";
import { sample } from "effector";
import { appStarted } from "../config";
import { createBrowserHistory } from "history";
import { ProductId } from "../api/products";

export const routes = {
  products: createRoute(),
  product: createRoute<ProductId>(),
  login: createRoute(),
  notFound: createRoute(),
};

export const router = createHistoryRouter({
  routes: [
    { path: "/products", route: routes.products },
    { path: "/products/:id", route: routes.product },
    { path: "/login", route: routes.login },
    { path: "", route: routes.notFound },
    { path: "/:params+", route: routes.notFound },
  ],
});

sample({
  clock: routes.notFound.opened,
  target: routes.login.open,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
