/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  BaseQueryApi,
  BaseQueryFn,
  DefinitionType,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { logout, setUser } from "../features/auth/authSlice";
import { toast } from "sonner";
import { tagTypesList } from "../../types/tagTypes";
const baseQuery = fetchBaseQuery({
  baseUrl:"http://192.168.1.9:9005/api/v1",
  //  "http://103.145.138.74:9005/api/v1",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const otpToken = sessionStorage.getItem("token");

    const token = (getState() as RootState).auth.token;
    const language = localStorage.getItem("i18nextLng");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    if (otpToken) {
      headers.set("token", otpToken);
    }
    if (language) {
      headers.set("Accept-Language", language);
    }

    return headers;
  },
});

const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs,
  BaseQueryApi,
  DefinitionType
> = async (args, api, extraOptions): Promise<any> => {
  let result = await baseQuery(args, api, extraOptions); 
  if (result?.error?.status === 404) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 403) {
    toast.error((result.error.data as any).message);
  }
  if (result?.error?.status === 401) {
    //* Send Refresh 

    const res = await fetch(
      `http://192.168.1.9:9005/api/v1/auth/refresh-token`,
      // "http://103.145.138.74:9005/api/v1/auth/refresh-token",
      {
        method: "POST",
        credentials: "include",
      }
    );

    const data = await res.json(); 
    if (data?.data?.accessToken) {
      const user = (api.getState() as RootState).auth.user;

      api.dispatch(
        setUser({
          user,
          token: data.data.accessToken,
        })
      );

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithRefreshToken,
  tagTypes: tagTypesList,
  endpoints: () => ({}),
});
