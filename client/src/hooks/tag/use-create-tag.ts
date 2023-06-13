import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Tag } from "@/types";
import { createLocalTag } from "@/utils";
import { tagsKey } from "@/constants/query-keys";

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation<Tag, Error, string>({
    mutationFn: (tagName: string) => mutateFn(isAuth, tagName),
    onSuccess: () => {
      if (isAuth) queryClient.invalidateQueries(tagsKey);
    },
  });
};

async function mutateFn(isAuth: boolean, tagName: string) {
  if (isAuth) return await axios.post<Tag, Tag>("/tags", { name: tagName });

  return new Promise<Tag>((res, rej) => {
    try {
      const tag = createLocalTag(tagName);
      res(tag as Tag);
    } catch (error) {
      rej(error);
    }
  });
}
