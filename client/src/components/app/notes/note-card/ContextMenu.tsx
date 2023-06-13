import { ReactNode } from "react";
import { ContextMenu as ChakraContextMenu } from "chakra-ui-contextmenu";
import { Note } from "@/types";
import { useUpdateNote } from "@/hooks";

import { TagsMenu } from "./TagsMenu";
import { LinkNotebook } from "./LinkNotebook";
import { DeleteNoteModal } from "./DeleteNoteModal";

import {
  Box,
  MenuItem,
  MenuList,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";

import { ImBooks } from "react-icons/im";
import {
  MdStar,
  MdStarOutline,
  MdDeleteOutline,
  MdDeleteForever,
  MdOutlineSettingsBackupRestore,
} from "react-icons/md";

type IProps = {
  note: Note;
  children: ReactNode;
};

export const ContextMenu = ({ note, children }: IProps) => {
  const { onUpdateNote } = useUpdateNote(note.id);

  const {
    isOpen: isTrashModalOpen,
    onOpen: onTrashModalOpen,
    onClose: onTrashModalClose,
  } = useDisclosure();

  const {
    isOpen: isNotebookModalOpen,
    onOpen: onNotebookModalOpen,
    onClose: onNotebookModalClose,
  } = useDisclosure();

  const toggleFav = () => {
    onUpdateNote({ isFavorite: !note.isFavorite });
  };

  const moveToTrash = () => {
    onUpdateNote({ isTrash: true, isFavorite: false });
  };

  const restoreTrash = () => {
    onUpdateNote({ isTrash: false });
  };

  return (
    <>
      <ChakraContextMenu<HTMLDivElement>
        renderMenu={() => (
          <MenuList boxShadow={"base"} zIndex={100} fontSize={"sm"}>
            {/* default menu context options */}
            {!note.isTrash && (
              <>
                <MenuItem
                  onClick={toggleFav}
                  icon={
                    note.isFavorite ? (
                      <MdStar size={16} fill="#ffd23f" />
                    ) : (
                      <MdStarOutline size={16} />
                    )
                  }
                >
                  Mark{note.isFavorite && "ed"} as favorite
                </MenuItem>

                <TagsMenu note={note} />

                <MenuItem
                  fontSize="sm"
                  onClick={onNotebookModalOpen}
                  icon={<ImBooks size={16} />}
                >
                  Link to a notebook
                </MenuItem>

                <MenuDivider />

                <MenuItem
                  fontSize="sm"
                  onClick={moveToTrash}
                  icon={<MdDeleteOutline size={16} />}
                  color={"red.500"}
                >
                  Move to trash
                </MenuItem>
              </>
            )}

            {/* in trash view menu context options */}
            {note.isTrash && (
              <>
                <MenuItem
                  onClick={restoreTrash}
                  icon={<MdOutlineSettingsBackupRestore size={16} />}
                >
                  Restore from trash
                </MenuItem>

                <MenuItem
                  fontSize="sm"
                  onClick={onTrashModalOpen}
                  icon={<MdDeleteForever size={16} />}
                  color={"red.500"}
                >
                  Delete permenantly
                </MenuItem>
              </>
            )}
          </MenuList>
        )}
      >
        {(ref) => <Box ref={ref}>{children}</Box>}
      </ChakraContextMenu>

      {/* modals */}
      <LinkNotebook
        noteId={note.id}
        isOpen={isNotebookModalOpen}
        onClose={onNotebookModalClose}
      />

      <DeleteNoteModal
        isOpen={isTrashModalOpen}
        onClose={onTrashModalClose}
        note={note}
      />
    </>
  );
};
