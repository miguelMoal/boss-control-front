import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { primaryColor: "#3E3C72" },
  reducers: {},
});

export default themeSlice.reducer;
