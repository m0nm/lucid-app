import { ReactNode, RefObject } from "react";
import { ContextMenu as ChakraContextMenu } from "chakra-ui-contextmenu";
import { Topic } from "@/types";
import { TopicDeleteModal } from "./TopicDeleteModal";
import { HiPencil, HiTrash } from "react-icons/hi";

import {
  Box,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

type IProps = {
  topic: Topic;
  inputRef: RefObject<HTMLInputElement>;
  setReadOnly(val: boolean): void;
  children: ReactNode;
};

export const ContextMenu = (props: IProps) => {
  const { topic, inputRef, setReadOnly, children } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onRenameClick = () => {
    setReadOnly(false);
    inputRef?.current?.focus();
  };

  return (
    <>
      <ChakraContextMenu<HTMLDivElement>
        renderMenu={() => (
          <MenuList boxShadow={"base"} zIndex={100} fontSize={"sm"}>
            <MenuItem icon={<HiPencil size={14} />} onClick={onRenameClick}>
              Rename topic
            </MenuItem>

            <MenuDivider />

            <MenuItem
              color={"red.500"}
              icon={<HiTrash size={14} />}
              onClick={onOpen}
            >
              Delete topic
            </MenuItem>
          </MenuList>
        )}
      >
        {(ref) => <Box ref={ref}>{children}</Box>}
      </ChakraContextMenu>

      <TopicDeleteModal isOpen={isOpen} onClose={onClose} topic={topic} />
    </>
  );
};
