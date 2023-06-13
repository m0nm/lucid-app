import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { deleteLocalTrash } from "@/utils";
import { notesKey } from "@/constants/query-keys";

export const useDeleteTrash = () => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  const { mutate } = useMutation({
    mutationFn: async () => await axios.delete(`notes/delete-trash`),
    onSuccess: () => {
      queryClient.invalidateQueries(notesKey);
    },
  });

  const onDeleteTrash = () => {
    if (isAuth) {
      mutate();
      return;
    }

    deleteLocalTrash();
  };

  return { onDeleteTrash };
};
