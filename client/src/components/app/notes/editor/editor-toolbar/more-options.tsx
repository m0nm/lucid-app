import { useCallback } from "react";
import { MenuItemProps } from "./tool-bar";

import { TbBraces, TbQuote } from "react-icons/tb";
import {
  BiCheckboxChecked,
  BiDotsVerticalRounded,
  BiImage,
  BiRuler,
} from "react-icons/bi";

import {
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

export const MoreOptions = ({ editor, bgStyle }: MenuItemProps) => {
  const addImage = useCallback(() => {
    const url = window.prompt("Enter image url");

    url && editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  return (
    <Menu size="sm">
      <MenuButton
        as={IconButton}
        icon={<BiDotsVerticalRounded />}
        aria-label="more options"
        title="more options"
      />

      <MenuList bg={useColorModeValue("white", "whiteAlpha.100")}>
        <MenuItem
          onClick={() => editor.chain().focus().toggleTaskList().run()}
          bg={"transparent"}
          _hover={{ bg: bgStyle }}
        >
          <Icon as={BiCheckboxChecked} mr={2} />
          <Text as={"span"} fontSize={"sm"}>
            Task list
          </Text>
        </MenuItem>

        <MenuItem
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          bg={"transparent"}
          _hover={{ bg: bgStyle }}
        >
          <Icon as={TbBraces} mr={2} />
          <Text as={"span"} fontSize={"sm"}>
            Code block
          </Text>
        </MenuItem>

        <MenuItem
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          bg={"transparent"}
          _hover={{ bg: bgStyle }}
        >
          <Icon as={TbQuote} mr={2} />
          <Text as={"span"} fontSize={"sm"}>
            Blockquote
          </Text>
        </MenuItem>

        <MenuItem
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          bg={"transparent"}
          _hover={{ bg: bgStyle }}
        >
          <Icon as={BiRuler} mr={2} />
          <Text as={"span"} fontSize={"sm"}>
            Horizontal rule
          </Text>
        </MenuItem>

        <MenuItem
          onClick={addImage}
          bg={"transparent"}
          _hover={{ bg: bgStyle }}
        >
          <Icon as={BiImage} mr={2} />
          <Text as={"span"} fontSize={"sm"}>
            Image
          </Text>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
