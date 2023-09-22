import { or } from "patronum";
import {
  createProductMutation,
  deleteProductMutation,
  getAllProductsQuery,
  getProductQuery,
  updateProductMutation,
} from "./products";

export const $pending = or(
  getAllProductsQuery.$pending,
  getProductQuery.$pending,
  createProductMutation.$pending,
  updateProductMutation.$pending,
  deleteProductMutation.$pending
);
