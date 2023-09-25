import { Rule } from "effector-forms";
import { z } from "zod";

export const rules: Record<string, () => Rule<any>> = {
  price: () => ({
    name: "price",
    validator: (value: number) =>
      z.number().nonnegative().safeParse(value).success,
    errorText: "Price must be non negative",
  }),
  required: () => ({
    name: "required",
    validator: (value: string) => z.string().min(1).safeParse(value).success,
    errorText: "Field is required",
  }),
};
