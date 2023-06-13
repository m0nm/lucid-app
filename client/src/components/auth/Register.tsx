import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRegister } from "@/lib/auth";
import { registerSchema } from "./validation-schema";
import { HiCheck } from "react-icons/hi";

import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";

type FormValues = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(registerSchema) });

  const navigate = useNavigate();
  const registerMutation = useRegister();

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    registerMutation.mutate(values);
  };

  return (
    <Box rounded={"lg"}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} mb={8}>
          <FormControl isInvalid={Boolean(errors.email)} id="email">
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

          <FormControl isInvalid={Boolean(errors.password)} id="password">
            <FormLabel fontSize={"sm"} fontWeight={600}>
              Password
            </FormLabel>

            <Input type="password" {...register("password")} />

            <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
          </FormControl>

          <FormControl
            isInvalid={Boolean(errors.passwordConfirm)}
            id="password_confirm"
          >
            <FormLabel fontSize={"sm"} fontWeight={600}>
              Confirm password
            </FormLabel>

            <Input type="password" {...register("passwordConfirm")} />

            <FormErrorMessage>
              {errors?.passwordConfirm?.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>

        <Stack>
          <Button
            type={"submit"}
            colorScheme={useColorModeValue("red", "blue")}
            isLoading={registerMutation.isLoading}
            isDisabled={registerMutation.isSuccess}
            leftIcon={
              registerMutation.isSuccess ? <HiCheck size={20} /> : undefined
            }
          >
            Sign Up
          </Button>

          <Stack pt={4}>
            <Text align={"center"}>
              Already a user?{" "}
              <Link to="/login">
                <Text as="span" color={"blue.400"}>
                  Login
                </Text>
              </Link>
            </Text>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};
