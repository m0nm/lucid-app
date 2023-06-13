import { MotionBox } from "@/components";
import {
  Box,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Heading,
} from "@chakra-ui/react";

type TestimonialProps = {
  heading: string;
  text: string;
  name: string;
  title: string;
  avatar: string;
  delay: number;
};

export const Testimonial = (props: TestimonialProps) => {
  const { name, text, avatar, title, heading, delay } = props;

  const chevronDown = {
    content: `""`,
    w: 0,
    h: 0,
    borderLeft: "solid transparent",
    borderLeftWidth: 16,
    borderRight: "solid transparent",
    borderRightWidth: 16,
    borderTop: "solid",
    borderTopWidth: 16,
    borderTopColor: useColorModeValue("gray.200", "whiteAlpha.100"),
    pos: "absolute",
    bottom: "-16px",
    left: "50%",
    transform: "translateX(-50%)",
  };

  return (
    <Box>
      <MotionBox
        transition={".8s"}
        viewport={{ once: true, margin: "-80px 0px" }}
        initial={{ opacity: 0, y: 300 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Stack
          bg={useColorModeValue("gray.100", "whiteAlpha.100")}
          boxShadow={"lg"}
          h={240}
          p={8}
          rounded={"xl"}
          align={"center"}
          pos={"relative"}
          _after={chevronDown}
        >
          <Heading as={"h3"} fontSize={"xl"} mb={4}>
            {heading}
          </Heading>

          <Text
            color={useColorModeValue("gray.600", "gray.400")}
            fontSize={"sm"}
            lineHeight={1.5}
          >
            {text}
          </Text>
        </Stack>
      </MotionBox>

      <MotionBox
        viewport={{ once: true, margin: "-80px 0px" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        // @ts-ignore
        transition={{ delay: delay + 0.75 }}
      >
        <Stack align={"center"} mt={12}>
          <Avatar src={avatar} mb={2} />

          <Stack spacing={-1} align={"center"}>
            <Text fontWeight={600}>{name}</Text>
            <Text
              fontSize={"sm"}
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {title}
            </Text>
          </Stack>
        </Stack>
      </MotionBox>
    </Box>
  );
};
