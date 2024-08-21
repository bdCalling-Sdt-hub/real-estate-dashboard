/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubAdmin: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-user",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    profile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getAllUser: builder.query({
      query: (query: Record<string, any>) => ({
        url: "/users",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/update/${data?.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    rejectIdVerification: builder.mutation({
      query: (data) => ({
        url: `/users/verification-request-reject/${data?.id}`,
        method: "PATCH",
        body: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    addLandlord: builder.mutation({
      query: (data) => ({
        url: `/users/admin-create-user`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useLoginMutation,
  useProfileQuery,
  useCreateSubAdminMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useRejectIdVerificationMutation,
  useAddLandlordMutation,
} = authApi;
