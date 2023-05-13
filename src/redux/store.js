import { configureStore } from "@reduxjs/toolkit";

//slices
import themeSlice from "./slices/theme";
import infoUserSlice from "./slices/infoUser";

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    infoUser: infoUserSlice,
  },
});
