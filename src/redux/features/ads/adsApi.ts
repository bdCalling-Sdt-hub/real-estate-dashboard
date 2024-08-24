/* eslint-disable @typescript-eslint/no-explicit-any */

import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const adsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAds: builder.query({
      query: (query) => ({
        url: "/ads",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.ads],
    }),
    createads: builder.mutation({
      query: (data) => ({
        url: "/ads/create-ads",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.ads],
    }),
    deleteAds: builder.mutation({
      query: (id) => ({
        url: `/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.ads],
    }),
    updateAds: builder.mutation({
      query: (data) => ({
        url: `/ads/${data.id}`,
        method: "PATCH",
        body: data?.body,
      }),
      invalidatesTags: [tagTypes.ads],
    }),
    getAdsCategories: builder.query({
      query: (query) => ({
        url: "/ads-categories",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.ads],
    }),
    getSingleAds: builder.query({
      query: (id) => ({
        url: `/ads/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.ads],
    }),
  }),
});

export const {
  useGetAllAdsQuery,
  useGetAdsCategoriesQuery,
  useCreateadsMutation,
  useUpdateAdsMutation,
  useDeleteAdsMutation,
  useGetSingleAdsQuery,
} = adsApi;
