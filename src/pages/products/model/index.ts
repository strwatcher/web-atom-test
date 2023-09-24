import {
  CreateProductDto,
  Products,
  createProductMutation,
  deleteProductMutation,
  getAllProductsQuery,
} from "@/shared/api/products";
import { rules } from "@/shared/lib/forms/rules";
import { routes } from "@/shared/routing";
import { RouteParamsAndQuery, chainRoute } from "atomic-router";
import { createApi, createEvent, createStore, sample } from "effector";
import { createForm, useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { ChangeEvent } from "react";

const beforeOpen = createEvent<RouteParamsAndQuery<{}>>();
const openOn = getAllProductsQuery.finished.success;
const cancelOn = getAllProductsQuery.finished.failure;

sample({
  clock: beforeOpen,
  target: getAllProductsQuery.start,
});

export const route = chainRoute({
  route: routes.products,
  beforeOpen,
  openOn,
  cancelOn,
});

export const $products = createStore<Products>([]);

export const $isProductCreationActive = createStore(false);
export const productCreationActiveApi = createApi($isProductCreationActive, {
  activate: () => true,
  deactivate: () => false,
});

const createProductForm = createForm<CreateProductDto>({
  validateOn: ["submit"],
  fields: {
    title: {
      init: "",
    },
    price: {
      init: 0,
      rules: [rules.price()],
    },
    description: {
      init: "",
    },
    category: {
      init: "",
    },
    image: {
      init: "",
    },
  },
});

$products.watch(console.log);

sample({
  clock: deleteProductMutation.finished.success,
  source: $products,
  fn: (products, { params }) =>
    products.filter((product) => product.id !== params.id),
  target: $products,
});

sample({
  clock: createProductForm.formValidated,
  target: createProductMutation.start,
});

sample({
  clock: createProductMutation.finished.success,
  source: $products,
  fn: (products, { result }) => [result, ...products],
  target: [
    $products,
    productCreationActiveApi.deactivate,
    createProductForm.reset,
  ],
});

sample({
  clock: getAllProductsQuery.finished.success,
  fn: ({ result }) => result,
  target: $products,
});

export function useCreateProductsModel() {
  const form = useForm(createProductForm);
  const opened = useUnit($isProductCreationActive);
  return {
    form: {
      submit: form.submit,
      reset: form.reset,
      fields: {
        title: {
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            form.fields.title.onChange(e.currentTarget.value),
          value: form.fields.title.value,
          error: form.fields.title.errorText(),
        },
        description: {
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            form.fields.description.onChange(e.currentTarget.value),
          value: form.fields.description.value,
          error: form.fields.description.errorText(),
        },
        category: {
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            form.fields.category.onChange(e.currentTarget.value),
          value: form.fields.category.value,
          error: form.fields.category.errorText(),
        },
        price: {
          onChange: (value: number) => form.fields.price.onChange(value),
          value: form.fields.price.value,
          error: form.fields.price.errorText(),
        },
        image: {
          onChange: (e: ChangeEvent<HTMLInputElement>) =>
            form.fields.image.onChange(e.currentTarget.value),
          value: form.fields.image.value,
          error: form.fields.image.errorText(),
        },
      },
    },
    creation: {
      active: opened,
      ...useUnit(productCreationActiveApi),
    },
  };
}
