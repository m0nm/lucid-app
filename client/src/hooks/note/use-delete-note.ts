import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { deleteLocalTrash } from "@/utils";
import { notesKey } from "@/constants/query-keys";

export const useDeleteNote = (noteId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  const { mutate } = useMutation({
    mutationFn: async () => await axios.delete(`notes/${noteId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(notesKey);
    },
  });

  const onDeleteNote = () => {
    if (isAuth) {
      mutate();
      return;
    }

    deleteLocalTrash(noteId);
  };

  return { onDeleteNote };
};
