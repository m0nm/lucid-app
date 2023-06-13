import { HStack, IconButton } from "@chakra-ui/react";
import { BiListOl, BiListUl } from "react-icons/bi";
import { MenuItemProps } from "./tool-bar";

export const Listers = ({ editor }: MenuItemProps) => {
  return (
    <HStack>
      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        icon={<BiListUl />}
        aria-label="unordered list"
        title="unordered list"
      />

      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        icon={<BiListOl />}
        aria-label="ordered list"
        title="ordered list"
      />
    </HStack>
  );
};
