import { createJsonMutation, declareParams } from "@farfetched/core";
import {
  CreateProductDto,
  ProductContract,
  ProductId,
  resource,
} from "./common";
import { zodContract } from "@farfetched/zod";
import { combineUrl } from "../combine-url";

type CreateProductMutationParams = {
  query: ProductId;
  body: CreateProductDto;
};

export const createProductMutation = createJsonMutation({
  params: declareParams<CreateProductMutationParams>(),
  request: {
    method: "POST",
    url: ({ query: { id } }) => combineUrl({ resource, other: `${id}` }),
    body: ({ body }) => body,
  },
  response: {
    contract: zodContract(ProductContract),
  },
});
