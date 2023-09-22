import { combineUrl } from "@/shared/lib/api";
import { createJsonQuery, declareParams } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";

import { ProductContract, ProductId, resource } from "./common";

type GetProductQueryParams = ProductId;

export const getProductQuery = createJsonQuery({
  params: declareParams<GetProductQueryParams>(),
  request: {
    method: "GET",
    url: ({ id }) => combineUrl({ resource, other: `${id}` }),
  },
  response: {
    contract: zodContract(ProductContract),
  },
});
