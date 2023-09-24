import { useList, useUnit } from "effector-react";
import { deleteProductMutation } from "@/shared/api/products";
import { Stack } from "@mantine/core";

import s from "./s.module.css";
import { $products } from "../../model";
import { ProductItem } from "../item";

export const ProductList = () => {
  const deleteProduct = useUnit(deleteProductMutation.start);
  return (
    <Stack className={s.stack}>
      {useList($products, {
        fn: (product) => (
          <ProductItem
            onDelete={() => deleteProduct({ id: product.id })}
            product={product}
          />
        ),
        keys: [],
        getKey: (product) => product.id,
      })}
    </Stack>
  );
};
