import {
  Group,
  Paper,
  Image,
  Stack,
  TextInput,
  NumberInput,
} from "@mantine/core";
import s from "./s.module.css";
import { Form } from "@/shared/ui/form";
import { useProductModel } from "../model";

export const Page = () => {
  const { form, product } = useProductModel();
  if (!product) return;
  return (
    <Paper>
      <Group className={s.layout}>
        <Form onSubmit={form.submit}>
          <Image className={s.image} src={product.image} />
          <Stack className={s.controls}>
            <TextInput label="Title" {...form.fields.title} />
            <TextInput label="Description" {...form.fields.description} />
            <TextInput label="Category" {...form.fields.category} />
            <NumberInput label="Price" {...form.fields.price} />
            <TextInput label="Image href" {...form.fields.image} />
          </Stack>
        </Form>
      </Group>
    </Paper>
  );
};
