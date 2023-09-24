import { Id, IdContract } from "@/shared/lib/id";
import { z } from "zod";

export const ProductContract = z.object({
  id: IdContract,
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z
    .object({
      rate: z.number(),
      count: z.number(),
    })
    .optional(),
});

export const ProductsContract = z.array(ProductContract);

export type Product = z.infer<typeof ProductContract>;
export type Products = z.infer<typeof ProductsContract>;

export type ProductId = {
  id: Id;
};

export type CreateProductDto = Pick<
  Product,
  "title" | "price" | "description" | "image" | "category"
>;

export type UpdateProductDto = CreateProductDto;
export const UpdateProductSuccessContract = ProductContract.omit({
  rating: true,
});
export const resource = "products";
