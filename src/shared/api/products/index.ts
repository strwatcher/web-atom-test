export { createProductMutation } from "./create";
export { getAllProductsQuery } from "./get-all";
export { getProductQuery } from "./get-single";
export { updateProductMutation } from "./update";
export { deleteProductMutation } from "./delete";
export { ProductContract, UpdateProductSuccessContract } from "./common";
export type {
  Product,
  ProductId,
  Products,
  UpdateProductDto,
  CreateProductDto,
} from "./common";
