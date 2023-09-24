import { createJsonMutation, declareParams } from "@farfetched/core";
import {
  ProductId,
  UpdateProductDto,
  UpdateProductSuccessContract,
  resource,
} from "./common";
import { zodContract } from "@farfetched/zod";
import { combineUrl } from "../combine-url";

type UpdateProductMutationParams = {
  query: ProductId;
  body: UpdateProductDto;
};

export const updateProductMutation = createJsonMutation({
  params: declareParams<UpdateProductMutationParams>(),
  request: {
    method: "PUT",
    url: ({ query: { id } }) => combineUrl({ resource, other: `${id}` }),
    body: ({ body }) => body,
  },
  response: {
    contract: zodContract(UpdateProductSuccessContract),
  },
});
