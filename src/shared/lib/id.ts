import { z } from "zod";

export const IdContract = z.number();
export type Id = z.infer<typeof IdContract>;
