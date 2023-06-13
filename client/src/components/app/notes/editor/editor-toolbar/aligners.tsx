import { HStack, IconButton } from "@chakra-ui/react";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import { MenuItemProps } from "./tool-bar";

export const Aligners = ({ editor }: MenuItemProps) => {
  return (
    <HStack>
      <IconButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        icon={<BiAlignLeft />}
        aria-label="align left"
        title="align left"
      />

      <IconButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        icon={<BiAlignMiddle />}
        aria-label="align center"
        title="align center"
      />

      <IconButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        icon={<BiAlignRight />}
        aria-label="align right"
        title="align right"
      />
    </HStack>
  );
};
