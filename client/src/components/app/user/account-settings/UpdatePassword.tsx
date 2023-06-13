import toast from "react-hot-toast";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "@/lib/auth";
import { useUpdateAccount } from "@/hooks";
import { jwt } from "@/utils";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  useBoolean,
} from "@chakra-ui/react";

type IUpdatePassword = {
  buttonColorScheme: string;
  userId: string;
};

type UpdatePasswordFields = {
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};

const updatePasswordSchema = z
  .object({
    password: z
      .string({ required_error: "Please type your password" })
      .nonempty("Please type your password"),

    newPassword: z
      .string({ required_error: "Please type your new password" })
      .nonempty("Please type your new password")
      .min(6, "Password must be at least 6 characters"),

    confirmNewPassword: z
      .string({ required_error: "Please type your password confirmation" })
      .nonempty("Please type your password confirmation"),
  })
  .refine(
    ({ newPassword, confirmNewPassword }) => newPassword === confirmNewPassword,
    {
      message: "Passwords must match",
      path: ["confirmNewPassword"],
    }
  );

export function UpdatePassword({ userId, buttonColorScheme }: IUpdatePassword) {
  const [isDisabled, setIsDisabled] = useBoolean(true);
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const accountQuery = useUpdateAccount();

  const defaultValues = {
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdatePasswordFields>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<UpdatePasswordFields> = (data) => {
    if (data.password === data.newPassword) {
      setIsDisabled.on();
      return;
    }

    accountQuery.mutate(
      { userId, updateValues: data },
      {
        onSuccess: () => {
          setIsDisabled.on();
          toast.success("Password updated successfully");

          navigate("/login");

          // to hide ui flash from user
          setTimeout(() => {
            jwt.clearToken();
            queryClient.removeQueries();
          }, 30);
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
    <Box my={8}>
      <Text fontWeight={600} mb={2}>
        Update Password
      </Text>

      <FormControl isRequired isInvalid={Boolean(errors.password)}>
        <FormLabel fontSize={"xs"}>Current Password</FormLabel>
        <HStack pt={1}>
          <Input
            type={"password"}
            size={"sm"}
            placeholder={"*******"}
            isDisabled={isDisabled}
            {...register("password")}
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
              Cancel
            </Button>
          )}
        </HStack>

        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isRequired isInvalid={Boolean(errors.newPassword)} pt={1}>
        <FormLabel fontSize={"xs"}>New Password</FormLabel>
        <Input
          type={"password"}
          size={"sm"}
          placeholder={"*******"}
          isDisabled={isDisabled}
          {...register("newPassword")}
        />

        <FormErrorMessage>{errors.newPassword?.message}</FormErrorMessage>
      </FormControl>

      <FormControl
        isRequired
        isInvalid={Boolean(errors.confirmNewPassword)}
        pt={1}
      >
        <FormLabel fontSize={"xs"}>Confirm New Password</FormLabel>

        <Input
          type={"password"}
          size={"sm"}
          placeholder={"*******"}
          isDisabled={isDisabled}
          {...register("confirmNewPassword")}
        />

        <FormErrorMessage>
          {errors.confirmNewPassword?.message}
        </FormErrorMessage>
      </FormControl>
    </Box>
  );
}
