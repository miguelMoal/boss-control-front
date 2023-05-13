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

export const addToStockApi = async (data) => {
  const { msg } = await makeRequest(
    `product/add-to-stock/${data.id}`,
    "PATCH",
    data.body
  );
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

export const loginApi = async (body) => {
  const msg = await makeRequest("auth", "POST", body, false);
  return msg;
};

export const registerApi = async (body) => {
  const msg = await makeRequest("auth/new", "POST", body, false);
  return msg;
};

export const getInfoUser = async () => {
  const { msg } = await makeRequest("user", "GET");
  return msg;
};

export const cancelSubscriptionApi = async () => {
  const { msg } = await makeRequest("subscription/cancel-subscription", "POST");
  return msg;
};

export const historyApi = async (body) => {
  const respuesta = await makeRequest("history", "POST", body);
  return respuesta;
};

export const getTotalProductsApi = async () => {
  const { msg } = await makeRequest("analytics/total-products", "GET");
  return msg;
};

export const getWeeklySalesApi = async () => {
  const result = await makeRequest("analytics/weekly-sales", "GET");
  return result;
};
