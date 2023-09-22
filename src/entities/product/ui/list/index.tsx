import { useList } from "effector-react";
import { getAllProductsQuery } from "@/shared/api/products";
import { ProductItem } from "../item";
import { Stack } from "@mantine/core";

import s from "./s.module.css";

export const ProductList = () => {
  return (
    <Stack className={s.stack}>
      {useList(getAllProductsQuery.$data, {
        fn: (product) => <ProductItem product={product} />,
        keys: [],
        getKey: (product) => product.id,
      })}
    </Stack>
  );
};
