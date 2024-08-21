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
    getTotalIncomes: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/payments/total-incomes",
        method: "Get",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
    packageStatisticsIncome: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/payments/packages-statistics-incomes",
        method: "Get",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
    percentageStatisticsIncome: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/payments/percentage-statistics-incomes",
        method: "Get",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
    packageStatisticsIncomes: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/payments/package-statistics-incomes",
        method: "Get",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
    topLandlordIncome: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/payments/top-landlord-income",
        method: "Get",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),

    getAllTransitions: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "payments/all-transitions",
        method: "Get",
        params: arg,
      }),
      providesTags: [tagTypes.payment],
    }),
  }),
});

export const {
  useGetPackageIncomeQuery,
  useGetPercentageIncomeQuery,
  useGetTotalIncomesQuery,
  usePackageStatisticsIncomeQuery,
  usePercentageStatisticsIncomeQuery,
  usePackageStatisticsIncomesQuery,
  useTopLandlordIncomeQuery,
  useGetAllTransitionsQuery
} = PaymentApi;
