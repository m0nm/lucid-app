import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { Notebook } from "@/types";
import { NOTEBOOK_STORAGE } from "@/constants/local-events";
import { notebooksKey } from "@/constants/query-keys";

export const useGetNotebooks = () => {
  const isAuth = useIsAuth();

  const {
    data,
    isLoading: isQueryLoading,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: notebooksKey,
    queryFn: () => fetchNotebooks(isAuth),
  });

  useEffect(() => {
    if (isAuth) return;

    function refetchGuestNotebooks() {
      refetch();
    }

    window.addEventListener(NOTEBOOK_STORAGE, refetchGuestNotebooks);
    return () => {
      window.removeEventListener(NOTEBOOK_STORAGE, refetchGuestNotebooks);
    };
  }, []);

  const isLoading = isQueryLoading || isFetching || isRefetching;

  return { notebooks: data ?? [], isLoading };
};

function fetchNotebooks(isAuth: boolean): Promise<Notebook[]> {
  if (isAuth) return fetchUserNotebooks();
  return fetchGuestNotebooks();
}

function fetchGuestNotebooks() {
  return new Promise<Notebook[]>((res, rej) => {
    try {
      const notebooks: Notebook[] = JSON.parse(
        localStorage.getItem("notebooks") || "[]"
      );
      res(notebooks);
    } catch (e) {
      rej(e);
    }
  });
}

async function fetchUserNotebooks() {
  return await axios.get<Notebook[], Notebook[]>("/notebooks");
}
