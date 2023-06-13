import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";

export const extensions = [
  StarterKit,
  Image,

  TaskItem,
  TaskList.configure({ HTMLAttributes: { class: "tasklist" } }),

  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  
  Placeholder.configure({
    placeholder: "Start writing your note..."
  }),
];
