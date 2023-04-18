import { createSlice } from "@reduxjs/toolkit";

const totalSlice = createSlice({
  name: "total",
  initialState: 0,
  reducers: {
    addValue: (state, action) => {
      const value = Number(action.payload);
      console.log(action.payload);
      return (state += value);
    },
    resetTotal: (state, action) => {
      return 0;
    },
  },
});

export const { addValue, resetTotal } = totalSlice.actions;
export default totalSlice.reducer;
