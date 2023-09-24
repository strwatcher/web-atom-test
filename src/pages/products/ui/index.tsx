import { Button, Stack } from "@mantine/core";
import { ProductList } from "./list";
import { useCreateProductsModel } from "../model";
import { CreateProductPopup } from "./create-popup";

export const Page = () => {
  const { creation } = useCreateProductsModel();
  return (
    <Stack>
      <Button onClick={creation.activate}>Add product</Button>
      <ProductList />
      <CreateProductPopup />
    </Stack>
  );
};
