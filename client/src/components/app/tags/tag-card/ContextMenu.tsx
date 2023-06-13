import { ReactNode, RefObject } from "react";
import { ContextMenu as ChakraContextMenu } from "chakra-ui-contextmenu";
import { Tag } from "@/types";
import { deleteLocalTag } from "@/utils";

import { Box, MenuItem, MenuList } from "@chakra-ui/react";
import { HiPencil, HiTrash } from "react-icons/hi";
import { useDeleteTag } from "@/hooks";

type IProps = {
  tag: Tag;
  inputRef: RefObject<HTMLInputElement>;
  setReadOnly(val: boolean): void;
  children: ReactNode;
};

export const ContextMenu = (props: IProps) => {
  const { tag, inputRef, setReadOnly, children } = props;
  const { onDeleteTag } = useDeleteTag(tag.id);

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
              Rename tag
            </MenuItem>

            <MenuItem
              color={"red.500"}
              icon={<HiTrash size={14} />}
              onClick={onDeleteTag}
            >
              Delete tag
            </MenuItem>
          </MenuList>
        )}
      >
        {(ref) => <Box ref={ref}>{children}</Box>}
      </ChakraContextMenu>
    </>
  );
};
