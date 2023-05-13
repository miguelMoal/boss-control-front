import { createSlice } from "@reduxjs/toolkit";

const initialState = { name: "" };

const infoUserSlice = createSlice({
  name: "infoUser",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.name = action.payload.name;
    },
  },
});

export const { addInfo } = infoUserSlice.actions;
export default infoUserSlice.reducer;
