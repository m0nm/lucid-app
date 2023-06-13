import toast from "react-hot-toast";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateAccount } from "@/hooks";

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  HStack,
  Input,
  Text,
  useBoolean,
} from "@chakra-ui/react";

type IChangeAvatar = { userId:string; avatar: string; buttonColorScheme: string };

const avatarSchema = z.object({
  avatar: z
    .string({ required_error: "Please enter the avatar url" })
    .url("Must be a valid url"),
});

export function ChangeAvatar({ userId, avatar, buttonColorScheme }: IChangeAvatar) {
  const [isDisabled, setIsDisabled] = useBoolean(true);
  const accountQuery = useUpdateAccount();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<{ avatar: string }>({
    resolver: zodResolver(avatarSchema),
    defaultValues: { avatar: avatar || "" },
  });

  const onSubmit: SubmitHandler<{ avatar: string }> = (data) => {

    if (data.avatar === avatar) return;

    accountQuery.mutate(
      { userId, updateValues: data },
      {
        onSuccess: () => {
          setIsDisabled.on();
          toast.success("Avatar updated successfully");
        },
      }
    );
  };

  const onCancel = () => {
    setIsDisabled.on();

    reset(
      { avatar },
      {
        keepErrors: false,
        keepValues: false,
        keepDefaultValues: true,
      }
    );
  };

  return (
    <Box mb={8}>
      <Text fontWeight={600} mb={2}>
        ِChange Avatar
      </Text>

      <form>
        <FormControl isInvalid={Boolean(errors.avatar)}>
          <HStack>
            <Input
              size={"sm"}
              isDisabled={isDisabled}
              placeholder={"type image url"}
              {...register("avatar", { required: "Please enter a url" })}
            />

            <Button
              size={"sm"}
              colorScheme={buttonColorScheme}
              onClick={isDisabled ? setIsDisabled.off : handleSubmit(onSubmit)}
            >
              {isDisabled ? "Edit" : "Save"}
            </Button>

            {!isDisabled && (
              <Button size={"sm"} onClick={onCancel}>
                Cancel
              </Button>
            )}
          </HStack>

          <FormErrorMessage>{errors.avatar?.message}</FormErrorMessage>
        </FormControl>
      </form>
    </Box>
  );
}
