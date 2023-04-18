import { createSlice } from "@reduxjs/toolkit";

const totalSlice = createSlice({
  name: "total",
  initialState: {},
  reducers: {
    addValue: (state, action) => {
      return { ...state, [action.payload.id]: action.payload.result };
    },
    resetTotal: (state, action) => {
      return 0;
    },
  },
});

export const { addValue, resetTotal } = totalSlice.actions;
export default totalSlice.reducer;
