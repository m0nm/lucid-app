import { FormEvent, useRef } from "react";
import { useForgotPassword } from "@/lib/auth";
import { HiCheck } from "react-icons/hi";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Portal,
  useDisclosure,
  Button,
  Text,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Skeleton,
  Badge,
} from "@chakra-ui/react";

export const ForgotPassword = () => {
  const ref = useRef<HTMLInputElement>(null);
  const query = useForgotPassword();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onSubmit = (e: FormEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const email = ref.current?.value;
    query.mutate(email as string);
  };

  return (
    <>
      <Text as="a" color={"blue.400"} cursor={"pointer"} onClick={onOpen}>
        Forgot password?
      </Text>

      <Modal
        size={"xl"}
        isCentered
        motionPreset={"slideInBottom"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent h={"50vh"} bg={useColorModeValue("white", "gray.800")}>
          <ModalHeader textAlign={"center"} fontSize={"2xl"}>
            Forgot Password?
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Skeleton isLoaded={!query.isLoading}>
              {query.isSuccess ? (
                <Stack
                  border={"1px solid"}
                  borderColor={useColorModeValue("green.500", "green.200")}
                  textAlign="center"
                  p={2}
                  mb={4}
                >
                  <Text
                    color={useColorModeValue("green.500", "green.200")}
                    fontSize={"md"}
                    fontWeight={600}
                  >
                    Email sent, Check your inbox or spam folder
                  </Text>
                </Stack>
              ) : (
                <Stack mb={4}>
                  <Text fontSize={"md"}>
                    Enter your email associated with your account and we'll send
                    you a link to reset your password
                  </Text>
                </Stack>
              )}
            </Skeleton>

            <form onSubmit={onSubmit}>
              <Stack spacing={6}>
                <FormControl aria-required isRequired id="email">
                  <FormLabel fontSize={"sm"} fontWeight={600}>
                    Email
                  </FormLabel>
                  <Input
                    ref={ref}
                    type="email"
                    placeholder="your-email@example.com"
                    _placeholder={{ color: "gray.500" }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  isLoading={query.isLoading}
                  isDisabled={query.isSuccess}
                  leftIcon={query.isSuccess ? <HiCheck /> : undefined}
                  colorScheme={useColorModeValue("red", "blue")}
                >
                  Continue
                </Button>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
