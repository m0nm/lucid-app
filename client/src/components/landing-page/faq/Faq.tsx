import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {
  VStack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Text,
  Button,
  Container,
  useColorModeValue,
  useColorMode,
} from "@chakra-ui/react";
import { MotionBox } from "@/components";

const FAQ = [
  {
    label: "Is it free?",
    text: "Yes, It's totally free, And open source too!",
  },
  {
    label: "Is it reliable?",
    text: `This project is meant to showcase my development skills, I cannot guarantee the permanence of the notes so ¯\\\_(ツ)_/¯`,
  },
  {
    label: "Will be there a desktop and/or mobile version?",
    text: "Someday, maybe...i guess?",
  },
];

export const Faq = () => {
  const { colorMode } = useColorMode();

  const bgColor = colorMode == "light" ? "orange.100" : undefined;

  const _before = {
    content: '""',
    pos: "absolute",
    inset: 0,
    bgGradient: `linear(to-b, white, ${bgColor})`,
    h: 200,
    w: "full",
  };

  const _after = {
    ..._before,
    top: "100%",
    transform: "scaleY(-1)",
  };

  return (
    <VStack
      as={"section"}
      justify={"center"}
      align={"center"}
      minH={"80vh"}
      pos={"relative"}
      p={4}
      mt={_after.h}
      mb={_after.h + 150}
      bg={bgColor}
      _before={_before}
      _after={_after}
    >
      <Heading fontSize={"3xl"} py={6} mt={_before.h + 100}>
        Frequently Asked Questions
      </Heading>

      <Container maxW={{ md: "4xl" }}>
        <Accordion allowToggle w={"full"}>
          {FAQ.map((faq, i) => (
            <MotionBox
              key={faq.label}
              viewport={{ once: true, margin: "-20px 0px" }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              // @ts-ignore
              transition={{ delay: 0.6 * i, duration: 0.8 }}
            >
              <AccordionItem my={6}>
                {({ isExpanded }) => (
                  <>
                    <AccordionButton
                      as={Button}
                      title={faq.label}
                      colorScheme={"gray"}
                      bg={useColorModeValue("gray.50", "whiteAlpha.100")}
                      justifyContent={"space-between"}
                      p={7}
                      boxShadow={"sm"}
                      _hover={{
                        bg: useColorModeValue("gray.200", "whiteAlpha.300"),
                      }}
                      rightIcon={
                        isExpanded ? (
                          <BiChevronUp fontSize={20} />
                        ) : (
                          <BiChevronDown fontSize={20} />
                        )
                      }
                    >
                      <Text fontSize={"xl"} fontWeight={600} noOfLines={2}>
                        {faq.label}
                      </Text>
                    </AccordionButton>

                    <AccordionPanel mt={2}>
                      <Text
                        fontSize={"lg"}
                        color={useColorModeValue("inherit", "gray.400")}
                      >
                        {faq.text}
                      </Text>
                    </AccordionPanel>
                  </>
                )}
              </AccordionItem>
            </MotionBox>
          ))}
        </Accordion>
      </Container>
    </VStack>
  );
};
