import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "@/lib/auth";
import { loginSchema } from "./validation-schema";
import { ForgotPassword } from "./ForgotPassword";
import { HiCheck } from "react-icons/hi";

import {
  Box,
  FormErrorMessage,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

type FormValues = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    loginMutation.mutate(values);
  };

  return (
    <Box rounded={"lg"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} mb={8}>
          <FormControl isInvalid={Boolean(errors?.email)} id="email">
            <FormLabel fontSize={"sm"} fontWeight={600}>
              Email address
            </FormLabel>

            <Input
              type="email"
              placeholder="your-email@example.com"
              _placeholder={{ color: "gray.500" }}
              {...register("email")}
            />

            <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={Boolean(errors?.password)} id="password">
            <FormLabel fontSize={"sm"} fontWeight={600}>
              Password
            </FormLabel>

            <Input type="password" {...register("password")} />

            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack spacing={10}>
          <Stack
            direction={{ base: "column", sm: "row" }}
            align={"start"}
            justify={"space-between"}
          >
            <Checkbox>
              <Text as={"span"} fontSize={"sm"}>
                Remember me
              </Text>
            </Checkbox>

              <ForgotPassword />
          </Stack>

          <Button
            type="submit"
            colorScheme={useColorModeValue("red", "blue")}
            isLoading={loginMutation.isLoading}
            isDisabled={loginMutation.isSuccess}
            leftIcon={loginMutation.isSuccess ? <HiCheck size={20} /> : undefined}
          >
            Sign in
          </Button>
        </Stack>
      </form>

      <Stack pt={4}>
        <Text align={"center"}>
          New user?{" "}
          <Link to="/register">
            <Text as="span" color={"blue.400"}>
              Sign Up
            </Text>
          </Link>
        </Text>
      </Stack>
    </Box>
  );
};
