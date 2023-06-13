import { Link } from "react-router-dom";
import { Box, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { JOYRIDE_SIDEBAR } from "@/constants/app-tour";

import { useGetSidebarContent } from "@/hooks";
import { Logo, SwitchTheme } from "@/components";
import { useIsAuth } from "@/lib/auth";

import { User } from "../user/User";
import { SidebarList } from "./SidebarList";
import { HiLogin } from "react-icons/hi";

export const Sidebar = ({ opacity }: { opacity: number }) => {
  const { tagsList, notebooksList, quicklinksList } = useGetSidebarContent();
  const isAuth = useIsAuth();

  return (
    <Flex
      id={JOYRIDE_SIDEBAR}
      as={"aside"}
      whiteSpace={"nowrap"}
      h={"100vh"}
      direction={"column"}
      justify={"space-between"}
      p={4}
    >
      <Stack spacing={4}>
        <Box visibility={opacity == 0 ? "hidden" : "visible"} opacity={opacity}>
          <Logo />
        </Box>

        {/* quick links */}
        <Box>
          <Text
            color={"gray.500"}
            userSelect={"none"}
            fontSize={"sm"}
            fontWeight={600}
            mb={2}
            visibility={opacity == 0 ? "hidden" : "visible"}
            opacity={opacity}
          >
            Quick Links
          </Text>

          <SidebarList opacity={opacity} list={quicklinksList} />
        </Box>

        {/* notebooks */}
        <Box>
          <Text
            color={"gray.500"}
            userSelect={"none"}
            fontSize={"sm"}
            fontWeight={600}
            mb={2}
            visibility={opacity == 0 ? "hidden" : "visible"}
            opacity={opacity}
          >
            Notebooks
          </Text>

          <SidebarList opacity={opacity} list={notebooksList} />
        </Box>

        {/* tags */}
        <Box>
          <Text
            color={"gray.500"}
            userSelect={"none"}
            fontSize={"sm"}
            fontWeight={600}
            mb={2}
            visibility={opacity == 0 ? "hidden" : "visible"}
            opacity={opacity}
          >
            Tags
          </Text>

          <SidebarList opacity={opacity} list={tagsList} />
        </Box>
      </Stack>

      {/* other */}
      {isAuth ? (
        <User />
      ) : (
        <Box pl={1}>
          <Link to={"/login"}>
            <Stack
              title={"login"}
              direction={"row"}
              align={"center"}
              spacing={3}
            >
              <Icon as={HiLogin} />
              <Text fontSize={"sm"}>Login</Text>
            </Stack>
          </Link>
          <SwitchTheme withText />
        </Box>
      )}
    </Flex>
  );
};
