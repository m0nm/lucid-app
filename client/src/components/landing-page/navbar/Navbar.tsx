import { Link } from "react-router-dom";
import { Logo, MotionHeader, SwitchTheme } from "../..";
import { Button, Container, Flex, useColorModeValue } from "@chakra-ui/react";

export const Navbar = () => {
  return (
    <MotionHeader
      bg={useColorModeValue("transparent", "transparent")}
      initial={{
        opacity: 0,
        y: -70,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      // @ts-ignore
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
    >
      <Container maxW={"full"} px={"16"} boxShadow={"sm"}>
        <Flex
          justifyContent={"space-between"}
          color={useColorModeValue("gray.600", "white")}
          minH={"60px"}
          py={{ base: 2 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
        >
          <Logo />

          <Flex align="center">
            <SwitchTheme withText={false} />

            {/*  navs */}
            <Flex as="nav" align="center" gap={"1rem"}>
              <Link to="/login">
                <Button variant="ghost">Login</Button>
              </Link>

              <Link to="register">
                <Button colorScheme={useColorModeValue("red", "blue")}>
                  Sign Up
                </Button>
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </MotionHeader>
  );
};
