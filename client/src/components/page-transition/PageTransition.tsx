import { useIsPresent } from "framer-motion";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { Logo, MotionBox } from "..";

export const PageTransition = () => {
  const isPresent = useIsPresent();

  return (
    <MotionBox
      pos={"fixed"}
      display={"grid"}
      placeContent={"center"}
      inset={0}
      zIndex={100}
      bg={useColorModeValue("white", "gray.800")}
      style={{ originX: isPresent ? 0 : 1 }}
      initial={{ scaleX: 1 }}
      animate={{
        scaleX: 0,
        transition: { duration: 0.6, ease: "backIn" },
      }}
      exit={{
        scaleX: 1,
        transition: { duration: 0.6, ease: "backOut" },
      }}
    >
      <Box pointerEvents={"none"} userSelect={"none"}>
        <Logo />
      </Box>
    </MotionBox>
  );
};
