import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    primaryColor: "#3E3C72",
    error: "#D93333",
    warning: "#D9C61A",
    success: "#1AD92D",
  },
  reducers: {},
});

export default themeSlice.reducer;
