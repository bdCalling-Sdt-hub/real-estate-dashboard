import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: "ar",
};
const localSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setlang: (state) => {
      const lang = localStorage.getItem("i18nextLng") ?? "ar";
      state.lang = lang;
    },
  },
});
export const { setlang } = localSlice.actions;
export default localSlice.reducer;
