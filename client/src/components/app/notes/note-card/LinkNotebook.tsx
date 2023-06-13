import { useCallback } from "react";
import { CreatableSelect } from "chakra-react-select";
import { Stack, Text } from "@chakra-ui/react";

import { Modal } from "@/components";
import { useContextNotebooks, useContextTopics } from "@/hooks";
import { NotebookCreateModal } from "../../notebooks/NotebookCreateModal";

type ILinkNotebook = {
  noteId: string;
  isOpen: boolean;
  onClose(): void;
};

export function LinkNotebook({ noteId, isOpen, onClose }: ILinkNotebook) {
  const {
    notebookValue,
    notebooksOptions,
    onChange,
    onCreate,
    isCreateNotebookModalOpen,
    onCreateNotebookModalClose,
  } = useContextNotebooks(noteId);

  const {
    topicsValue,
    isTopicUpdating,
    getTopicsOptions,
    onTopicsChange,
    onTopicCreate,
    addNoteRef,
    clearTopicsValue,
  } = useContextTopics(notebookValue?.id as string, noteId);

  const topicsOptions = getTopicsOptions();

  const onConfirmClick = async () => {
    if (notebookValue?.label) {
      const isSuccess = await addNoteRef();
      if (isSuccess) onClose();
    }
  };

  const setButtonDisabled = useCallback(() => {
    return notebookValue && topicsValue.length > 0 ? false : true;
  }, [notebookValue, topicsValue]);

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        isButtonDisabled={setButtonDisabled()}
        isButtonLoading={isTopicUpdating}
        onClose={onClose}
        onConfirmClick={onConfirmClick}
        onCloseComplete={clearTopicsValue}
        header="Link to notebook"
        body={
          <Stack spacing={6}>
            <Stack>
              <Text color={"gray.500"}>Notebook</Text>
              <CreatableSelect
                placeholder="Select notebook..."
                options={notebooksOptions}
                onChange={onChange}
                onCreateOption={onCreate}
              />
            </Stack>

            <Stack>
              <Text color={"gray.500"}>Topic</Text>
              <CreatableSelect
                isMulti
                placeholder="Select topic..."
                isDisabled={!Boolean(notebookValue) || isTopicUpdating}
                value={topicsValue}
                options={topicsOptions}
                onChange={onTopicsChange}
                onCreateOption={onTopicCreate}
              />
            </Stack>
          </Stack>
        }
      />

      {/* create modals */}
      <NotebookCreateModal
        notebookName={notebookValue?.label}
        isOpen={isCreateNotebookModalOpen}
        onClose={onCreateNotebookModalClose}
      />
    </>
  );
}
