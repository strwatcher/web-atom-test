import {
  Button,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from "@mantine/core";
import { useCreateProductsModel } from "../../model";
import { Form } from "@/shared/ui/form";

export const CreateProductModal = () => {
  const { creation, form } = useCreateProductsModel();
  return (
    <Modal opened={creation.active} onClose={creation.deactivate} centered>
      <Form onReset={form.reset} onSubmit={form.submit}>
        <Stack>
          <TextInput label="Title" {...form.fields.title} />
          <TextInput label="Description" {...form.fields.description} />
          <TextInput label="Category" {...form.fields.category} />
          <NumberInput label="Price" {...form.fields.price} />
          <TextInput label="Image href" {...form.fields.image} />
          <Group>
            <Button type="reset">Cancel</Button>
            <Button variant="outline" type="submit">
              Save
            </Button>
          </Group>
        </Stack>
      </Form>
    </Modal>
  );
};
