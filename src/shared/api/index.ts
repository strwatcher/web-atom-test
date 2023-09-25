import { or } from "patronum";
import {
  createProductMutation,
  deleteProductMutation,
  getAllProductsQuery,
  getProductQuery,
  updateProductMutation,
} from "./products";
import { loginMutation } from "./login";

export const $pending = or(
  getAllProductsQuery.$pending,
  getProductQuery.$pending,
  createProductMutation.$pending,
  updateProductMutation.$pending,
  deleteProductMutation.$pending,
  loginMutation.$pending
);
