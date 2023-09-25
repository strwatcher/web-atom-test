import {
  Group,
  Paper,
  Image,
  Stack,
  TextInput,
  NumberInput,
  Button,
} from "@mantine/core";
import s from "./s.module.css";
import { Form } from "@/shared/ui/form";
import { useProductModel } from "../model";
import { Rating } from "@/shared/ui/rating";
import { PageLayout } from "@/shared/ui/page-layout";

export const Page = () => {
  const { form, product } = useProductModel();
  if (!product) return;
  return (
    <PageLayout>
      <Paper>
        <Group className={s.layout}>
          <Stack className={s.visualContent}>
            <Image className={s.image} src={product.image} />
            <Rating
              rate={product.rating?.rate ?? 0}
              count={product.rating?.count ?? 0}
            />
          </Stack>
          <Form className={s.form} onReset={form.reset} onSubmit={form.submit}>
            <Stack>
              <TextInput label="Title" {...form.fields.title} />
              <TextInput label="Description" {...form.fields.description} />
              <TextInput label="Category" {...form.fields.category} />
              <NumberInput label="Price" {...form.fields.price} />
              <Group className={s.formButtons}>
                <Button type="reset">Cancel</Button>
                <Button variant="outline" type="submit">
                  Save
                </Button>
              </Group>
            </Stack>
          </Form>
        </Group>
      </Paper>
    </PageLayout>
  );
};
