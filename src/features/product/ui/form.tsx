export const ProductForm = () => {
  <Form className={s.form} onReset={form.reset} onSubmit={form.submit}>
    <Stack>
      <TextInput label="Title" {...form.fields.title} />
      <TextInput label="Description" {...form.fields.description} />
      <TextInput label="Category" {...form.fields.category} />
      <NumberInput label="Price" {...form.fields.price} />
      <TextInput label="Image href" {...form.fields.image} />
      <Group className={s.formButtons}>
        <Button type="reset">Cancel</Button>
        <Button variant="outline" type="submit">
          Save
        </Button>
      </Group>
    </Stack>
  </Form>;
};