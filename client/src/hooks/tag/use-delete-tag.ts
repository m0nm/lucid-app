import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { deleteLocalTag } from "@/utils";
import { notesKey, tagsKey } from "@/constants/query-keys";

export const useDeleteTag = (tagId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: async () => await axios.delete(`tags/${tagId}`),
    onSuccess: () => {
      navigate("/tags", { replace: true });

      if (isAuth) {
        queryClient.invalidateQueries(tagsKey);
        queryClient.invalidateQueries(notesKey);
      }
    },
  });

  const onDeleteTag = () => {
    if (isAuth) {
      mutate();
      return;
    }

    deleteLocalTag(tagId);
  };

  return { onDeleteTag };
};
