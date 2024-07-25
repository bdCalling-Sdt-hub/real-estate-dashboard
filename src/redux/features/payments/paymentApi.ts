/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // createProperty: builder.mutation({
    //   query: (data) => ({
    //     url: "/otp/verify-otp",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: [tagTypes.payment],
    // }),
    getPackageIncome: builder.query({
      query: () => ({
        url: "/payments/package-income",
        method: "Get",
        // params: arg,
        // params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
    getPercentageIncome: builder.query({
      query: () => ({
        url: "/payments/percentage-income",
        method: "Get",
      }),
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const { useGetPackageIncomeQuery, useGetPercentageIncomeQuery  } = PaymentApi;
