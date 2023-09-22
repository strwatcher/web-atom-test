import { createJsonQuery } from "@farfetched/core";
import { zodContract } from "@farfetched/zod";
import { ProductsContract, resource } from "./common";
import { combineUrl } from "../combine-url";

export const getAllProductsQuery = createJsonQuery({
  initialData: [],
  request: {
    method: "GET",
    url: combineUrl({ resource }),
  },
  response: {
    contract: zodContract(ProductsContract),
  },
});
