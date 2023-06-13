import { useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import { SingleValue } from "chakra-react-select";
import { Note, Option } from "@/types";
import { useGetNotebooks } from "@/hooks";

export const useContextNotebooks = (noteId: Note["id"]) => {
  const { notebooks } = useGetNotebooks();
  const [notebookValue, setNotebook] = useState<SingleValue<Option>>();

  const {
    isOpen: isCreateNotebookModalOpen,
    onOpen: onCreateNotebookModalOpen,
    onClose: onCreateNotebookModalClose,
  } = useDisclosure();

  const notebooksOptions = notebooks.map((n) => ({
    noteId,
    id: n.id,
    label: n.name,
    value: n.name,
  }));

  const onChange = (option: SingleValue<Option>) => {
    setNotebook(option);
  };

  const onCreate = (optionLabel: string) => {
    setNotebook((p) => ({ ...p, label: optionLabel } as SingleValue<Option>));
    onCreateNotebookModalOpen();
  };

  return {
    notebooksOptions,
    onChange,
    onCreate,
    onCreateNotebookModalClose,
    isCreateNotebookModalOpen,
    notebookValue,
  };
};
