import { MenuItemProps } from "./tool-bar";
import { BsDot } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";

import {
  Button,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type LabelType =
  | "Heading 1"
  | "Heading 2"
  | "Heading 3"
  | "Heading 4"
  | "Heading 5"
  | "Heading 6";

type NodeType = { label: LabelType; level: 1 | 2 | 3 | 4 | 5 | 6 };

const NODES: NodeType[] = [
  {
    label: "Heading 1",
    level: 1,
  },
  {
    label: "Heading 2",
    level: 2,
  },
  {
    label: "Heading 3",
    level: 3,
  },
  {
    label: "Heading 4",
    level: 4,
  },
  {
    label: "Heading 5",
    level: 5,
  },
  {
    label: "Heading 6",
    level: 6,
  },
];

export const HeadingsMenu = ({ editor, bgStyle }: MenuItemProps) => {
  const handleClick = (node: NodeType) => {
    editor.chain().focus().toggleHeading({ level: node.level }).run();
  };

  return (
    <Menu size={"sm"}>
      <MenuButton as={Button} rightIcon={<HiChevronDown />}>
        Headings
      </MenuButton>

      <MenuList bg={useColorModeValue("white", "whiteAlpha.100")}>
        {NODES.map((node) => {
          const isActive = editor.isActive("heading", { level: node.level });

          return (
            <MenuItem
              key={node.level}
              bg={isActive ? bgStyle : "transparent"}
              justifyContent={"space-between"}
              _hover={{ bg: bgStyle }}
              onClick={() => handleClick(node)}
            >
              <Text fontSize="xs" fontWeight={isActive ? 600 : 500}>
                {node.label}
              </Text>

              {isActive && <Icon as={BsDot} fontSize={"3xl"} />}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};
