"use client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User, UserListRes } from "@/types/user";
import { BASE_URL } from "@/lib/consts";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/api` }),
  tagTypes: ["User"],
  endpoints: (build) => ({
    fetchUsers: build.query<UserListRes, number>({
      query: (page: number = 1) => ({
        url: `/users`,
        params: { page },
      }),
      providesTags: (result) => ["User"],
    }),
    createUser: build.mutation<User, Partial<User>>({
      query: (user) => ({
        url: `/users`,
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: build.mutation<User, { id: number; user: Partial<User> }>({
      query: ({ id, user }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    deleteUser: build.mutation<{ id: number }, number>({
      query: (id: number) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useFetchUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userAPI;
