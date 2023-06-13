import moment from "moment";
import { v4 as uuid } from "uuid";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import { useIsAuth } from "@/lib/auth";
import { axios } from "@/lib/axios";
import { Note, Tag } from "@/types";
import { createLocalNote } from "@/utils";
import { notesKey } from "@/constants/query-keys";

type CreateNote = Omit<Note, "id" | "createdAt" | "updatedAt">;

export const useCreateNote = () => {
  const queryClient = useQueryClient();
  const isAuth = useIsAuth();

  const { state } = useLocation();
  const [_, setSearchParams] = useSearchParams();

  let initialNote: CreateNote = {
    title: `Untitled, ${moment().format("YYYY-MM-DD LT")}`,
    content: "",
    tagsRef: [],
    isFavorite: false,
    isTrash: false,
  };

  return useMutation({
    mutationFn: (tagId?: Tag["id"]) => mutateFn(isAuth, initialNote, tagId),
    onSuccess: (note) => {
      queryClient.invalidateQueries(notesKey).then(() => {
        setSearchParams({ noteId: note.id }, { state: { ...state, note } });
      });
    },
  });
};

async function mutateFn(isAuth: boolean, newNote: CreateNote, tagId?: string) {
  // if note created within tags view: /app/tags#
  // assign tag automatically to note
  if (tagId) {
    newNote.tagsRef.push(tagId);
  }

  if (isAuth) return await axios.post<Note, Note>("/notes", newNote);

  return new Promise<Note>((res, rej) => {
    try {
      const localNote: Note = {
        ...newNote,
        createdAt: moment().format(),
        updatedAt: moment().format(),
        id: uuid(),
      };

      const note = createLocalNote(localNote);

      res(note);
    } catch (error) {
      rej(error);
    }
  });
}
