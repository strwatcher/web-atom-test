import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from "atomic-router";
import { sample } from "effector";
import { appStarted } from "../config";
import { createBrowserHistory } from "history";
import { Id } from "../lib/id";

export const routes = {
  products: createRoute(),
  product: createRoute<{ id: Id }>(),
  login: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    { path: "/products", route: routes.products },
    { path: "/products/:id", route: routes.product },
    { path: "/login", route: routes.login },
  ],

  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
