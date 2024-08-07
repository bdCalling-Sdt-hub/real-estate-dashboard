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
  }),
});

export const { 
    useGetAllAdsQuery
} = adsApi;
