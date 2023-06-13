import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Note } from "@/types";
import { notesKey } from "@/constants/query-keys";

export const useGetTopicNotes = () => {
  const queryClient = useQueryClient();
  const { state } = useLocation();

  const notes = queryClient.getQueryData<Note[]>(notesKey);

  const getTopicNotes = useCallback(
    (notesRef: Note["id"][]) => {
      if (!notes) return [];

      const topicNotes = notes.filter(
        (n) => !n.isTrash && notesRef.some((noteRef) => n.id == noteRef)
      );

      return topicNotes;
    },
    [notes, state]
  );

  return { getTopicNotes };
};
