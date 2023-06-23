import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    primaryColor: "#171941",
    secondaryColor: "#1d8cf8",
    tertiaryColor: "#1C1E45",
    background: "#1f2251",
    error: "#fd5d93",
    warning: "#ffce72",
    success: "#00bf9a",
    btnPrimary: "linear-gradient(to bottom left,#1d8cf8,#3358f4,#1d8cf8)",
    btnDanger: "linear-gradient(to bottom left,#fd5d93,#ec250d,#fd5d93)",
    btnWarning: "linear-gradient(to bottom left,#ff8d72,#ff6491,#ff8d72)",
    btnSuccess: "linear-gradient(to bottom left,#00f2c3,#0098f0,#1FB396)",
    btnDefault: "linear-gradient(to bottom left,#344675,#313C53,#344675)",
    gray: "#5A6066",
  },
  reducers: {},
});

export default themeSlice.reducer;
