import toast from "react-hot-toast";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { axios } from "@/lib/axios";
import { userKey } from "@/constants/query-keys";
import { Note, Notebook, Tag, Task } from "@/types";
import { jwt } from "@/utils";

import {
  QueryKey,
  useMutation,
  UseMutationOptions,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";

export type User = {
  id: string;
  email: string;
  avatar: string;
  notes: Note[];
  tags: Tag[];
  notebooks: Notebook[];
  tasks: Task[];
  __v: number;
};

type UserResponse = { token: string; user: User };

type LoginCredentials = { email: string; password: string };

type RegisterCredentials = {
  email: string;
  password: string;
  passwordConfirm: string;
};

type ResetPassword = {
  userId: string;
  password: string;
  token: string;
};

type OauthProvider = "google" | "github";

// ***********************
//  useIsAuth
// ***********************
export function useIsAuth() {
  return Boolean(jwt.getToken());
}

// ***********************
//  useUser
// ***********************

export function useUser(
  options?: Omit<
    UseQueryOptions<User, Error, User, QueryKey>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery(userKey, async () => await axios.get<User, User>("/auth"), {
    ...options,
  });
}

// ***********************
//  useLogin
// ***********************

export function useLogin(
  options?: Omit<
    UseMutationOptions<UserResponse, Error, LoginCredentials>,
    "mutationFn"
  >
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setUser = useCallback(
    (data: User) => queryClient.setQueryData(userKey, data),
    [queryClient]
  );

  return useMutation({
    mutationFn: async (credentials) => await axios.post("/auth", credentials),
    ...options,
    onSuccess: (data) => {
      setUser(data.user);
      jwt.setToken(data.token);
      toast.success("Logged in successfully", { id: "login-success" });

      setTimeout(() => {
        navigate("/app");
      }, 1500);
    },
  });
}

// ***********************
//  useRegister
// ***********************

export function useRegister(
  options?: Omit<
    UseMutationOptions<UserResponse, Error, RegisterCredentials>,
    "mutationFn"
  >
) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setUser = useCallback(
    (data: User) => queryClient.setQueryData(userKey, data),
    [queryClient]
  );

  return useMutation({
    mutationFn: async (credentials) => await axios.post("/users", credentials),
    ...options,
    onSuccess: (data) => {
      setUser(data.user);
      jwt.setToken(data.token);
      toast.success("Signed up successfully");

      setTimeout(() => {
        navigate("/app");
      }, 1500);
    },
  });
}

// ***********************
//  useLogout
// ***********************

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutate = () => {
    navigate("/login");
    queryClient.removeQueries();

    // setTimeout to prevent user from seeing ui flash change
    setTimeout(() => {
      jwt.clearToken();
      queryClient.removeQueries();
    }, 30);
  };

  return { mutate };
}

// ***********************
//  useForgotPassword
// ***********************

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: string) =>
      await axios.post("/auth/forgot-password", { email }),
  });
}

// ***********************
//  useResetPassword
// ***********************

export function useResetPassword() {
  return useMutation({
    mutationFn: async (data: ResetPassword) =>
      await axios.post(`/auth/reset-password/${data.userId}`, data),
  });
}

// ***********************
//  oauthLoginFn
// ***********************
export function oauthLoginFn(provider: OauthProvider) {
  window.location.replace(`${axios.defaults.baseURL}/auth/${provider}`);
}
