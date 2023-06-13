import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { HiCheck } from "react-icons/hi";
import { useResetPassword } from "@/lib/auth";
import { Logo, MotionBox } from "@/components";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  LinkBox,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import toast from "react-hot-toast";

type FormValues = {
  password: string;
  passwordConfirm: string;
};

const resetSchema = z
  .object({
    password: z
      .string({ required_error: "Password is required" })
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long"),

    passwordConfirm: z
      .string({ required_error: "Password confirmation is required" })
      .nonempty("Password confirmation is required"),
  })
  .refine(({ password, passwordConfirm }) => password === passwordConfirm, {
    message: "Passwords must match",
    path: ["passwordConfirm"],
  });

export const ResetPassword = () => {
  const query = useResetPassword();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(resetSchema) });

  const onSubmit: SubmitHandler<FormValues> = () => {
    const userId = searchParams.get("userId");
    const token = searchParams.get("token");

    const { password } = getValues();

    if (userId && token) {
      query.mutate(
        { userId, token, password },
        {
          onSuccess: () => {
            toast.success("Password updated successfully");
            setTimeout(() => navigate("/login"), 2000);
          },
        }
      );
    }
  };

  return (
    <MotionBox>
      <Flex
        minH={"100vh"}
        flexDir={"column"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Logo width={150} />

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "40vw" }}>
          <Stack
            spacing={4}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            boxShadow={"md"}
            p={6}
            my={12}
          >
            <Heading lineHeight={1.1} fontSize={"2xl"}>
              Enter new password
            </Heading>

            <FormControl
              id="password"
              isInvalid={Boolean(errors.password)}
              mb={4}
            >
              <FormLabel fontSize={"sm"} fontWeight={600}>
                New Password
              </FormLabel>

              <Input type="password" {...register("password")} />

              <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
            </FormControl>

            <FormControl
              id="passwordConfirm"
              isInvalid={Boolean(errors.passwordConfirm)}
              mb={4}
            >
              <FormLabel fontSize={"sm"} fontWeight={600}>
                Confirm New Password
              </FormLabel>

              <Input type="password" {...register("passwordConfirm")} />

              <FormErrorMessage>
                {errors?.passwordConfirm?.message}
              </FormErrorMessage>
            </FormControl>

            <Stack>
              <Button
                type={"submit"}
                isLoading={query.isLoading}
                isDisabled={query.isSuccess}
                leftIcon={query.isSuccess ? <HiCheck /> : undefined}
                colorScheme={useColorModeValue("red", "blue")}
              >
                Change Password
              </Button>
            </Stack>

            <Link to="/">
              <LinkBox color={"blue.400"} textAlign={"right"}>
                Go back to website
              </LinkBox>
            </Link>
          </Stack>
        </form>
      </Flex>
    </MotionBox>
  );
};
