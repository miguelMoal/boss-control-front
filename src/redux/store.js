import { configureStore } from "@reduxjs/toolkit";

//slices
import themeSlice from "./slices/theme";
import totalSlice from "./slices/total";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    total: totalSlice,
  },
});
