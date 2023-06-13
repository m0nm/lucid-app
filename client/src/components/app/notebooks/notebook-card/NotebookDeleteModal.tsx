import { Text } from "@chakra-ui/react";

import { Notebook } from "@/types";
import { useDeleteNotebook } from "@/hooks";
import { Modal } from "@/components";

type IProps = { notebook: Notebook; isOpen: boolean; onClose(): void };

export const NotebookDeleteModal = (props: IProps) => {
  const { notebook, isOpen, onClose } = props;
  const { mutate: onDeleteNotebook, isLoading } = useDeleteNotebook(
    notebook.id
  );

  const onClick = () => {
    onDeleteNotebook(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      isCentered
      size={"sm"}
      isOpen={isOpen}
      isButtonLoading={isLoading}
      onClose={onClose}
      onConfirmClick={onClick}
      header={`Delete ${notebook.name}`}
      body={
        <Text>
          Are you sure you want to delete this notebook? All notes will be moved
          to trash
        </Text>
      }
    />
  );
};
