import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem("i18nextLng") ?? "ar",
};
const localSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setlang: (state) => {
      state.lang = localStorage.getItem("i18nextLng") ?? "ar";
    },
  },
});
export const { setlang } = localSlice.actions;
export default localSlice.reducer;
