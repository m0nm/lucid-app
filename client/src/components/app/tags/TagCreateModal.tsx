import { useRef } from "react";
import { FormControl, Input } from "@chakra-ui/react";
import { useCreateTag } from "@/hooks";
import { Modal } from "@/components";
import toast from "react-hot-toast";

type IProps = { isOpen: boolean; onClose(): void };

export const TagCreateModal = ({ isOpen, onClose }: IProps) => {
  const { mutate: onCreateTag, isLoading, isSuccess } = useCreateTag();
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit = () => {
    const value = ref?.current?.value;

    if (value == "" || value == undefined) {
      toast.error("Tag name cannot be empty");
      return;
    }

    onCreateTag(value, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      isCentered
      size={"sm"}
      header={"Create a new tag"}
      isOpen={isOpen}
      onClose={onClose}
      onConfirmClick={onSubmit}
      isButtonLoading={isLoading}
      body={
        <FormControl>
          <Input
            autoFocus
            isRequired
            ref={ref}
            placeholder={"Enter tag..."}
            onKeyDown={(e) => {
              e.key == "Enter" && onSubmit();
            }}
          />
        </FormControl>
      }
    />
  );
};
