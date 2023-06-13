import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDeleteAccount } from "@/hooks";
import { useUser } from "@/lib/auth";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useBoolean,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

const DELETECONFIRMATION = "delete my account";

type FormFields = { confirm: string; password: string };

export function DeleteAccount() {
  const [isDisabled, setIsDisabled] = useBoolean(true);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const userQuery = useUser();
  const deleteQuery = useDeleteAccount();

  const {
    register,
    watch,
    getValues,
    formState: { errors },
    trigger,
  } = useForm<FormFields>();

  useEffect(() => {
    const subscription = watch((data) => {
      if (data.confirm === DELETECONFIRMATION) setIsDisabled.off();
      else setIsDisabled.on();
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const onDelete = () => {
    if (!userQuery.data) return;

    const password = getValues("password");
    deleteQuery.mutate({ userId: userQuery.data.id, password });
  };

  const onClick = async () => {
    const valid = await trigger("password", { shouldFocus: true });
    if (valid) onOpen();

    if (isOpen) onDelete();
  };

  return (
    <Box>
      <Text
        fontSize={"xl"}
        fontWeight={600}
        userSelect={"none"}
        mb={4}
        color={"red.500"}
      >
        DANGER ZONE
      </Text>
      <Box>
        <Text fontWeight={600} mb={2}>
          Delete Account
        </Text>

        <FormControl isRequired>
          <FormLabel fontSize="sm">
            Type{" "}
            <Text as="i" fontWeight={700}>
              "{DELETECONFIRMATION}"
            </Text>{" "}
            inside the input below
          </FormLabel>

          <Input size="sm" {...register("confirm")} />
        </FormControl>

        <FormControl
          isRequired
          isInvalid={Boolean(errors.password)}
          mt={3}
          mb={4}
        >
          <FormLabel fontSize={"xs"}>Current Password</FormLabel>

          <Input
            isDisabled={isDisabled}
            type={"password"}
            size={"sm"}
            {...register("password", { required: "Password is required" })}
          />

          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>

        <Popover isOpen={isOpen} onClose={onClose}>
          <PopoverTrigger>
            <Button
              float={"right"}
              colorScheme="red"
              isDisabled={isDisabled}
              onClick={onClick}
            >
              Delete my account
            </Button>
          </PopoverTrigger>

          <PopoverContent
            border={0}
            bg={useColorModeValue("gray.800", "gray.50")}
            color={useColorModeValue("gray.200", "black")}
          >
            <PopoverArrow />
            <PopoverCloseButton />

            <PopoverHeader
              fontWeight={500}
              borderColor={useColorModeValue("gray.600", "gray.200")}
            >
              We will miss you :(
            </PopoverHeader>

            <PopoverBody fontSize={"sm"} fontWeight={500}>
              If you are sure you wish to proceed then click on the button
              again.
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </Box>
  );
}
