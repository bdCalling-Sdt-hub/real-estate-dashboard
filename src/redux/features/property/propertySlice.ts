import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 3,
  property: null,
};
const PropertySlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    setCount: (state, action) => {
      state.count = action.payload;
    },
    setProperty: (state, action) => {
      state.property = action.payload;
    },
  },
});
export const { setCount, setProperty } = PropertySlice.actions;
export default PropertySlice.reducer;
