"use client";

import { ReactNode } from "react";
import illustration from "@/assets/error-boundary/something-went-wrong.png";

import {
  Button,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import {
  ErrorBoundary as ReactErrorBoundary,
  useErrorBoundary,
} from "react-error-boundary";

function Fallback() {
  const { resetBoundary } = useErrorBoundary();

  return (
    <Stack
      role={"alert"}
      alignItems={"center"}
      justifyContent={"center"}
      spacing={0}
      py={"5%"}
    >
      <Image
        w={350}
        h={350}
        src={illustration}
        alt={"something went wrong"}
        mx={"50%"}
        mb={8}
      />

      <Text fontSize={"lg"} color={"gray.500"}>
        Something went wrong :( Please try again
      </Text>

      <Text fontSize={"lg"} color={"gray.500"}>
        or report the issue to the developer
      </Text>

      <br />

      <Button
        colorScheme={useColorModeValue("red", "blue")}
        onClick={resetBoundary}
        w={"fit-content"}
      >
        Click To Try Again
      </Button>
    </Stack>
  );
}

export const ErrorBoundary = ({ children }: { children: ReactNode }) => {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  );
};
