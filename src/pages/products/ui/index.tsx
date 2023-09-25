import { Button, Stack } from "@mantine/core";
import { ProductList } from "./list";
import { useCreateProductsModel } from "../model";
import { PageLayout } from "@/shared/ui/page-layout";
import { CreateProductModal } from "./create-popup";

export const Page = () => {
  const { creation } = useCreateProductsModel();
  return (
    <PageLayout>
      <Stack>
        <Button onClick={creation.activate}>Add product</Button>
        <ProductList />
        <CreateProductModal />
      </Stack>
    </PageLayout>
  );
};
