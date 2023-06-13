import { ReactNode } from "react";
import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useColorModeValue,
} from "@chakra-ui/react";

type ContainerProps = Omit<ModalProps, "children">;

type IModal = ContainerProps & {
  onClose(): void;
  onConfirmClick(): void;

  hasOverlay?: boolean;
  isButtonLoading?: boolean;
  isButtonDisabled?: boolean;
  header: string;
  body: string | ReactNode;
};

export const Modal = (props: IModal) => {
  const {
    onClose,
    onConfirmClick,
    hasOverlay = true,
    isButtonLoading = false,
    isButtonDisabled = false,
    header,
    body,
  } = props;

  const modalProps: Exclude<ContainerProps, IModal> = props;

  return (
    <ChakraModal {...modalProps}>
      {hasOverlay && <ModalOverlay />}

      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />

        <ModalBody>{body}</ModalBody>

        <ModalFooter>
          <Button
            variant={"ghost"}
            size={"sm"}
            colorScheme={"gray"}
            mr={4}
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            size={"sm"}
            colorScheme={useColorModeValue("red", "blue")}
            onClick={() => onConfirmClick()}
            isLoading={isButtonLoading}
            isDisabled={isButtonDisabled}
          >
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
