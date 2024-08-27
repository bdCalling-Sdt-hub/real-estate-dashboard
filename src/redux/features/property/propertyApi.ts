/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const propertyApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createProperty: builder.mutation({
      query: (data) => ({
        url: "/residences/create-residence",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.property],
    }),
    getAllProperty: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/residences",
        method: "Get",
        params: arg,
        // params: arg,
      }),
      providesTags: [tagTypes.property],
    }),
  }),
});

export const { useGetAllPropertyQuery, useCreatePropertyMutation } =
  propertyApi;
