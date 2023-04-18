import { makeRequest } from "@/helpers";

export const getProductsApi = async () => {
  const result = await makeRequest("product", "GET");
  return result.msg;
};

export const createProductApi = async (body) => {
  const { msg } = await makeRequest("product", "POST", body);
  return msg;
};

export const deleteProductApi = async (id) => {
  const { msg } = await makeRequest(`product/${id}`, "DELETE");
  return msg;
};

export const getSubUsersApi = async () => {
  const { msg } = await makeRequest(`subuser`, "GET");
  return msg;
};

export const createSubUserApi = async (body) => {
  const { msg } = await makeRequest(`subuser`, "POST", body);
  return msg;
};

export const updateSubUserApi = async (body) => {
  const { msg } = await makeRequest(`subuser`, "PUT", body);
  return msg;
};
