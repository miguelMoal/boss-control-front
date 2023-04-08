import { configureStore } from "@reduxjs/toolkit";

//slices
import themeSlice from "./slices/theme";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
  },
});
