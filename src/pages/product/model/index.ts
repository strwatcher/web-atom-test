import {
  ProductId,
  getProductQuery,
  updateProductMutation,
  Product,
  UpdateProductDto,
} from "@/shared/api/products";
import { chainAuth } from "@/shared/config/session";
import { rules } from "@/shared/lib/forms/rules";
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

const authorizedRoute = chainAuth(routes.product, {
  otherwise: routes.login.open,
  anonymousRoute: false,
});

export const route = chainRoute({
  route: authorizedRoute,
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
      rules: [rules.required()],
    },
    price: {
      init: 0,
      rules: [rules.price()],
    },
    description: {
      init: "",
      rules: [rules.required()],
    },
    category: {
      init: "",
      rules: [rules.required()],
    },
    image: {
      init: "",
    },
  },
});
const formReset = createEvent();

sample({
  clock: getProductQuery.finished.success,
  fn: ({ result }) => result,
  target: $product,
});

sample({
  clock: updateProductMutation.finished.success,
  source: $product,
  filter: Boolean,
  fn: (oldProduct, { result }) => ({ ...oldProduct, ...result }),
  target: $product,
});

sample({
  clock: $product,
  filter: Boolean,
  target: editForm.set,
});

sample({
  clock: formReset,
  source: $product,
  filter: Boolean,
  target: editForm.set,
});

sample({
  clock: editForm.formValidated,
  source: route.$params,
  fn: (query, body) => ({ query, body }),
  target: updateProductMutation.start,
});

$product.watch(console.log);
updateProductMutation.finished.success.watch(console.log);
updateProductMutation.finished.failure.watch(console.log);

export function useProductModel() {
  const form = useForm(editForm);
  const product = useUnit($product);
  return {
    form: {
      submit: form.submit,
      reset: formReset,
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
