import axios from "axios";

const getHeaders = (requireToken) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  if (requireToken) {
    headers["x-token"] =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2NDM0NTNkYjQ3ZjllNjc5MWQxM2JkNjAiLCJuYW1lIjoiRmFuaXNjYSIsImlhdCI6MTY4MTE1MDkzOX0.ChAKWtzBy9el0suCrYwJ-GWnTLD2JyD1aMyeqZuvHTQ";
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
