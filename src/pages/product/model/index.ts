import {
  ProductId,
  getProductQuery,
  updateProductMutation,
} from "@/shared/api/products";
import { Product, UpdateProductDto } from "@/shared/api/products/common";
import { routes } from "@/shared/routing";
import { RouteParamsAndQuery, chainRoute } from "atomic-router";
import { createEvent, createStore, sample } from "effector";
import { createForm, useForm } from "effector-forms";
import { useUnit } from "effector-react";
import { ChangeEvent } from "react";

const beforeOpen = createEvent<RouteParamsAndQuery<ProductId>>();
const openOn = getProductQuery.finished.success;
const cancelOn = getProductQuery.finished.failure;

sample({
  clock: beforeOpen,
  fn: ({ params }) => params,
  target: getProductQuery.start,
});

export const route = chainRoute({
  route: routes.product,
  beforeOpen,
  openOn,
  cancelOn,
});

const $product = createStore<Product | null>(null);

const editForm = createForm<UpdateProductDto>({
  validateOn: ["submit"],
  fields: {
    title: {
      init: "",
    },
    price: {
      init: 0,
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

sample({
  clock: [
    getProductQuery.finished.success,
    updateProductMutation.finished.success,
  ],
  fn: ({ result }) => result,
  target: $product,
});

sample({
  clock: $product,
  filter: Boolean,
  target: editForm.set,
});

sample({
  clock: editForm.formValidated,
  source: route.$params,
  fn: (query, body) => ({ query, body }),
  target: updateProductMutation.start,
});

export function useProductModel() {
  const form = useForm(editForm);
  const product = useUnit($product);
  return {
    form: {
      submit: form.submit,
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
    product,
  };
}
