import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Tag } from "@/types";
import { tagsKey } from "@/constants/query-keys";
import { updateLocalTag } from "@/utils";

export type UpdateTag = { name: string };

export const useUpdateTag = (tagId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  return useMutation<Tag, Error, UpdateTag>({
    mutationFn: (update) => mutateFn(isAuth, tagId, update),
    onSuccess: () => {
      if (isAuth) {
        // idk why but this is the only way to make the tag card reflect ui change to new name
        queryClient.invalidateQueries(tagsKey).then(() => {
          queryClient.invalidateQueries(tagsKey);
        });
      }
    },
  });
};

async function mutateFn(isAuth: boolean, tagId: string, update: UpdateTag) {
  if (isAuth) return await axios.put<Tag, Tag>(`/tags/${tagId}`, update);

  return new Promise<Tag>((res, rej) => {
    try {
      const tag = updateLocalTag(tagId, update.name);
      if (!tag) throw Error;

      res(tag);
    } catch (error) {
      rej(error);
    }
  });
}
