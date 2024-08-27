import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  document: null,
};
const PropertySlice = createSlice({
  name: "document",
  initialState,
  reducers: {
    setdocument: (state, action) => {
      state.document = action.payload;
    },
  },
});
export const { setdocument } = PropertySlice.actions;
export default PropertySlice.reducer;
