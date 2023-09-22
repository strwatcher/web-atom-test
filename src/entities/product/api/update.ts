import { createJsonMutation, declareParams } from "@farfetched/core";
import {
  ProductContract,
  ProductId,
  UpdateProductDto,
  resource,
} from "./common";
import { zodContract } from "@farfetched/zod";
import { combineUrl } from "@/shared/lib/api";

type UpdateProductMutationParams = {
  query: ProductId;
  body: UpdateProductDto;
};

export const updateProductMutation = createJsonMutation({
  params: declareParams<UpdateProductMutationParams>(),
  request: {
    method: "DELETE",
    url: ({ query: { id } }) => combineUrl({ resource, other: `${id}` }),
    body: ({ body }) => body,
  },
  response: {
    contract: zodContract(ProductContract),
  },
});
