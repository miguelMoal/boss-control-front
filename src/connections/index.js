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

export const updateProductApi = async (data) => {
  const { msg } = await makeRequest(`product/${data.id}`, "PUT", data.body);
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

export const deleteSubUserApi = async (id) => {
  const { msg } = await makeRequest(`subuser/${id}`, "DELETE");
  return msg;
};

export const sendTicketApi = async (body) => {
  const { msg } = await makeRequest(`sale`, `POST`, body);
  return msg;
};

export const getInfoPeriods = async () => {
  const { msg } = await makeRequest("analytics/info-periods", "GET");
  return msg;
};

export const getTotalInvestApi = async () => {
  const { msg } = await makeRequest("analytics/total-invest", "GET");
  return msg;
};

export const getTopSellingApi = async () => {
  const { msg } = await makeRequest("analytics/get-top-selling", "GET");
  return msg;
};

export const subscriptionApi = async (body) => {
  const result = await makeRequest("subscription", "POST", body);
  return result;
};
