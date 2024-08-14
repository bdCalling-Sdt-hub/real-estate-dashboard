import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lang: localStorage.getItem("i18nextLng") || "ar",
};
const localSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setlang: (state, action) => {
      state.lang = action.payload;
    },
  },
});
export const { setlang } = localSlice.actions;
export default localSlice.reducer;
