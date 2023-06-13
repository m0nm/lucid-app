import { ReactNode } from "react";
import { Logo } from "@/components";
import { AiOutlineMail } from "react-icons/ai";
import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Input,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export function Footer() {
  return (
    <Box
      as={"footer"}
      mt={"2rem"}
      bg={useColorModeValue("gray.50", "whiteAlpha.100")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"7xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 2fr" }}
          spacing={8}
        >
          <Stack spacing={6}>
            <Box>
              <Logo />
            </Box>

            <Text fontSize={"sm"}>© 2022 Lucid. All rights reserved</Text>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link href={"#"}>About us</Link>
            <Link href={"#"}>Blog</Link>
            <Link href={"#"}>Contact us</Link>
            <Link href={"#"}>Testimonials</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link href={"#"}>Help Center</Link>
            <Link href={"#"}>Terms of Service</Link>
            <Link href={"#"}>Legal</Link>
            <Link href={"#"}>Privacy Policy</Link>
            <Link href={"#"}>Status</Link>
          </Stack>

          <Stack align={"flex-start"}>
            <ListHeader>Stay up to date</ListHeader>

            <Stack direction={"row"}>
              <Input
                placeholder={"Your email address"}
                bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
                border={0}
                _focus={{
                  bg: "whiteAlpha.300",
                }}
              />

              <IconButton
                colorScheme={useColorModeValue("red", "blue")}
                color={useColorModeValue("white", "gray.800")}
                fill={"gray.800"}
                aria-label="Subscribe"
                icon={<AiOutlineMail width="22" />}
              />
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>

      <Box py={2}>
        <Link href="https://github.com/m0nm" textAlign="center">
          <Text fontWeight={600}>
            made with{" "}
            <Text as="span" color="red.500">
              ❤
            </Text>{" "}
            by m0nm
          </Text>
        </Link>
      </Box>
    </Box>
  );
}
