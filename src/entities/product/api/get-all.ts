import { createJsonQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";
import { ProductsContract, resource } from "./common";
import { combineUrl } from "@/shared/lib/api";

export const getAllProductsQuery = createJsonQuery({
  request: {
    method: "GET",
    url: combineUrl({ resource }),
  },
  response: {
    contract: zodContract(ProductsContract),
  },
});
