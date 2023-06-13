import { IconButton } from "@chakra-ui/react";
import { BiRedo, BiUndo } from "react-icons/bi";
import { MenuItemProps } from "./tool-bar";

export const UndoRedo = ({ editor }: MenuItemProps) => {
  return (
    <>
      <IconButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        icon={<BiUndo />}
        aria-label="undo"
        title="undo"
      />

      <IconButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        icon={<BiRedo />}
        aria-label="redo"
        title="redo"
      />
    </>
  );
};
