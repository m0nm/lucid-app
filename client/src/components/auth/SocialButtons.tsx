import { oauthLoginFn } from "@/lib/auth";

import {
  Button,
  Image,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";

import googleIcon from "@/assets/auth-page/google.svg";
import githubIcon from "@/assets/auth-page/github.svg";

export const SocialButtons = () => {
  return (
    <VStack>
      <VStack w={"full"} spacing={3}>
        <Button
          display={"flex"}
          alignItems={"center"}
          variant={"unstyled"}
          w={"full"}
          shadow={"sm"}
          p={5}
          leftIcon={<Image w={4} h={4} src={googleIcon} />}
          bg={useColorModeValue("hsl(0, 0%, 95%)", "hsl(221.25, 12.5%, 22%)")}
          _hover={{
            bg: useColorModeValue("hsl(0, 0%, 92%)", "hsl(221.25, 12.5%, 25%)"),
          }}
          onClick={() => oauthLoginFn("google")}
        >
          <Text as={"span"} fontSize={"sm"}>
            Continue with Google
          </Text>
        </Button>

        <Button
          display={"flex"}
          alignItems={"center"}
          variant={"unstyled"}
          w={"full"}
          color={"white"}
          shadow={"sm"}
          p={5}
          leftIcon={<Image w={4} h={4} src={githubIcon} />}
          bg={"hsl(15, 8%, 9.8%)"}
          _hover={{
            bg: "hsl(15, 8%, 15%)",
          }}
          onClick={() => oauthLoginFn("github")}
        >
          <Text as={"span"} fontSize={"sm"}>
            Continue with Github
          </Text>
        </Button>
      </VStack>

      <Text
        color={useColorModeValue("gray.600", "gray.400")}
        pt={2}
        userSelect={"none"}
      >
        Or continue with
      </Text>
    </VStack>
  );
};
