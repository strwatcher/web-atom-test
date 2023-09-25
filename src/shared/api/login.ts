import { createJsonMutation, declareParams } from "@farfetched/core";
import { combineUrl } from "./combine-url";
import { z } from "zod";
import { zodContract } from "@farfetched/zod";

export type LoginMutationBody = {
  username: string;
  password: string;
};

export const TokenContract = z.object({
  token: z.string(),
});

export const loginMutation = createJsonMutation({
  params: declareParams<LoginMutationBody>(),
  request: {
    method: "POST",
    url: combineUrl({ resource: "auth/login" }),
    body: (body) => body,
  },
  response: {
    contract: zodContract(TokenContract),
  },
});
