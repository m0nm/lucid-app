import { HStack, IconButton } from "@chakra-ui/react";
import { BiBold, BiCode, BiItalic, BiStrikethrough } from "react-icons/bi";
import { MenuItemProps } from "./tool-bar";

export const Marks = ({ editor, bgStyle }: MenuItemProps) => {
  return (
    <HStack>
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        icon={<BiBold />}
        aria-label="bold"
        title="bold"
        bg={editor.isActive("bold") ? bgStyle : ""}
        _hover={{ bg: bgStyle }}
      />

      <IconButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        icon={<BiItalic />}
        aria-label="italic"
        title="italic"
        bg={editor.isActive("italic") ? bgStyle : ""}
        _hover={{ bg: bgStyle }}
      />

      <IconButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        icon={<BiStrikethrough />}
        aria-label="strike through"
        title="strike through"
        bg={editor.isActive("strike") ? bgStyle : ""}
        _hover={{ bg: bgStyle }}
      />

      <IconButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        icon={<BiCode />}
        aria-label="code"
        title="code"
        bg={editor.isActive("code") ? bgStyle : ""}
        _hover={{ bg: bgStyle }}
      />
    </HStack>
  );
};
