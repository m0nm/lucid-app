import { Button, Text, useColorMode } from "@chakra-ui/react";
import { BiMoon, BiSun } from "react-icons/bi";

type IProps = {
  withText: boolean;
};

export const SwitchTheme = (props: IProps) => {
  const { withText } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  const icon = colorMode === "light" ? <BiMoon /> : <BiSun />;

  return withText ? (
    <Button
      aria-label={"switch theme"}
      title={"switch theme"}
      variant={"unstyled"}
      display={"flex"}
      alignItems={"center"}
      colorScheme={"gray"}
      pl={0}
      leftIcon={icon}
      onClick={toggleColorMode}
    >
      <Text fontSize={"sm"} fontWeight={400} ml={1}>
        Switch theme
      </Text>
    </Button>
  ) : (
    <Button
      aria-label={"switch theme"}
      title={"switch theme"}
      variant="ghost"
      colorScheme={"gray"}
      onClick={toggleColorMode}
    >
      {icon}
    </Button>
  );
};
