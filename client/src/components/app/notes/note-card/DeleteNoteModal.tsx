import { Note } from "@/types";
import { Modal } from "@/components";
import { Text } from "@chakra-ui/react";
import { useDeleteNote } from "@/hooks";

type IModal = {
  isOpen: boolean;
  onClose: () => void;
  note: Note;
};

export const DeleteNoteModal = ({ isOpen, onClose, note }: IModal) => {
  const { onDeleteNote } = useDeleteNote(note.id);

  const deleteTrash = () => {
    onDeleteNote();
    onClose();
  };

  return (
    <Modal
      isCentered
      size="md"
      isOpen={isOpen}
      onClose={onClose}
      onConfirmClick={deleteTrash}
      header={`Delete ${note.title}`}
      body={
        <Text>
          Are you sure you want to delete this note? {""}
          <Text as="span" color="red.500" fontWeight={600}>
            This action is irreversible!
          </Text>
        </Text>
      }
    />
  );
};
