import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Note, RequireAtLeastOne } from "@/types";
import { notesKey } from "@/constants/query-keys";
import { updateLocalNote } from "@/utils";

export type UpdateNote = RequireAtLeastOne<
  Omit<Note, "id" | "createdAt" | "updatedAt">
>;

export const useUpdateNote = (noteId: string) => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();
  const [_, setSearchParams] = useSearchParams();

  const { mutateAsync } = useMutation<Note, Error, UpdateNote>({
    mutationFn: async (update) => {
      return axios.put(`/notes/${noteId}`, update);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: notesKey });
    },
  });

  const onUpdateNote = (update: UpdateNote) => {
    if (isAuth) {
      mutateAsync(update).then(() => {
        if (update.isTrash) setSearchParams({});
      });
      return;
    }

    updateLocalNote(noteId, update);
    if (update.isTrash) setSearchParams({});
  };

  return { onUpdateNote };
};
