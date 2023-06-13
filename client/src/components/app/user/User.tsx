import { useUser, useLogout } from "@/lib/auth";
import { AccountSettings } from "./account-settings/AccountSettings";
import { BsGear } from "react-icons/bs";
import { BiLogOut, BiMoon, BiSun } from "react-icons/bi";

import {
  Center,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";

export const User = () => {
  const { data, isLoading } = useUser();
  const { mutate: onLogout } = useLogout();

  const { colorMode, toggleColorMode } = useColorMode();
  const switchThemeIcon = colorMode === "light" ? <BiMoon /> : <BiSun />;

  const menuBgColor = useColorModeValue("gray.800", "gray.50");
  const menuColor = useColorModeValue("gray.200", "black");
  const _hover = { bg: useColorModeValue("gray.700", "gray.200") };

  // for account settings
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu placement="top" gutter={14} strategy="fixed">
        <Center>
          <MenuButton>
            <Skeleton isLoaded={!isLoading} rounded="full">
              <Avatar
                cursor={"pointer"}
                size={"lg"}
                textAlign={"center"}
                justifyContent="center"
                src={data?.avatar}
                name={data?.email}
              />
            </Skeleton>
          </MenuButton>
        </Center>

        <MenuList
          zIndex={"dropdown"}
          rounded={"xl"}
          bg={menuBgColor}
          color={menuColor}
          py={5}
        >
          <MenuItem
            icon={<BsGear />}
            bg={menuBgColor}
            color={menuColor}
            _hover={_hover}
            onClick={onOpen}
          >
            <Text fontSize={"sm"} fontWeight={500}>
              Account settings
            </Text>
          </MenuItem>

          <MenuItem
            bg={menuBgColor}
            color={menuColor}
            icon={switchThemeIcon}
            onClick={toggleColorMode}
            _hover={_hover}
          >
            <Text fontSize={"sm"} fontWeight={500}>
              Switch theme
            </Text>
          </MenuItem>

          <br />

          <MenuItem
            bg={menuBgColor}
            color={menuColor}
            icon={<BiLogOut />}
            _hover={_hover}
            onClick={onLogout}
          >
            <Text fontSize={"sm"} fontWeight={500}>
              Logout
            </Text>
          </MenuItem>
        </MenuList>
      </Menu>

      <AccountSettings
        userId={data?.id as string}
        email={data?.email as string}
        avatar={data?.avatar as string}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
};
