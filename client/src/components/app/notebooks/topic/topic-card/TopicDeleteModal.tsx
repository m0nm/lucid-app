import { useLocation } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { Topic } from "@/types";
import { Modal } from "@/components";
import { useDeleteTopic } from "@/hooks";

type IModal = {
  isOpen: boolean;
  onClose: () => void;
  topic: Topic;
};

export const TopicDeleteModal = ({ isOpen, onClose, topic }: IModal) => {
  const { state } = useLocation();
  const notebook = state && state.notebook;
  const notebookId = notebook && notebook.id;

  const { mutate: onDeleteTopic, isLoading } = useDeleteTopic(
    notebookId,
    topic.id
  );

  const deleteTopic = () => {
    if (!notebookId) return;

    onDeleteTopic(undefined, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      isCentered
      size="md"
      isOpen={isOpen}
      isButtonLoading={isLoading}
      onClose={onClose}
      onConfirmClick={deleteTopic}
      header={`Delete ${topic.name}`}
      body={
        <Text>
          Are you sure you want to delete this topic? All notes will be moved to
          trash
        </Text>
      }
    />
  );
};
