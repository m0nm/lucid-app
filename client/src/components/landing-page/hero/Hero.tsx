import { Link } from "react-router-dom";
import { MotionBox, MotionHeading, MotionSpan } from "@/components";
import { variants } from "./animations";
import bgImage from "@/assets/hero-bg.svg";

import {
  Box,
  Container,
  Button,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";

export const Hero = () => {
  return (
    <Box
      h={"90vh"}
      bgImage={bgImage}
      bgPos={"center"}
      bgRepeat={"no-repeat"}
      bgSize={"cover"}
    >
      <Container maxW={"5xl"}>
        <Stack
          textAlign={"center"}
          align={"center"}
          spacing={{ base: 8, md: 10 }}
          py={{ base: 20, md: 28 }}
        >
          <MotionBox variants={variants} initial={"hidden"} animate={"visible"}>
            <MotionSpan
              display={"inline-block"}
              fontSize={{ base: "lg", md: "3xl" }}
              variants={variants}
            >
              Control your notes,
            </MotionSpan>
            {"  "}
            <MotionSpan
              display={"inline-block"}
              fontSize={{ base: "lg", md: "3xl" }}
              variants={variants}
            >
              Organize your thoughts
            </MotionSpan>

            <MotionHeading
              fontSize={"7xl"}
              fontWeight={700}
              lineHeight={1.6}
              variants={variants}
            >
              Be Lucid
            </MotionHeading>

            <MotionSpan
              color={useColorModeValue("gray.600", "gray.400")}
              maxW={"3xl"}
              overflow={"hidden"}
              variants={variants}
            >
              designed to help you take your note-taking skills to the next
              level. Our aim is to provide you with a tool that's both simple
              and powerful, so you can focus on what really matters - your work.
            </MotionSpan>

            <MotionBox variants={variants} mt={"2rem"}>
              <Link to="/app/notes">
                <Button
                  size="lg"
                  px={6}
                  colorScheme={useColorModeValue("red", "blue")}
                >
                  Get Started For Free
                </Button>
              </Link>
            </MotionBox>
          </MotionBox>
        </Stack>
      </Container>
    </Box>
  );
};
