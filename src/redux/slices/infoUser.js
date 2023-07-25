import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "", email: "" };

const infoUserSlice = createSlice({
  name: "infoUser",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { addInfo } = infoUserSlice.actions;
export default infoUserSlice.reducer;
