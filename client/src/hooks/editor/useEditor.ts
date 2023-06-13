import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useEditor as useTipTapEditor } from "@tiptap/react";

import { useEditorStore } from "@/store";
import { Note } from "@/types";
import { useUpdateNote } from "@/hooks";
import { extensions } from "./editor-extensions";
import { UpdateNote } from "../note/use-update-note";

export const useEditor = () => {
  const { isReadOnly } = useEditorStore();
  const { state } = useLocation();
  const [searchParams] = useSearchParams();

  const [note, setNote] = useState<Note>(state.note);
  useEffect(() => {
    if (state.note) setNote(state.note);
  }, [state, searchParams.get("noteId")]);

  const editor = useTipTapEditor({ extensions, content: note.content });
  const { onUpdateNote } = useUpdateNote(note.id);

  const debounced = useDebouncedCallback(
    (key: "title" | "content", value: string) => {
      onUpdateNote({ [key as "title"]: value } as UpdateNote);
    },
    1000
  );

  // updating note content
  editor?.on("update", ({ editor }) => {
    const html = editor.getHTML();
    if (html) debounced("content", html);
  });

  // fill editor with initial note content
  useEffect(() => {
    editor?.commands.setContent(note.content);
  }, [note.content]);

  // toggle editor lock
  useEffect(() => {
    editor?.setEditable(!isReadOnly);
  }, [isReadOnly, editor]);

  const updateTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    debounced("title", value);
  };

  return { editor, updateTitle, note: note };
};
