import { ChangeAvatar } from "./ChangeAvatar";
import { UpdateEmail } from "./UpdateEmail";
import { UpdatePassword } from "./UpdatePassword";
import { DeleteAccount } from "./DeleteAccount";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type IProps = {
  userId: string;
  email: string;
  avatar: string;
  isOpen: boolean;
  onClose(): void;
};

export const AccountSettings = (props: IProps) => {
  const { userId, email, avatar, isOpen, onClose } = props;
  const buttonColorScheme = useColorModeValue("red", "blue");

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={"3xl"}
      scrollBehavior={"inside"}
    >
      <ModalOverlay />

      <ModalContent py={4}>
        <ModalBody>
          <Text
            as={"h3"}
            userSelect={"none"}
            fontSize={"xl"}
            fontWeight={700}
            mb={8}
          >
            Account Settings
          </Text>

          <ChangeAvatar
            userId={userId}
            avatar={avatar}
            buttonColorScheme={buttonColorScheme}
          />

          <UpdateEmail
            userId={userId}
            email={email}
            buttonColorScheme={buttonColorScheme}
          />

          <UpdatePassword
            userId={userId}
            buttonColorScheme={buttonColorScheme}
          />

          <DeleteAccount />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
