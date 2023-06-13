import { Link } from "react-router-dom";
import { Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import { Logo, SwitchTheme } from "..";
import { BiLinkExternal } from "react-icons/bi";

export const AuthHeader = () => {
  return (
    <Flex
      as={"header"}
      alignItems={"center"}
      justifyContent={"space-between"}
      color={useColorModeValue("gray.600", "white")}
      minH={"30px"}
      px={{ base: 8 }}
      py={{ base: 2 }}
      mb={6}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={useColorModeValue("gray.200", "gray.900")}
      bg={useColorModeValue("white", "whiteAlpha.100")}
    >
      <Logo />

      <Flex alignItems={"center"} gap={"0.5rem"}>
        <SwitchTheme withText={false} />

        <Link to={"/app"}>
          <Flex alignItems={"center"} borderLeft={"1px solid"}>
            <Text as="span" pl={2} pr={1} fontWeight={600} fontSize={"sm"}>
              Go to app directly
            </Text>
            <Icon as={BiLinkExternal} fontSize={"sm"} fontWeight={600} />
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};
