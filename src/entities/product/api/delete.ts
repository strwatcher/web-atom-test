import { createJsonMutation, declareParams } from "@farfetched/core";
import { ProductContract, ProductId, resource } from "./common";
import { zodContract } from "@farfetched/zod";
import { combineUrl } from "@/shared/lib/api";

type DeleteProductMutationParams = ProductId;

export const deleteProductMutation = createJsonMutation({
  params: declareParams<DeleteProductMutationParams>(),
  request: {
    method: "DELETE",
    url: ({ id }) => combineUrl({ resource, other: `${id}` }),
  },
  response: {
    contract: zodContract(ProductContract),
  },
});
