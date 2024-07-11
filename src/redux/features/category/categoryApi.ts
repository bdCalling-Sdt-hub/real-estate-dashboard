/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const categoryApis = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/categories/create-category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.category],
    }),
    getAllCategories: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/categories",
        method: "Get",
        params: arg,
        // params: arg,
      }),
      providesTags: [tagTypes.category],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useCreateCategoryMutation } =
  categoryApis;
