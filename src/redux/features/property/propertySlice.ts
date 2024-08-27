/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createSlice } from "@reduxjs/toolkit";
import { governoratesData } from "../../../db";

const initialState = {
  count: 0,
  property: null,
  document: {
    marriageCertificate: false,
    salaryCertificate: false,
    bankStatement: false,
    passport: false,
  },
  governorate: "Al Asimah (Kuwait City)",
  areas: [],
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
    setdocument: (state, action) => {
      state.document = action.payload;
    },
    setgovernorate: (state, action) => {
      state.governorate = action.payload;
      // @ts-ignore
      state.areas = governoratesData[state.governorate]?.areas || [];
    },
  },
});
export const { setCount, setProperty, setdocument, setgovernorate } =
  PropertySlice.actions;
export default PropertySlice.reducer;
