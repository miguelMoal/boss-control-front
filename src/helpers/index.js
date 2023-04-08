import axios from "axios";

const getHeaders = (requireToken) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  if (requireToken) {
    headers["x-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDJmMGQxNWExZDQ1MTEwOGI1ODZlYzUiLCJuYW1lIjoiVGVzbGEiLCJpYXQiOjE2ODA5MDg0NjAsImV4cCI6MTY4MDk5NDg2MH0.-6zPa-QuQcsic-IhX7OOm5mP_993BsqBkPgSwGJRO4U";
  }
  return headers;
};

export const makeRequest = async (url, method, body, requireToken = true) => {
  const { data } = await axios({
    data: JSON.stringify(body),
    method,
    headers: getHeaders(requireToken),
    url: `https://boss-control-one.vercel.app/api/${url}`,
  });
  return data;
};
