import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tag, Note } from "@/types";
import { useGetNotes } from "..";

export const useGetTagNotes = (tagId: Tag["id"] | undefined) => {
  const { state } = useLocation();
  const { notes, isLoading } = useGetNotes();

  // const [tagNotes, setTagNotes] = useState<Note[]>([]);

  // useEffect(() => {
  //   if (!tagId) return;

  //   setTagNotes(tagNotes);
  // }, [state]);

  const tagNotes = notes.filter(
    (note) => !note.isTrash && note.tagsRef?.some((nt) => nt === tagId)
  );

  return { tagNotes, isLoading };
};
