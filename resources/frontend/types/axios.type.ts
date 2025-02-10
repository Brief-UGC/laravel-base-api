import type { Type } from "typescript";

export type AxiosGenericErrorResponseData = {
  message: string;
  errors: Type[];
};
