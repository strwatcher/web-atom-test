import { createJsonMutation, declareParams } from "@farfetched/core";
import { CreateProductDto, ProductContract, resource } from "./common";
import { zodContract } from "@farfetched/zod";
import { combineUrl } from "../combine-url";

type CreateProductMutationParams = CreateProductDto;

export const createProductMutation = createJsonMutation({
  params: declareParams<CreateProductMutationParams>(),
  request: {
    method: "POST",
    url: combineUrl({ resource }),
    body: (body) => body,
  },
  response: {
    contract: zodContract(ProductContract),
  },
});
