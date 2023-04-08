import { makeRequest } from "@/helpers";

export const getProductsApi = async () => {
  const result = await makeRequest("product", "GET");
  return result.msg;
};
