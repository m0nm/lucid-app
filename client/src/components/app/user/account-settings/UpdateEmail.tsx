import toast from "react-hot-toast";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAccount } from "@/hooks";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Input,
  Stack,
  Text,
  useBoolean,
} from "@chakra-ui/react";

type IUpdateEmail = {
  buttonColorScheme: string;
  email: string;
  userId:string
};

type UpdateEmailFields = {
  password: string;
  email: string;
};

const updateEmailSchema = z.object({
  email: z
    .string({ required_error: "Please type your email" })
    .email("Must be a valid email"),

  password: z
    .string({ required_error: "Please type your password" })
    .nonempty("Please type your password"),
});

export function UpdateEmail({userId, buttonColorScheme, email }: IUpdateEmail) {
  const [isDisabled, setIsDisabled] = useBoolean(true);
  const accountQuery = useUpdateAccount();

  const defaultValues = { email: email || "", password: "" };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateEmailFields>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<UpdateEmailFields> = (data) => {
    if (data.email === email) return;

    accountQuery.mutate(
      { userId, updateValues: data },
      {
        onSuccess: () => {
          setIsDisabled.on();
          toast.success("Email updated successfully");
        },
      }
    );
  };

  const onCancel = () => {
    setIsDisabled.on();
    reset(defaultValues, {
      keepErrors: false,
      keepValues: false,
      keepDefaultValues: true,
    });
  };

  return (
    <Box>
      <Text fontWeight={600} mb={2}>
        Update Email
      </Text>

      <form>
        <Stack>
          <FormControl isRequired isInvalid={Boolean(errors.email)}>
            <FormLabel fontSize="xs">Email</FormLabel>

            <HStack>
              <Input
                isDisabled={isDisabled}
                type={"email"}
                size={"sm"}
                {...register("email")}
              />
              <Button
                size={"sm"}
                colorScheme={buttonColorScheme}
                onClick={
                  isDisabled || accountQuery.isLoading
                    ? setIsDisabled.off
                    : handleSubmit(onSubmit)
                }
              >
                {isDisabled ? "Edit" : "Save"}
              </Button>

              {!isDisabled && (
                <Button
                  size={"sm"}
                  onClick={onCancel}
                  isDisabled={accountQuery.isLoading}
                >
                  cancel
                </Button>
              )}
            </HStack>

            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={Boolean(errors.password)} pt={1}>
            <FormLabel fontSize={"xs"}>Current Password</FormLabel>

            <Input
              isDisabled={isDisabled}
              type={"password"}
              size={"sm"}
              {...register("password")}
            />

            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
}
