import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

import { Modal } from "@/components";
import { Notebook } from "@/types";
import { useUpdateNotebook } from "@/hooks";

type IProps = { notebook: Notebook; isOpen: boolean; onClose(): void };

export const NotebookRenameModal = (props: IProps) => {
  const { notebook, isOpen, onClose } = props;
  const { mutate: onUpdateNotebook, isLoading } = useUpdateNotebook(
    notebook.id
  );

  const { state } = useLocation();
  const navigate = useNavigate();

  const ref = useRef<HTMLInputElement>(null);

  const onRename = () => {
    const name = ref?.current?.value;

    if (name == "" || typeof name == "undefined") return;

    onUpdateNotebook(name, {
      onSuccess: () => {
        onClose();
        navigate(".", {
          replace: true,
          state: {
            ...state,
            notebook: { id: notebook.id, name: notebook.name },
          },
        });
      },
    });
  };

  return (
    <Modal
      isCentered
      size={"sm"}
      header={"Rename notebook"}
      isOpen={isOpen}
      isButtonLoading={isLoading}
      onClose={onClose}
      onConfirmClick={onRename}
      body={
        <Stack>
          <FormControl>
            <FormLabel fontSize={"sm"} fontWeight={600}>
              Notebook&apos;s Name
            </FormLabel>

            <Input
              autoFocus
              isRequired
              ref={ref}
              defaultValue={notebook.name}
              onKeyDown={(e) => {
                e.key == "Enter" && onRename();
              }}
            />
          </FormControl>
        </Stack>
      }
    />
  );
};
