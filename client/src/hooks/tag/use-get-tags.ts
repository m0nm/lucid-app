import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { tagsKey } from "@/constants/query-keys";
import { Tag } from "@/types";
import { TAG_STORAGE } from "@/constants/local-events";

// *****************
// useGetTags
// *****************

export const useGetTags = () => {
  const isAuth = useIsAuth();

  const {
    data: tags,
    isLoading: isQueryLoading,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: tagsKey,
    queryFn: () => fetchTags(isAuth),
  });

  useEffect(() => {
    if (isAuth) return;

    function refetchGuestTags() {
      refetch();
    }

    window.addEventListener(TAG_STORAGE, refetchGuestTags);
    return () => {
      window.removeEventListener(TAG_STORAGE, refetchGuestTags);
    };
  }, []);

  const isLoading = isQueryLoading || isFetching || isRefetching;

  return { tags: tags ?? [], isLoading };
};

function fetchTags(isAuth: boolean): Promise<Tag[]> {
  if (isAuth) return fetchUserTags();
  return fetchGuestTags();
}

function fetchGuestTags() {
  return new Promise<Tag[]>((res, rej) => {
    try {
      const tags: Tag[] = JSON.parse(localStorage.getItem("tags") || "[]");
      res(tags);
    } catch (e) {
      rej(e);
    }
  });
}

async function fetchUserTags() {
  return await axios.get<Tag[], Tag[]>("/tags");
}

// *****************
// useGetTag
// *****************

export const useGetTag = () => {
  const { tags } = useGetTags();

  const getTag = (tagId: Tag["id"]) => {
    return tags.find((t) => t.id === tagId);
  };

  return { getTag };
};
