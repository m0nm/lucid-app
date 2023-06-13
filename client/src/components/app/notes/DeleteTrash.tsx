import { BiTrash } from "react-icons/bi";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { Modal } from "@/components";
import { useDeleteTrash } from "@/hooks";

export const DeleteTrash = () => {
  const { onDeleteTrash } = useDeleteTrash();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const onClick = () => {
    onDeleteTrash();
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label={"delete all trash"}
        title={"delete all trash"}
        variant={"ghost"}
        colorScheme={"red"}
        fontSize={"lg"}
        transition={".4s"}
        _hover={{ border: "1px solid", borderColor: "red.500" }}
        icon={<BiTrash />}
        onClick={onOpen}
      />

      <Modal
        size={"sm"}
        isCentered
        header={"Delete all trash"}
        body={"Are you sure you want to delete all trash?"}
        isOpen={isOpen}
        onClose={onClose}
        onConfirmClick={onClick}
      />
    </>
  );
};
