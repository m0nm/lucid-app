import { Helmet } from "react-helmet-async";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { Footer, PageTransition } from "..";
import { useUser } from "@/lib/auth";
import { AuthHeader } from "./AuthHeader";
import { SocialButtons } from "./SocialButtons";
import bgImage from "@/assets/auth-page/auth-bg.png";

export const AuthLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useUser({ onSuccess: () => navigate("/app/notes", { replace: true }) });
  return (
    <Box>
      <Helmet>
        <title>
          {pathname == "/login"
            ? "Lucid | Login to your account"
            : "Lucid | Sign Up a new account"}
        </title>
      </Helmet>

      <AuthHeader />

      <Flex>
        <Box
          w={"fit-content"}
          pt={"2rem"}
          mx={"2rem"}
          bg={useColorModeValue("white", "whiteAlpha.100")}
        >
          <Heading
            as={"h3"}
            textAlign={"center"}
            fontSize={"4xl"}
            fontWeight={700}
          >
            {pathname == "/login" ? "Welcome Back!" : "Join Us"}
          </Heading>

          <Stack spacing={8} p={6} w={"md"}>
            <SocialButtons />

            {<Outlet />}
          </Stack>
        </Box>

        <Box
          h="100vh"
          w="100%"
          bgImage={bgImage}
          bgPos={"bottom"}
          bgSize={"contain"}
          bgRepeat={"no-repeat"}
        />
      </Flex>

      <Footer />

      <PageTransition />
    </Box>
  );
};
