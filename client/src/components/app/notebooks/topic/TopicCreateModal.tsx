import toast from "react-hot-toast";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import { Modal } from "@/components";
import { useCreateTopic } from "@/hooks";

type IProps = { isOpen: boolean; onClose(): void };

export const TopicCreateModal = ({ isOpen, onClose }: IProps) => {
  const { state } = useLocation();
  const { notebook } = state;

  const { mutate: onCreateTopic, isLoading } = useCreateTopic();

  const ref = useRef<HTMLInputElement>(null);

  const onCreate = () => {
    const name = ref?.current?.value;

    if (name == "" || name == undefined) {
      toast.error("name cannot be empty");
      return;
    }

    onCreateTopic(
      { notebookId: notebook.id, topicName: name },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Modal
      isCentered
      size={"sm"}
      header={"Create a new topic"}
      isOpen={isOpen}
      isButtonLoading={isLoading}
      onClose={onClose}
      onConfirmClick={onCreate}
      body={
        <Stack>
          <FormControl>
            <FormLabel fontSize={"sm"} fontWeight={600}>
              Topic&apos;s Name
            </FormLabel>

            <Input
              ref={ref}
              autoFocus
              isRequired
              placeholder={"Type topic name..."}
              onKeyDown={(e) => {
                e.key == "Enter" && onCreate();
              }}
            />
          </FormControl>
        </Stack>
      }
    />
  );
};
