import { ReactNode } from "react";
import { ContextMenu as ChakraContextMenu } from "chakra-ui-contextmenu";
import { HiPencil, HiTrash } from "react-icons/hi";

import { Notebook } from "@/types";
import { NotebookRenameModal } from "./NotebookRenameModal";
import { NotebookDeleteModal } from "./NotebookDeleteModal";

import {
  Box,
  MenuDivider,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";

type IProps = {
  notebook: Notebook;
  children: ReactNode;
};

export const ContextMenu = (props: IProps) => {
  const { children, notebook } = props;

  const {
    isOpen: isRenameOpen,
    onOpen: onRenameOpen,
    onClose: onRenameClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  return (
    <>
      {/* context menu */}
      <ChakraContextMenu<HTMLDivElement>
        renderMenu={() => (
          <MenuList boxShadow={"base"} zIndex={100} fontSize={"sm"}>
            <MenuItem icon={<HiPencil size={14} />} onClick={onRenameOpen}>
              Rename notebook
            </MenuItem>

            <MenuDivider />

            <MenuItem
              color={"red.500"}
              icon={<HiTrash size={14} />}
              onClick={onDeleteOpen}
            >
              Delete notebook
            </MenuItem>
          </MenuList>
        )}
      >
        {(ref) => <Box ref={ref}>{children}</Box>}
      </ChakraContextMenu>

      {/* notebook rename modal */}
      <NotebookRenameModal
        isOpen={isRenameOpen}
        onClose={onRenameClose}
        notebook={notebook}
      />

      {/* notebook delete modal */}
      <NotebookDeleteModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        notebook={notebook}
      />
    </>
  );
};
