import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { axios } from "@/lib/axios";
import { useIsAuth } from "@/lib/auth";
import { Note, NotesType } from "@/types";
import { notesKey } from "@/constants/query-keys";
import { NOTE_STORAGE } from "@/constants/local-events";

export const useGetNotes = (filter: NotesType = "notes") => {
  const { pathname } = useLocation();
  const isAuth = useIsAuth();

  const queryKey =
    pathname == "/app/notes" ? notesKey : [...notesKey, pathname];

  const {
    data,
    isLoading: isQueryLoading,
    refetch,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey,
    queryFn: () => fetchNotes(isAuth),
  });

  useEffect(() => {
    if (isAuth) return;

    function refetchGuestNotes() {
      refetch();
    }

    window.addEventListener(NOTE_STORAGE, refetchGuestNotes);
    return () => {
      window.removeEventListener(NOTE_STORAGE, refetchGuestNotes);
    };
  }, []);

  const isLoading = isQueryLoading || isFetching || isRefetching;
  const notes = data?.filter((n) =>
    filter == "favs" ? n.isFavorite : filter == "trash" ? n.isTrash : !n.isTrash
  );

  return { notes: notes ?? [], isLoading };
};

function fetchNotes(isAuth: boolean): Promise<Note[]> {
  if (isAuth) return fetchUserNotes();
  return fetchGuestNotes();
}

function fetchGuestNotes() {
  return new Promise<Note[]>((res, rej) => {
    try {
      const notes: Note[] = JSON.parse(localStorage.getItem("notes") || "[]");
      res(notes);
    } catch (e) {
      rej(e);
    }
  });
}

async function fetchUserNotes() {
  return await axios.get<Note[], Note[]>("/notes");
}
