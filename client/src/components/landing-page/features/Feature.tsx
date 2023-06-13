import { ReactElement } from "react";
import { Text, Stack, Flex, useColorModeValue } from "@chakra-ui/react";
import { MotionBox } from "@/components";

type FeatureProps = {
  title: string;
  text: string;
  icon: ReactElement;
  delay: number;
};

export const Feature = ({ title, text, icon, delay }: FeatureProps) => {
  return (
    <MotionBox
      rounded={"lg"}
      shadow={"md"}
      px={4}
      py={12}
      bg={useColorModeValue("white", "whiteAlpha.100")}
      viewport={{ once: true, margin: "-280px 0px" }}
      initial={{ opacity: 0, x: -220 }}
      whileInView={{ opacity: 1, x: 0 }}
      // @ts-ignore
      transition={{ delay: 0.4 * delay, duration: 0.8 }}
    >
      <Stack align={"center"}>
        <Flex
          w={16}
          h={16}
          p={3}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.100", "whiteAlpha.100")}
          rounded={"full"}
          mb={4}
        >
          {icon}
        </Flex>

        <Text fontSize={"lg"} fontWeight={600}>
          {title}
        </Text>

        <Text
          fontSize={"sm"}
          color={useColorModeValue("gray.600", "gray.400")}
          textAlign={"center"}
          w={"80%"}
        >
          {text}
        </Text>
      </Stack>
    </MotionBox>
  );
};
